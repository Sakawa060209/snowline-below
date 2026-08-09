(() => {
  "use strict";

  const SAVE_KEY = "snowline-below-save-v1";

  const navItems = [
    { id: "cases", icon: "01", label: "案件" },
    { id: "people", icon: "02", label: "人物" },
    { id: "photos", icon: "03", label: "照片" },
    { id: "archive", icon: "04", label: "资料库" },
    { id: "web", icon: "05", label: "旧网页", unlock: "web" },
    { id: "timeline", icon: "06", label: "时间线", unlock: "timeline" },
    { id: "evidence", icon: "07", label: "证据板" },
    { id: "notes", icon: "08", label: "调查笔记" },
    { id: "final", icon: "09", label: "最终调查", unlock: "final" }
  ];

  const caseData = [
    { id: "04", index: "CASE 04 / ACTIVE", title: "2004 · 17号公路巴士失踪事件", desc: "九名乘客失踪，现场只留下八组脚印。", date: "2004.12.17", status: "调查中" },
    { id: "00", index: "CASE 01 / SEALED", title: "2000 · 北山学生失踪事件", desc: "六名学生进入雪山，只有两人返回。", date: "2000.12.23", status: "已封存" },
    { id: "01", index: "CASE 02 / SEALED", title: "2001 · 民间搜救队失踪事件", desc: "四人上山，营地却有第五人的痕迹。", date: "2001.02.09", status: "已封存" },
    { id: "03", index: "CASE 03 / SEALED", title: "2003 · 纪录片摄制组失踪事件", desc: "六人团队的底片里反复出现第七个人。", date: "2003.01.14", status: "已封存" },
    { id: "05", index: "CASE 05 / LIVE", title: "2005 · 白岭当前失踪事件", desc: "档案由系统自动建立。调查人姓名已被写入。", date: "2005.01.19", status: "待确认" }
  ];

  const people = [
    { id: "linxue", name: "林雪", age: "25岁", job: "教师", role: "2000案幸存者", cases: "2000 / 2004", status: "失踪", known: "治疗期间反复说：‘我们不是六个人。’", clue: "link_linxue" },
    { id: "zhou", name: "周启明", age: "36岁", job: "司机", role: "2001案幸存者", cases: "2001 / 2004", status: "失踪", known: "他坚持2001年的营地只有四个人。", clue: "link_zhou" },
    { id: "luo", name: "罗诚", age: "25岁", job: "个体经营", role: "2000案幸存者", cases: "2000 / 2004", status: "失踪", known: "口供与林雪完全冲突，却同样提到19:47。", clue: "link_luo" },
    { id: "han", name: "韩敬山", age: "51岁", job: "退休警员", role: "前案调查者", cases: "2000 / 2001 / 2004", status: "失踪", known: "曾调查2000与2001两案，案发前访问过证物室。", clue: "link_han" },
    { id: "lu", name: "陆文山", age: "48岁", job: "医生", role: "前案治疗医生", cases: "2000 / 2001 / 2004", status: "失踪", known: "曾治疗林雪，也是2001失踪者苏琴的上司。", clue: "link_lu" },
    { id: "tang", name: "唐国辉", age: "52岁", job: "机械工", role: "失踪者家属", cases: "2003 / 2004", status: "失踪", known: "女儿唐慧为2003纪录片团队制片。2004年开始独自调查女儿失踪。", clue: "link_tang" },
    { id: "gu", name: "顾宁", age: "31岁", job: "图书管理员", role: "失踪者家属", cases: "2003 / 2004", status: "失踪", known: "弟弟顾晨是2003案摄影师。她保存了陈垣留下的一部分底片。", clue: "link_gu" },
    { id: "qiu", name: "邱明", age: "34岁", job: "地方记者", role: "旧案报道者", cases: "2003 / 2004", status: "失踪", known: "最早公开质疑前三起失踪案存在关联。", clue: "link_qiu" },
    { id: "guowen", name: "郭文", age: "不详", job: "不详", role: "身份记录异常", cases: "2000? / 2004", status: "记录冲突", known: "没有家庭、联系方式或毕业记录；乘客名单却为他保留了座位。", clue: "guowen_identity" },
    { id: "linchuan", name: "林川", age: "29岁", job: "地方报记者", role: "当前调查员", cases: "2005", status: "调查中", known: "林雪的弟弟。收到一封没有寄件人的档案袋。" }
  ];

  const clueData = {
    passenger_count: ["乘客人数", "乘客名单记载九人，座位图也标出九个姓名。"],
    passenger_links: ["乘客的共同关系", "至少五名乘客与前三起旧案存在直接联系，这不是一次随机同行。"],
    link_linxue: ["林雪与2000案", "林雪是2000学生失踪案的幸存者。"],
    link_zhou: ["周启明与2001案", "周启明是2001民间搜救案唯一返回者。"],
    link_luo: ["罗诚与2000案", "罗诚是2000学生失踪案的另一名幸存者。"],
    link_han: ["韩敬山与两起旧案", "韩敬山参与过2000与2001两案调查。"],
    link_lu: ["陆文山与旧案", "陆文山治疗过两起旧案的关键当事人。"],
    link_tang: ["唐国辉与2003案", "唐国辉是失踪制片唐慧的父亲。"],
    link_gu: ["顾宁与2003案", "顾宁是失踪摄影师顾晨的姐姐。"],
    link_qiu: ["邱明与2003案", "邱明曾公开报道三案关联。"],
    guowen_identity: ["郭文身份记录异常", "乘客名单有郭文，但常住人口与联系方式均为空白。"],
    seat_gap: ["空白座位", "车辆核载十人；最后一排有一个没有姓名的使用痕迹。"],
    footprints: ["八组脚印", "巴士外只有八组离开车辆的脚印。"],
    snow_depth: ["雪层厚度矛盾", "照片中的积雪只有约6厘米，与标注的23:48不符。"],
    official_photo_time: ["官方照片时间", "现场照片的归档时间被标注为23:48。"],
    leave_count: ["请假人数为七", "2000年12月23日，高三（2）班共有七人请假。"],
    missing17: ["缺失的17号", "学号15、16、18、19连续，17号档案被单独抽走。"],
    health_guowen: ["郭文体检记录", "体检表中确有郭文：1983年生，学生编号17。"],
    five_cups: ["第五只杯子", "2001营地照片中出现五只编号杯。"],
    four_supplies: ["四人份物资", "物资领用表只记录四套装备。"],
    team_six: ["摄制组共六人", "合同、车票和住宿登记均确认团队只有六人。"],
    photo_seventh: ["照片中的第七人", "底片边缘出现不在名单中的红围巾少年。"],
    class_red_scarf: ["2000合照中的红围巾", "班级合照后排有一名未出现在毕业名单中的红围巾少年。"],
    guowen_red_scarf: ["红围巾少年", "2000合照与2003底片中的少年相貌、身高完全一致。"],
    photo_1976_boy: ["1976照片边缘的人影", "五名登记职工之外，照片最左侧还有一名红围巾少年。"],
    weather_record: ["22时气象记录", "22:00积雪6cm；23:00已达到9cm。"],
    forecast_eight: ["提前写下的八", "韩敬山在现场勘验前就写下‘乘客9，脚印8’。"],
    case_times: ["四案时间摘录", "四起案件的原始材料都留下了一个精确时刻。"],
    repeated_time: ["重复的19:47", "2000口供、2001笔记、2003底片与2004电台记录均出现19:47。"],
    ame_report: ["AME-7记录", "实验组报告：六名成员一致记得现场有第七人郭文。"],
    extra_member: ["附加成员现象", "群体一旦接受额外成员，原成员名单会在短期内减少一人。"],
    facility: ["地下设施通道", "旧气象站、17号公路与2001营地通过废弃维护道相连。"],
    time_2000: ["2000案异常时间", "林雪与罗诚的口供都在19:47中断。"],
    time_2001: ["2001案异常时间", "方志远笔记最后一行标注19:47。"],
    time_2003: ["2003案异常时间", "出现第七人的C-12底片曝光于19:47。"],
    time_2004: ["2004案异常时间", "巴士无线电记录在19:47后静默。"]
  };

  const recipes = [
    { id: "EV01", title: "九名乘客并非偶然同行", needs: ["passenger_count", "passenger_links"], text: "2004案是四年来主要知情者的一次集体失踪。" },
    { id: "EV10", title: "乘客数与脚印数不符", needs: ["passenger_count", "footprints"], text: "九名乘客失踪，只有八人留下离车脚印。" },
    { id: "EV02", title: "2000年存在第七名学生", needs: ["leave_count", "missing17", "health_guowen"], text: "请假、学号与体检记录共同证明郭文曾被写进学校系统。" },
    { id: "EV04", title: "2001年存在第五人痕迹", needs: ["five_cups", "four_supplies"], text: "营地有五人的生活痕迹，却只有四人份装备。" },
    { id: "EV07", title: "2003底片出现第七人", needs: ["team_six", "photo_seventh"], text: "摄制组名单只有六人，底片却拍到第七个身影。" },
    { id: "EV08", title: "2000与2003为同一少年", needs: ["photo_seventh", "guowen_red_scarf"], text: "相隔三年，红围巾少年没有明显衰老。" },
    { id: "EV13", title: "现场照片时间被修改", needs: ["snow_depth", "weather_record"], text: "雪层厚度证明巴士照片实际拍摄于22时左右。" },
    { id: "EV15", title: "有人提前知道脚印数量", needs: ["forecast_eight", "footprints"], text: "韩敬山在现场发现前已经写下‘八组脚印’。" },
    { id: "EV16", title: "四起事件均出现19:47", needs: ["case_times", "repeated_time"], text: "19:47不是巧合，而是所有记录发生同步偏差的时刻。" },
    { id: "EV18", title: "AME-7实验与连续失踪地点存在关联", needs: ["ame_report", "extra_member", "facility"], text: "实验地点与数起失踪事件区域重合，附加成员现象可能并非孤立实验结果。" }
  ];

  const hypothesisRecipes = [
    { id: "HX01", title: "相机内部时间错误", needs: ["snow_depth", "official_photo_time"], text: "暂时假设：现场相机时钟比实际时间快约两小时。" },
    { id: "HX02", title: "郭文由AME-7实验产生", needs: ["ame_report", "extra_member"], text: "暂时假设：郭文是附加成员实验造成的认知投射。" },
    { id: "S01", title: "郭文不是正常登记乘客", needs: ["guowen_identity", "seat_gap"], text: "巴士记录里的郭文可能并非通过正常购票与座位登记进入名单。", support: true }
  ];

  const archiveData = [
    { id: "envelope", code: "INBOX / 000", title: "无寄件人档案袋", meta: "已拆封", initial: true },
    { id: "passengers", code: "BL04 / P-01", title: "2004巴士乘客名单与座位图", meta: "9页", initial: true },
    { id: "leave", code: "BL00 / S-12", title: "高三（2）班请假登记", meta: "校方复印件", case: "00" },
    { id: "roster", code: "BL00 / S-17", title: "2000届学生编号索引", meta: "档案残页", case: "00" },
    { id: "physical", code: "BL00 / M-04", title: "白岭中学年度体检表", meta: "扫描残页", case: "00" },
    { id: "camp", code: "BL01 / C-05", title: "2001营地现场勘验", meta: "照片附表", case: "01" },
    { id: "supplies", code: "BL01 / R-02", title: "民间搜救队物资领用表", meta: "财务复印件", case: "01" },
    { id: "crew", code: "BL03 / F-06", title: "纪录片摄制组人员合同", meta: "合同附件", case: "03" },
    { id: "weather", code: "MET / 1217", title: "2004年12月17日逐时雪深", meta: "气象站抄件", unlock: "timeline" },
    { id: "memo", code: "HJS / NOTE", title: "韩敬山私人勘验便笺", meta: "未归档", unlock: "web" },
    { id: "ame", code: "AME-7 / 1991", title: "附加成员效应观察报告", meta: "限制级", unlockDoc: "ame" },
    { id: "facility", code: "BS-M / MAP", title: "北山废弃维护通道图", meta: "1974版", unlockDoc: "facility" }
  ];

  const defaults = () => ({
    version: 1,
    section: "cases",
    unlockedCases: ["04"],
    unlockedSystems: [],
    unlockedDocs: [],
    clues: [],
    evidence: [],
    hypotheses: [],
    overturned: [],
    hidden: [],
    selected: [],
    viewed: [],
    searches: [],
    hintLevel: 0,
    updates: 0,
    finalChoices: [],
    ending: null,
    startedAt: Date.now()
  });

  let state = defaults();
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    const el = $("#save-status");
    if (el) {
      el.textContent = "● 已自动存档";
      clearTimeout(save.timer);
      save.timer = setTimeout(() => { el.textContent = "○ 存档稳定"; }, 1200);
    }
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (raw && raw.version === 1) state = { ...defaults(), ...raw };
    } catch (_) { state = defaults(); }
  }

  function hasSystem(id) { return state.unlockedSystems.includes(id); }
  function hasCase(id) { return state.unlockedCases.includes(id); }
  function hasDoc(id) { return state.unlockedDocs.includes(id); }
  function hasClue(id) { return state.clues.includes(id); }
  function hasEvidence(id) { return state.evidence.includes(id); }

  function addUnique(list, value) {
    if (!list.includes(value)) { list.push(value); return true; }
    return false;
  }

  function toast(title, text, kind = "") {
    const node = document.createElement("div");
    node.className = `toast ${kind}`;
    node.innerHTML = `<b>${title}</b><span>${text}</span>`;
    $("#toast-region").append(node);
    setTimeout(() => node.remove(), 4500);
  }

  function discoverClue(id, silent = false) {
    if (!clueData[id] || !addUnique(state.clues, id)) return false;
    state.updates += 1;
    if (!silent) toast("发现线索", clueData[id][0]);
    const relationFacts = ["link_linxue", "link_zhou", "link_luo", "link_han", "link_lu", "link_tang", "link_gu", "link_qiu"];
    const relationCount = relationFacts.filter(hasClue).length;
    if (!hasClue("passenger_links") && relationCount >= 5) {
      state.clues.push("passenger_links");
      toast("初步关系成立", "至少五名乘客与旧案有关：这不是一次随机同行。", "evidence");
    }
    if (relationCount === relationFacts.length && addUnique(state.viewed, "relations_complete")) {
      toast("人物关系补全", "所有身份可查乘客均与旧案有关。完整调查已记录。", "evidence");
    }
    save();
    updateChrome();
    return true;
  }

  function discoverHidden(id, title) {
    if (!addUnique(state.hidden, id)) return;
    toast("隐藏档案", title, "evidence");
    if (id === "H01") updateHypotheses();
    save();
    updateChrome();
  }

  function updateHypotheses() {
    const overturned = [];
    if (state.hypotheses.includes("HX01") && (hasEvidence("EV13") || hasEvidence("EV15"))) overturned.push("HX01");
    if (state.hypotheses.includes("HX02") && state.hidden.includes("H01")) overturned.push("HX02");
    overturned.forEach(id => {
      if (addUnique(state.overturned, id)) {
        const item = hypothesisRecipes.find(h => h.id === id);
        toast("暂定推论已推翻", item.title, "evidence");
      }
    });
  }

  function unlockCase(id, message) {
    if (!addUnique(state.unlockedCases, id)) return;
    state.updates += 1;
    toast("档案解锁", message, "evidence");
  }

  function unlockSystem(id, message) {
    if (!addUnique(state.unlockedSystems, id)) return;
    state.updates += 1;
    toast("系统更新", message, "evidence");
  }

  function checkUnlocks() {
    if (hasEvidence("EV01") && hasEvidence("EV10")) unlockCase("00", "CASE 01 · 2000学生失踪事件");
    if (hasEvidence("EV02")) unlockCase("01", "CASE 02 · 2001民间搜救事件");
    if (hasEvidence("EV04")) unlockCase("03", "CASE 03 · 2003纪录片事件");
    if (hasEvidence("EV07") && hasEvidence("EV08")) {
      unlockSystem("web", "旧网页索引已恢复");
      unlockSystem("timeline", "跨案件时间线已建立");
    }
    if (state.evidence.length >= 6) unlockCase("05", "CASE 05 · 2005当前事件（系统自动建立）");
    if (state.evidence.length >= 8 && hasEvidence("EV16") && hasEvidence("EV18")) unlockSystem("final", "暴雪即将封路：请选择最终调查方向");
    save();
  }

  function chapter() {
    if (hasSystem("final")) return ["最终章 · 雪线以下", 100];
    if (hasEvidence("EV16")) return ["第六章 · 19:47", 84];
    if (hasSystem("web")) return ["第五章 · 红围巾少年", 68];
    if (hasCase("03")) return ["第四章 · 照片里的第七人", 52];
    if (hasCase("01")) return ["第三章 · 第五只杯子", 38];
    if (hasCase("00")) return ["第二章 · 缺失的17号", 23];
    return ["第一章 · 八组脚印", 10];
  }

  function updateChrome() {
    const [label, progress] = chapter();
    $("#chapter-label").textContent = label;
    $("#progress-bar").style.width = `${progress}%`;
    $("#evidence-count").textContent = `${state.evidence.length} / 10`;
    $("#hidden-count").textContent = `${state.hidden.length} / 3`;
    $("#investigator-label").textContent = state.ending && state.ending.startsWith("true") ? "当前调查员：郭文" : "当前调查员：林川";
    const weather = hasSystem("final")
      ? ["−22°C", "预计19:47全面封闭"]
      : hasSystem("web")
        ? ["−20°C", "17号公路部分封闭"]
        : ["−18°C", "暴雪预警 / 山区道路管制"];
    $("#weather-temp").textContent = weather[0];
    $("#weather-status").textContent = weather[1];
    document.documentElement.classList.toggle("detail-hints", state.hintLevel >= 2);
    renderNav();
  }

  function renderNav() {
    const nav = $("#nav");
    nav.innerHTML = navItems.map(item => {
      const locked = item.unlock && !hasSystem(item.unlock);
      const badge = item.id === "evidence" && state.evidence.length ? `<span class="nav-badge">${state.evidence.length}</span>` : "";
      return `<button class="nav-btn ${state.section === item.id ? "active" : ""} ${locked ? "locked" : ""}" data-section="${item.id}" ${locked ? "aria-disabled=\"true\"" : ""}><span class="nav-icon">${locked ? "×" : item.icon}</span>${item.label}${badge}</button>`;
    }).join("");
  }

  const sectionTitles = {
    cases: ["CASE INDEX", "案件"], people: ["PERSONNEL INDEX", "人物"], photos: ["PHOTOGRAPHIC EVIDENCE", "照片"],
    archive: ["DOCUMENT ARCHIVE", "资料库"], web: ["RECOVERED WEB INDEX", "旧网页"], timeline: ["CROSS-CASE TIMELINE", "时间线"],
    evidence: ["INFERENCE WORKBENCH", "证据板"], notes: ["INVESTIGATION LOG", "调查笔记"], final: ["FINAL INVESTIGATION", "最终调查"]
  };

  function switchSection(id) {
    const item = navItems.find(n => n.id === id);
    if (!item || (item.unlock && !hasSystem(item.unlock))) {
      toast("权限不足", "继续调查现有档案以恢复该模块。" );
      return;
    }
    state.section = id;
    state.updates = 0;
    save();
    render();
    $("#sidebar").classList.remove("open");
  }

  function render() {
    updateChrome();
    const [kicker, title] = sectionTitles[state.section] || sectionTitles.cases;
    $("#section-kicker").textContent = kicker;
    $("#section-title").textContent = title;
    const views = { cases: renderCases, people: renderPeople, photos: renderPhotos, archive: renderArchive, web: renderWeb, timeline: renderTimeline, evidence: renderEvidence, notes: renderNotes, final: renderFinal };
    $("#content").innerHTML = (views[state.section] || renderCases)();
    $("#content").focus({ preventScroll: true });
  }

  function currentCase05() {
    if (hasSystem("final")) return { title: "2005 · 白岭当前失踪事件", desc: "林川——状态：待确认。", status: "名单已更新" };
    if (hasEvidence("EV16")) return { title: "2005 · 白岭异常事件", desc: "失联人员：3。当前调查者已被列为关联人员。", status: "正在发生" };
    if (state.evidence.length >= 8) return { title: "2005 · 白岭异常事件", desc: "失联人员：1。其资料曾被当前调查者查看。", status: "自动更新" };
    return { title: "2005 · 白岭异常事件", desc: "系统正在建立档案……", status: "索引建立中" };
  }

  function renderCases() {
    return `<p class="section-lead">白岭警方从未承认这些案件之间存在联系。档案会随着推理逐步解封。点击案件查看摘要与相关资料。</p>
      <div class="card-grid">${caseData.map(base => {
        const c = base.id === "05" ? { ...base, ...currentCase05() } : base;
        const unlocked = hasCase(c.id);
        return `<article class="file-card ${unlocked ? "" : "locked"}" data-case="${c.id}">
          <span class="file-index">${unlocked ? c.index : "FILE ENCRYPTED"}</span>
          <h3>${unlocked ? c.title : "封存档案"}</h3>
          <p>${unlocked ? c.desc : "需要建立前一案件的关键结论。"}</p>
          <div class="file-meta"><span>${unlocked ? c.date : "----.--.--"}</span><span class="${c.id === "05" ? "new-tag" : ""}">${unlocked ? c.status : "LOCKED"}</span></div>
          ${c.id === "05" && unlocked ? `<i class="corrupt"></i>` : ""}
        </article>`;
      }).join("")}</div>`;
  }

  function caseModal(id) {
    const c = caseData.find(x => x.id === id);
    if (!c || !hasCase(id)) return;
    const files = archiveData.filter(d => d.case === id || (id === "04" && ["passengers", "envelope"].includes(d.id)));
    let details = {
      "04": "2004年12月17日，一辆载有九人的小型巴士驶入白岭。次日车辆被发现停在17号公路，车门打开，行李仍在，乘客全部失踪。现场只发现八组离开车辆的脚印。",
      "00": "六名毕业班学生前往已停用的北山气象站。第二天林雪与罗诚返回，其余四人失踪。两人的口供互相冲突，唯一相同的是19:47。",
      "01": "四名与2000案有关的私人调查者进入北山。三天后只有周启明返回。官方清单写着四人，营地生活痕迹却属于五个人。",
      "03": "独立纪录片团队调查前两案。六名成员中五人失踪，导演陈垣三个月后死亡。他留下的底片里有一个团队名单之外的人。",
      "05": currentCase05().desc + (hasSystem("final") ? " 这份档案不是你创建的。" : " 每建立一条跨案结论，名单就离当前调查更近。")
    }[id];
    openModal(`<div class="modal-inner"><p class="eyebrow">${c.index}</p><h2>${c.title}</h2><p>${details}</p>
      <h3>关联档案</h3><div class="archive-list">${files.map(d => archiveRow(d, false)).join("") || `<div class="archive-row"><span class="archive-code">NO FILE</span><span class="archive-title">系统仍在建立索引</span></div>`}</div></div>`);
  }

  function renderPeople() {
    return `<p class="section-lead">乘客名单只记录年龄与职业。逐一打开人物资料，检查他们是否真的互不相干。</p><div class="people-grid">${people.map(p => `<article class="person-card" data-person="${p.id}">
      <div class="person-avatar"></div><h3>${p.name}</h3><small>${p.age} / ${p.job}</small><span class="status ${p.status === "失踪" ? "missing" : ""}">${p.status}</span>
    </article>`).join("")}</div>`;
  }

  function personModal(id) {
    const p = people.find(x => x.id === id);
    if (!p) return;
    openModal(`<div class="modal-inner profile-layout"><div class="profile-photo"></div><div><p class="eyebrow">PERSONNEL RECORD / ${id.toUpperCase()}</p><h2>${p.name}</h2>
      <div class="profile-facts"><div><small>年龄</small>${p.age}</div><div><small>职业登记</small>${p.job}</div><div><small>当前状态</small>${p.status}</div><div><small>档案可信度</small>${p.id === "guowen" ? "无法判定" : "待核实"}</div></div>
      <p>档案摘录：${p.clue ? `<button class="evidence-hit ${hasClue(p.clue) ? "found" : ""}" data-clue="${p.clue}">${p.known}</button>` : p.known}</p></div></div>`);
  }

  function photoMarkup(type) {
    return "";
  }

  function renderPhotos() {
    const photos = [
      { id: "bus", title: "17号公路现场照片 01", meta: "BL04-PH-01 / 23:48?", metaClue: "official_photo_time", type: "hero", hot: [["footprints","70%","79%"],["snow_depth","45%","66%"]], visible: true },
      { id: "class", title: "2000届高三（2）班合照", meta: "扫描件 / 日期不明", type: "class-photo", hot: [["class_red_scarf","72%","32%"]], visible: hasCase("00") },
      { id: "camp", title: "2001民间搜救营地", meta: "BL01-PH-05", type: "camp-photo", hot: [["five_cups","47%","39%"]], visible: hasCase("01") },
      { id: "film", title: "纪录片底片 C-12", meta: "BL03-NG-C12", type: "film-photo", hot: [["photo_seventh","88%","40%"]], visible: hasCase("03") },
      { id: "1976", title: "1976气象站冬季合影", meta: "匿名论坛缓存", type: "station-photo", hot: [["photo_1976_boy","5%","42%"]], visible: hasDoc("photo1976") }
    ].filter(p => p.visible);
    const canCompare = hasClue("photo_seventh") && hasClue("class_red_scarf");
    const canCompare1976 = hasClue("photo_1976_boy") && hasClue("guowen_red_scarf");
    return `<p class="section-lead">照片没有可见的调查圈。点击你认为异常的物件或人物；详细提示开启后，系统才会标出大致区域。</p><div class="photo-grid ${state.hintLevel >= 2 ? "detailed-hints" : ""}">${photos.map(p => `<article class="photo-card">
      <div class="photo-frame ${p.type}">${photoMarkup(p.type)}${(p.hot || []).map(h => `<button class="hotspot" style="left:${h[1]};top:${h[2]}" data-clue="${h[0]}" aria-label="检查照片细节"></button>`).join("")}</div>
      <div class="photo-info"><h3>${p.title}</h3>${p.metaClue ? inspectButton(p.metaClue, p.meta) : `<span>${p.meta}</span>`}</div></article>`).join("")}</div>
      ${canCompare ? `<section class="compare-panel"><h3>两张照片出现了相似细节</h3><p>2000合照和2003底片中都出现了红围巾少年。只有主动对照，才能判断是否为同一人。</p><button class="btn ghost" data-compare-photos>${hasClue("guowen_red_scarf") ? "✓ 对比结论已记录" : "对比2000合照与2003底片"}</button></section>` : ""}
      ${canCompare1976 ? `<section class="compare-panel"><h3>旧照片中的少年仍然没有变化</h3><p>把1976年合影中的红围巾少年与2000、2003年的影像逐项对照。</p><button class="btn ghost" data-compare-1976>${state.hidden.includes("H01") ? "✓ 身份冲突已记录" : "对比1976年合影与郭文影像"}</button></section>` : ""}`;
  }

  function archiveAvailable(doc) {
    if (doc.initial) return true;
    if (doc.case) return hasCase(doc.case);
    if (doc.unlock) return hasSystem(doc.unlock);
    if (doc.unlockDoc) return hasDoc(doc.unlockDoc);
    return false;
  }

  function archiveRow(doc, lock = true) {
    const available = archiveAvailable(doc);
    return `<article class="archive-row ${available ? "" : "locked"}" ${available ? `data-doc="${doc.id}"` : ""}><span class="archive-code">${available ? doc.code : "RESTRICTED"}</span><span class="archive-title">${available ? doc.title : "访问权限不足"}</span><span class="archive-meta">${available ? doc.meta : "LOCKED"}</span></article>`;
  }

  function renderArchive() {
    return `<p class="section-lead">所有资料均为静态档案。部分文档中的异常需要手动记录，记录后的条目会出现在证据板。</p><div class="archive-list">${archiveData.map(d => archiveRow(d)).join("")}</div>`;
  }

  function inspectButton(clue, label) {
    return `<button class="evidence-hit ${hasClue(clue) ? "found" : ""}" data-clue="${clue}">${label}</button>`;
  }

  function openDocument(id) {
    const d = archiveData.find(x => x.id === id);
    if (!d || !archiveAvailable(d)) return;
    addUnique(state.viewed, id);
    const seatRecheck = hasClue("seat_gap") && (hasEvidence("EV08") || hasClue("guowen_red_scarf"))
      ? `<p class="document-note">再次触摸5B椅背时，松动的蒙皮下露出一角旧纸签。</p><button class="inspect-btn" data-hidden="H03">揭开5B座椅背后的姓名残痕</button>`
      : "";
    const h02Available = hasEvidence("EV08") || hasEvidence("EV16");
    const envelopeSeal = h02Available
      ? `<button class="inspect-btn" data-hidden="H02">检查二次粘合的封口</button>`
      : `<p>封口处似乎曾被二次粘合，但纸层仍粘得很紧。</p>`;
    const bodies = {
      envelope: `<p>2005年1月19日，林川收到一个没有寄件人的档案袋。</p><ul><li>2004年巴士现场照片一张</li><li>巴士乘客名单一份</li><li>2000届旧学生合照一张</li><li>手写纸条一张</li></ul><p class="document-note">不要数他们。</p><p>四份材料背面似乎都有相同的蓝色铅笔批注，但数字被水渍覆盖，只能辨认：<b>__ : 47</b>。</p>${envelopeSeal}`,
      passengers: `<table><tr><th>座位</th><th>姓名</th><th>年龄</th><th>职业</th></tr><tr><td>1A</td><td>周启明</td><td>36</td><td>司机</td></tr><tr><td>1B</td><td>林雪</td><td>25</td><td>教师</td></tr><tr><td>2A</td><td>罗诚</td><td>25</td><td>个体经营</td></tr><tr><td>2B</td><td>韩敬山</td><td>51</td><td>退休</td></tr><tr><td>3A</td><td>陆文山</td><td>48</td><td>医生</td></tr><tr><td>3B</td><td>唐国辉</td><td>52</td><td>机械工</td></tr><tr><td>4A</td><td>顾宁</td><td>31</td><td>图书管理员</td></tr><tr><td>4B</td><td>邱明</td><td>34</td><td>记者</td></tr><tr><td>5A</td><td>郭文</td><td>不详</td><td>不详</td></tr><tr><td>${inspectButton("seat_gap","5B")}</td><td>—</td><td>—</td><td>椅面磨损</td></tr></table><p>本次登记乘客：${inspectButton("passenger_count","9名")}</p>${seatRecheck}`,
      leave: `<p>白岭中学高三（2）班 · 2000年12月23日请假登记</p><table><tr><th>项目</th><th>人数</th></tr><tr><td>集体外出请假</td><td>${inspectButton("leave_count","7")}</td></tr><tr><td>已返校</td><td>2</td></tr><tr><td>警方记录失踪</td><td>4</td></tr></table><p>班主任签字处被重新覆盖。附页中，林雪与罗诚的两份口供都在${inspectButton("time_2000","19:47")}处中断。</p>`,
      roster: `<p>学生编号索引（残页）</p><table><tr><th>学号</th><th>姓名</th></tr><tr><td>15</td><td>林雪</td></tr><tr><td>16</td><td>罗诚</td></tr><tr><td>${inspectButton("missing17","17")}</td><td class="redaction">郭文</td></tr><tr><td>18</td><td>方敏</td></tr><tr><td>19</td><td>陈浩</td></tr></table><p>第17号原始卡片已从档案夹中抽走。</p>`,
      physical: `<p>2000年度学生体格检查表 · 复印残页</p><table><tr><th>编号</th><th>姓名</th><th>出生年</th><th>身高</th></tr><tr><td>17</td><td>${inspectButton("health_guowen","郭文")}</td><td>1983</td><td>171cm</td></tr></table><p>备注：左颈部有旧冻伤；检查时佩戴红色围巾。</p>`,
      camp: `<p>2001年2月12日，临时营地勘验记录。</p><table><tr><th>物件</th><th>数量</th></tr><tr><td>睡袋</td><td>4</td></tr><tr><td>搪瓷杯</td><td>${inspectButton("five_cups","5（A—E）")}</td></tr><tr><td>使用过的餐具</td><td>5</td></tr></table><p>方志远随身笔记的最后一行只有时间：${inspectButton("time_2001","19:47")}。</p>`,
      supplies: `<p>北山民间搜救队 · 物资领用</p><table><tr><th>姓名</th><th>背包</th><th>睡袋</th></tr><tr><td>周启明</td><td>1</td><td>1</td></tr><tr><td>苏琴</td><td>1</td><td>1</td></tr><tr><td>高远</td><td>1</td><td>1</td></tr><tr><td>方志远</td><td>1</td><td>1</td></tr></table><p>物资合计：${inspectButton("four_supplies","4套装备")}。没有额外领用签字。</p>`,
      crew: `<p>《白岭以后》纪录片摄制合同</p><table><tr><th>姓名</th><th>职责</th></tr><tr><td>陈垣</td><td>导演</td></tr><tr><td>唐慧</td><td>制片</td></tr><tr><td>顾晨</td><td>摄影</td></tr><tr><td>李泽</td><td>录音</td></tr><tr><td>孟兰</td><td>研究</td></tr><tr><td>赵航</td><td>司机</td></tr></table><p>合同签约成员：${inspectButton("team_six","6名")}。底片登记表注明，C-12曝光时间为${inspectButton("time_2003","19:47")}。</p>`,
      weather: `<p>北山气象观测站 · 逐时雪深</p><table><tr><th>时间</th><th>雪深</th></tr><tr><td>21:00</td><td>4cm</td></tr><tr><td>${inspectButton("weather_record","22:00")}</td><td>6cm</td></tr><tr><td>23:00</td><td>9cm</td></tr><tr><td>00:00</td><td>13cm</td></tr></table>`,
      memo: `<p>韩敬山私人便笺，纸张日期早于现场发现约九小时。</p><p class="document-note">17号路。乘客9。${inspectButton("forecast_eight","脚印8")}。不要让他们再次点名。</p><p>随便笺附存的无线电抄件显示，巴士在${inspectButton("time_2004","19:47")}后停止回应。</p>`,
      ame: `<p>附加成员效应观察 · AME-7 · 1991/12/19</p><p>${inspectButton("ame_report","六名受试者在19:47后均报告：实验室自始至终有第七名成员，姓名为“郭文”。")}监控画面无法确认该成员进入过程。</p><p>${inspectButton("extra_member","次日复测时，原六人中的一人从花名册与共同记忆中消失。")} </p>`,
      facility: `<p>北山废弃维护通道图 · 1974</p><p>${inspectButton("facility","三条封闭支路分别通向北山气象站、17号公路旧涵洞与白岭北坡临时营地。")}</p>`
    };
    openModal(`<article class="document"><header class="document-head"><small>${d.code}</small><h2>${d.title}</h2></header><div class="document-body">${bodies[id] || "<p>文档损坏。</p>"}</div></article>`);
    save();
  }

  function renderWeb() {
    const history = state.searches.slice().reverse();
    return `<div class="search-panel"><p class="section-lead">恢复自2000—2005年的网页缓存。只有资料中出现过的关键词会返回有效结果。</p>
      <form class="search-box" id="search-form"><input id="search-input" autocomplete="off" placeholder="输入两个或更多关键词…" aria-label="搜索旧网页"><button>检索</button></form>
      <div class="search-results">${history.length ? history.map(searchResult).join("") : `<div class="search-result"><span class="search-url">LOCAL INDEX / WAITING</span><h3>最近搜索：暂无</h3><p>可从档案中出现过的人名、地点、日期或项目编号开始。</p></div>`}</div></div>`;
  }

  function normalizeQuery(q) { return q.toLowerCase().replace(/[\s·\-—_:：]/g, ""); }

  function runSearch(query) {
    const q = normalizeQuery(query);
    let type = "none";
    const hasPlace = q.includes("白岭") || q.includes("北山");
    if (q.includes("1947") && hasPlace) { type = "time"; discoverClue("repeated_time"); }
    else if (q.includes("1947")) type = "refine_time";
    else if ((q.includes("红围巾") && hasPlace) || (q.includes("郭文") && q.includes("白岭"))) {
      type = "1976";
      addUnique(state.unlockedDocs, "photo1976");
      toast("照片缓存恢复", "1976年气象站冬季合影已加入照片库");
    }
    else if (q.includes("红围巾") || q.includes("郭文")) type = "refine_red";
    else if (q.includes("ame7")) { type = "ame"; addUnique(state.unlockedDocs, "ame"); toast("缓存恢复", "AME-7观察报告已加入资料库"); }
    else if (q.includes("附加成员")) type = "refine_ame";
    else if (q.includes("北山") && (q.includes("地下") || q.includes("维护通道"))) { type = "facility"; addUnique(state.unlockedDocs, "facility"); toast("地图恢复", "北山废弃维护通道图已加入资料库"); }
    else if (q.includes("地下") || q.includes("维护通道")) type = "refine_facility";
    const entry = { query, type, time: Date.now() };
    state.searches.push(entry);
    save();
    render();
  }

  function searchResult(r) {
    const result = {
      time: ["白岭旧案时间批注汇总", "四份互不相干的记录都在19:47出现涂改、停顿或集体记忆偏差。线索已加入证据板。"],
      "1976": ["[缓存] 北山气象站冬季合影", "一张受损的旧合影已经恢复到照片库。索引页没有人物姓名，需在照片中自行检查。"],
      ame: ["AME-7：附加成员效应观察", "来自已关闭研究所的目录页。完整报告已恢复到资料库。"],
      facility: ["北山气象站维护工程图", "旧气象站、17号公路和2001营地并非三个独立地点。地图已恢复到资料库。"],
      refine_time: ["结果过多：19:47", "时间无法单独定位档案。请加入案件地点，例如“白岭”或“北山”。"],
      refine_red: ["图像索引未定位", "人物特征过于宽泛。请把“红围巾”或姓名与案件地点组合检索。"],
      refine_ame: ["项目索引残损", "“附加成员”只出现在损坏目录中。请查找完整项目编号。"],
      refine_facility: ["工程档案未定位", "维护设施数量过多。请加入山地区域名称缩小范围。"],
      none: ["没有匹配结果", "检索词过于宽泛，或不在恢复的离线索引中。尝试组合档案里出现过的专有名词。"]
    }[r.type];
    return `<article class="search-result ${r.type !== "none" ? "found" : ""}"><span class="search-url">cache.bailing.local / query=${encodeURIComponent(r.query)}</span><h3>${result[0]}</h3><p>${result[1]}</p></article>`;
  }

  function renderTimeline() {
    const cases = [
      ["2000", "学生案口供", "time_2000", "两份口供在同一时刻中断。"],
      ["2001", "民间搜救记录", "time_2001", "方志远笔记的最后一行。"],
      ["2003", "底片 C-12", "time_2003", "合同附件记录的曝光时刻。"],
      ["2004", "巴士无线电抄件", "time_2004", "车辆停止回应的时刻。"]
    ];
    const confirmed = cases.filter(e => hasClue(e[2])).length;
    const prompt = confirmed < 3 ? `已确认 ${confirmed} / 4 个案件节点。继续检查各案原始档案。`
      : confirmed === 3 ? "已有三个节点相同，仍需确认最后一案。" : "四个独立案件的记录可以进行交叉比对。";
    return `<p class="section-lead">时间线只显示你已经从原始档案中记录的时刻；未检查的节点不会提前给出答案。</p><div class="timeline">${cases.map(e => {
      const known = hasClue(e[2]);
      return `<div class="timeline-event ${known ? "alert" : ""}"><span class="timeline-time">${e[0]} · ${known ? "19:47" : "未确认"}</span><div class="timeline-copy"><b>${e[1]}</b><span>${known ? e[3] : "等待原始记录"}</span></div></div>`;
    }).join("")}</div><p class="section-lead">${prompt}</p>
      ${confirmed === 4 ? `<button class="btn ghost" data-compare-times>${hasClue("case_times") ? "✓ 跨案件时间已记录" : "比对四案记录"}</button>` : ""}`;
  }

  function renderEvidence() {
    const boardClues = state.clues.filter(id => !id.startsWith("link_") && !["class_red_scarf", "photo_1976_boy"].includes(id));
    state.selected = state.selected.filter(id => boardClues.includes(id));
    const selected = state.selected;
    const evidenceCards = recipes.filter(r => hasEvidence(r.id));
    const hypotheses = hypothesisRecipes.filter(h => state.hypotheses.includes(h.id));
    return `<p class="section-lead">选择2—3条已发现线索，尝试建立结论。无效组合不会损失进度。</p><div class="evidence-layout">
      <section class="clue-bank"><h3>可用于推理的线索 · ${boardClues.length}</h3><div class="clue-chips">${boardClues.length ? boardClues.map(id => `<button class="clue-chip ${selected.includes(id) ? "selected" : ""}" data-select-clue="${id}"><b>${clueData[id][0]}</b><br>${clueData[id][1]}</button>`).join("") : `<span class="section-lead">检查照片、人物与文档以记录线索。</span>`}</div></section>
      <section class="conclusion-panel"><h3>推理槽</h3><div class="combine-tray ${selected.length ? "" : "empty"}">${selected.map(id => `<button class="clue-chip selected" data-select-clue="${id}">${clueData[id][0]}</button>`).join("")}</div><button class="combine-btn" data-combine ${selected.length < 2 ? "disabled" : ""}>建立结论</button></section>
    </div><div class="evidence-cards">${evidenceCards.map(r => `<article class="evidence-card"><span class="ev-code">${r.id}</span><h4>${r.title}</h4><p>${r.text}</p></article>`).join("")}</div>
      ${hypotheses.length ? `<h3>调查假设</h3><div class="evidence-cards">${hypotheses.map(h => {
        const overturned = state.overturned.includes(h.id);
        const status = h.support ? "辅助推论" : overturned ? "已推翻" : "暂定";
        return `<article class="hypothesis-card ${overturned ? "overturned" : ""}"><span class="ev-code">${h.id} / ${status}</span><h4>${h.title}</h4><p>${h.text}</p></article>`;
      }).join("")}</div>` : ""}`;
  }

  function combineEvidence() {
    const selected = [...state.selected].sort();
    const match = recipes.find(r => !hasEvidence(r.id) && r.needs.length === selected.length && [...r.needs].sort().every((x,i) => x === selected[i]));
    const hypothesis = hypothesisRecipes.find(r => !state.hypotheses.includes(r.id) && r.needs.length === selected.length && [...r.needs].sort().every((x,i) => x === selected[i]));
    if (!match && !hypothesis) {
      toast("无法建立结论", "这些线索之间缺少直接联系。尝试对照人数、时间或同一人物。" );
      return;
    }
    if (hypothesis) {
      state.hypotheses.push(hypothesis.id);
      state.selected = [];
      toast(hypothesis.support ? "辅助推论" : "暂定推论", hypothesis.title, "evidence");
      updateHypotheses();
      save();
      render();
      return;
    }
    state.evidence.push(match.id);
    state.selected = [];
    toast(`${match.id} · 关键证据`, match.title, "evidence");
    updateHypotheses();
    checkUnlocks();
    render();
  }

  function objectives() {
    return [
      [hasEvidence("EV01"), "查明九名乘客为何同时前往白岭"],
      [hasEvidence("EV10"), "解释九名乘客与八组脚印的矛盾"],
      [hasEvidence("EV02"), "确认2000年缺失的第七名学生"],
      [hasEvidence("EV04"), "确认2001营地的第五人痕迹"],
      [hasEvidence("EV07") && hasEvidence("EV08"), "识别2003照片里的红围巾少年"],
      [hasEvidence("EV13") && hasEvidence("EV15"), "证明2004现场记录被提前修改"],
      [hasEvidence("EV16"), "解释四案共同出现的19:47"],
      [hasEvidence("EV18"), "找到AME-7的附加成员记录"]
    ];
  }

  function currentHints() {
    if (!hasEvidence("EV01") || !hasEvidence("EV10")) return ["从2004案开始。名单只写年龄与职业，真正的共同点藏在人物档案里。", "逐一检查八名身份可查乘客的档案摘录；再在现场照片里寻找离车痕迹。", "关系全部查明后会自动形成‘九人的共同关系’。分别把它、‘八组脚印’与‘乘客人数’组合。"];
    if (!hasEvidence("EV02")) return ["2000年的官方口径是六人，但学校系统并不完全同意。", "对照请假人数、连续学号与体检记录。", "资料库的三份2000学校档案分别提供三条所需线索。"];
    if (!hasEvidence("EV04")) return ["生活痕迹和装备数量说的是两种人数。", "检查2001营地勘验与物资领用表。", "组合‘第五只杯子’与‘四人份物资’。"];
    if (!hasEvidence("EV07") || !hasEvidence("EV08")) return ["先确认摄影团队本应有多少人，再观察底片边缘。", "在2000班级照后排和2003底片右侧树林里寻找相同颜色。", "分别记录两张照片中的人影，然后使用照片页出现的‘对比’操作。"];
    if (!hasEvidence("EV13") || !hasEvidence("EV15")) return ["照片标注的时间，和雪的厚度能同时成立吗？", "在时间线解锁后查气象记录；旧网页恢复后也会多一份私人便笺。", "雪层厚度＋气象记录；私人便笺的‘8’＋脚印。"];
    if (!hasEvidence("EV16")) return ["有一个时间出现在每起案件里，但开场材料只剩下分钟数。", "分别检查2000口供、2001营地笔记、2003底片附件和2004无线电抄件，再到时间线主动比对。", "四案确认后记录‘跨案件时间’，并检索‘白岭 19:47’，再组合两条线索。"];
    if (!hasEvidence("EV18")) return ["‘附加成员’像实验术语，而三处案发地点也可能不是彼此独立。", "分别检索档案中的项目编号与北山地下设施。", "打开恢复的 AME-7 报告和维护通道图，三条线索共同组成结论。"];
    return ["最终调查已经开放。仍可寻找1976照片、林雪的信和5B空白座位。", "组合地点与红围巾检索旧照；建立关键结论后再检查档案袋夹层，识别郭文后重新查看5B。", "完整真相要求至少8条核心证据，并包含同一少年、19:47、实验地点关联与1976身份冲突；三次最终行动会分别追加后果。"];
  }

  function renderNotes() {
    const hints = currentHints();
    const level = Math.min(state.hintLevel, 2);
    return `<div class="notes-layout"><section><p class="section-lead">调查目标会自动更新，但不会直接给出答案。</p><div class="todo-list">${objectives().map(o => `<div class="todo ${o[0] ? "done" : ""}">${o[1]}</div>`).join("")}</div></section>
      <aside class="hint-card"><p class="eyebrow">分层提示 ${level + 1} / 3</p><p>${hints[level]}</p><button data-hint>${level < 2 ? "再给一点提示" : "重置提示层级"}</button></aside></div>`;
  }

  function finalActionData() {
    return {
      facility: { title: "调查地下设施", desc: "追查维护道与AME-7实验", file: "BS-M / LAST LOG", text: "旧记录并排列出：1976 5→6；1988 6→7；1991 12→13；2000 6→7；2001 4→5；2003 6→7；2004 9→10。箭头不是失踪前后人数，而是实际人数与共同记忆人数。" },
      linxue: { title: "寻找林雪资料", desc: "还原她在2000年后留下的记录", file: "LX / UNSENT", text: "林雪未寄出的信写着：‘不是有人被雪带走。是每次有人被算进去以后，都必须有人被排除出去。记住郭文，本身可能就是危险的。’" },
      guowen: { title: "调查郭文身份", desc: "追查跨年代的红围巾少年", file: "GW / CONFLICT", text: "三份人物页给出的年龄依次是：1976年17岁、2000年17岁、2003年空白。没有出生证明，只有每次事件之后补录的表格。" },
      publish: { title: "公开全部档案", desc: "把材料交给报社与公众", file: "PRESS / READY", text: "资料可以被镜像到数十家论坛。传播会迫使地方重新调查，也会让成千上万人第一次共同读到‘郭文’这个名字。" },
      witness: { title: "保护现有证人", desc: "停止传播郭文的信息", file: "CASE 05 / CONTACT", text: "你切断了三名证人的公开联系方式，并删除在线索引中的姓名。CASE 05 的名单停止增加，但系统仍在后台尝试恢复它们。" },
      han: { title: "调查韩敬山", desc: "追查人为篡改与地方掩盖", file: "HJS / LAST NOTE", text: "韩敬山最后的手写记录：‘我没有数错。第一次是九个。第二次数的时候，是十个。我不知道多出来的是谁，但我知道少掉的是谁。’" },
      "1976": { title: "检查1976事件", desc: "确认实验出现前的异常记录", file: "MET / 1976", text: "气象站职工登记只有五人。合影里却有六个人。最左侧的红围巾少年与二十四年后的郭文没有任何区别——异常早于AME-7实验十五年。" }
    };
  }

  function renderFinal() {
    if (state.ending) return renderEnding(state.ending);
    const options = finalActionData();
    const chosen = state.finalChoices;
    return `<div class="intro-card"><p class="eyebrow">FINAL WINDOW / 19:32—19:47</p><h2>暴雪再次来临</h2><blockquote>预计19:47山区道路全面封闭。你只能完成三项最终调查。</blockquote>
      <p>每次选择都会真正打开一份最终资料并消耗一次行动。证据完整度决定你能理解哪一层真相；行动决定真相造成的后果。已完成 ${chosen.length} / 3。</p>
      <div class="card-grid">${Object.entries(options).map(([id,o]) => {
        const conflict = (id === "publish" && chosen.includes("witness")) || (id === "witness" && chosen.includes("publish"));
        const locked = chosen.includes(id) || chosen.length >= 3 || conflict;
        return `<article class="file-card ${chosen.includes(id) ? "selected-final final-complete" : ""} ${conflict ? "locked" : ""}" ${locked ? "" : `data-final-choice="${id}"`}><span class="file-index">${chosen.includes(id) ? "ACTION COMPLETE" : conflict ? "MUTUALLY EXCLUSIVE" : "INVESTIGATE"}</span><h3>${o.title}</h3><p>${o.desc}</p></article>`;
      }).join("")}</div>
      <button class="btn primary" style="margin-top:24px" data-resolve-final ${chosen.length !== 3 ? "disabled" : ""}>在19:47提交调查结论</button></div>`;
  }

  function openFinalAction(id) {
    const action = finalActionData()[id];
    if (!action || state.finalChoices.includes(id) || state.finalChoices.length >= 3) return;
    const conflict = (id === "publish" && state.finalChoices.includes("witness")) || (id === "witness" && state.finalChoices.includes("publish"));
    if (conflict) return toast("行动互斥", "公开全部档案与保护现有证人不能同时执行。");
    openModal(`<div class="modal-inner"><p class="eyebrow">FINAL ACTION / CONFIRM</p><h2>${action.title}</h2><p>${action.desc}</p><p>确认后会立即消耗一次最终行动，随后才会打开对应资料；行动不能更换。</p><button class="btn primary" data-complete-final="${id}">使用行动并打开资料</button></div>`);
  }

  function completeFinalAction(id) {
    const action = finalActionData()[id];
    if (!action || state.finalChoices.includes(id) || state.finalChoices.length >= 3) return;
    const conflict = (id === "publish" && state.finalChoices.includes("witness")) || (id === "witness" && state.finalChoices.includes("publish"));
    if (conflict) return;
    state.finalChoices.push(id);
    if (id === "1976") discoverHidden("H01", "1976年红围巾合影");
    if (id === "linxue") discoverHidden("H02", "林雪未寄出的信");
    save();
    render();
    openModal(`<div class="modal-inner"><p class="eyebrow">ACTION USED / ${action.file}</p><h2>${action.title}</h2><div class="action-result">${action.text}</div><p>行动已使用 · 剩余 ${3 - state.finalChoices.length} 次</p><button class="btn ghost" data-close-modal>关闭资料</button></div>`);
  }

  function resolveFinal() {
    if (state.finalChoices.length !== 3) return;
    const full = state.evidence.length >= 8 && ["EV08", "EV16", "EV18"].every(hasEvidence) && state.hidden.includes("H01");
    const member = hasEvidence("EV08") && hasEvidence("EV16");
    const experiment = hasEvidence("EV18") || state.evidence.length >= 6;
    state.ending = full ? "truth_full" : member ? "truth_member" : experiment ? "truth_experiment" : "truth_insufficient";
    save();
    render();
  }

  function renderEnding(id) {
    const layers = {
      truth_full: ["TRUE ENDING / COMPLETE", "雪线以下", "1976、2000、2001、2003、2004的记录指向同一种异常：实际人数短暂增加，随后一名真实成员从名单与共同记忆中消失。AME-7与事件地点有关，却不能证明实验创造了郭文；1976年的影像说明异常早已存在。"],
      truth_member: ["ENDING / THE EXTRA MEMBER", "第七人", "你确认郭文跨越多个年代，并锁定19:47的同步偏差。你知道每次‘多出一人’之后都有人被排除，但仍无法解释异常从何而来。"],
      truth_experiment: ["ENDING / THE FACILITY", "实验记录", "地下设施、地方掩盖与附加成员实验可以解释部分档案，却不能证明郭文是实验产物。更早的记录仍是一块空白。"],
      truth_insufficient: ["ENDING / INSUFFICIENT", "暴雪", "证据不足以区分极端天气、档案造假与真正的共同模式。调查在19:47被迫提交。"]
    };
    const tails = {
      facility: "你带走维护道最后一页日志：箭头记录的是实际人数与共同记忆人数的差，而不是简单的失踪统计。",
      linxue: state.hidden.includes("H02") ? "林雪的残信补全了动机：她回到白岭是为了阻止下一次点名，并警告你不要第二次数到郭文。" : "你找到了林雪留下的删除痕迹，但没有及时取得夹层中的完整残信。",
      guowen: state.hidden.includes("H03") ? "5B椅背后的姓名残痕与跨年身份页相互印证：郭文从未通过正常座位登记进入这趟车。" : "郭文的年龄记录彼此冲突，但他的进入方式仍然没有答案。",
      publish: "你公开了全部档案。调查被迫重启，但数月后，其他城市开始出现‘合照里多了一人’的帖子。真相传播，也可能让异常获得新的共同记忆。",
      witness: "你切断三名证人的公开联系方式。CASE 05暂时停止增长，现有证人保住了姓名；系统后台仍在尝试恢复索引。",
      han: "韩敬山的最后一页证明他没有数错：每次重新点名，多出的那一人仍在，少掉的却总是真实成员。",
      "1976": "气象站登记只有五人，合影却有六人。最左侧的红围巾少年让异常的起点早于AME-7至少十五年。"
    };
    const e = layers[id] || layers.truth_insufficient;
    const actionTails = state.finalChoices.map(choice => `<p class="ending-tail">${tails[choice]}</p>`).join("");
    return `<section class="ending"><div class="ending-copy"><p class="eyebrow">${e[0]}</p><h2>《${e[1]}》</h2><p>${e[2]}</p>${actionTails}<div class="ending-actions"><button class="btn ghost" data-review>返回调查</button><button class="btn primary" data-reset>重新开始</button></div></div></section>`;
  }

  function openModal(html) {
    $("#modal-content").innerHTML = html;
    $("#modal").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    $("#modal").hidden = true;
    document.body.style.overflow = "";
  }

  function openPhotoViewer(frame) {
    const card = frame.closest(".photo-card");
    const title = card?.querySelector("h3")?.textContent || "照片细节";
    openModal(`<div class="modal-inner mobile-photo-expanded"><p class="eyebrow">PHOTO INSPECTION</p><h2>${title}</h2><div class="photo-frame ${[...frame.classList].filter(c => c !== "photo-frame").join(" ")}">${frame.innerHTML}</div><p>放大视图不会自动标注异常；仍需点击你认为可疑的位置。</p><button class="btn ghost" data-close-modal>关闭照片</button></div>`);
  }

  function startGame(fresh = false) {
    if (fresh) {
      state = defaults();
      localStorage.removeItem(SAVE_KEY);
    }
    $("#title-screen").hidden = true;
    $("#game").hidden = false;
    render();
    if (fresh) {
      openModal(`<div class="modal-inner"><p class="eyebrow">PROLOGUE / 2005.01.19</p><h2>无寄件人的档案袋</h2><p>林川，29岁，地方报记者。四年前，姐姐林雪从北山学生失踪事件中生还。一个月前，她又登上驶往白岭的巴士，随后与另外八人一起消失。</p><p>今天，你收到她留下的资料。纸条上只有一句话：</p><div class="intro-card"><blockquote>不要数他们。</blockquote></div><div class="instruction-grid"><div><b>01 / 调查</b><span>点击档案、人物和照片中的细节。</span></div><div><b>02 / 记录</b><span>发现的线索会加入证据板。</span></div><div><b>03 / 推理</b><span>组合2—3条线索建立结论。</span></div></div><button class="btn primary" data-close-modal>打开调查工作台</button></div>`);
    }
    save();
  }

  function resetGame() {
    if (!confirm("确定清除本浏览器中的全部调查进度吗？")) return;
    state = defaults();
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, [data-case], [data-person], [data-doc], [data-final-choice]");
    if (!target) {
      const frame = e.target.closest(".photo-frame");
      if (frame && matchMedia("(max-width: 820px)").matches && !frame.closest(".mobile-photo-expanded")) openPhotoViewer(frame);
      else if (frame) toast("照片检查", "这里没有发现值得记录的东西。");
      return;
    }
    if (target.matches("[data-close-modal]")) return closeModal();
    if (target.dataset.section) return switchSection(target.dataset.section);
    if (target.dataset.case) return caseModal(target.dataset.case);
    if (target.dataset.person) return personModal(target.dataset.person);
    if (target.dataset.doc) return openDocument(target.dataset.doc);
    if (target.dataset.clue) {
      const clueId = target.dataset.clue;
      discoverClue(clueId);
      target.classList.add("found");
      target.textContent = `✓ ${clueData[clueId][0]}`;
      if (state.section === "photos" && ["class_red_scarf", "photo_seventh", "photo_1976_boy"].includes(clueId)) render();
      return;
    }
    if (target.dataset.hidden) {
      const hiddenFiles = {
        H02: ["林雪未寄出的信（残页）", "夹层里只有一句：别让他们记住他。"],
        H03: ["5B座椅背后的姓名残痕", "旧纸签只剩最后一个字：文。"]
      };
      const item = hiddenFiles[target.dataset.hidden];
      if (item) {
        discoverHidden(target.dataset.hidden, item[0]);
        target.textContent = item[1];
      }
      return;
    }
    if (target.dataset.selectClue) {
      const id = target.dataset.selectClue;
      if (state.selected.includes(id)) state.selected = state.selected.filter(x => x !== id);
      else if (state.selected.length < 3) state.selected.push(id);
      else toast("推理槽已满", "一次最多选择三条线索。" );
      save(); render(); return;
    }
    if (target.hasAttribute("data-combine")) return combineEvidence();
    if (target.hasAttribute("data-compare-photos")) {
      if (!hasClue("guowen_red_scarf")) {
        discoverClue("guowen_red_scarf");
        toast("照片对比完成", "相隔三年，红围巾少年的五官与身高没有明显变化。", "evidence");
        render();
      }
      return;
    }
    if (target.hasAttribute("data-compare-1976")) {
      if (!state.hidden.includes("H01")) {
        discoverHidden("H01", "1976年红围巾少年身份冲突");
        toast("跨年代对比完成", "少年的外貌跨越二十七年没有变化。", "evidence");
        render();
      }
      return;
    }
    if (target.hasAttribute("data-compare-times")) {
      if (["time_2000", "time_2001", "time_2003", "time_2004"].every(hasClue)) {
        discoverClue("case_times");
        toast("时间线比对完成", "四起事件都在19:47出现记录中断。", "evidence");
        render();
      }
      return;
    }
    if (target.dataset.keyword) {
      $("#search-input").value = target.dataset.keyword;
      return runSearch(target.dataset.keyword);
    }
    if (target.hasAttribute("data-hint")) {
      state.hintLevel = state.hintLevel >= 2 ? 0 : state.hintLevel + 1;
      save(); render(); return;
    }
    if (target.dataset.finalChoice) {
      return openFinalAction(target.dataset.finalChoice);
    }
    if (target.dataset.completeFinal) return completeFinalAction(target.dataset.completeFinal);
    if (target.hasAttribute("data-resolve-final")) return resolveFinal();
    if (target.hasAttribute("data-review")) { state.ending = null; save(); render(); return; }
    if (target.hasAttribute("data-reset")) return resetGame();
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "search-form") {
      e.preventDefault();
      const q = $("#search-input").value.trim();
      if (q) runSearch(q);
    }
  });

  $("#new-game").addEventListener("click", () => {
    if (localStorage.getItem(SAVE_KEY) && !confirm("开始新调查将清除当前进度。是否继续？")) return;
    startGame(true);
  });
  $("#continue-game").addEventListener("click", () => startGame(false));
  $("#mobile-menu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#modal").addEventListener("click", e => { if (e.target.matches("[data-close-modal]")) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

  load();
  if (localStorage.getItem(SAVE_KEY)) $("#continue-game").hidden = false;
})();
