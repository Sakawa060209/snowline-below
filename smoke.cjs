const { chromium } = require("playwright");
const path = require("path");

const root = __dirname;
const url = `file:///${path.join(root, "index.html").replace(/\\/g, "/")}`;

async function click(page, selector) {
  await page.locator(selector).first().click();
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

  await openDoc(page, "passengers", ["passenger_count", "passenger_links", "seat_gap"]);
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
  await click(page, '[data-clue="photo_seventh"]');
  await click(page, '[data-clue="guowen_red_scarf"]');
  await combine(page, ["team_six", "photo_seventh"]);
  await combine(page, ["photo_seventh", "guowen_red_scarf"]);

  await openDoc(page, "weather", ["weather_record"]);
  await combine(page, ["snow_depth", "weather_record"]);
  await openDoc(page, "memo", ["forecast_eight"]);
  await combine(page, ["forecast_eight", "footprints"]);

  await click(page, '[data-section="timeline"]');
  await click(page, '[data-clue="case_times"]');
  await click(page, '[data-section="web"]');
  await click(page, '[data-keyword="白岭 19:47"]');
  const afterTimeSearch = await page.evaluate(() => JSON.parse(localStorage.getItem("snowline-below-save-v1")));
  if (!afterTimeSearch.clues.includes("repeated_time")) throw new Error(`Time search failed: ${JSON.stringify(afterTimeSearch.searches)}`);
  await combine(page, ["case_times", "repeated_time"]);

  await click(page, '[data-section="web"]');
  await click(page, '[data-keyword="AME-7"]');
  await openDoc(page, "ame", ["ame_report", "extra_member"]);
  await combine(page, ["ame_report", "extra_member"]);

  const count = await page.locator("#evidence-count").textContent();
  if (!count.includes("10 / 10")) throw new Error(`Expected 10/10 evidence, got ${count}`);
  if (!await page.locator('[data-section="final"]:not(.locked)').count()) throw new Error("Final investigation did not unlock");

  await page.screenshot({ path: path.join(root, "smoke-desktop.png"), fullPage: true });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(url);
  await mobile.screenshot({ path: path.join(root, "smoke-mobile.png"), fullPage: true });

  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ ok: true, evidence: count.trim(), desktop: "smoke-desktop.png", mobile: "smoke-mobile.png" }));
  await browser.close();
})().catch(async err => {
  console.error(err.stack || err);
  process.exitCode = 1;
});
