const { chromium } = require("playwright");
const path = require("path");

const root = __dirname;
const url = `file:///${path.join(root, "index.html").replace(/\\/g, "/")}`;

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

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });

  await page.goto(url);
  await click(page, "#new-game");
  await click(page, ".modal-close");

  await openDoc(page, "passengers", ["passenger_count", "seat_gap"]);
  for (const [id, clue] of [
    ["linxue", "link_linxue"], ["zhou", "link_zhou"], ["luo", "link_luo"], ["han", "link_han"],
    ["lu", "link_lu"], ["tang", "link_tang"], ["gu", "link_gu"], ["qiu", "link_qiu"]
  ]) await inspectPerson(page, id, clue);
  await click(page, '[data-section="photos"]');
  await click(page, '[data-clue="footprints"]');
  await click(page, '[data-clue="snow_depth"]');
  await combine(page, ["passenger_count", "passenger_links"]);
  await combine(page, ["passenger_count", "footprints"]);

  await openDoc(page, "leave", ["leave_count"]);
  await openDoc(page, "roster", ["missing17"]);
  await openDoc(page, "physical", ["health_guowen"]);
  await combine(page, ["leave_count", "missing17", "health_guowen"]);

  await openDoc(page, "camp", ["five_cups"]);
  await openDoc(page, "supplies", ["four_supplies"]);
  await combine(page, ["five_cups", "four_supplies"]);

  await openDoc(page, "crew", ["team_six"]);
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

  await openDoc(page, "weather", ["weather_record"]);
  await combine(page, ["snow_depth", "weather_record"]);
  await openDoc(page, "memo", ["forecast_eight"]);
  await combine(page, ["forecast_eight", "footprints"]);

  await click(page, '[data-section="timeline"]');
  await click(page, '[data-clue="case_times"]');
  await search(page, "白岭 19:47");
  const afterTimeSearch = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v1")));
  if (!afterTimeSearch.clues.includes("repeated_time")) throw new Error(`Time search failed: ${JSON.stringify(afterTimeSearch.searches)}`);
  await combine(page, ["case_times", "repeated_time"]);

  await search(page, "AME-7");
  await search(page, "北山 地下设施");
  await openDoc(page, "ame", ["ame_report", "extra_member"]);
  await openDoc(page, "facility", ["facility"]);
  await combine(page, ["ame_report", "extra_member", "facility"]);

  const count = await page.locator("#evidence-count").textContent();
  if (!count.includes("10 / 10")) throw new Error(`Expected 10/10 evidence, got ${count}`);
  if (!await page.locator('[data-section="final"]:not(.locked)').count()) throw new Error("Final investigation did not unlock");

  await search(page, "红围巾 白岭");
  await click(page, '[data-section="photos"]');
  await page.evaluate(() => document.querySelectorAll(".toast").forEach(node => node.remove()));
  await page.screenshot({ path: path.join(root, "smoke-photos.png"), fullPage: true });
  await click(page, '[data-section="archive"]');
  await click(page, '[data-doc="envelope"]');
  await click(page, '[data-hidden="H02"]');
  await click(page, ".modal-close");
  const hidden = await page.locator("#hidden-count").textContent();
  if (!hidden.includes("3 / 3")) throw new Error(`Expected 3/3 hidden files, got ${hidden}`);
  await click(page, '[data-section="final"]');
  for (const id of ["1976", "han", "facility"]) {
    await click(page, `[data-final-choice="${id}"]`);
    await click(page, `[data-complete-final="${id}"]`);
  }
  await click(page, "[data-resolve-final]");
  const ending = await page.locator(".ending h2").textContent();
  if (!ending.includes("雪线以下")) throw new Error(`Expected true ending, got ${ending}`);

  const guard = await browser.newPage({ viewport: { width: 900, height: 700 } });
  let sawConfirm = false;
  await guard.goto(url);
  await guard.evaluate(key => localStorage.setItem(key, JSON.stringify({ version: 1, evidence: ["EV01"] })), "snowline-below-save-v1");
  await guard.reload();
  guard.on("dialog", async dialog => { sawConfirm = true; await dialog.dismiss(); });
  await click(guard, "#new-game");
  if (!sawConfirm) throw new Error("Starting a new investigation did not request confirmation");
  if (!await guard.locator("#title-screen").isVisible()) throw new Error("Dismissing new-game confirmation still erased progress");
  await guard.close();

  await page.screenshot({ path: path.join(root, "smoke-desktop.png"), fullPage: true });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(url);
  await mobile.screenshot({ path: path.join(root, "smoke-mobile.png"), fullPage: true });

  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ ok: true, evidence: count.trim(), hidden: hidden.trim(), ending: ending.trim(), saveGuard: sawConfirm, desktop: "smoke-desktop.png", photos: "smoke-photos.png", mobile: "smoke-mobile.png" }));
  await browser.close();
})().catch(async err => {
  console.error(err.stack || err);
  process.exit(1);
});
