const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const root = __dirname;
const url = process.env.LIVE_URL || `file:///${path.join(root, "index.html").replace(/\\/g, "/")}`;
const navigationTimeout = process.env.LIVE_URL ? 90000 : 45000;

async function click(page, selector) {
  await page.locator(selector).first().evaluate(element => element.click());
}

async function openDoc(page, id, clues) {
  await click(page, '[data-section="archive"]');
  await click(page, `[data-doc="${id}"]`);
  for (const clue of clues) {
    const locator = page.locator(`[data-clue="${clue}"]`);
    if (await locator.count()) await locator.first().click();
  }
  await click(page, ".modal-close");
}

async function combine(page, clueIds) {
  await click(page, '[data-section="evidence"]');
  for (const id of clueIds) await click(page, `[data-select-clue="${id}"]`);
  await click(page, "[data-combine]");
}

async function search(page, query) {
  await click(page, '[data-section="web"]');
  await page.locator("#search-input").fill(query);
  await page.locator("#search-form").evaluate(form => form.requestSubmit());
}

async function inspectPerson(page, id, clue) {
  await click(page, '[data-section="people"]');
  await click(page, `[data-person="${id}"]`);
  if (!await page.locator(`[data-clue="${clue}"]`).count()) {
    const modal = await page.locator("#modal-content").innerText().catch(() => "<no modal>");
    throw new Error(`Missing ${clue} for ${id}: ${modal}`);
  }
  await click(page, `[data-clue="${clue}"]`);
  await click(page, ".modal-close");
}

async function loadSave(page, partial) {
  await page.evaluate(save => localStorage.setItem("snowline-below-save-v2", JSON.stringify({ version: 2, ...save })), partial);
  await page.reload({ waitUntil: "domcontentloaded" });
  await click(page, "#continue-game");
}

