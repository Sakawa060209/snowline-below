(() => {
  "use strict";

  const SAVE_KEY = "snowline-below-save-v2";
  const LEGACY_SAVE_KEY = "snowline-below-save-v1";
  const META_KEY = "snowline-below-meta";

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
    { id: "01", index: "CASE 02 / SEALED", title: "2001 · 民间搜救队失踪事件", desc: "四名私人调查者进入北山，三天后只有周启明返回。", date: "2001.02.09", status: "已封存" },
    { id: "03", index: "CASE 03 / SEALED", title: "2003 · 纪录片摄制组失踪事件", desc: "六人团队调查前两案，最终五人失踪，导演陈垣随后死亡。", date: "2003.01.14", status: "已封存" },
    { id: "05", index: "CASE 05 / LIVE", title: "2005 · 白岭当前失踪事件", desc: "档案由系统自动建立。调查人姓名已被写入。", date: "2005.01.19", status: "待确认" }
  ];

  const people = [
    { id: "linxue", name: "林雪", age: "25岁", job: "教师", role: "2000案幸存者", cases: "2000 / 2004", status: "失踪", known: "治疗期间反复说：‘我们不是六个人。’", clue: "link_linxue" },
    { id: "zhou", name: "周启明", age: "36岁", job: "司机", role: "2001案幸存者", cases: "2001 / 2004", status: "失踪", known: "他坚持2001年的营地只有四个人。", clue: "link_zhou" },
    { id: "luo", name: "罗诚", age: "25岁", job: "个体经营", role: "2000案幸存者", cases: "2000 / 2004", status: "失踪", known: "他的口供与林雪几乎完全矛盾，但两份口供中存在一处未经解释的重合。", clue: "link_luo" },
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
    seat_gap: ["5B使用痕迹", "车辆核载十人；5B没有登记姓名，却留下长期使用与藏票痕迹。"],
    footprints: ["八组脚印", "巴士外只有八组离开车辆的脚印。"],
    snow_depth: ["雪层厚度矛盾", "照片中的积雪只有约6厘米，与标注的23:48不符。"],
    official_photo_time: ["官方照片时间", "现场照片的归档时间被标注为23:48。"],
    original_photo_time: ["原始底片登记时间", "韩敬山留存的底片登记副本写着22:08，入库系统却显示23:48。"],
    leave_count: ["请假人数为七", "2000年12月23日，高三（2）班共有七人请假。"],
    missing17: ["缺失的17号", "学号15、16、18、19连续，17号档案被单独抽走。"],
    health_guowen: ["郭文体检记录", "体检表中确有郭文：1983年生，学生编号17。"],
    five_cups: ["第五只杯子", "2001营地照片中出现五只编号杯。"],
    four_supplies: ["四人份物资", "物资领用表只记录四套装备。"],
    team_six: ["摄制组共六人", "合同、车票和住宿登记均确认团队只有六人。"],
    photo_seventh: ["照片中的第七人", "底片边缘出现不在名单中的红围巾少年。"],
    class_red_scarf: ["2000合照中的红围巾", "班级合照后排有一名未出现在毕业名单中的红围巾少年。"],
    guowen_red_scarf: ["两案红围巾少年", "2000合照与2003底片中的少年在五官比例、身高和围巾特征上高度相似。"],
    camp_five_depressions: ["五处睡眠压痕", "营地雪面留下五处相邻的睡眠压痕，但现场只有四个睡袋。"],
    meal_seven: ["七份套餐发票", "摄制组旅馆登记六人，附近饭店发票却连续三晚结算七份套餐。"],
    photo_1976_boy: ["1976照片边缘的人影", "五名登记职工之外，照片最左侧还有一名红围巾少年。"],
    weather_record: ["22时气象记录", "22:00积雪6cm；23:00已达到9cm。"],
    forecast_eight: ["提前写下的八", "韩敬山在现场勘验前就写下‘乘客9，脚印8’。"],
    case_times: ["四案时间摘录", "四起案件的原始材料都留下了一个精确时刻。"],
    repeated_time: ["1988年的19:47异常", "1988年白岭电网事故也在19:47出现持续七分钟的异常负载，早于四起失踪案。"],
    ame_report: ["AME-7记录", "实验组报告：六名成员一致记得现场有第七人郭文。"],
    extra_member: ["实验组人数减少", "附加成员报告之后，实验组登记人数与受试者记忆同时发生减少。"],
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
    { id: "EV08", title: "两案红围巾少年高度相似", needs: ["photo_seventh", "guowen_red_scarf"], text: "五官比例、身高与围巾特征高度吻合，疑似同一人。" },
    { id: "EV13", title: "照片标注时间不可信", needs: ["snow_depth", "weather_record"], text: "根据雪深，照片更接近22时拍摄，而不是系统标注的23:48。" },
    { id: "EV15", title: "有人提前知道脚印数量", needs: ["forecast_eight", "footprints"], text: "韩敬山在现场发现前已经写下‘八组脚印’。" },
    { id: "EV16", title: "19:47异常早于四起失踪案", needs: ["case_times", "repeated_time"], text: "四案时间节点与1988电网事故相互独立，19:47并非案件整理时产生的重复标注。" },
    { id: "EV18", title: "AME-7实验与连续失踪地点存在关联", needs: ["ame_report", "extra_member", "facility"], text: "实验地点与数起失踪事件区域重合，附加成员现象可能并非孤立实验结果。" }
  ];

  const hypothesisRecipes = [
    { id: "HX01", title: "相机内部时间错误", needs: ["snow_depth", "official_photo_time"], text: "暂时假设：现场相机时钟比实际时间快约两小时。", blockedBy: "S02" },
    { id: "HX02", title: "郭文由AME-7实验产生", needs: ["ame_report", "extra_member"], text: "暂时假设：郭文是附加成员实验造成的认知投射。", blockedBy: "H01" },
    { id: "S01", title: "5B曾有未登记乘客", needs: ["passenger_count", "seat_gap"], text: "巴士名单只登记九人，但5B的使用痕迹说明还存在一名未被记录的乘客。", support: true },
    { id: "S02", title: "现场照片时间遭人为修改", needs: ["official_photo_time", "original_photo_time"], text: "原始底片登记为22:08，入库时间却被改成23:48；相机本身并没有走快。", support: true }
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
    version: 2,
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
    case05Stage: 0,
    finalStarted: false,
    finalChoices: [],
    ending: null,
    completedOnce: false,
    startedAt: Date.now()
  });

  let state = defaults();
  let meta = { completedOnce: false, unlockedEndings: [] };
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

  function loadMeta() {
    try {
      const raw = JSON.parse(localStorage.getItem(META_KEY));
      if (raw) meta = { completedOnce: Boolean(raw.completedOnce), unlockedEndings: Array.isArray(raw.unlockedEndings) ? raw.unlockedEndings : [] };
    } catch (_) { meta = { completedOnce: false, unlockedEndings: [] }; }
  }

  function saveMeta() { localStorage.setItem(META_KEY, JSON.stringify(meta)); }

  function renderMetaControls() {
    const archive = $("#ending-archive");
    const clear = $("#clear-all-records");
    if (!archive || !clear) return;
    archive.hidden = !meta.completedOnce;
    clear.hidden = !meta.completedOnce;
    archive.textContent = `调查记录 ${meta.unlockedEndings.length} / 4`;
  }

  function openEndingArchive() {
    const endings = [
      ["truth_insufficient", "暴雪"], ["truth_experiment", "实验记录"], ["truth_member", "第七人"], ["truth_full", "雪线以下"]
    ];
    openModal(`<div class="modal-inner"><p class="eyebrow">CROSS-INVESTIGATION META ARCHIVE</p><h2>调查记录 · ${meta.unlockedEndings.length} / 4</h2><p>这些记录跨周目保留。未知槽位只有在对应调查结论完成后才会恢复名称。</p><div class="archive-list">${endings.map(([id,name], index) => {
      const unlocked = meta.unlockedEndings.includes(id);
      return `<div class="archive-row ${unlocked ? "" : "locked"}"><span class="archive-code">ENDING ${String(index + 1).padStart(2,"0")}</span><span class="archive-title">${unlocked ? name : "???"}</span><span class="archive-meta">${unlocked ? "RECOVERED" : "LOCKED"}</span></div>`;
    }).join("")}</div></div>`);
  }

  function clearAllRecords() {
    if (!confirm("确定清除全部记录吗？当前周目、已解锁结局和通关记录都会永久删除。")) return;
    clearSaves();
    localStorage.removeItem(META_KEY);
    location.reload();
  }

  function load() {
    try {
      const current = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (current && current.version === 2) {
        state = { ...defaults(), ...current };
        if (typeof current.finalStarted !== "boolean") {
          state.finalStarted = Boolean(current.ending);
          if (!current.ending) state.unlockedSystems = state.unlockedSystems.filter(id => id !== "final");
        }
        if (typeof current.case05Stage !== "number") state.case05Stage = state.finalStarted ? 3 : hasEvidence("EV16") ? 2 : state.evidence.length >= 8 ? 1 : 0;
        if (typeof current.completedOnce !== "boolean") state.completedOnce = Boolean(current.ending);
        if (state.completedOnce && !meta.completedOnce) { meta.completedOnce = true; saveMeta(); }
        return;
      }
      const legacy = JSON.parse(localStorage.getItem(LEGACY_SAVE_KEY));
      if (legacy && legacy.version === 1) {
        state = { ...defaults(), ...legacy, version: 2, hypotheses: [], overturned: [], finalStarted: false, finalChoices: [], ending: null, completedOnce: false };
        state.case05Stage = hasEvidence("EV16") ? 2 : state.evidence.length >= 8 ? 1 : 0;
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        localStorage.removeItem(LEGACY_SAVE_KEY);
      }
    } catch (_) { state = defaults(); }
  }

  function clearSaves() {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(LEGACY_SAVE_KEY);
  }

  function hasStoredSave() { return Boolean(localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY)); }

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
    if (state.finalStarted && !(id === "photo_1976_boy" && state.finalChoices.includes("1976"))) {
      toast("最终阶段已开始", "普通调查资料已经冻结，只能处理最终行动明确恢复的内容。");
      return false;
    }
    if (!clueData[id] || !addUnique(state.clues, id)) return false;
    state.updates += 1;
    if (!silent) toast(`发现线索 · ${clueData[id][0]}`, clueData[id][1]);
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
    if (state.hypotheses.includes("HX01") && state.hypotheses.includes("S02")) overturned.push("HX01");
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
    if (hasEvidence("EV02")) unlockCase("01", "CASE 02 · 2001民间搜…9767 tokens truncated…。它证明研究者长期追踪人数异常，但无法说明数字如何变化。",
      member: "结合各案的人数矛盾，你判断箭头可能是‘登记人数→被共同记住的人数’；记录仍没有说明郭文从何而来。",
      full: "结合1976影像与各案人数异常，最一致的解释是：箭头可能表示实际人数与被共同记住的人数。记录仍无法证明郭文是人、实验代号，还是发生在档案与记忆之间的异常。"
    }[level];
    const linxueText = level === "full" || level === "member"
      ? "林雪未寄出的信写着：‘不是有人被雪带走。是每次有人被算进去以后，都必须有人被排除出去。记住郭文，本身可能就是危险的。’"
      : "信纸严重缺损，只剩下：‘……不是雪……不要再点名……记住他也许……’你无法确定她是在描述事实，还是创伤后的恐惧。";
    const guowenText = state.hidden.includes("H01")
      ? "2000年体检档案将郭文登记为17岁；1976照片中的少年外貌年龄同样约17岁，但气象站登记册中没有他的姓名或年龄。"
      : hasEvidence("EV08")
        ? "已验证的最早记录来自2000年。2003年底片中的少年与他相貌一致，但没有更早的身份材料可供确认。"
        : "郭文最早只出现在2000年的补录表格中。出生证明、家庭关系与购票记录均为空白，现有材料无法确认跨年代身份。";
    return {
      facility: { kind: "investigation", title: "调查地下设施", desc: "追查维护道与AME-7实验", file: "BS-M / LAST LOG", text: facilityText },
      linxue: { kind: "investigation", title: "寻找林雪资料", desc: "还原她在2000年后留下的记录", file: "LX / UNSENT", text: linxueText },
      guowen: { kind: "investigation", title: "调查郭文身份", desc: "追查身份记录冲突", file: "GW / CONFLICT", text: guowenText },
      han: { kind: "investigation", title: "调查韩敬山", desc: "追查人为篡改与地方掩盖", file: "HJS / LAST NOTE", text: "韩敬山最后的手写记录：‘我没有数错。第一次是九个。第二次数的时候，是十个。我不知道多出来的是谁，但我知道少掉的是谁。’" },
      "1976": { kind: "investigation", title: "检查1976事件", desc: "恢复实验出现前的气象站记录", file: "MET / 1976", text: state.hidden.includes("H01") ? "你完成了旧照对比：登记职工只有五人，最左侧的红围巾少年与二十四年后的郭文高度相似。" : "气象站冬季合影已经恢复到照片库。索引没有标注第六人的身份；必须回到照片页自行检查并与现有影像比对。" },
      publish: { kind: "disposition", title: "公开全部档案", desc: "把材料交给报社与公众", file: "PRESS / READY", text: "资料可以被镜像到数十家论坛。传播会迫使地方重新调查，也会让成千上万人第一次共同读到‘郭文’这个名字。" },
      witness: { kind: "disposition", title: "保护现有证人", desc: "停止传播郭文的信息", file: "CASE 05 / CONTACT", text: "你切断了三名证人的公开联系方式，并删除在线索引中的姓名。CASE 05 的名单停止增加，但系统仍在后台尝试恢复它们。" },
      seal: { kind: "disposition", title: "封存全部资料", desc: "离线保存材料并终止传播", file: "ARCHIVE / SEALED", text: "你断开工作台网络，把原始材料写入离线介质。官方不会立刻重启调查，索引也暂时停止复制姓名。" }
    };
  }

  function renderFinal() {
    if (state.ending) return renderEnding(state.ending);
    const options = finalActionData();
    const chosen = state.finalChoices;
    const investigations = Object.entries(options).filter(([,o]) => o.kind === "investigation");
    const dispositions = Object.entries(options).filter(([,o]) => o.kind === "disposition");
    const investigationCount = chosen.filter(id => options[id]?.kind === "investigation").length;
    const dispositionCount = chosen.filter(id => options[id]?.kind === "disposition").length;
    const cards = (items, kind) => items.map(([id,o]) => {
      const capacityReached = kind === "investigation" ? investigationCount >= 2 : dispositionCount >= 1;
      const completed = chosen.includes(id);
      const interaction = completed ? `data-review-final="${id}"` : capacityReached ? "" : `data-final-choice="${id}"`;
      return `<article class="file-card ${completed ? "selected-final final-complete" : ""}" ${interaction}><span class="file-index">${completed ? "ACTION COMPLETE" : kind === "investigation" ? "INVESTIGATE" : "DECIDE"}</span><h3>${o.title}</h3><p>${o.desc}</p>${completed ? `<p class="reopen-note">点击重新阅读</p>` : ""}</article>`;
    }).join("");
    return `<div class="intro-card"><p class="eyebrow">FINAL WINDOW / 19:32—19:47</p><h2>暴雪再次来临</h2><blockquote>预计19:47山区道路全面封闭。你只能完成两项调查与一项处置。</blockquote>
      <p>普通核心证据已在进入19:32时锁定；最终调查仍可能补足少量关键档案，从而改变你最终能够确认的真相。选择两项调查方向，再选择一项处置决定材料的去向。</p>
      <h3>最终调查 · ${investigationCount} / 2</h3><div class="card-grid">${cards(investigations, "investigation")}</div>
      <h3>最终处置 · ${dispositionCount} / 1</h3><div class="card-grid">${cards(dispositions, "disposition")}</div>
      <button class="btn primary" style="margin-top:24px" data-resolve-final ${investigationCount !== 2 || dispositionCount !== 1 ? "disabled" : ""}>在19:47提交调查结论</button></div>`;
  }

  function openFinalAction(id) {
    const action = finalActionData()[id];
    if (!action || state.finalChoices.includes(id)) return;
    const sameKind = state.finalChoices.filter(choice => finalActionData()[choice]?.kind === action.kind).length;
    if (sameKind >= (action.kind === "investigation" ? 2 : 1)) return;
    openModal(`<div class="modal-inner"><p class="eyebrow">FINAL ACTION / CONFIRM</p><h2>${action.title}</h2><p>${action.desc}</p><p>确认后会立即消耗一次最终行动，随后才会打开对应资料；行动不能更换。</p><button class="btn primary" data-complete-final="${id}">使用行动并打开资料</button></div>`);
  }

  function completeFinalAction(id) {
    let action = finalActionData()[id];
    if (!action || state.finalChoices.includes(id)) return;
    const sameKind = state.finalChoices.filter(choice => finalActionData()[choice]?.kind === action.kind).length;
    if (sameKind >= (action.kind === "investigation" ? 2 : 1)) return;
    state.finalChoices.push(id);
    if (id === "1976") {
      addUnique(state.unlockedDocs, "photo1976");
      toast("最终资料恢复", state.hidden.includes("H01") ? "1976年气象站旧照与既有对比记录已核验。" : "1976年气象站合影已加入照片库，仍需自行检查。", "evidence");
    }
    if (id === "linxue") discoverHidden("H02", "林雪未寄出的信");
    save();
    render();
    action = finalActionData()[id];
    openModal(`<div class="modal-inner"><p class="eyebrow">ACTION USED / ${action.file}</p><h2>${action.title}</h2><div class="action-result">${action.text}</div><p>${action.kind === "investigation" ? "最终调查" : "最终处置"}已记录</p><button class="btn ghost" data-close-modal>关闭资料</button></div>`);
  }

  function reopenFinalAction(id) {
    if (!state.finalChoices.includes(id)) return;
    const action = finalActionData()[id];
    if (!action) return;
    openModal(`<div class="modal-inner"><p class="eyebrow">ARCHIVED FINAL FILE / ${action.file}</p><h2>${action.title}</h2><div class="action-result">${action.text}</div><p>重新阅读不会消耗最终行动。</p><button class="btn ghost" data-close-modal>关闭资料</button></div>`);
  }

  function resolveFinal() {
    const options = finalActionData();
    if (state.finalChoices.filter(id => options[id]?.kind === "investigation").length !== 2 || state.finalChoices.filter(id => options[id]?.kind === "disposition").length !== 1) return;
    state.ending = `truth_${currentTruthLevel()}`;
    state.completedOnce = true;
    meta.completedOnce = true;
    addUnique(meta.unlockedEndings, state.ending);
    saveMeta();
    renderMetaControls();
    save();
    render();
  }

  function renderEnding(id) {
    const layers = {
      truth_full: ["TRUE ENDING / COMPLETE", "雪线以下", "所有现存资料最一致地支持一种解释：每次人数短暂增加后，都会有一名真实成员从名单与共同记忆中淡出。AME-7记录过这种规律，却无法证明它发生在现实、档案还是人的记忆里；也没有材料能回答郭文究竟是谁。"],
      truth_member: ["ENDING / THE EXTRA MEMBER", "第七人", "你确认同一名少年出现在不同年份，并锁定19:47的同步偏差。多起案件都有人数矛盾，但你还不能证明‘多出一人’与原成员失踪之间的因果关系。"],
      truth_experiment: ["ENDING / THE FACILITY", "实验记录", "地下设施、地方掩盖与附加成员实验可以解释部分档案，却不能证明郭文是实验产物。更早的记录仍是一块空白。"],
      truth_insufficient: ["ENDING / INSUFFICIENT", "暴雪", "证据不足以区分极端天气、档案造假与真正的共同模式。调查在19:47被迫提交。"]
    };
    const level = id.replace("truth_", "");
    const confident = level === "full";
    const tails = {
      facility: confident ? "维护道日志补上了最后一层：箭头记录实际人数与共同记忆人数的差，研究者只是在追踪异常。" : "维护道日志留下多组人数箭头；你确认它与案件有关，却无法可靠解释每个数字。",
      linxue: confident && state.hidden.includes("H02") ? "林雪的残信补全了动机：她回到白岭是为了阻止下一次点名，并警告你不要第二次数到郭文。" : "林雪显然相信点名会带来危险；现有证据不足以判断这是警告、推测还是创伤记忆。",
      guowen: confident && state.hidden.includes("H03") ? "至少有一份与案发当日一致的记录表明，5B曾登记为‘许×’；现有九人名单没有这个名字，而郭文被登记在5A。" : "郭文的身份记录彼此冲突；5B原本属于谁，仍取决于你是否找到那张被撕毁的车票。",
      publish: confident ? "你公开了全部档案。调查被迫重启，但数月后其他城市开始出现‘合照里多了一人’的帖子；真相也许正在制造新的共同记忆。" : "你公开了尚未完全解释的档案。舆论迫使地方重启调查，也让未经证实的‘第十人’说法迅速传播。",
      witness: "你切断三名证人的公开联系方式。CASE 05暂时停止增长，现有证人保住了姓名；系统后台仍在尝试恢复索引。",
      seal: confident ? "你把已证明的规律与全部原始材料封存在离线介质中。没有人会立刻读到郭文的名字，但CASE 05仍留在系统缓存里。" : "你封存了尚未解释完整的材料。官方版本不会改变，而那些人数矛盾暂时只存在于一块离线硬盘中。",
      han: confident ? "韩敬山的最后一页补上最后缺口：他没有数错。重新点名时，多出的那一人仍在，少掉的却是真实成员。" : "韩敬山显然坚信人数发生过变化，但你无法独立验证他最后一页笔记。",
      "1976": confident ? "1976旧照把异常的起点提前到AME-7之前至少十五年。" : state.hidden.includes("H01") ? "旧照中的红围巾少年与后来的郭文高度相似，但现有结论仍不足以解释原因。" : "你恢复了1976旧照，却没有在封路前完成其中人物的身份对比。"
    };
    const e = layers[id] || layers.truth_insufficient;
    const actionTails = state.finalChoices.map(choice => `<p class="ending-tail">${tails[choice]}</p>`).join("");
    return `<section class="ending"><div class="ending-copy"><p class="eyebrow">${e[0]}</p><h2>《${e[1]}》</h2><p>${e[2]}</p>${actionTails}<div class="ending-actions"><button class="btn ghost" data-review>查看已收集档案</button><button class="btn primary" data-reset>重新开始</button></div></div></section>`;
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
      clearSaves();
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
    if (!confirm("确定重新开始调查吗？当前周目进度将清除，已解锁结局与通关记录会保留。")) return;
    state = defaults();
    clearSaves();
    location.reload();
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, [data-case], [data-person], [data-doc], [data-final-choice], [data-review-final]");
    if (!target) {
      const frame = e.target.closest(".photo-frame");
      if (frame && matchMedia("(max-width: 820px)").matches && !frame.closest(".mobile-photo-expanded")) openPhotoViewer(frame);
      else if (frame) toast("照片检查", "这里没有发现值得记录的东西。");
      return;
    }
    if (target.matches("[data-close-modal]")) return closeModal();
    if (target.dataset.section) return switchSection(target.dataset.section);
    if (target.hasAttribute("data-confirm-final")) return confirmFinalPhase();
    if (target.hasAttribute("data-start-final")) return startFinalPhase();
    if (target.dataset.case) return caseModal(target.dataset.case);
    if (target.dataset.person) return personModal(target.dataset.person);
    if (target.dataset.doc) return openDocument(target.dataset.doc);
    if (target.dataset.clue) {
      const clueId = target.dataset.clue;
      const discovered = discoverClue(clueId);
      if (!discovered && !hasClue(clueId)) return;
      target.classList.add("found");
      target.textContent = `✓ ${clueData[clueId][0]}`;
      if (state.section === "photos") render();
      return;
    }
    if (target.dataset.hidden) {
      if (state.finalStarted) return toast("档案已冻结", "最终阶段不能再发现普通隐藏档案。");
      const hiddenFiles = {
        H02: ["林雪未寄出的信（残页）", "夹层里只有一句：别让他们记住他。"],
        H03: ["5B夹层里的第十人车票", "日期：2004-12-17。车辆：BL-17。座位：5B。姓名：许×。九人名单里没有任何人姓许。"]
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
        toast("照片对比完成", "两张照片中的少年在五官比例、身高与围巾特征上高度相似。", "evidence");
        render();
      }
      return;
    }
    if (target.hasAttribute("data-compare-1976")) {
      if (state.finalStarted && !state.finalChoices.includes("1976")) return toast("照片索引已冻结", "只有选择‘检查1976事件’才能在最终阶段继续这项对比。");
      if (!state.hidden.includes("H01")) {
        discoverHidden("H01", "1976年红围巾少年身份冲突");
        toast("跨年代对比完成", "少年的外貌跨越二十七年没有变化。", "evidence");
        render();
      }
      return;
    }
    if (target.hasAttribute("data-compare-times")) {
      if (state.finalStarted) return toast("时间线已封存", "最终阶段开始时，普通调查结论已经锁定。");
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
    if (target.dataset.reviewFinal) return reopenFinalAction(target.dataset.reviewFinal);
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
    if (hasStoredSave() && !confirm("开始新调查将清除当前进度。是否继续？")) return;
    startGame(true);
  });
  $("#continue-game").addEventListener("click", () => startGame(false));
  $("#ending-archive").addEventListener("click", openEndingArchive);
  $("#clear-all-records").addEventListener("click", clearAllRecords);
  $("#mobile-menu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#modal").addEventListener("click", e => { if (e.target.matches("[data-close-modal]")) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

  loadMeta();
  load();
  renderMetaControls();
  if (hasStoredSave()) $("#continue-game").hidden = false;
})();