(async () => {
  const fallbackEdge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const browserPath = process.env.BROWSER_PATH || (fs.existsSync(fallbackEdge) ? fallbackEdge : null);
  const browser = await chromium.launch({ headless: true, ...(browserPath ? { executablePath: browserPath } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  page.setDefaultTimeout(5000);
  page.setDefaultNavigationTimeout(navigationTimeout);
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await click(page, "#new-game");
  await click(page, ".modal-close");

  await openDoc(page, "passengers", ["passenger_count", "seat_gap"]);
  await inspectPerson(page, "guowen", "guowen_identity");
  await combine(page, ["passenger_count", "seat_gap"]);
  for (const [id, clue] of [
    ["linxue", "link_linxue"], ["zhou", "link_zhou"], ["luo", "link_luo"], ["han", "link_han"],
    ["lu", "link_lu"], ["tang", "link_tang"], ["gu", "link_gu"], ["qiu", "link_qiu"]
  ]) await inspectPerson(page, id, clue);
  await click(page, '[data-section="photos"]');
  if (await page.locator('[data-photo-id="bus"] .scene-evidence').count()) throw new Error("Original bus photograph still contains artificial evidence overlays");
  if (!await page.locator('[data-photo-id="tracks"] .photo-frame.footprint-photo').isVisible()) throw new Error("Dedicated footprint evidence photograph is missing");
  const photoCardWidth = (await page.locator('[data-photo-id="tracks"]').boundingBox()).width;
  await click(page, '[data-photo-id="tracks"] [data-open-photo="tracks"]');
  const enlargedWidth = (await page.locator(".photo-inspection-expanded .photo-frame").boundingBox()).width;
  if (enlargedWidth <= photoCardWidth + 80) throw new Error(`Desktop photo did not enlarge for inspection: ${photoCardWidth} -> ${enlargedWidth}`);
  const enlargedBackgroundSize = await page.locator(".photo-inspection-expanded .photo-frame").evaluate(el => getComputedStyle(el).backgroundSize);
  if (enlargedBackgroundSize !== "contain") throw new Error(`Enlarged evidence photo should preserve the full image with contain, got ${enlargedBackgroundSize}`);
  await click(page, '.photo-inspection-expanded [data-clue="footprints"]');
  await click(page, '.photo-inspection-expanded [data-close-modal]');
  const trackFindings = await page.locator('[data-photo-id="tracks"] .photo-findings').innerText();
  if (!trackFindings.includes("观察01 · 八组脚印") || !trackFindings.includes("巴士外只有八组离开车辆的脚印")) throw new Error(`Footprint photograph did not retain its numbered observation: ${trackFindings}`);
  if ((await page.locator('[data-photo-id="tracks"] .hotspot.found').innerText()).trim() !== "01 ✓") throw new Error("Discovered photo hotspot still covers the image with its full clue text");
  await click(page, '[data-section="archive"]');
  await click(page, '[data-doc="snowSurvey"]');
  const snowSurveyText = await page.locator(".document-body").innerText();
  if (!["6 cm", "7 cm", "5 cm", "约6厘米"].every(text => snowSurveyText.includes(text))) throw new Error(`Snow depth was not moved into a complete separate record: ${snowSurveyText}`);
  await click(page, '[data-clue="snow_depth"]');
  await click(page, ".modal-close");
  const snowState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!snowState.clues.includes("snow_depth")) throw new Error("Separate snow-depth record did not provide the snow clue");
  await click(page, '[data-section="photos"]');
  await click(page, '[data-clue="official_photo_time"]');
  await combine(page, ["snow_depth", "official_photo_time"]);
  await combine(page, ["passenger_count", "passenger_links"]);
  await combine(page, ["passenger_count", "footprints"]);

  await openDoc(page, "leave", ["leave_count", "time_2000"]);
  await openDoc(page, "roster", ["missing17"]);
  await openDoc(page, "physical", ["health_guowen"]);
  await combine(page, ["leave_count", "missing17", "health_guowen"]);

  await openDoc(page, "camp", ["five_cups", "camp_five_depressions", "time_2001"]);
  await click(page, '[data-section="cases"]');
  await click(page, '[data-case="01"]');
  if (!(await page.locator(".case-discoveries").innerText()).includes("旁证")) throw new Error("2001 supplemental finding was not separated from core evidence");
  await click(page, ".modal-close");
  await openDoc(page, "supplies", ["four_supplies"]);
  await combine(page, ["five_cups", "four_supplies"]);

  await openDoc(page, "crew", ["team_six", "meal_seven", "time_2003"]);
  await click(page, '[data-section="photos"]');
  await click(page, '[data-clue="class_red_scarf"]');
  await click(page, '[data-clue="photo_seventh"]');
  await click(page, '[data-compare-photos]');
  await combine(page, ["team_six", "photo_seventh"]);
  await combine(page, ["photo_seventh", "guowen_red_scarf"]);

  await click(page, '[data-section="archive"]');
  await click(page, '[data-doc="passengers"]');
  await click(page, '[data-hidden="H03"]');
  await click(page, ".modal-close");
  await click(page, '[data-section="web"]');
  if (!(await page.locator("#search-input").getAttribute("placeholder")).includes("关键词或组合词")) throw new Error("Old web search instructions still require two or more keywords");
  await search(page, "许 白岭 2004");
  if (!(await page.locator(".search-result").first().innerText()).includes("2004-12-18")) throw new Error("The erased Xu passenger cache was not recovered");
  let xuState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!xuState.clues.includes("ticket_xu") || !xuState.clues.includes("xu_deleted")) throw new Error("Xu ticket and deleted index did not become independently usable clues");
  await combine(page, ["S01", "ticket_xu", "xu_deleted"]);
  xuState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!xuState.hypotheses.includes("S03")) throw new Error("S01 + Xu ticket + deleted index did not form the tenth passenger record conclusion");

  await openDoc(page, "weather", ["weather_record"]);
  await combine(page, ["snow_depth", "weather_record"]);
  await openDoc(page, "memo", ["forecast_eight", "time_2004", "original_photo_time", "experiment_seven"]);
  await combine(page, ["official_photo_time", "original_photo_time"]);
  await combine(page, ["forecast_eight", "footprints"]);

  await click(page, '[data-section="timeline"]');
  await click(page, '[data-compare-times]');
  await search(page, "白岭 19:47");
  const afterTimeSearch = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!afterTimeSearch.clues.includes("repeated_time")) throw new Error(`Time search failed: ${JSON.stringify(afterTimeSearch.searches)}`);
  await combine(page, ["case_times", "repeated_time"]);

  await search(page, "AME-7");
  let ameChainState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (ameChainState.unlockedDocs.includes("ame")) throw new Error("Direct AME-7 search bypassed the two-step discovery chain");
  if (!(await page.locator(".search-result").first().innerText()).includes("尚未建立完整项目编号")) throw new Error("Premature AME-7 search did not explain the missing project number");
  await search(page, "北山 地下设施");
  await openDoc(page, "facility", ["facility", "ame_partial"]);
  ameChainState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!ameChainState.clues.includes("ame_partial") || !ameChainState.clues.includes("experiment_seven")) throw new Error("AME-7 source fragments were not independently discoverable");
  await combine(page, ["ame_partial", "experiment_seven"]);
  ameChainState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!ameChainState.clues.includes("ame_code")) throw new Error("AME-? plus experiment 7 did not reconstruct AME-7");
  if (!(await page.locator(".keyword-recovery").innerText()).includes("AME-7")) throw new Error("Recovered AME-7 search key was not shown to the player");
  await search(page, "AME-7");
  ameChainState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!ameChainState.unlockedDocs.includes("ame")) throw new Error("Reconstructed AME-7 search did not unlock the report");
  await openDoc(page, "ame", ["ame_report", "extra_member"]);
  await combine(page, ["ame_report", "extra_member"]);
  await combine(page, ["ame_report", "extra_member", "facility"]);

  const count = await page.locator("#evidence-count").textContent();
  if (!count.includes("10 / 10")) throw new Error(`Expected 10/10 evidence, got ${count}`);
  if (await page.locator('[data-section="final"]:not(.locked)').count()) throw new Error("Final investigation unlocked without crossing the point of no return");

  await search(page, "红围巾 白岭");
  await click(page, '[data-section="photos"]');
  await click(page, '[data-clue="photo_1976_boy"]');
  await click(page, '[data-compare-1976]');
  const hypothesisState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  for (const id of ["HX01", "HX02", "S01", "S02"]) if (!hypothesisState.hypotheses.includes(id)) throw new Error(`Missing hypothesis ${id}`);
  for (const id of ["HX01", "HX02"]) if (!hypothesisState.overturned.includes(id)) throw new Error(`Hypothesis ${id} was not overturned`);
  const photoTitles = await page.locator(".photo-card h3").allInnerTexts();
  for (let index = 0; index < photoTitles.length; index += 1) {
    await page.locator(".photo-card .photo-expand").nth(index).evaluate(element => element.click());
    if ((await page.locator(".photo-inspection-expanded h2").innerText()).trim() !== photoTitles[index].trim()) throw new Error(`Photo ${index + 1} did not open its own inspection view`);
    await click(page, '.photo-inspection-expanded [data-close-modal]');
  }
  await page.evaluate(() => document.querySelectorAll(".toast").forEach(node => node.remove()));
  await page.screenshot({ path: path.join(root, "smoke-photos.png"), fullPage: true });
  await click(page, '[data-section="archive"]');
  await click(page, '[data-doc="envelope"]');
  await click(page, '[data-hidden="H02"]');
  await click(page, ".modal-close");
  const hidden = await page.locator("#hidden-count").textContent();
  if (hidden.trim() !== "3") throw new Error(`Expected 3 anomaly files without a disclosed total, got ${hidden}`);
  await click(page, '[data-section="cases"]');
  if (!(await page.locator('[data-case="05"]').innerText()).includes("失联人员：3")) throw new Error("Main flow did not preserve CASE05 stage 2 before the final threshold");
  await click(page, "[data-confirm-final]");
  if (!await page.locator("[data-start-final]").count()) throw new Error("Final threshold did not require a second confirmation");
  let preFinalState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (preFinalState.finalStarted) throw new Error("Opening final confirmation already froze the investigation");
  await click(page, "[data-close-modal]");
  preFinalState = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (preFinalState.finalStarted) throw new Error("Cancelling final confirmation froze the investigation");
  await click(page, "[data-confirm-final]");
  await click(page, "[data-start-final]");
  await click(page, '[data-section="notes"]');
  await click(page, "[data-hint]");
  await click(page, "[data-hint]");
  if (!(await page.locator(".hint-card").innerText()).includes("最终调查仍可能恢复少量关键档案")) throw new Error("Final-stage hint still claims the truth tier can no longer change");
  await click(page, '[data-section="final"]');
  const finalTypes = await page.locator(".final-type").allInnerTexts();
  if (!["历史断点", "实验来源", "人物动机", "身份冲突", "人为掩盖"].every(label => finalTypes.includes(label))) throw new Error(`Final investigation type labels are incomplete: ${finalTypes}`);
  for (const id of ["1976", "han", "witness"]) {
    await click(page, `[data-final-choice="${id}"]`);
    if (await page.locator(".action-result").count()) throw new Error(`Final action ${id} leaked content before consumption`);
    await click(page, `[data-complete-final="${id}"]`);
    if (!await page.locator(".action-result").count()) throw new Error(`Final action ${id} did not reveal after consumption`);
    await click(page, '[data-close-modal]');
  }
  await click(page, "[data-resolve-final]");
  const ending = await page.locator(".ending h2").textContent();
  if (!ending.includes("雪线以下")) throw new Error(`Expected true ending, got ${ending}`);
  if (await page.locator(".ending-tail").count() !== 3) throw new Error("Expected one ending tail for each final action");
  if (await page.locator(".ending-basis .basis-row.confirmed").count() !== 4) throw new Error("True ending did not explain all four confirmed investigation directions");
  if (!(await page.locator("#investigator-label").textContent()).includes("郭文")) throw new Error("True ending did not replace the investigator name");
  if (!(await page.locator("#hidden-count").textContent()).includes("3 / 3")) throw new Error("Post-ending archive completion was not revealed");
  if ((await page.locator("[data-review]").innerText()).trim() !== "查看已收集档案") throw new Error("Ending archive action is still described as returning to the investigation");
  const completedMeta = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-meta")));
  if (!completedMeta.unlockedDispositions.includes("witness")) throw new Error("Final disposition was not preserved in the cross-playthrough archive");
  let resetPrompt = "";
  page.once("dialog", async dialog => { resetPrompt = dialog.message(); await dialog.dismiss(); });
  await click(page, "[data-reset]");
  if (!resetPrompt.includes("当前周目进度将清除") || !resetPrompt.includes("通关记录会保留")) throw new Error(`Restart prompt did not explain preserved meta progress: ${resetPrompt}`);

  const guard = await browser.newPage({ viewport: { width: 900, height: 700 } });
  guard.setDefaultNavigationTimeout(navigationTimeout);
  let sawConfirm = false;
  await guard.goto(url, { waitUntil: "domcontentloaded" });
  await guard.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("snowline-below-save-v1", JSON.stringify({ version: 1, evidence: ["EV01"], ending: "true", finalChoices: ["publish"] }));
  });
  await guard.reload({ waitUntil: "domcontentloaded" });
  const migrated = await guard.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (migrated.version !== 2 || !migrated.evidence.includes("EV01") || migrated.ending || migrated.finalChoices.length) throw new Error("Version 1 save migration failed");
  guard.on("dialog", async dialog => { sawConfirm = true; await dialog.dismiss(); });
  await click(guard, "#new-game");
  if (!sawConfirm) throw new Error("Starting a new investigation did not request confirmation");
  if (!await guard.locator("#title-screen").isVisible()) throw new Error("Dismissing new-game confirmation still erased progress");
  await guard.close();

  const logicContext = await browser.newContext({ viewport: { width: 1100, height: 800 } });
  const logic = await logicContext.newPage();
  logic.setDefaultTimeout(5000);
  logic.setDefaultNavigationTimeout(navigationTimeout);
  await logic.goto(url, { waitUntil: "domcontentloaded" });
  await loadSave(logic, {
    section: "evidence",
    unlockedCases: ["04", "05"],
    case05Stage: 0,
    evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08"],
    clues: ["case_times", "repeated_time", "ame_report", "extra_member", "facility"]
  });
  await click(logic, '[data-select-clue="case_times"]');
  await click(logic, '[data-select-clue="repeated_time"]');
  await click(logic, "[data-combine]");
  let stagedCase = await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (stagedCase.case05Stage !== 1) throw new Error(`CASE05 skipped stage 1 after EV16: ${stagedCase.case05Stage}`);
  await click(logic, '[data-select-clue="ame_report"]');
  await click(logic, '[data-select-clue="extra_member"]');
  await click(logic, '[data-select-clue="facility"]');
  await click(logic, "[data-combine]");
  stagedCase = await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (stagedCase.case05Stage !== 2) throw new Error(`CASE05 did not advance to stage 2 on a later event: ${stagedCase.case05Stage}`);

  for (const checkpoint of [
    { stage: 0, evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08"], text: "系统正在建立档案", warning: "名单中间发生了什么" },
    { stage: 1, evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08", "EV13", "EV15"], text: "失联人员：1", warning: "第一名失联者" },
    { stage: 2, evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08", "EV13", "EV16"], text: "失联人员：3", warning: "下一次名单更新可能包含你" }
  ]) {
    await loadSave(logic, { section: "cases", unlockedCases: ["04", "05"], case05Stage: checkpoint.stage, evidence: checkpoint.evidence });
    if (!(await logic.locator('[data-case="05"]').innerText()).includes(checkpoint.text)) throw new Error(`CASE05 narrative checkpoint missing: ${checkpoint.text}`);
    if (!await logic.locator("[data-confirm-final]").count()) throw new Error("CASE05 did not expose the voluntary final threshold");
    await click(logic, "[data-confirm-final]");
    if (!(await logic.locator(".action-result").innerText()).includes(checkpoint.warning)) throw new Error(`CASE05 stage warning missing: ${checkpoint.warning}`);
    await click(logic, "[data-close-modal]");
  }
  await loadSave(logic, { section: "people", unlockedCases: ["04", "05"], unlockedSystems: ["final"], case05Stage: 3, finalStarted: true, evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08"] });
  if (!(await logic.locator('[data-person="linchuan"] .status').innerText()).includes("待确认")) throw new Error("Final phase did not mark Linchuan as pending");
  await click(logic, '[data-person="linxue"]');
  await click(logic, '[data-clue="link_linxue"]');
  if ((await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")))).clues.includes("link_linxue")) throw new Error("Ordinary clue was added after the final phase started");
  await click(logic, ".modal-close");

  for (const tier of [
    { evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08"], title: "暴雪" },
    { evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV18"], title: "实验记录" },
    { evidence: ["EV01", "EV10", "EV02", "EV04", "EV08", "EV16"], title: "第七人" },
    { evidence: ["EV01", "EV10", "EV02", "EV04", "EV08", "EV15", "EV16", "EV18"], hidden: ["H01"], hypotheses: ["S02"], title: "第七人" }
  ]) {
    await loadSave(logic, { section: "final", unlockedCases: ["04", "05"], unlockedSystems: ["final"], case05Stage: 3, finalStarted: true, evidence: tier.evidence, hidden: tier.hidden || [], hypotheses: tier.hypotheses || [], finalChoices: ["han", "guowen", "seal"], ending: null });
    await click(logic, "[data-resolve-final]");
    if (!(await logic.locator(".ending h2").innerText()).includes(tier.title)) throw new Error(`Truth tier unreachable: ${tier.title}`);
  }

  await loadSave(logic, { section: "final", unlockedCases: ["04", "05"], unlockedSystems: ["final"], case05Stage: 3, finalStarted: true, evidence: ["EV01", "EV10", "EV02", "EV04"], hidden: [], hypotheses: [], finalChoices: ["han", "guowen", "publish"], ending: null });
  await click(logic, "[data-resolve-final]");
  let publishTail = await logic.locator(".ending-tail").filter({ hasText: "传播" }).innerText();
  if (!publishTail.includes("人数异常") || publishTail.includes("第十")) throw new Error(`Publish ending leaked the undiscovered tenth passenger: ${publishTail}`);
  await loadSave(logic, { section: "final", unlockedCases: ["04", "05"], unlockedSystems: ["final"], case05Stage: 3, finalStarted: true, evidence: ["EV01", "EV10", "EV02", "EV04"], hidden: ["H03"], hypotheses: ["S03"], finalChoices: ["han", "guowen", "publish"], ending: null });
  await click(logic, "[data-resolve-final]");
  publishTail = await logic.locator(".ending-tail").filter({ hasText: "传播" }).innerText();
  if (!publishTail.includes("第十名乘客")) throw new Error(`Publish ending did not reflect the discovered tenth passenger record: ${publishTail}`);

  await logic.evaluate(() => localStorage.setItem("snowline-below-save-v2", JSON.stringify({
    version: 2,
    section: "evidence",
    clues: ["ame_report", "extra_member"],
    hidden: ["H01"],
    hypotheses: [],
    overturned: []
  })));
  await logic.reload({ waitUntil: "domcontentloaded" });
  await click(logic, "#continue-game");
  await click(logic, '[data-select-clue="ame_report"]');
  await click(logic, '[data-select-clue="extra_member"]');
  await click(logic, "[data-combine]");
  const blockedHypothesis = await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (blockedHypothesis.hypotheses.includes("HX02")) throw new Error("Contradicted HX02 was created after H01");

  await logic.evaluate(() => localStorage.setItem("snowline-below-save-v2", JSON.stringify({
    version: 2,
    section: "final",
    unlockedSystems: ["photos", "evidence", "timeline", "web", "final"],
    finalStarted: true,
    unlockedDocs: [],
    evidence: ["EV01", "EV10", "EV02", "EV04", "EV07", "EV08", "EV16", "EV18"],
    clues: ["photo_seventh", "guowen_red_scarf"],
    hidden: [],
    finalChoices: []
  })));
  await logic.reload({ waitUntil: "domcontentloaded" });
  await click(logic, "#continue-game");
  await click(logic, '[data-final-choice="1976"]');
  await click(logic, '[data-complete-final="1976"]');
  await click(logic, '[data-close-modal]');
  let rescueState = await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (rescueState.hidden.includes("H01") || !rescueState.unlockedDocs.includes("photo1976")) throw new Error("1976 final action should unlock the photo without granting H01");
  await click(logic, '[data-final-choice="guowen"]');
  await click(logic, '[data-complete-final="guowen"]');
  if ((await logic.locator(".action-result").innerText()).includes("1976")) throw new Error("Guowen action leaked 1976 without H01");
  await click(logic, '[data-close-modal]');
  await click(logic, '[data-section="photos"]');
  await click(logic, '[data-clue="photo_1976_boy"]');
  await click(logic, '[data-compare-1976]');
  rescueState = await logic.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v2")));
  if (!rescueState.hidden.includes("H01")) throw new Error("1976 rescue flow did not grant H01 after manual comparison");
  await click(logic, '[data-section="final"]');
  await click(logic, '[data-review-final="1976"]');
  if (!(await logic.locator(".action-result").innerText()).includes("完成了旧照对比")) throw new Error("Reopened 1976 file did not reflect the later H01 comparison");
  if (!(await logic.locator("#modal-content").innerText()).includes("不会消耗最终行动")) throw new Error("Reopened final file did not explain that it is free to reread");
  await click(logic, "[data-close-modal]");
  await logicContext.close();

  const metaContext = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const metaPage = await metaContext.newPage();
  metaPage.setDefaultNavigationTimeout(navigationTimeout);
  await metaPage.goto(url, { waitUntil: "domcontentloaded" });
  await metaPage.evaluate(() => localStorage.setItem("snowline-below-meta", JSON.stringify({ completedOnce: true, unlockedEndings: ["truth_full"], unlockedDispositions: ["seal"] })));
  await metaPage.reload({ waitUntil: "domcontentloaded" });
  if ((await metaPage.locator("#ending-archive").innerText()).trim() !== "调查记录 1 / 4") throw new Error("Title screen did not expose ending archive progress");
  await click(metaPage, "#ending-archive");
  const archiveText = await metaPage.locator("#modal-content").innerText();
  if (!archiveText.includes("雪线以下") || (archiveText.match(/\?\?\?/g) || []).length !== 3 || !archiveText.includes("☑\n封存")) throw new Error(`Ending archive slots or disposition records are incorrect: ${archiveText}`);
  await click(metaPage, ".modal-close");
  await click(metaPage, "#new-game");
  await click(metaPage, ".modal-close");
  if ((await metaPage.locator("#hidden-label").innerText()).trim() !== "档案完成度") throw new Error("Meta completion did not persist into a new game");
  await metaContext.close();

  const clearContext = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const clearPage = await clearContext.newPage();
  clearPage.setDefaultNavigationTimeout(navigationTimeout);
  await clearPage.goto(url, { waitUntil: "domcontentloaded" });
  await clearPage.evaluate(() => localStorage.setItem("snowline-below-meta", JSON.stringify({ completedOnce: true, unlockedEndings: ["truth_full"] })));
  await clearPage.reload({ waitUntil: "domcontentloaded" });
  let clearPrompt = "";
  clearPage.once("dialog", async dialog => { clearPrompt = dialog.message(); await dialog.accept(); });
  await Promise.all([
    clearPage.waitForNavigation({ waitUntil: "domcontentloaded" }),
    click(clearPage, "#clear-all-records")
  ]);
  if (!clearPrompt.includes("已解锁结局") || !clearPrompt.includes("永久删除")) throw new Error(`Clear-all prompt was ambiguous: ${clearPrompt}`);
  if (await clearPage.evaluate(() => localStorage.getItem("snowline-below-meta"))) throw new Error("Clear all records did not remove meta progress");
  if (!await clearPage.locator("#ending-archive").isHidden()) throw new Error("Ending archive remained visible after clearing all records");
  await clearContext.close();

  await page.screenshot({ path: path.join(root, "smoke-desktop.png"), fullPage: true });
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobile = await mobileContext.newPage();
  mobile.setDefaultTimeout(5000);
  mobile.setDefaultNavigationTimeout(navigationTimeout);
  await mobile.goto(url, { waitUntil: "domcontentloaded" });
  await click(mobile, "#new-game");
  await click(mobile, ".modal-close");
  await click(mobile, "#mobile-menu");
  await click(mobile, '[data-section="people"]');
  await click(mobile, '[data-person="linxue"]');
  await click(mobile, '[data-clue="link_linxue"]');
  await click(mobile, ".modal-close");
  await click(mobile, "#mobile-menu");
  await click(mobile, '[data-section="archive"]');
  await click(mobile, '[data-doc="passengers"]');
  await click(mobile, '[data-clue="passenger_count"]');
  await click(mobile, ".modal-close");
  await click(mobile, "#mobile-menu");
  await click(mobile, '[data-section="photos"]');
  await mobile.locator('[data-photo-id="tracks"] .photo-frame').evaluate(el => el.click());
  if (!await mobile.locator(".mobile-photo-expanded").count()) throw new Error("Mobile photo did not open fullscreen inspection");
  const mobileBackgroundSize = await mobile.locator(".mobile-photo-expanded .photo-frame").evaluate(el => getComputedStyle(el).backgroundSize);
  if (mobileBackgroundSize !== "contain") throw new Error(`Mobile evidence photo inspection should preserve the full image with contain, got ${mobileBackgroundSize}`);
  await click(mobile, '.mobile-photo-expanded [data-clue="footprints"]');
  await click(mobile, '[data-close-modal]');
  await click(mobile, "#mobile-menu");
  await click(mobile, '[data-section="evidence"]');
  await click(mobile, '[data-select-clue="passenger_count"]');
  await click(mobile, '[data-select-clue="footprints"]');
  await click(mobile, "[data-combine]");
  if (!(await mobile.locator("#evidence-count").textContent()).includes("1 / 10")) throw new Error("Mobile evidence flow failed");
  await mobile.evaluate(() => document.querySelectorAll(".toast").forEach(node => node.remove()));
  await mobile.waitForTimeout(250);
  await mobile.screenshot({ path: path.join(root, "smoke-mobile.png"), fullPage: true });
  await mobileContext.close();

  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ ok: true, evidence: count.trim(), hidden: hidden.trim(), ending: ending.trim(), saveGuard: sawConfirm, desktop: "smoke-desktop.png", photos: "smoke-photos.png", mobile: "smoke-mobile.png" }));
  await browser.close();
})().catch(async err => {
  console.error(err.stack || err);
  process.exit(1);
});
