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
    snow_depth: ["现场雪深约6厘米", "现场勘验附表的三个测点为5—7厘米，平均雪深约6厘米。"],
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
    ame_partial: ["模糊项目编号 AME-?", "1974维护图的后期批注写着：1991年12月，B区重新启用，用途为环境适应观察，项目编号AME-?。"],
    experiment_seven: ["韩敬山提到7号实验", "韩敬山便笺夹页只留下一句：‘不要再查那个7号实验。’"],
    ame_code: ["完整项目编号 AME-7", "维护图中的AME-?与韩敬山所说的7号实验指向同一完整编号：AME-7。"],
    ticket_xu: ["5B许×残票", "案发当天的BL-17车票对应5B，姓名栏只剩‘许×’；现有九人名单中无人姓许。"],
    xu_deleted: ["被删除的5B乘客记录", "缓存显示许×曾对应BL-17的5B座位，电子索引在案发次日被删除。"],
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
    { id: "S02", title: "现场照片时间遭人为修改", needs: ["official_photo_time", "original_photo_time"], text: "原始底片登记为22:08，入库时间却被改成23:48；相机本身并没有走快。", support: true },
    { id: "S03", title: "2004年曾存在第十份乘客记录", needs: ["S01", "ticket_xu", "xu_deleted"], text: "至少三份相互独立的记录表明，案发当天5B对应过一名不在现有九人名单中的许姓乘客；其电子索引在次日被删除。", support: true }
  ];

  const discoveryRecipes = [
    { id: "ame_code", title: "复原项目编号：AME-7", needs: ["ame_partial", "experiment_seven"], text: "维护图的模糊编号与韩敬山的夹页批注补全了同一个检索词。" }
  ];

  const archiveData = [
    { id: "envelope", code: "INBOX / 000", title: "无寄件人档案袋", meta: "已拆封", initial: true },
    { id: "passengers", code: "BL04 / P-01", title: "2004巴士乘客名单与座位图", meta: "9页", initial: true },
    { id: "snowSurvey", code: "BL04 / S-02", title: "17号公路现场雪深测量记录", meta: "勘验附表", case: "04" },
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
    attention: [],
    archiveFilter: "all",
    seenLines: [],
    expandedLine: null,
    searchDraft: [],
    case05Stage: 0,
    case05SeenStage: 0,
    otherCluesExpanded: false,
    evidenceThemeKey: "",
    finalStarted: false,
    finalChoices: [],
    ending: null,
    completedOnce: false,
    startedAt: Date.now()
  });

  let state = defaults();
  let pendingCase05Advance = false;
  let meta = { completedOnce: false, unlockedEndings: [], unlockedDispositions: [], viewedFinalFiles: [] };
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
      if (raw) meta = {
        completedOnce: Boolean(raw.completedOnce),
        unlockedEndings: Array.isArray(raw.unlockedEndings) ? raw.unlockedEndings : [],
        unlockedDispositions: Array.isArray(raw.unlockedDispositions) ? raw.unlockedDispositions : [],
        viewedFinalFiles: Array.isArray(raw.viewedFinalFiles) ? raw.viewedFinalFiles : []
      };
    } catch (_) { meta = { completedOnce: false, unlockedEndings: [], unlockedDispositions: [], viewedFinalFiles: [] }; }
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
    const dispositions = [["publish", "公开"], ["witness", "保护"], ["seal", "封存"]];
    openModal(`<div class="modal-inner"><p class="eyebrow">CROSS-INVESTIGATION META ARCHIVE</p><h2>调查记录 · ${meta.unlockedEndings.length} / 4</h2><p>四个结局记录你理解到了哪里；处置记录说明你曾拿真相做过什么。两者都会跨周目保留。</p><div class="archive-list">${endings.map(([id,name], index) => {
      const unlocked = meta.unlockedEndings.includes(id);
      return `<div class="archive-row ${unlocked ? "" : "locked"}"><span class="archive-code">ENDING ${String(index + 1).padStart(2,"0")}</span><span class="archive-title">${unlocked ? name : "???"}</span><span class="archive-meta">${unlocked ? "RECOVERED" : "LOCKED"}</span></div>`;
    }).join("")}</div><section class="disposition-archive"><h3>处置记录</h3>${dispositions.map(([id, name]) => `<div class="disposition-row ${meta.unlockedDispositions.includes(id) ? "recorded" : ""}"><span>${meta.unlockedDispositions.includes(id) ? "☑" : "☐"}</span>${name}</div>`).join("")}</section><section class="final-file-archive"><h3>最终资料 · ${meta.viewedFinalFiles.length} / 5</h3><p>每次调查只能读取其中两项；已阅资料会跨周目保留记录。</p><div class="final-file-slots">${[["1976","历史断点"],["facility","实验来源"],["linxue","人物动机"],["guowen","身份冲突"],["han","人为掩盖"]].map(([id,name]) => `<span class="${meta.viewedFinalFiles.includes(id) ? "recorded" : ""}">${meta.viewedFinalFiles.includes(id) ? "☑ " + name : "☐ ???"}</span>`).join("")}</div></section></div>`);
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
        if (typeof current.case05SeenStage !== "number") state.case05SeenStage = state.case05Stage;
        if (typeof current.otherCluesExpanded !== "boolean") state.otherCluesExpanded = false;
        if (typeof current.evidenceThemeKey !== "string") state.evidenceThemeKey = "";
        if (typeof current.completedOnce !== "boolean") state.completedOnce = Boolean(current.ending);
        if (state.completedOnce && !meta.completedOnce) { meta.completedOnce = true; saveMeta(); }
        return;
      }
      const legacy = JSON.parse(localStorage.getItem(LEGACY_SAVE_KEY));
      if (legacy && legacy.version === 1) {
        state = { ...defaults(), ...legacy, version: 2, hypotheses: [], overturned: [], finalStarted: false, finalChoices: [], ending: null, completedOnce: false };
        state.case05Stage = hasEvidence("EV16") ? 2 : state.evidence.length >= 8 ? 1 : 0;
        state.case05SeenStage = state.case05Stage;
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

  function markAttention(section, id = "index") {
    addUnique(state.attention, `${section}:${id}`);
  }

  function clearAttention(section, id) {
    const prefix = id ? `${section}:${id}` : `${section}:`;
    state.attention = state.attention.filter(item => id ? item !== prefix : !item.startsWith(prefix));
  }

  function attentionCount(section) {
    return state.attention.filter(item => item.startsWith(`${section}:`)).length;
  }

  function toast(title, text, kind = "", duration = 4500) {
    const node = document.createElement("div");
    node.className = `toast ${kind}`;
    node.innerHTML = `<b>${title}</b><span>${text}</span>`;
    $("#toast-region").append(node);
    setTimeout(() => node.remove(), duration);
  }

  function discoverClue(id, silent = false) {
    if (state.finalStarted && !(id === "photo_1976_boy" && state.finalChoices.includes("1976"))) {
      toast("最终阶段已开始", "普通调查资料已经冻结，只能处理最终行动明确恢复的内容。");
      return false;
    }
    if (!clueData[id] || !addUnique(state.clues, id)) return false;
    state.updates += 1;
    if (id === "ame_partial") markAttention("archive", "memo");
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
    if (id === "H01") {
      toast("异常档案已记录", "1976 / 身份冲突", "evidence", 3200);
      updateHypotheses(1400);
    } else toast("隐藏档案", title, "evidence");
    save();
    updateChrome();
  }

  function updateHypotheses(toastDelay = 0) {
    const overturned = [];
    if (state.hypotheses.includes("HX01") && state.hypotheses.includes("S02")) overturned.push("HX01");
    if (state.hypotheses.includes("HX02") && state.hidden.includes("H01")) overturned.push("HX02");
    overturned.forEach(id => {
      if (addUnique(state.overturned, id)) {
        const item = hypothesisRecipes.find(h => h.id === id);
        const notify = () => toast("暂定推论已推翻", item.title, "evidence");
        if (toastDelay) setTimeout(notify, toastDelay); else notify();
      }
    });
  }

  function unlockCase(id, message) {
    if (!addUnique(state.unlockedCases, id)) return;
    state.updates += 1;
    markAttention("cases", id);
    archiveData.filter(doc => doc.case === id).forEach(doc => markAttention("archive", doc.id));
    const photoByCase = { "00": "class", "01": "camp", "03": "film" };
    if (photoByCase[id]) markAttention("photos", photoByCase[id]);
    const transitions = {
      "00": "九名乘客并非偶然同行，且现场人数无法互相对应。新的问题是：这批乘客与哪起旧案有关？",
      "01": "学校请假、学号与体检记录彼此印证，官方六人记录存在无法解释的缺口。新的问题是：谁继续追查了这次失踪？",
      "03": "2001营地的生活痕迹与装备登记无法对应。新的问题是：后来留下的影像是否重复了同一种矛盾？",
      "05": "跨案材料已经开始反向记录当前调查。下一步由你决定何时进入最后阶段。"
    };
    toast("阶段结论 · 新档案恢复", `${transitions[id] || message} 请先阅读${message}摘要。`, "evidence", 8000);
  }

  function unlockSystem(id, message) {
    if (!addUnique(state.unlockedSystems, id)) return;
    state.updates += 1;
    markAttention(id);
    toast("系统更新 · 新调查入口", `${message}。当前材料已经能够跨案件核对，请从新入口继续追查。`, "evidence");
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
    updateEnvelopeRecheck();
    advanceCase05();
    save();
  }

  function updateEnvelopeRecheck() {
    const available = hasEvidence("EV08") || hasEvidence("EV16");
    if (!available || !state.viewed.includes("envelope") || state.viewed.includes("envelope_update_notified") || state.hidden.includes("H02")) return;
    addUnique(state.viewed, "envelope_update_notified");
    markAttention("archive", "envelope");
    state.updates += 1;
    toast("资料 UPDATE", "原始档案出现新的可检查痕迹。", "evidence", 6000);
  }

  function advanceCase05() {
    if (!hasCase("05") || state.finalStarted) return;
    let changed = false;
    if (state.case05Stage === 0 && (state.evidence.length >= 8 || hasEvidence("EV16"))) { state.case05Stage = 1; changed = true; }
    else if (state.case05Stage === 1 && state.case05SeenStage >= 1 && hasEvidence("EV16")) { state.case05Stage = 2; changed = true; }
    if (changed) {
      markAttention("cases", "05");
      state.updates += 1;
      toast("CASE 05 / INDEX UPDATED", "案件索引发生变化。更新内容未在通知中展开。", "evidence", 6500);
    }
  }

  function startFinalPhase() {
    if (!hasCase("05") || state.finalStarted) return;
    state.finalStarted = true;
    state.case05Stage = 3;
    unlockSystem("final", "19:32—19:47：普通调查已冻结");
    state.section = "final";
    save();
    closeModal();
    render();
  }

  function finalLockReview() {
    const questions = [
      [hasEvidence("EV08"), "红围巾少年是否跨案出现"],
      [hasEvidence("EV13"), "现场照片时间是否可信"],
      [hasEvidence("EV15"), "韩敬山是否提前知道现场结果"],
      [hasEvidence("EV16"), "19:47异常是否早于四案"],
      [hasEvidence("EV18"), "AME-7是否与失踪地点有关"],
      [state.hidden.includes("H01"), "异常是否早于AME-7"]
    ];
    const confirmed = questions.filter(([known]) => known).map(([, label]) => label);
    const unknown = questions.filter(([known]) => !known).map(([, label]) => label);
    const rows = (items, known) => items.length
      ? items.map(label => `<div class="lock-row ${known ? "confirmed" : "unknown"}"><span>${known ? "✓" : "?"}</span>${label}</div>`).join("")
      : `<div class="lock-row confirmed"><span>✓</span>当前可恢复项目已全部确认</div>`;
    return `<section class="final-lock-review"><div><h3>已确认问题</h3>${rows(confirmed, true)}</div><div><h3>仍可调查</h3>${rows(unknown, false)}</div><aside><h3>无法证实</h3><div class="lock-row unknowable"><span>—</span>郭文是谁？</div></aside><footer><span>核心证据 ${state.evidence.length} / ${recipes.length}</span><span>异常档案 ${state.hidden.length}</span></footer></section>`;
  }

  function confirmFinalPhase() {
    if (!hasCase("05") || state.finalStarted) return;
    const stageWarning = {
      0: "系统仍在建立CASE 05。现在结束普通调查，意味着你可能永远不知道名单中间发生了什么。",
      1: "CASE 05刚刚记录第一名失联者。继续追查也许会让名单再次更新。",
      2: "已有3人失联。下一次名单更新可能包含你。"
    }[state.case05Stage] || "CASE 05正在等待下一次名单更新。";
    openModal(`<div class="modal-inner"><p class="eyebrow">POINT OF NO RETURN / 19:32</p><h2>最终提交前确认</h2><div class="action-result">${stageWarning}</div>${finalLockReview()}<p>此后无法继续记录普通线索，普通核心证据将永久锁定。最终调查仍可能补足少量关键档案，从而改变你最终能够确认的真相。</p><div class="ending-actions"><button class="btn ghost" data-close-modal>继续普通调查</button><button class="btn primary" data-start-final>确认进入19:32</button></div></div>`);
  }

  function chapter() {
    if (hasSystem("final")) return ["最终章 · 第五场雪", 100];
    if (hasEvidence("EV16")) return ["第六章 · 19:47", 84];
    if (hasSystem("web")) return ["第五章 · 第二次勘验", 68];
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
    const completionVisible = meta.completedOnce || state.completedOnce;
    $("#hidden-label").textContent = completionVisible ? "档案完成度" : "异常档案";
    $("#hidden-count").textContent = completionVisible ? `${state.hidden.length} / 3` : `${state.hidden.length}`;
    $("#investigator-label").textContent = state.ending === "truth_full" ? "当前调查员：郭文" : "当前调查员：林川";
    $(".investigator").classList.toggle("case05-alert", state.case05Stage >= 1 && state.attention.includes("cases:05"));
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
      const pending = attentionCount(item.id);
      const badge = pending ? `<span class="nav-badge update">${pending === 1 ? "NEW" : pending}</span>` : item.id === "evidence" && state.evidence.length ? `<span class="nav-badge">${state.evidence.length}</span>` : "";
      return `<button class="nav-btn ${state.section === item.id ? "active" : ""} ${locked ? "locked" : ""}" data-section="${item.id}" ${locked ? "aria-disabled=\"true\"" : ""}><span class="nav-icon">${locked ? "×" : item.icon}</span>${item.label}${badge}</button>`;
    }).join("");
  }

  const sectionTitles = {
    cases: ["CASE INDEX", "案件"], people: ["PERSONNEL INDEX", "人物"], photos: ["PHOTOGRAPHIC EVIDENCE", "照片"],
    archive: ["DOCUMENT ARCHIVE", "资料库"], web: ["RECOVERED WEB INDEX", "旧网页"], timeline: ["CROSS-CASE TIMELINE", "时间线"],
    evidence: ["INFERENCE WORKBENCH", "证据板"], notes: ["INVESTIGATION LOG", "调查笔记"], final: ["FINAL INVESTIGATION", "最终调查"]
  };

  function currentInvestigation() {
    const line = (id, question, known, reasoning, section, label, summary, target = "") => ({ id, question, known, reasoning, section, label, summary, target });
    const pendingCase = state.attention.find(item => item.startsWith("cases:"));
    if (pendingCase) {
      const caseId = pendingCase.split(":")[1];
      const c = caseData.find(item => item.id === caseId);
      if (caseId === "05" && state.case05Stage > 0) return line(`case-05-update-${state.case05Stage}`, "CASE 05索引发生变化", "系统没有说明变化发生在哪个字段。", "打开案件摘要，自行核对上一次阅读后的差异。", "cases", "定位CASE 05 UPDATE", "这次更新不会在调查线中提前展示内容。", "case:05");
      return line(`case-${caseId}`, `新档案恢复：${c.title}`, "上一阶段已经形成足以重开旧案的结论。", "先阅读案件摘要，确认它与当前调查的关系；摘要不会替你标出异常。", "cases", `查看${c.index.split(" / ")[0]}`, "阅读后，调查线才会指向本案新恢复的原始资料。", `case:${caseId}`);
    }
    if (state.finalStarted) return line("final", "在19:47前，你要把哪两份最终资料带走？", "普通调查已经冻结，现有结论不会再改变。", "选择最能补足当前判断缺口的两项调查。", "final", "返回最终调查", "用有限行动决定最终能够确认到哪一层真相。", "final:index");
    if (!hasEvidence("EV01") || !hasEvidence("EV10")) {
      if (!hasClue("passenger_count")) return line("04-count", "巴士的登记人数与座位使用情况是否一致？", "现场材料对乘客人数留下了互相独立的记录。", "先核对原始名单，不预设现场人数结论。", "archive", "定位乘客名单", "第一章：从登记记录复核2004现场。", "doc:passengers");
      if (!hasClue("passenger_links")) {
        if (!hasClue("link_linxue")) return line("04-links", "这些乘客为什么会同时前往白岭？", "乘客名单已经确认，但同行原因仍未建立。", "先从林雪开始核对；她与当前调查者及2000旧案都有直接关系。", "people", "定位林雪档案", "第一章：从最接近林川的人开始建立可验证关系。", "person:linxue");
        return line("04-links", "这些乘客为什么会同时前往白岭？", "林雪的旧案经历已经登记，但单一关系不能排除偶然同行。", "继续核对尚未阅读的乘客档案；浏览顺序由你决定。", "people", "浏览未读乘客", "第一章：足够多的独立关系才能证明这不是随机同行。", "people:index");
      }
      if (!hasClue("footprints")) return line("04-tracks", "登记人数与离车痕迹能否互相对应？", "名单人数与同行关系已经确认。", "查看独立的足迹勘验照片；异常仍需由你在图中发现。", "photos", "定位足迹勘验照", "第一章：把书面人数与现场痕迹放在一起核对。", "photo:tracks");
      return line("04-deduce", "现有材料能否形成两条独立的人数结论？", "登记、关系与足迹观察均已记录。", "在证据板检验这些材料之间是否存在直接关系。", "evidence", "前往相关线索", "第一章：结论成立后，旧案索引才会恢复。", "clue:passenger_count");
    }
    if (!hasEvidence("EV02")) {
      if (!hasClue("leave_count")) return line("00-leave", "学校的集体外出记录与官方人数是否一致？", "2000旧案已恢复，但官方摘要只有结案口径。", "先查同日形成的校内请假记录。", "archive", "定位请假登记", "第二章：从学校原始记录重新核对人数。", "doc:leave");
      if (!hasClue("missing17")) return line("00-roster", "连续的学生编号中是否存在档案缺口？", "请假人数已经记录，无需重复检查。", "检查学生编号索引是否保持连续。", "archive", "定位学生编号索引", "当前缺口：编号记录能否解释人数差异。", "doc:roster");
      if (!hasClue("health_guowen")) return line("00-identity", "缺失编号是否留下过独立身份记录？", "请假人数与编号缺口已经记录。", "寻找由另一套校务流程形成的身份材料。", "archive", "定位体检残页", "当前缺口：为缺失编号寻找独立来源。", "doc:physical");
      return line("00-deduce", "三份学校记录能否共同推翻官方人数口径？", "请假、编号与身份材料都已记录。", "在证据板检验三份独立记录是否指向同一矛盾。", "evidence", "核对本案材料", "第二章：只使用玩家已经发现的三份学校材料。", "clue:leave_count");
    }
    if (!hasEvidence("EV04")) {
      if (!hasClue("five_cups")) return line("01-camp", "2001营地的使用痕迹与人员登记是否一致？", "案件摘要只确认四名调查者。", "检查营地勘验中的实际使用痕迹。", "archive", "定位营地勘验", "第三章：生活痕迹和人员名单需要独立核对。", "doc:camp");
      if (!hasClue("four_supplies")) return line("01-supplies", "营地痕迹能否由物资登记独立验证？", "营地中的使用痕迹已经记录。", "查看出发前形成的装备领用记录。", "archive", "定位物资领用表", "当前缺口：另一来源记录的队伍规模。", "doc:supplies");
      return line("01-deduce", "生活痕迹与装备登记是否描述了同一支队伍？", "两份来源不同的人数材料已经记录。", "在证据板检验它们是否构成直接矛盾。", "evidence", "核对本案材料", "第三章：结论仍需由你主动建立。", "clue:five_cups");
    }
    if (!hasEvidence("EV07") || !hasEvidence("EV08")) {
      if (!hasClue("team_six")) return line("03-roster", "2003摄制组的成员记录与影像是否一致？", "案件摘要没有证明现场影像中的人数。", "先用合同确认团队登记规模。", "archive", "定位摄制合同", "第四章：先建立影像比较所需的基准。", "doc:crew");
      if (!hasClue("photo_seventh")) return line("03-film", "摄制合同与C-12底片能否互相对应？", "合同中的团队人数已经记录。", "放大检查底片构图与边缘；系统不会替你标出异常。", "photos", "定位底片 C-12", "第四章：影像中的差异必须由玩家观察。", "photo:film");
      if (!hasEvidence("EV07")) return line("03-deduce", "成员记录与底片观察是否存在人数矛盾？", "合同人数和底片观察均已记录。", "在证据板检验两份材料之间的关系。", "evidence", "核对本案材料", "第四章：先证明影像与名单不一致。", "clue:team_six");
      if (!hasClue("class_red_scarf")) return line("03-class", "早期合照中是否出现过相似的影像特征？", "2003底片已经留下名单外观察。", "重新检查2000班级合照，不预设人物身份。", "photos", "定位2000班级合照", "第四章：跨照片比较需要两边都有可见观察。", "photo:class");
      if (!hasClue("guowen_red_scarf")) return line("03-compare", "两张照片中的人物特征是否足以支持同一性？", "两张照片都已由你记录相关观察。", "使用照片页的主动对比，结论不会自动生成。", "photos", "定位照片对比", "第四章：只有完成比较，才能形成跨案人物结论。", "compare:2000-2003");
      return line("03-identity", "跨案影像比较能否形成稳定结论？", "影像观察与主动对比都已完成。", "在证据板记录人物一致性结论。", "evidence", "核对影像材料", "第四章：不再重复已经完成的名单核对。", "clue:photo_seventh");
    }
    if (!hasEvidence("EV13")) {
      if (!hasClue("snow_depth")) return line("04-snow", "现场照片的归档时间能否由客观环境验证？", "跨案影像比较已完成，现在回到2004现场。", "先查独立于照片系统的现场测量记录。", "archive", "定位雪深附表", "第五章：用现场物理记录检验时间标注。", "doc:snowSurvey");
      if (!hasClue("weather_record")) return line("04-weather", "现场测量对应哪一个时间段？", "现场雪深已经记录，无需重复检查。", "用逐时气象记录寻找同样的积雪深度。", "archive", "定位逐时气象记录", "当前缺口：给现场测量找到独立时间参照。", "doc:weather");
      return line("04-time-deduce", "雪深与逐时记录能否检验照片标注？", "现场测量与气象记录均已取得。", "在证据板检验两份独立记录是否对应。", "evidence", "核对时间材料", "第五章：结论必须来自测量值，而非系统提示。", "clue:snow_depth");
    }
    if (!hasEvidence("EV15")) {
      if (!hasClue("forecast_eight")) return line("04-prior", "有没有人在正式勘验前就掌握了现场信息？", "照片时间问题已经建立，但人为介入仍需独立证据。", "检查早于现场发现形成的私人记录。", "archive", "定位韩敬山便笺", "当前缺口：记录形成时间与现场信息的先后关系。", "doc:memo");
      return line("04-prior-deduce", "提前形成的记录能否与现场观察对应？", "私人便笺与足迹观察都已由你记录。", "在证据板检验两者是否描述同一现场信息。", "evidence", "核对提前记录", "第五章：系统不直接复述便笺中的数字。", "clue:forecast_eight");
    }
    if (!hasEvidence("EV16")) {
      const timeDocs = [["time_2000","leave"],["time_2001","camp"],["time_2003","crew"],["time_2004","memo"]];
      const missingTime = timeDocs.find(([clue]) => !hasClue(clue));
      if (missingTime) return line(`time-${missingTime[0]}`, "四起案件的原始记录是否出现同一中断时刻？", "已确认的案件时刻会保留，不需要重复检查。", "只回查尚未记录时刻的那一案。", "archive", "定位缺失的时刻记录", "第六章：逐案补齐，而不是重新扫描全部档案。", `doc:${missingTime[1]}`);
      if (!hasClue("case_times")) return line("time-compare", "四个独立记录是否构成跨案件规律？", "四案时刻均已从原始材料记录。", "在时间线主动进行交叉比对。", "timeline", "定位时间比对", "第六章：比较完成前不把重复当成规律。", "timeline:compare");
      if (!hasClue("repeated_time")) return line("time-search", "这一时刻是否早于四起失踪案？", "跨案件时间已经建立。", "用地点与时刻检索更早的独立记录。", "web", "前往旧网页检索", "第六章：更早材料可排除事后整理造成的重复。", "web:search");
      return line("time-deduce", "早期记录能否证明异常并非四案之后才出现？", "跨案时刻与1988记录均已取得。", "在证据板检验它们的时间先后关系。", "evidence", "核对时间规律", "第六章：形成规律后再转向共同地点。", "clue:case_times");
    }
    if (!hasEvidence("EV18")) {
      if (!hasDoc("facility")) return line("facility-search", "数起事件的地点之间是否存在未公开的结构联系？", "共同时间已经确认，单次事故无法解释全部案件。", "组合档案中已经出现的地点词与设施词进行检索。", "web", "前往旧网页检索", "第七章：系统只提供已知词，不替你组合答案。", "web:search");
      if (!hasClue("facility")) return line("facility-map", "恢复的维护图是否连接了已知案发地点？", "工程图已经进入资料库。", "检查图纸中的通道去向。", "archive", "定位维护通道图", "第七章：先确认地点关系，再追查图纸后期用途。", "doc:facility");
      if (!hasClue("ame_partial")) return line("facility-note", "这张旧图后来是否被重新使用？", "通道去向已经记录。", "检查图纸上的后期批注，不预设项目名称。", "archive", "返回维护通道图", "当前缺口：图纸在1974年之后的使用痕迹。", "doc:facility");
      if (!hasClue("experiment_seven")) return line("ame-fragment", "残缺项目标记能否从另一份资料得到补充？", "维护图留下了不完整的项目编号。", "复查被标记为UPDATE的韩敬山便笺。", "archive", "定位韩敬山便笺", "第七章：两份独立资料各自保留一部分。", "doc:memo");
      if (!hasClue("ame_code")) return line("ame-recover", "两条残缺记录是否属于同一个项目标记？", "编号片段已经分别记录。", "在证据板检验能否复原可用检索词。", "evidence", "核对编号片段", "第七章：复原编号不等于证明实验与案件有关。", "clue:ame_partial");
      if (!hasDoc("ame")) return line("ame-search", "复原后的项目编号能找到什么？", "完整项目标记已由玩家推理获得。", "在旧网页手动使用这个编号。", "web", "前往旧网页检索", "第七章：搜索不会自动执行。", "web:search");
      if (!hasClue("ame_report")) return line("ame-report", "观察报告记录了什么可验证现象？", "AME-7报告已经恢复。", "检查报告正文中的首次观察。", "archive", "定位AME-7报告", "当前缺口：实验现象的原始记录。", "doc:ame");
      if (!hasClue("extra_member")) return line("ame-retest", "复测记录是否支持首次观察？", "首次观察已经记录。", "继续检查同一报告中的次日复测。", "archive", "返回AME-7报告", "当前缺口：同一实验的后续人数记录。", "doc:ame");
      return line("ame-deduce", "实验记录与通道地点能否形成直接关联？", "报告中的两项观察与通道去向均已记录。", "在证据板检验三份材料的关系。", "evidence", "核对实验与地点", "第七章：区分实验存在与实验解释一切。", "clue:ame_report");
    }
    if (!state.hidden.includes("H01")) return line("1976", "已知人数异常是否早于AME-7记录？", "实验与地点有关，但仍不能证明它是异常起点。", "寻找并检查实验之前的影像材料。", hasDoc("photo1976") ? "photos" : "web", hasDoc("photo1976") ? "定位1976合影" : "前往旧网页检索", "终章前：更早影像可能改变因果判断。", hasDoc("photo1976") ? "photo:1976" : "web:search");
    return line("ready", "现有证据已经足够进入最终阶段吗？", "主要矛盾、时间规律、地点关联与历史冲突均已确认。", "可继续补查支线，或从案件页进入最后15分钟。", "cases", "定位CASE 05", "郭文是谁仍无法由现有材料证实。", "case:05");
  }

  function renderInvestigationLine() {
    const item = currentInvestigation();
    const autoExpand = item.id === "04-count" || item.id.startsWith("case-") || item.id === "final" || (state.attention.includes(`${item.section}:index`) && ["web", "timeline"].includes(item.section));
    const expanded = state.expandedLine === item.id || (autoExpand && !state.seenLines.includes(item.id));
    if (!expanded) return `<section class="current-line compact"><div><span class="eyebrow">当前问题</span><h3>${item.question}</h3></div><div class="compact-actions"><button class="line-toggle" data-toggle-line="${item.id}" data-line-expanded="false">展开推理</button><button class="btn ghost" data-go-section="${item.section}" data-go-target="${item.target}" data-line-id="${item.id}">${item.label} →</button></div></section>`;
    return `<section class="current-line"><div class="current-line-head"><span class="eyebrow">CURRENT INVESTIGATION / 当前调查线</span><span class="line-pulse">● 进行中</span></div><h3>${item.question}</h3><div class="line-facts"><p><b>已知事实</b>${item.known}</p><p><b>建议推理</b>${item.reasoning}</p></div><div class="line-next"><span>${item.summary}</span><div class="line-actions"><button class="line-toggle" data-toggle-line="${item.id}" data-line-expanded="true">收起</button><button class="btn ghost" data-go-section="${item.section}" data-go-target="${item.target}" data-line-id="${item.id}">${item.label} →</button></div></div></section>`;
  }

  function switchSection(id) {
    const item = navItems.find(n => n.id === id);
    if (!item || (item.unlock && !hasSystem(item.unlock))) {
      toast("权限不足", "继续调查现有档案以恢复该模块。" );
      return;
    }
    state.section = id;
    clearAttention(id, "index");
    save();
    render();
    $("#sidebar").classList.remove("open");
  }

  function navigateTo(section, target = "", lineId = "") {
    if (lineId) {
      addUnique(state.seenLines, lineId);
      state.expandedLine = null;
    }
    if (section === "archive" && target) state.archiveFilter = "all";
    closeModal();
    switchSection(section);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const node = target ? document.querySelector(`[data-nav-target="${target}"]`) : null;
      if (!node) return;
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      node.classList.add("current-target");
      node.dataset.currentMarker = "CURRENT";
      if (target === "web:search") node.focus?.();
      setTimeout(() => { node.classList.remove("current-target"); delete node.dataset.currentMarker; }, 2200);
    }));
  }

  function render() {
    updateChrome();
    const [kicker, title] = sectionTitles[state.section] || sectionTitles.cases;
    $("#section-kicker").textContent = kicker;
    $("#section-title").textContent = title;
    const views = { cases: renderCases, people: renderPeople, photos: renderPhotos, archive: renderArchive, web: renderWeb, timeline: renderTimeline, evidence: renderEvidence, notes: renderNotes, final: renderFinal };
    $("#content").innerHTML = renderInvestigationLine() + (views[state.section] || renderCases)();
    $("#content").focus({ preventScroll: true });
  }

  function currentCase05() {
    if (state.case05Stage >= 3) return { title: "2005 · 白岭当前失踪事件", desc: "林川——状态：待确认。", status: "名单已更新" };
    if (state.case05Stage === 2) return { title: "2005 · 白岭异常事件", desc: "失联人员：3。当前调查者已被列为关联人员。", status: "正在发生" };
    if (state.case05Stage === 1) return { title: "2005 · 白岭异常事件", desc: "失联人员：1。其资料曾被当前调查者查看。", status: "自动更新" };
    return { title: "2005 · 白岭异常事件", desc: "系统正在建立档案……", status: "索引建立中" };
  }

  function renderCases() {
    return `<p class="section-lead">白岭警方从未承认这些案件之间存在联系。档案会随着推理逐步解封。点击案件查看摘要与相关资料。</p>
      <div class="card-grid">${caseData.map(base => {
        const c = base.id === "05" ? { ...base, ...currentCase05() } : base;
        const unlocked = hasCase(c.id);
        const caseAttention = state.attention.includes(`cases:${c.id}`);
        const attentionLabel = c.id === "05" && state.case05Stage > 0 ? "UPDATE" : "NEW";
        return `<article class="file-card ${unlocked ? "" : "locked"}" data-case="${c.id}" data-nav-target="case:${c.id}">
          <span class="file-index">${unlocked ? c.index : "FILE ENCRYPTED"}</span>
          <h3>${unlocked ? c.title : "封存档案"}${unlocked && caseAttention ? `<em class="update-tag">${attentionLabel}</em>` : ""}</h3>
          <p>${unlocked ? c.desc : "需要建立前一案件的关键结论。"}</p>
          <div class="file-meta"><span>${unlocked ? c.date : "----.--.--"}</span><span class="${c.id === "05" ? "new-tag" : ""}">${unlocked ? c.status : "LOCKED"}</span></div>
          ${c.id === "05" && unlocked ? `<i class="corrupt"></i>` : ""}
        </article>`;
      }).join("")}</div>${hasCase("05") && !state.finalStarted ? `<section class="final-threshold"><p class="eyebrow">POINT OF NO RETURN</p><h2>进入最后15分钟</h2><p>进入19:32—19:47后，普通档案将冻结，不能再记录常规线索。你仍可选择继续调查，直到准备好再进入。</p><button class="btn primary" data-confirm-final>进入最终阶段</button></section>` : ""}`;
  }

  function caseModal(id) {
    const viewedStage = id === "05" ? state.case05Stage : 0;
    clearAttention("cases", id);
    save();
    render();
    const c = caseData.find(x => x.id === id);
    if (!c || !hasCase(id)) return;
    const files = archiveData.filter(d => d.case === id || (id === "04" && ["passengers", "envelope"].includes(d.id)));
    let details = {
      "04": "2004年12月17日，一辆载有九人的小型巴士驶入白岭。次日车辆被发现停在17号公路，车门打开，行李仍在，乘客全部失踪。现场只发现八组离开车辆的脚印。",
      "00": "六名毕业班学生前往已停用的北山气象站。第二天林雪与罗诚返回，其余四人失踪。两份口供互相冲突，但警方在其中标出了同一处时间节点。",
      "01": "四名与2000案有关的私人调查者进入北山。三天后只有周启明返回，其余三人被列为失踪。官方勘验以四人队伍结案。",
      "03": "独立纪录片团队调查前两案。六名成员中五人失踪，导演陈垣三个月后死亡。警方将事件定性为恶劣天气导致的摄制事故。",
      "05": currentCase05().desc + (hasSystem("final") ? " 这份档案不是你创建的。" : " 每建立一条跨案结论，名单就离当前调查更近。")
    }[id];
    const discoveryMap = {
      "04": state.hypotheses.includes("S03") ? [["S03", "调查注", "现存资料曾出现第10份乘车记录"]] : [],
      "01": [["five_cups", "调查线索", "第五只杯子"], ["camp_five_depressions", "旁证", "五处睡眠压痕"]],
      "03": [["photo_seventh", "调查线索", "底片中的额外人影"], ["meal_seven", "旁证", "连续三晚的七份套餐"]]
    };
    const discoveries = (discoveryMap[id] || []).filter(item => item[0] === "S03" ? state.hypotheses.includes("S03") : hasClue(item[0]));
    const supplement = discoveries.length ? `<section class="case-discoveries"><h3>补充发现 · ${discoveries.length}</h3>${discoveries.map(item => `<div class="discovery-row"><span class="discovery-kind ${item[1] === "旁证" ? "support" : ""}">${item[1]}</span><b>${item[2]}</b></div>`).join("")}</section>` : "";
    const related = {
      "04": { photos: [["bus","现场照片01"],["tracks","足迹勘验照02"]], people: [["linxue","林雪"],["han","韩敬山"],["guowen","郭文"]] },
      "00": { photos: [["class","2000班级合照"]], people: [["linxue","林雪"],["luo","罗诚"],["guowen","郭文"]] },
      "01": { photos: [["camp","2001营地照片"]], people: [["zhou","周启明"],["han","韩敬山"],["lu","陆文山"]] },
      "03": { photos: [["film","底片 C-12"]], people: [["tang","唐国辉"],["gu","顾宁"],["qiu","邱明"]] },
      "05": { photos: [], people: [["linchuan","林川"]] }
    }[id] || { photos: [], people: [] };
    const assetLinks = `<section class="case-assets"><h3>关联资料</h3><div class="asset-groups"><div><b>文档 ${files.length}</b><span>从原始文字记录开始</span></div><div><b>照片 ${related.photos.length}</b>${related.photos.map(([photo,label]) => `<button data-go-section="photos" data-go-target="photo:${photo}">${label} →</button>`).join("") || `<span>暂无</span>`}</div><div><b>人物 ${related.people.length}</b>${related.people.map(([person,label]) => `<button data-go-section="people" data-go-target="person:${person}">${label} →</button>`).join("") || `<span>暂无</span>`}</div></div></section>`;
    openModal(`<div class="modal-inner" ${id === "05" ? `data-case05-stage="${viewedStage}"` : ""}><p class="eyebrow">${c.index}</p><h2>${c.title}</h2><p>${details}</p>${supplement}
      ${assetLinks}<h3>关联文档</h3><div class="archive-list">${files.map(d => archiveRow(d, false)).join("") || `<div class="archive-row"><span class="archive-code">NO FILE</span><span class="archive-title">系统仍在建立索引</span></div>`}</div></div>`);
    if (id === "05") {
      state.case05SeenStage = Math.max(state.case05SeenStage, viewedStage);
      pendingCase05Advance = viewedStage === 1 && hasEvidence("EV16");
      save();
    }
  }

  function personStatus(person) {
    if (person.id === "linchuan") {
      if (state.ending === "truth_full") return "失踪";
      if (state.case05Stage >= 3) return "待确认";
      if (state.case05Stage === 2) return "状态异常";
      if (state.case05Stage === 1) return "关联人员";
    }
    if (person.id === "guowen" && hasSystem("final")) return "调查中";
    return person.status;
  }

  function orderedPeople() {
    const list = [...people];
    if (state.case05Stage >= 2) {
      const linchuan = list.pop();
      list.splice(list.findIndex(p => p.id === "guowen"), 0, linchuan);
    }
    return list;
  }

  function renderPeople() {
    return `<p class="section-lead">人物页区分原始登记与调查补充。打开并阅读人物档案后，明确写出的旧案关系会自动登记；系统不会替你推断未写明的关联。</p><div class="people-grid" data-nav-target="people:index">${orderedPeople().map(p => {
      const status = personStatus(p);
      const found = p.clue && hasClue(p.clue);
      return `<article class="person-card ${found ? "investigated" : ""}" data-person="${p.id}" data-nav-target="person:${p.id}">
      <div class="person-avatar"></div><h3>${p.name}${p.clue && !found ? `<em class="unread-tag">UNREAD</em>` : ""}</h3><small>${p.age} / ${p.job}</small>${found ? `<i class="investigation-mark">调查补充：${clueData[p.clue][0]}</i>` : ""}<span class="status ${status === "失踪" ? "missing" : ""}">${status}</span>
    </article>`;
    }).join("")}</div>`;
  }

  function personModal(id) {
    const p = people.find(x => x.id === id);
    if (!p) return;
    if (p.clue && !hasClue(p.clue) && !state.finalStarted) discoverClue(p.clue, true);
    const status = personStatus(p);
    const caseReference = id === "linchuan" ? `<div><small>相关案件</small>${state.case05Stage >= 1 ? "2005" : "—"}</div>` : "";
    const supplement = p.clue
      ? hasClue(p.clue)
        ? `<div class="investigation-note"><small>调查补充</small><b>${clueData[p.clue][0]}</b><p>${clueData[p.clue][1]}${p.id === "guowen" && state.hypotheses.includes("S01") ? " 郭文只登记在5A；5B没有对应姓名。" : ""}</p></div>`
        : `<div class="investigation-note pending"><small>调查补充</small><button class="evidence-hit" data-clue="${p.clue}">${p.known}</button></div>`
      : `<div class="investigation-note ${id === "linchuan" && hasCase("05") ? "" : "pending"}"><small>调查补充</small><p>${id === "linchuan" ? currentCase05().desc : p.known}</p></div>`;
    openModal(`<div class="modal-inner profile-layout"><div class="profile-photo"></div><div><p class="eyebrow">PERSONNEL RECORD / ${id.toUpperCase()}</p><h2>${p.name}</h2>
      <h3>登记资料</h3><div class="profile-facts"><div><small>年龄</small>${p.age}</div><div><small>职业登记</small>${p.job}</div><div><small>当前状态</small>${status}</div><div><small>档案可信度</small>${p.id === "guowen" ? "无法判定" : "待核实"}</div>${caseReference}</div>${supplement}</div></div>`);
  }

  function photoMarkup(type) {
    return "";
  }

  function renderPhotos() {
    const photos = [
      { id: "bus", title: "17号公路现场照片 01", meta: "BL04-PH-01 / 23:48?", metaClue: "official_photo_time", type: "hero", hot: [], visible: true },
      { id: "tracks", title: "17号公路足迹勘验照片 02", meta: "BL04-PH-02 / 未标时", type: "footprint-photo", hot: [["footprints","42%","36%","area-wide"]], visible: true },
      { id: "class", title: "2000届高三（2）班合照", meta: "扫描件 / 日期不明", type: "class-photo", hot: [["class_red_scarf","67%","24%","area-person"]], visible: hasCase("00") },
      { id: "camp", title: "2001民间搜救营地", meta: "BL01-PH-05", type: "camp-photo", hot: [["five_cups","40%","31%","area-object"]], visible: hasCase("01") },
      { id: "film", title: "纪录片底片 C-12", meta: "BL03-NG-C12", type: "film-photo", hot: [["photo_seventh","80%","28%","area-person"]], visible: hasCase("03") },
      { id: "1976", title: "1976气象站冬季合影", meta: "匿名论坛缓存", type: "station-photo", hot: [["photo_1976_boy","1%","28%","area-person"]], visible: hasDoc("photo1976") }
    ].filter(p => p.visible);
    const canCompare = hasClue("photo_seventh") && hasClue("class_red_scarf");
    const canCompare1976 = hasClue("photo_1976_boy") && hasClue("guowen_red_scarf");
    return `<p class="section-lead">照片没有可见的调查圈。点击你认为异常的物件或人物；详细提示开启后，系统才会标出大致区域。已发现的观察内容会保留在照片下方。</p><div class="photo-grid ${state.hintLevel >= 2 ? "detailed-hints" : ""}">${photos.map(p => {
      const findings = (p.hot || []).filter(([id]) => hasClue(id));
      return `<article class="photo-card" data-photo-id="${p.id}" data-nav-target="photo:${p.id}">
      <div class="photo-frame ${p.type}">${photoMarkup(p.type)}${(p.hot || []).map((h, hotIndex) => {
        const found = hasClue(h[0]);
        const observation = String(hotIndex + 1).padStart(2, "0");
        return `<button class="hotspot ${h[3] || ""} ${found ? "found" : ""}" style="left:${h[1]};top:${h[2]}" data-clue="${h[0]}" data-observation-index="${observation}" aria-label="${found ? clueData[h[0]][0] : "检查照片细节"}">${found ? `${observation} ✓` : ""}</button>`;
      }).join("")}</div>
      <div class="photo-info"><h3>${p.title}${state.attention.includes(`photos:${p.id}`) ? `<em class="update-tag">NEW</em>` : ""}</h3>${p.metaClue ? inspectButton(p.metaClue, p.meta) : `<span>${p.meta}</span>`}</div>
      <button class="photo-expand" data-open-photo="${p.id}" aria-label="放大查看${p.title}">⤢ 放大取证</button>
      ${findings.length ? `<section class="photo-findings"><h4>已记录的观察</h4>${findings.map(([id]) => {
        const observation = String((p.hot || []).findIndex(([hotId]) => hotId === id) + 1).padStart(2, "0");
        return `<div class="photo-finding"><b>观察${observation} · ${clueData[id][0]}</b><p>${clueData[id][1]}</p></div>`;
      }).join("")}</section>` : ""}</article>`;
    }).join("")}</div>
      ${canCompare ? `<section class="compare-panel" data-nav-target="compare:2000-2003"><h3>两张照片出现了相似细节</h3><p>2000合照和2003底片中都出现了红围巾少年。只有主动对照，才能判断是否为同一人。</p><button class="btn ghost" data-compare-photos>${hasClue("guowen_red_scarf") ? "✓ 对比结论已记录" : "对比2000合照与2003底片"}</button></section>` : ""}
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
    const attention = state.attention.includes(`archive:${doc.id}`);
    const tag = doc.case ? "NEW" : "UPDATE";
    return `<article class="archive-row ${available ? "" : "locked"} ${attention ? "has-update" : ""}" data-nav-target="doc:${doc.id}" ${available ? `data-doc="${doc.id}"` : ""}><span class="archive-code">${available ? doc.code : "RESTRICTED"}</span><span class="archive-title">${available ? doc.title : "访问权限不足"}${attention ? `<em class="update-tag">${tag}</em>` : ""}</span><span class="archive-meta">${available ? doc.meta : "LOCKED"}</span></article>`;
  }

  function activeCaseId() {
    if (!hasEvidence("EV01") || !hasEvidence("EV10")) return "04";
    if (!hasEvidence("EV02")) return "00";
    if (!hasEvidence("EV04")) return "01";
    if (!hasEvidence("EV08")) return "03";
    if (!hasEvidence("EV16")) return "04";
    return null;
  }

  function docBelongsToCase(doc, caseId) {
    if (doc.case === caseId) return true;
    if (caseId === "04" && ["envelope", "passengers", "snowSurvey", "weather", "memo"].includes(doc.id)) return true;
    return false;
  }

  function renderArchive() {
    const filter = ["all", "current", "updates", "unchecked"].includes(state.archiveFilter) ? state.archiveFilter : "all";
    const caseId = activeCaseId();
    const currentTarget = currentInvestigation().target;
    const docs = archiveData.filter(doc => {
      if (filter === "all") return true;
      if (filter === "updates") return state.attention.includes(`archive:${doc.id}`);
      if (filter === "unchecked") return archiveAvailable(doc) && !state.viewed.includes(doc.id);
      return archiveAvailable(doc) && (docBelongsToCase(doc, caseId) || currentTarget === `doc:${doc.id}`);
    });
    const filters = [["all","全部"],["current","当前案件"],["updates","NEW / UPDATE"],["unchecked","未检查"]];
    return `<p class="section-lead">筛选只改变文件排列，不会揭示档案中的异常。NEW在首次打开原始文件后消失。</p><div class="archive-filters" role="group" aria-label="资料筛选">${filters.map(([id,label]) => `<button class="${filter === id ? "active" : ""}" data-archive-filter="${id}">${label}</button>`).join("")}</div><div class="archive-list">${docs.length ? docs.map(d => archiveRow(d)).join("") : `<div class="empty-filter">此筛选下没有待处理文件。</div>`}</div>`;
  }

  function inspectButton(clue, label) {
    return `<button class="evidence-hit ${hasClue(clue) ? "found" : ""}" data-clue="${clue}">${label}</button>`;
  }

  function openDocument(id) {
    const d = archiveData.find(x => x.id === id);
    if (!d || !archiveAvailable(d)) return;
    clearAttention("archive", id);
    addUnique(state.viewed, id);
    const seatRecheck = hasClue("seat_gap") && (state.hypotheses.includes("S01") || hasEvidence("EV08") || hasClue("guowen_red_scarf"))
      ? `<p class="document-note">再次触摸5B椅背时，松动的蒙皮下露出一角被撕过的车票。</p><button class="inspect-btn" data-hidden="H03">取出5B夹层里的2004-12-17残票</button>`
      : "";
    const h02Available = hasEvidence("EV08") || hasEvidence("EV16");
    const envelopeSeal = h02Available
      ? `<button class="inspect-btn" data-hidden="H02">检查二次粘合的封口</button>`
      : `<p>封口处似乎曾被二次粘合，但纸层仍粘得很紧。</p>`;
    const bodies = {
      envelope: `<p>2005年1月19日，林川收到一个没有寄件人的档案袋。</p><ul><li>2004年巴士现场照片一张</li><li>巴士乘客名单一份</li><li>2000届旧学生合照一张</li><li>手写纸条一张</li></ul><p class="document-note">不要数他们。</p><p>四份材料背面似乎都有相同的蓝色铅笔批注，但数字被水渍覆盖，只能辨认：<b>__ : 47</b>。</p>${envelopeSeal}`,
      passengers: `<table><tr><th>座位</th><th>姓名</th><th>年龄</th><th>职业</th></tr><tr><td>1A</td><td>周启明</td><td>36</td><td>司机</td></tr><tr><td>1B</td><td>林雪</td><td>25</td><td>教师</td></tr><tr><td>2A</td><td>罗诚</td><td>25</td><td>个体经营</td></tr><tr><td>2B</td><td>韩敬山</td><td>51</td><td>退休</td></tr><tr><td>3A</td><td>陆文山</td><td>48</td><td>医生</td></tr><tr><td>3B</td><td>唐国辉</td><td>52</td><td>机械工</td></tr><tr><td>4A</td><td>顾宁</td><td>31</td><td>图书管理员</td></tr><tr><td>4B</td><td>邱明</td><td>34</td><td>记者</td></tr><tr><td>5A</td><td>郭文</td><td>不详</td><td>不详</td></tr><tr><td>${inspectButton("seat_gap","5B")}</td><td>—</td><td>—</td><td>椅面磨损</td></tr></table><p>本次登记乘客：${inspectButton("passenger_count","9名")}</p>${seatRecheck}`,
      snowSurvey: `<p>白岭县公安局 · 17号公路现场勘验附表</p><table><tr><th>测点</th><th>位置</th><th>雪深</th></tr><tr><td>A</td><td>巴士车门外侧</td><td>6 cm</td></tr><tr><td>B</td><td>道路北侧路肩</td><td>7 cm</td></tr><tr><td>C</td><td>排水沟边缘</td><td>5 cm</td></tr></table><p>三个测点未见明显二次覆盖，现场平均雪深记录为${inspectButton("snow_depth","约6厘米")}。</p><p class="document-note">附表填写时间：22:16。照片入库系统随后将现场照片标注为23:48。</p>`,
      leave: `<p>白岭中学高三（2）班 · 2000年12月23日请假登记</p><table><tr><th>项目</th><th>人数</th></tr><tr><td>集体外出请假</td><td>${inspectButton("leave_count","7")}</td></tr><tr><td>已返校</td><td>2</td></tr><tr><td>警方记录失踪</td><td>4</td></tr></table><p>班主任签字处被重新覆盖。附页中，林雪与罗诚的两份口供都在${inspectButton("time_2000","19:47")}处中断。</p>`,
      roster: `<p>学生编号索引（残页）</p><table><tr><th>学号</th><th>姓名</th></tr><tr><td>15</td><td>林雪</td></tr><tr><td>16</td><td>罗诚</td></tr><tr><td>${inspectButton("missing17","17")}</td><td class="redaction">郭文</td></tr><tr><td>18</td><td>方敏</td></tr><tr><td>19</td><td>陈浩</td></tr></table><p>第17号原始卡片已从档案夹中抽走。</p>`,
      physical: `<p>2000年度学生体格检查表 · 复印残页</p><table><tr><th>编号</th><th>姓名</th><th>出生年</th><th>身高</th></tr><tr><td>17</td><td>${inspectButton("health_guowen","郭文")}</td><td>1983</td><td>171cm</td></tr></table><p>备注：左颈部有旧冻伤；检查时佩戴红色围巾。</p>`,
      camp: `<p>2001年2月12日，临时营地勘验记录。</p><table><tr><th>物件</th><th>数量</th></tr><tr><td>睡袋</td><td>4</td></tr><tr><td>搪瓷杯</td><td>${inspectButton("five_cups","5（A—E）")}</td></tr><tr><td>使用过的餐具</td><td>5</td></tr></table><p>雪面测绘图还标出了${inspectButton("camp_five_depressions","五处相邻睡眠压痕")}，与四个睡袋的位置并不完全重合。</p><p class="document-note">方志远页边批注：北坡下面一直有风，可那里没有山洞。废弃维修井的铁牌还在响。</p><p>方志远随身笔记的最后一行只有时间：${inspectButton("time_2001","19:47")}。</p>`,
      supplies: `<p>北山民间搜救队 · 物资领用</p><table><tr><th>姓名</th><th>背包</th><th>睡袋</th></tr><tr><td>周启明</td><td>1</td><td>1</td></tr><tr><td>苏琴</td><td>1</td><td>1</td></tr><tr><td>高远</td><td>1</td><td>1</td></tr><tr><td>方志远</td><td>1</td><td>1</td></tr></table><p>物资合计：${inspectButton("four_supplies","4套装备")}。没有额外领用签字。</p>`,
      crew: `<p>《白岭以后》纪录片摄制合同</p><table><tr><th>姓名</th><th>职责</th></tr><tr><td>陈垣</td><td>导演</td></tr><tr><td>唐慧</td><td>制片</td></tr><tr><td>顾晨</td><td>摄影</td></tr><tr><td>李泽</td><td>录音</td></tr><tr><td>孟兰</td><td>研究</td></tr><tr><td>赵航</td><td>司机</td></tr></table><div class="document-fact-lines"><p><b>成员登记</b>${inspectButton("team_six","6名")}</p><p><b>餐饮附件</b>${inspectButton("meal_seven","连续三晚的七份套餐发票")}</p><p><b>底片时间</b>C-12曝光于${inspectButton("time_2003","19:47")}</p></div>`,
      weather: `<p>北山气象观测站 · 逐时雪深</p><table><tr><th>时间</th><th>雪深</th></tr><tr><td>21:00</td><td>4cm</td></tr><tr><td>${inspectButton("weather_record","22:00")}</td><td>6cm</td></tr><tr><td>23:00</td><td>9cm</td></tr><tr><td>00:00</td><td>13cm</td></tr></table>`,
      memo: `<p>韩敬山私人便笺，纸张日期早于现场发现约九小时。</p><p class="document-note">17号路。乘客9。${inspectButton("forecast_eight","脚印8")}。不要让他们再次点名。</p><p>随便笺附存的无线电抄件显示，巴士在${inspectButton("time_2004","19:47")}后停止回应。</p><p>夹在末页的底片登记副本仍写着${inspectButton("original_photo_time","22:08") }，旁边注明：相机已于当日校时；系统入库值为23:48。</p><p class="document-note">便笺夹页背面另有一句被反复划掉的话：${inspectButton("experiment_seven","不要再查那个7号实验。")}</p>`,
      ame: `<p>附加成员效应观察 · AME-7 · 1991/12/19</p><p>${inspectButton("ame_report","六名受试者在19:47后均报告：实验室自始至终有第七名成员，姓名为“郭文”。")}监控画面无法确认该成员进入过程。</p><p>${inspectButton("extra_member","次日复测仅能确认五名受试者。第六人的姓名在花名册中缺失，其余受试者均否认曾存在第六人。")} </p>`,
      facility: `<p>北山废弃维护通道图 · 1974</p><p>${inspectButton("facility","三条封闭支路分别通向北山气象站、17号公路旧涵洞与白岭北坡临时营地。")}</p><div class="document-note"><b>后期手写批注</b><br>1991年12月<br>B区重新启用<br>用途：环境适应观察<br>项目：${inspectButton("ame_partial","AME-?") }<br><small>最后一位数字因水渍无法辨认。</small></div>`
    };
    openModal(`<article class="document"><header class="document-head"><small>${d.code}</small><h2>${d.title}</h2></header><div class="document-body">${bodies[id] || "<p>文档损坏。</p>"}</div></article>`);
    save();
  }

  function renderWeb() {
    const history = state.searches.slice().reverse();
    return `<div class="search-panel"><p class="section-lead">恢复自2000—2005年的网页缓存。只有资料中出现过的关键词会返回有效结果。</p>
      <form class="search-box" id="search-form"><input id="search-input" data-nav-target="web:search" autocomplete="off" placeholder="输入档案中出现过的关键词或组合词…" aria-label="搜索旧网页"><button>检索</button></form>
      <div class="search-results">${history.length ? history.map(searchResult).join("") : `<div class="search-result"><span class="search-url">LOCAL INDEX / WAITING</span><h3>最近搜索：暂无</h3><p>可从档案中出现过的人名、地点、日期或项目编号开始。</p></div>`}</div></div>`;
  }

  function normalizeQuery(q) { return q.toLowerCase().replace(/[\s·\-—_:：]/g, ""); }

  function runSearch(query) {
    if (state.finalStarted) return toast("索引已冻结", "最终阶段开始后不能恢复新的普通网页资料。");
    const q = normalizeQuery(query);
    let type = "none";
    const hasPlace = q.includes("白岭") || q.includes("北山");
    const hasXu = q.includes("许");
    const xuAnchors = [q.includes("白岭"), q.includes("bl17"), q.includes("5b"), q.includes("2004")].filter(Boolean).length;
    const validXuQuery = state.hidden.includes("H03") && ((hasXu && xuAnchors >= 1) || (q.includes("bl17") && q.includes("5b")));
    if (q.includes("1947") && hasPlace) { type = "time"; discoverClue("repeated_time"); }
    else if (q.includes("1947")) type = "refine_time";
    else if (validXuQuery) {
      type = "xu";
      discoverClue("xu_deleted");
      toast("删除记录已恢复", "许×的电子索引已加入证据板，可以继续核对5B的三份记录。", "evidence");
    }
    else if (hasXu || q.includes("bl17") || q.includes("5b")) type = "refine_xu";
    else if ((q.includes("红围巾") && hasPlace) || (q.includes("郭文") && q.includes("白岭"))) {
      type = "1976";
      if (addUnique(state.unlockedDocs, "photo1976")) markAttention("photos", "1976");
      toast("照片缓存恢复", "1976年气象站冬季合影已加入照片库");
    }
    else if (q.includes("红围巾") || q.includes("郭文")) type = "refine_red";
    else if (q.includes("ame7")) {
      if (hasClue("ame_code") || hasDoc("ame") || hasClue("ame_report")) {
        type = "ame";
        if (addUnique(state.unlockedDocs, "ame")) markAttention("archive", "ame");
        toast("缓存恢复", "AME-7观察报告已加入资料库");
      } else type = "locked_ame";
    }
    else if (q.includes("附加成员") || q.includes("ame")) type = "refine_ame";
    else if (q.includes("北山") && (q.includes("地下") || q.includes("维护通道") || q.includes("维修井") || q.includes("旧涵洞"))) { type = "facility"; if (addUnique(state.unlockedDocs, "facility")) markAttention("archive", "facility"); toast("地图恢复", "北山废弃维护通道图已加入资料库"); }
    else if (q.includes("地下") || q.includes("维护通道") || q.includes("维修井") || q.includes("旧涵洞")) type = "refine_facility";
    else if (hasPlace) type = "broad_place";
    const entry = { query, type, time: Date.now() };
    state.searches = state.searches.filter(item => normalizeQuery(item.query) !== q);
    state.searches.push(entry);
    state.searches = state.searches.slice(-10);
    save();
    render();
  }

  function searchResult(r) {
    const result = {
      time: ["[缓存] 1988年白岭电网事故简报", "北山线路在19:47出现持续七分钟的异常负载，保护装置却没有记录短路。该记录早于四起失踪案。"],
      "1976": ["[缓存] 北山气象站冬季合影", "一张受损的旧合影已经恢复到照片库。索引页没有人物姓名，需在照片中自行检查。"],
      ame: ["AME-7：附加成员效应观察", "来自已关闭研究所的目录页。完整报告已恢复到资料库。"],
      facility: ["北山气象站维护工程图", "旧气象站、17号公路和2001营地并非三个独立地点。1974维护图已恢复到资料库，图纸底部似乎有后期手写批注。"],
      locked_ame: ["项目目录无法定位", "当前资料中尚未建立完整项目编号。请先从原始档案复原编号，再重新检索。"],
      refine_time: ["结果过多：19:47", "时间无法单独定位档案。请加入案件地点，例如“白岭”或“北山”。"],
      refine_red: ["图像索引未定位", "人物特征过于宽泛。请把“红围巾”或姓名与案件地点组合检索。"],
      refine_ame: ["项目索引残损", "“附加成员”只出现在损坏目录中。请查找完整项目编号。"],
      refine_facility: ["工程档案未定位", "维护设施数量过多。请加入山地区域名称缩小范围。"],
      xu: ["[损坏缓存] 2004白岭乘车人员索引", "许×，男，24岁。车辆编号BL-17，座位5B。该人物索引已于2004-12-18删除，原始登记页不存在。删除记录已加入证据板。"],
      refine_xu: ["没有可验证的人物记录", "残存姓氏无法单独定位。请组合姓氏、地点与年份。"],
      broad_place: ["找到 3 条残损摘要", "北山维修站冬季招聘记录<br>白岭17号路道路养护公告<br>[损坏] 北坡工程图（索引字段缺失）"],
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
      ${confirmed === 4 ? `<button class="btn ghost" data-nav-target="timeline:compare" data-compare-times>${hasClue("case_times") ? "✓ 跨案件时间已记录" : "比对四案记录"}</button>` : ""}`;
  }

  function reasoningToken(id) {
    if (clueData[id]) return clueData[id];
    const prior = hypothesisRecipes.find(item => item.id === id);
    return prior ? [prior.title, prior.text] : [id, "待核实的调查记录。"];
  }

  const clueSources = {
    passenger_count: "2004乘客名单", passenger_links: "人物档案交叉核对", seat_gap: "2004座位图 · 5B", footprints: "足迹勘验照片02",
    snow_depth: "2004现场雪深附表", official_photo_time: "现场照片入库标记", original_photo_time: "韩敬山便笺夹页",
    leave_count: "2000请假登记", missing17: "2000学生编号索引", health_guowen: "2000体检残页",
    five_cups: "2001营地勘验", four_supplies: "2001物资领用表", team_six: "2003摄制合同", photo_seventh: "纪录片底片C-12",
    guowen_red_scarf: "2000合照 × 2003底片", weather_record: "气象站逐时雪深", forecast_eight: "韩敬山私人便笺",
    case_times: "跨案件时间线", repeated_time: "1988电网事故缓存", ame_partial: "1974维护图批注", experiment_seven: "韩敬山便笺夹页",
    ame_code: "两份残缺记录组合", ame_report: "AME-7观察报告", extra_member: "AME-7复测记录", facility: "北山维护通道图",
    ticket_xu: "5B椅背夹层残票", xu_deleted: "2004乘车索引缓存"
  };

  const clueSourceTargets = {
    passenger_count: ["archive","doc:passengers"], passenger_links: ["people","person:linxue"], seat_gap: ["archive","doc:passengers"], footprints: ["photos","photo:tracks"],
    snow_depth: ["archive","doc:snowSurvey"], official_photo_time: ["photos","photo:bus"], original_photo_time: ["archive","doc:memo"],
    leave_count: ["archive","doc:leave"], missing17: ["archive","doc:roster"], health_guowen: ["archive","doc:physical"],
    five_cups: ["archive","doc:camp"], four_supplies: ["archive","doc:supplies"], team_six: ["archive","doc:crew"], photo_seventh: ["photos","photo:film"],
    guowen_red_scarf: ["photos","compare:2000-2003"], weather_record: ["archive","doc:weather"], forecast_eight: ["archive","doc:memo"],
    case_times: ["timeline","timeline:compare"], repeated_time: ["web","web:search"], ame_partial: ["archive","doc:facility"], experiment_seven: ["archive","doc:memo"],
    ame_report: ["archive","doc:ame"], extra_member: ["archive","doc:ame"], facility: ["archive","doc:facility"], ticket_xu: ["archive","doc:passengers"], xu_deleted: ["web","web:search"],
    time_2000: ["archive","doc:leave"], time_2001: ["archive","doc:camp"], time_2003: ["archive","doc:crew"], time_2004: ["archive","doc:memo"]
  };

  function clueVerification(id) {
    const completed = [...recipes.filter(r => hasEvidence(r.id)), ...hypothesisRecipes.filter(r => state.hypotheses.includes(r.id)), ...discoveryRecipes.filter(r => hasClue(r.id))];
    if (completed.some(item => item.needs.includes(id))) return "已用于结论";
    const candidates = [...recipes, ...hypothesisRecipes, ...discoveryRecipes].filter(item => !hasEvidence(item.id) && !state.hypotheses.includes(item.id) && !hasClue(item.id) && item.needs.includes(id));
    if (candidates.some(item => item.needs.every(need => need === id || hasClue(need) || state.hypotheses.includes(need)))) return "可建立结论";
    return "待独立佐证";
  }

  function renderClueCard(id, selected) {
    const token = reasoningToken(id);
    const source = clueSourceTargets[id];
    return `<article class="clue-card" data-nav-target="clue:${id}"><button class="clue-chip ${selected.includes(id) ? "selected" : ""}" data-select-clue="${id}"><b>${token[0]}</b><span class="clue-origin">来源：${clueSources[id] || "已检查的原始档案"}</span><span class="clue-state">${clueVerification(id)}</span><small>${token[1]}</small></button>${source ? `<button class="source-return" data-go-section="${source[0]}" data-go-target="${source[1]}">返回原始来源 ↗</button>` : ""}</article>`;
  }

  function investigationDirections() {
    const hasPattern = hasEvidence("EV16");
    const hasExperiment = hasEvidence("EV18");
    const hasMember = hasEvidence("EV08") && hasEvidence("EV16");
    const directions = [
      {
        code: "DIRECTION A",
        title: "暴雪事故",
        status: hasPattern ? "无法独立解释" : hasEvidence("EV10") ? "出现矛盾" : "待核实",
        support: hasClue("weather_record") ? "现场确有强降雪与道路封闭。" : "恶劣天气仍可能解释部分现场状态。",
        gap: hasPattern ? "跨越多个年代的19:47异常无法由单次暴雪解释。" : hasEvidence("EV10") ? "九名乘客与八组离车脚印仍未解释。" : "尚未完成现场人数核对。"
      },
    ];
    if (hasEvidence("EV10") && !hasClue("photo_seventh") && !hasEvidence("EV07")) directions.push({
      code: "DIRECTION ?",
      title: "未知人为因素？",
      status: "待核实",
      support: "登记人数与现场离车痕迹无法对应。",
      gap: "尚无影像或身份材料能说明缺口来自谁。"
    });
    if (hasDoc("facility") || hasClue("ame_partial") || hasClue("ame_code") || hasExperiment) directions.push({
        code: "DIRECTION B",
        title: "地下实验",
        status: state.hidden.includes("H01") ? "出现致命矛盾" : hasExperiment ? "主要方向" : "有支持",
        support: hasExperiment ? "AME-7记录与数起事件地点已经建立关联。" : hasDoc("facility") ? "维护通道存在，但与实验报告尚未形成结论。" : "尚未取得设施与实验的直接关联。",
        gap: state.hidden.includes("H01") ? "1976影像早于AME-7，实验不能解释异常起点。" : "更早年代的影像仍未确认。"
      });
    if (hasClue("photo_seventh") || hasEvidence("EV07") || hasEvidence("EV08")) directions.push({
        code: "DIRECTION C",
        title: "第七人",
        status: hasMember ? "主要方向" : "有支持",
        support: hasMember ? "跨案影像与19:47共同支持人数异常反复出现。" : hasEvidence("EV07") ? "2003底片已出现名单外人影。" : "尚未完成跨年代人物对比。",
        gap: state.hypotheses.includes("S03") ? "5B删除记录证明名单曾变化，但郭文与许姓乘客的关系未知。" : hasExperiment ? "仍无法解释实验记录中的人数减少。" : "名单变化及实验记录尚未核对。"
      });
    return directions;
  }

  function evidenceTheme() {
    if (!hasEvidence("EV01") || !hasEvidence("EV10")) return { title: "2004巴士与现场", ids: ["passenger_count", "seat_gap", "passenger_links", "footprints", "official_photo_time"] };
    if (!hasEvidence("EV02")) return { title: "2000学校记录", ids: ["leave_count", "missing17", "health_guowen", "time_2000"] };
    if (!hasEvidence("EV04")) return { title: "2001营地", ids: ["five_cups", "camp_five_depressions", "four_supplies", "time_2001"] };
    if (!hasEvidence("EV08")) return { title: "2003摄制记录与影像", ids: ["team_six", "meal_seven", "photo_seventh", "class_red_scarf", "guowen_red_scarf", "time_2003"] };
    if (!hasEvidence("EV13") || !hasEvidence("EV15")) return { title: "2004现场时间复核", ids: ["snow_depth", "weather_record", "official_photo_time", "original_photo_time", "forecast_eight", "footprints"] };
    if (!hasEvidence("EV16")) return { title: "跨案件时间", ids: ["time_2000", "time_2001", "time_2003", "time_2004", "case_times", "repeated_time"] };
    if (!hasEvidence("EV18")) return { title: "北山设施与实验记录", ids: ["facility", "ame_partial", "experiment_seven", "ame_code", "ame_report", "extra_member"] };
    return { title: "历史影像与身份记录", ids: ["photo_1976_boy", "class_red_scarf", "guowen_red_scarf", "ame_report", "facility"] };
  }

  function latestHumanReaction() {
    if (hasEvidence("EV08")) return ["2003 · 陈垣剪辑批注", "“顾晨说画面里那个人一直都在。可我昨天没有见过他。”"];
    if (hasEvidence("EV04")) return ["2001 · 方志远笔记", "“苏琴问我为什么准备了第五个杯子。我记得不是我准备的。”"];
    if (hasEvidence("EV02")) return ["2000 · 林雪口供夹页", "“老师点到第七个名字时停了一下。第二天，他们说从来没有第七个人。”"];
    return null;
  }

  function renderEvidence() {
    const discoveredClues = state.clues.filter(id => !id.startsWith("link_") && id !== "guowen_identity");
    const reusableConclusions = state.hypotheses.filter(id => id === "S01");
    const boardClues = [...discoveredClues, ...reusableConclusions];
    state.selected = state.selected.filter(id => boardClues.includes(id));
    const selected = state.selected;
    const evidenceCards = recipes.filter(r => hasEvidence(r.id));
    const hypotheses = hypothesisRecipes.filter(h => state.hypotheses.includes(h.id));
    const directions = investigationDirections();
    const theme = evidenceTheme();
    if (state.evidenceThemeKey !== theme.title) {
      state.evidenceThemeKey = theme.title;
      state.otherCluesExpanded = false;
    }
    const themed = boardClues.filter(id => theme.ids.includes(id));
    const currentClues = themed.length >= 3 ? themed : [];
    const otherClues = boardClues.filter(id => !currentClues.includes(id));
    const reaction = latestHumanReaction();
    return `<p class="section-lead">选择2—3条已发现线索，尝试建立结论。无效组合不会损失进度。</p><div class="evidence-layout">
      <section class="clue-bank">${currentClues.length ? `<div class="current-clue-group"><h3>${theme.title} · ${currentClues.length}</h3><p>按案件主题归档，其中包含旁证与背景记录；系统不会标出正确组合。</p><div class="clue-chips">${currentClues.map(id => renderClueCard(id, selected)).join("")}</div></div><section class="other-clues"><button class="other-clues-toggle" data-toggle-other-clues aria-expanded="${state.otherCluesExpanded}"><span>其他已记录 · ${otherClues.length}</span><b>${state.otherCluesExpanded ? "收起 ▾" : "展开 ▸"}</b></button>${state.otherCluesExpanded ? `<div class="clue-chips">${otherClues.length ? otherClues.map(id => renderClueCard(id, selected)).join("") : `<span class="section-lead">暂无其他记录。</span>`}</div>` : ""}</section>` : `<h3>可用于推理的线索 · ${otherClues.length}</h3><div class="clue-chips">${otherClues.length ? otherClues.map(id => renderClueCard(id, selected)).join("") : `<span class="section-lead">检查照片、人物与文档以记录线索。</span>`}</div>`}</section>
      <section class="conclusion-panel"><h3>推理槽</h3><div class="combine-tray ${selected.length ? "" : "empty"}">${selected.map(id => `<button class="clue-chip selected" data-select-clue="${id}">${reasoningToken(id)[0]}</button>`).join("")}</div><button class="combine-btn" data-combine ${selected.length < 2 ? "disabled" : ""}>建立结论</button></section>
    </div>${reaction ? `<aside class="human-reaction"><span>原始材料边注 / 不作为证据</span><b>${reaction[0]}</b><p>${reaction[1]}</p></aside>` : ""}${hasClue("ame_code") ? `<article class="keyword-recovery"><span class="ev-code">RECOVERED SEARCH KEY</span><b>AME-7</b><p>完整项目编号已经复原。前往旧网页索引检索该编号。</p></article>` : ""}<div class="evidence-cards">${evidenceCards.map(r => `<article class="evidence-card"><span class="ev-code">EVIDENCE ${String(recipes.indexOf(r) + 1).padStart(2, "0")} / ${recipes.length}</span><h4>${r.title}</h4><p>${r.text}</p></article>`).join("")}</div>
      ${hypotheses.length ? `<h3>调查假设</h3><div class="evidence-cards">${hypotheses.map(h => {
        const overturned = state.overturned.includes(h.id);
        const status = h.support ? "辅助推论" : overturned ? "已推翻" : "暂定";
        return `<article class="hypothesis-card ${overturned ? "overturned" : ""}"><span class="ev-code">${h.id} / ${status}</span><h4>${h.title}</h4><p>${h.text}</p></article>`;
      }).join("")}</div>` : ""}<section class="investigation-directions"><p class="eyebrow">ACTIVE THEORIES</p><h3>当前调查方向</h3><p>这些不是答案，而是现有材料能够支持到的解释。新的证据会改变其状态与缺口。</p><div class="direction-grid">${directions.map(direction => `<article class="direction-card"><span class="ev-code">${direction.code} / ${direction.status}</span><h4>${direction.title}</h4><dl><dt>现有支持</dt><dd>${direction.support}</dd><dt>仍待解释</dt><dd>${direction.gap}</dd></dl></article>`).join("")}</div></section>`;
  }

  function combineEvidence() {
    if (state.finalStarted) return toast("证据板已封存", "最终阶段开始时，当前证据状态已经锁定。");
    const selected = [...state.selected].sort();
    const match = recipes.find(r => !hasEvidence(r.id) && r.needs.length === selected.length && [...r.needs].sort().every((x,i) => x === selected[i]));
    const hypothesis = hypothesisRecipes.find(r => !state.hypotheses.includes(r.id) && r.needs.length === selected.length && [...r.needs].sort().every((x,i) => x === selected[i]));
    const discovery = discoveryRecipes.find(r => !hasClue(r.id) && r.needs.length === selected.length && [...r.needs].sort().every((x,i) => x === selected[i]));
    if (!match && !hypothesis && !discovery) {
      toast("无法建立结论", "这些线索之间缺少直接联系。尝试对照人数、时间或同一人物。" );
      return;
    }
    if (discovery) {
      state.clues.push(discovery.id);
      state.selected = [];
      toast("检索词复原", discovery.title, "evidence");
      save();
      render();
      return;
    }
    if (hypothesis) {
      const contradicted = hypothesis.blockedBy === "H01" ? state.hidden.includes("H01")
        : hypothesis.blockedBy ? state.hypotheses.includes(hypothesis.blockedBy) : false;
      if (contradicted) {
        state.selected = [];
        toast("假设无法成立", "已有证据与该解释直接冲突，不能把它记录为阶段性推论。", "evidence");
        save(); render(); return;
      }
      state.hypotheses.push(hypothesis.id);
      state.selected = [];
      toast(hypothesis.support ? "辅助推论" : "暂定推论", hypothesis.title, "evidence");
      if (hypothesis.id === "S01") {
        markAttention("archive", "passengers");
        toast("资料更新 · 建议复查", "九人名单无法解释5B的使用痕迹；乘客名单中的5B座位现有新的可检查内容。", "evidence");
      }
      updateHypotheses();
      save();
      render();
      return;
    }
    state.evidence.push(match.id);
    state.selected = [];
    toast(`核心证据 ${recipes.indexOf(match) + 1} / ${recipes.length}`, match.title, "evidence");
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
      [hasEvidence("EV13") && hasEvidence("EV15"), "确认2004现场时间异常与提前记录"],
      [hasEvidence("EV16"), "解释四案共同出现的19:47"],
      [hasEvidence("EV18"), "复原AME-7编号并找到附加成员记录"]
    ];
  }

  function currentHints() {
    if (state.finalStarted) return ["最终阶段已经开始，普通调查状态已锁定。", "你只能再完成两项最终调查，并选择一项资料处置。1976行动恢复的照片仍允许手动检查。", "进入19:32时普通核心证据已经锁定，但最终调查仍可能恢复少量关键档案，从而改变最终判断。"];
    if (!hasEvidence("EV01") || !hasEvidence("EV10")) return ["从2004案开始。这些乘客中似乎有不少人与旧案有关。", "不用确认所有人，先找出足以证明这不是随机同行的关系；再在现场照片里寻找离车痕迹。", "确认至少五名乘客与前三案存在直接联系即可形成‘乘客的共同关系’；补全全部八人是可选调查。分别把关系、脚印与乘客人数进行组合。"];
    if (!hasEvidence("EV02")) return ["2000年的官方口径是六人，但学校系统并不完全同意。", "对照请假人数、连续学号与体检记录。", "资料库的三份2000学校档案分别提供三条所需线索。"];
    if (!hasEvidence("EV04")) return ["生活痕迹和装备数量说的是两种人数。", "检查2001营地勘验与物资领用表。", "组合‘第五只杯子’与‘四人份物资’。"];
    if (!hasEvidence("EV07") || !hasEvidence("EV08")) return ["先确认摄影团队本应有多少人，再观察底片边缘。", "在2000班级照后排和2003底片右侧树林里寻找相同颜色。", "分别记录两张照片中的人影，然后使用照片页出现的‘对比’操作。"];
    if (!hasEvidence("EV13") || !hasEvidence("EV15")) return ["现场照片的标注时间，和书面勘验记录能同时成立吗？标注不可信不等于相机一定损坏。", "先查2004案的雪深测量附表，再到气象记录核对逐时雪深；韩敬山便笺中还有原始底片登记副本。", "现场雪深＋气象记录可证明标注不可信；官方入库时间＋原始底片时间可继续判断是否有人为改写。私人便笺的‘8’还能与独立足迹照片组合。"];
    if (!hasEvidence("EV16")) return ["有一个时间出现在每起案件里，但开场材料只剩下分钟数。", "分别检查2000口供、2001营地笔记、2003底片附件和2004无线电抄件，再到时间线主动比对。", "四案确认后记录‘跨案件时间’，再检索‘白岭 19:47’寻找早于四案的独立记录。"];
    if (!hasEvidence("EV18")) {
      if (!hasDoc("facility")) return ["三处案发地点也许不是彼此独立。", "从旧网页检索北山的地下设施或维护通道。", "组合地点名称‘北山’与设施类型‘地下设施’，恢复1974维护图。"];
      if (!hasClue("ame_partial")) return ["1974维护图在多年后被人重新使用过。", "检查图纸底部的后期手写批注。", "记录水渍覆盖的项目编号‘AME-?’。"];
      if (!hasClue("experiment_seven")) return ["模糊编号的最后一位数字也许在其他调查者的记录里。", "复查韩敬山私人便笺的夹页背面。", "记录他划掉的‘7号实验’。"];
      if (!hasClue("ame_code")) return ["两条残缺记录描述的可能是同一个项目。", "把‘AME-?’与‘7号实验’放进证据板。", "组合两条线索，复原完整检索词。"];
      if (!hasDoc("ame")) return ["你已经得到一个完整项目编号。", "旧网页索引只会响应资料中已经复原的专有名词。", "检索‘AME-7’，恢复观察报告。"];
      return ["报告与维护通道图还没有形成地点关联。", "分别记录报告中的两处异常和维护图的通道信息。", "组合AME-7记录、实验组人数减少与地下设施通道。"];
    }
    return ["CASE 05已经出现。你可以继续调查，也可以从案件页主动进入不可回头的最后15分钟。", "进入前建议复查雪层、韩敬山便笺、1976旧照、档案袋夹层与5B座位。", "最高调查层级必须完成雪深与气象记录的推理，并包含红围巾疑似同一人、提前记录、19:47规律、AME-7地点关联和1976身份冲突。"];
  }

  function recentStageConclusions() {
    return [
      [hasEvidence("EV01") && hasEvidence("EV10"), "2004", "“这些人不是偶然同行。九个名字与八组脚印之间，还缺少一个解释。”"],
      [hasEvidence("EV02"), "2000", "“三份学校记录都给第七个人留了位置。问题不是他有没有存在过，而是谁把他删掉了。”"],
      [hasEvidence("EV04"), "2001", "“装备只够四个人，营地却像有第五个人生活过。周启明的记忆不是唯一记录。”"],
      [hasEvidence("EV08"), "2003", "“合同里没有那个少年，可镜头记住了他。旧网页和时间线也许能解释他为什么反复出现。”"],
      [hasEvidence("EV13") && hasEvidence("EV15"), "2004复核", "“雪深不支持23:48，韩敬山还提前写下了脚印数。官方时间不是单纯记错。”"],
      [hasEvidence("EV16"), "19:47", "“19:47早在这些案件之前就出现过。它不是整理旧案时才被复制进去的。”"],
      [hasEvidence("EV18"), "AME-7", "“地下通道把实验和失踪地点连在一起，但AME-7仍解释不了异常从哪里开始。”"]
    ].filter(item => item[0]).slice(-3);
  }

  function renderNotes() {
    const hints = currentHints();
    const level = Math.min(state.hintLevel, 2);
    const stages = [
      [hasEvidence("EV01") && hasEvidence("EV10"), "2004现场人数"], [hasEvidence("EV02"), "2000缺失学生"], [hasEvidence("EV04"), "2001第五人"],
      [hasEvidence("EV08"), "跨案红围巾"], [hasEvidence("EV13") && hasEvidence("EV15"), "2004时间与预知"], [hasEvidence("EV16"), "19:47规律"],
      [hasEvidence("EV18"), "地下设施 / AME-7"], [state.hidden.includes("H01"), "1976历史断点"]
    ];
    const currentStage = stages.findIndex(stage => !stage[0]);
    const wordBank = [];
    const addWord = word => { if (!wordBank.includes(word)) wordBank.push(word); };
    if (hasSystem("web") && hasClue("case_times")) { addWord("白岭"); addWord("19:47"); }
    if (hasSystem("web") && hasEvidence("EV16")) { addWord("北山"); if (state.viewed.includes("camp")) addWord("维修井"); }
    if (hasSystem("web") && state.hidden.includes("H03")) ["许", "BL-17", "5B", "2004"].forEach(addWord);
    if (hasSystem("web") && hasEvidence("EV18")) ["红围巾", "郭文"].forEach(addWord);
    const directTerms = hasSystem("web") && hasClue("ame_code") && !hasDoc("ame") ? ["AME-7"] : [];
    const hasTerms = wordBank.length || directTerms.length;
    const recent = recentStageConclusions();
    return `<section class="route-hint"><p class="eyebrow">导航提示 · 不揭示答案</p><p>当前建议使用：<b>${sectionTitles[currentInvestigation().section][1]}</b>。详细推理提示仍由右侧三层提示单独控制。</p></section><div class="notes-layout"><section><p class="section-lead">调查目标会自动更新，但不会直接给出答案。</p><div class="investigation-chain">${stages.map((stage, index) => `<span class="${stage[0] ? "done" : index === currentStage ? "current" : "locked"}">${stage[0] ? "✓" : index === currentStage ? "→" : "?"} ${stage[1]}</span>`).join("")}</div>${recent.length ? `<section class="recent-conclusions"><h3>林川调查笔记</h3>${recent.map(item => `<article><b>${item[1]}</b><p>${item[2]}</p></article>`).join("")}</section>` : ""}<div class="todo-list">${objectives().map(o => `<div class="todo ${o[0] ? "done" : ""}">${o[1]}</div>`).join("")}</div>${hasTerms ? `<section class="known-terms"><h3>调查词库</h3><p>词条按发现顺序收录，不提供配对关系。自行选择两至三个词；完整编号可直接带入。操作不会自动搜索。</p><div class="term-bank">${wordBank.map(term => `<button class="${state.searchDraft.includes(term) ? "active" : ""}" data-search-token="${term}">${term}</button>`).join("")}</div>${directTerms.map(term => `<button data-search-term="${term}">${term} ↗</button>`).join("")}${state.searchDraft.length ? `<div class="search-draft"><span>待检索：${state.searchDraft.join(" + ")}</span><button data-use-search-draft>填入旧网页</button></div>` : ""}</section>` : ""}</section>
      <aside class="hint-card"><p class="eyebrow">详细推理提示 ${level + 1} / 3</p><p>${hints[level]}</p><button data-hint>${level < 2 ? "再给一点提示" : "重置提示层级"}</button></aside></div>`;
  }

  function currentTruthLevel() {
    const full = ["EV08", "EV13", "EV15", "EV16", "EV18"].every(hasEvidence) && state.hidden.includes("H01");
    if (full) return "full";
    if (hasEvidence("EV08") && hasEvidence("EV16")) return "member";
    if (hasEvidence("EV18")) return "experiment";
    return "insufficient";
  }

  function finalActionData() {
    const level = currentTruthLevel();
    const facilityText = {
      insufficient: "旧记录并排列出：1976 5→6；1988 6→7；1991 12→13；2000 6→7；2001 4→5；2003 6→7；2004 9→10。没有字段说明箭头的含义。",
      experiment: "维护道日志列出多组人数箭头，并把AME-7与数起事件地点并列记录。它证明研究者长期追踪人数异常，但无法说明数字如何变化。",
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
      facility: { kind: "investigation", tag: "实验来源", title: "调查地下设施", desc: "追查维护道与AME-7实验", file: "BS-M / LAST LOG", text: facilityText },
      linxue: { kind: "investigation", tag: "人物动机", title: "寻找林雪资料", desc: "还原她在2000年后留下的记录", file: "LX / UNSENT", text: linxueText },
      guowen: { kind: "investigation", tag: "身份冲突", title: "调查郭文身份", desc: "追查身份记录冲突", file: "GW / CONFLICT", text: guowenText },
      han: { kind: "investigation", tag: "人为掩盖", title: "调查韩敬山", desc: "追查人为篡改与地方掩盖", file: "HJS / LAST NOTE", text: "韩敬山最后的手写记录：‘我没有数错。第一次是九个。第二次数的时候，是十个。我不知道多出来的是谁，但我知道少掉的是谁。’" },
      "1976": { kind: "investigation", tag: "历史断点", title: "检查1976事件", desc: "恢复实验出现前的气象站记录", file: "MET / 1976", text: state.hidden.includes("H01") ? "你完成了旧照对比：登记职工只有五人，最左侧的红围巾少年与二十四年后的郭文高度相似。" : "气象站冬季合影已经恢复到照片库。索引没有标注第六人的身份；必须回到照片页自行检查并与现有影像比对。" },
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
      return `<article class="file-card ${completed ? "selected-final final-complete" : ""}" ${interaction}><span class="file-index">${completed ? "ACTION COMPLETE" : kind === "investigation" ? "INVESTIGATE" : "DECIDE"}</span>${o.tag ? `<span class="final-type">${o.tag}</span>` : ""}<h3>${o.title}</h3><p>${o.desc}</p>${completed ? `<p class="reopen-note">点击重新阅读</p>` : ""}</article>`;
    }).join("");
    return `<div class="intro-card"><p class="eyebrow">FINAL WINDOW / 19:32—19:47</p><h2>暴雪再次来临</h2><blockquote>预计19:47山区道路全面封闭。你只能完成两项调查与一项处置。</blockquote>
      <p>这些调查补充不同方向的最终档案；其中某些仍可能改变你能够确认的真相。选择两项调查方向，再选择一项处置决定材料的去向。</p>
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
    if (action.kind === "investigation") {
      addUnique(meta.viewedFinalFiles, id);
      saveMeta();
    }
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
    const disposition = state.finalChoices.find(id => options[id]?.kind === "disposition");
    if (disposition) addUnique(meta.unlockedDispositions, disposition);
    saveMeta();
    renderMetaControls();
    save();
    render();
  }

  function investigationRating(level) {
    const completeFiles = state.evidence.length === recipes.length && state.hidden.length === 3 && state.hypotheses.includes("S03");
    const grade = level === "full" && completeFiles ? "S" : level === "full" ? "A" : level === "member" || level === "experiment" ? "B" : "C";
    const label = grade === "S" ? "完整证据链" : grade === "A" ? "主要规律确认，部分身份记录缺失" : grade === "B" ? "关键方向成立，关键环节未确认" : "证据不足，调查仍待继续";
    const dispositionNames = { publish: "公开", witness: "保护证人", seal: "封存" };
    const disposition = state.finalChoices.find(id => dispositionNames[id]);
    return `<section class="investigation-rating grade-${grade.toLowerCase()}"><div class="rating-grade"><small>调查评级</small><strong>${grade}</strong><span>${label}</span></div><div class="rating-breakdown"><div><span>核心证据</span><b>${state.evidence.length} / ${recipes.length}</b></div><div><span>异常档案</span><b>${state.hidden.length} / 3</b></div><div><span>第五号座位</span><b>${state.hypotheses.includes("S03") ? "已闭合" : "未闭合"}</b></div><div><span>最终行动</span><b>${state.finalChoices.length} / 3</b></div><div><span>资料处置</span><b>${dispositionNames[disposition] || "未记录"}</b></div></div></section>`;
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
    const hasPassengerRecord = state.hypotheses.includes("S03") || state.hidden.includes("H03");
    const tails = {
      facility: confident ? "如果箭头代表实际人数与共同记忆人数的差，那么研究者留下的是对异常的长期追踪；现有材料仍不能证明变化究竟发生在现实、档案还是记忆里。" : "维护道日志留下多组人数箭头；你确认它与案件有关，却无法可靠解释每个数字。",
      linxue: confident && state.hidden.includes("H02") ? "林雪的残信补全了动机：她回到白岭是为了阻止下一次点名，并警告你不要第二次数到郭文。" : "林雪显然相信点名会带来危险；现有证据不足以判断这是警告、推测还是创伤记忆。",
      guowen: state.hypotheses.includes("S03") ? "车票、座位痕迹与被删除的电子索引相互吻合：5B曾对应一名许姓乘客，但这仍不能说明他与郭文之间发生了什么。" : confident && state.hidden.includes("H03") ? "至少有一份与案发当日一致的记录表明，5B曾登记为‘许×’；现有九人名单没有这个名字，而郭文被登记在5A。" : "郭文的身份记录彼此冲突；5B原本属于谁，仍取决于你是否找到那张被撕毁的车票。",
      publish: confident ? "你公开了全部档案。调查被迫重启，但数月后其他城市开始出现‘合照里多了一人’的帖子；真相也许正在制造新的共同记忆。" : "你公开了尚未完全解释的档案。舆论迫使地方重启调查，也让未经证实的‘第十人’说法迅速传播。",
      witness: "你切断三名证人的公开联系方式。CASE 05暂时停止增长，现有证人保住了姓名；系统后台仍在尝试恢复索引。",
      seal: confident ? "你把已证明的规律与全部原始材料封存在离线介质中。没有人会立刻读到郭文的名字，但CASE 05仍留在系统缓存里。" : "你封存了尚未解释完整的材料。官方版本不会改变，而那些人数矛盾暂时只存在于一块离线硬盘中。",
      han: confident ? "韩敬山的记录与人数先增加、随后有人从名单中淡出的规律吻合；它仍只是一个调查者的见证，不能单独证明变化发生在哪里。" : "韩敬山显然坚信人数发生过变化，但你无法独立验证他最后一页笔记。",
      "1976": confident ? "1976旧照把异常的起点提前到AME-7之前至少十五年。" : state.hidden.includes("H01") ? "旧照中的红围巾少年与后来的郭文高度相似，但现有结论仍不足以解释原因。" : "你恢复了1976旧照，却没有在封路前完成其中人物的身份对比。"
    };
    if (!confident && state.finalChoices.includes("publish")) {
      tails.publish = hasPassengerRecord
        ? "你公开了尚未完全解释的档案。舆论迫使地方重启调查，也让‘第十名乘客’的说法迅速传播。"
        : "你公开了尚未完全解释的档案。舆论迫使地方重启调查，也让‘人数异常’的说法迅速传播。";
    }
    const e = layers[id] || layers.truth_insufficient;
    const actionTails = state.finalChoices.map(choice => `<p class="ending-tail">${tails[choice]}</p>`).join("");
    const ratingMarkup = investigationRating(level);
    const basis = [
      [hasEvidence("EV08"), "跨案人物一致性"],
      [hasEvidence("EV13"), "现场时间矛盾"],
      [hasEvidence("EV15"), "预知现场人数"],
      [hasEvidence("EV16"), "19:47同步规律"],
      [hasEvidence("EV18"), "实验与地点关联"],
      [state.hidden.includes("H01"), "实验前历史证据"]
    ];
    const basisMarkup = `<section class="ending-basis"><h3>本次调查结论依据</h3><p>以下方向决定了本次调查能够确认到哪里；未确认项目可在下一次调查中继续追查。</p>${basis.map(([known, label]) => `<div class="basis-row ${known ? "confirmed" : "missing"}"><span>${known ? "已确认" : "未确认"}</span><b>${label}</b></div>`).join("")}</section>`;
    return `<section class="ending"><div class="ending-copy"><p class="eyebrow">${e[0]}</p><h2>《${e[1]}》</h2><p>${e[2]}</p>${actionTails}${ratingMarkup}${basisMarkup}<div class="ending-actions"><button class="btn ghost" data-review>查看已收集档案</button><button class="btn primary" data-reset>重新开始</button></div></div></section>`;
  }

  function openModal(html) {
    $("#modal .modal-panel").classList.remove("photo-viewer-panel");
    $("#modal-content").innerHTML = html;
    $("#modal").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal(refresh = false) {
    const advanceAfterClose = pendingCase05Advance;
    pendingCase05Advance = false;
    $("#modal").hidden = true;
    document.body.style.overflow = "";
    if (refresh && !$("#game").hidden) render();
    if (advanceAfterClose) setTimeout(() => {
      advanceCase05();
      save();
      if (!$("#game").hidden) render();
    }, 900);
  }

  function openPhotoViewer(frame) {
    const card = frame.closest(".photo-card");
    const title = card?.querySelector("h3")?.textContent || "照片细节";
    openModal(`<div class="modal-inner mobile-photo-expanded photo-inspection-expanded"><p class="eyebrow">PHOTO INSPECTION / ENLARGED</p><h2>${title}</h2><div class="photo-frame ${[...frame.classList].filter(c => c !== "photo-frame").join(" ")}">${frame.innerHTML}</div><p>这是独立的放大取证视图。画面不会自动标出答案；可直接点击你认为可疑的物件或人物记录线索。</p><button class="btn ghost" data-close-modal>关闭照片</button></div>`);
    $("#modal .modal-panel").classList.add("photo-viewer-panel");
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

  function nearPhotoTarget(event, frame) {
    const margin = 34;
    return $$(".hotspot:not(.found)", frame).some(hotspot => {
      const rect = hotspot.getBoundingClientRect();
      return event.clientX >= rect.left - margin && event.clientX <= rect.right + margin && event.clientY >= rect.top - margin && event.clientY <= rect.bottom + margin;
    });
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, [data-close-modal], [data-case], [data-person], [data-doc], [data-final-choice], [data-review-final]");
    if (!target) {
      if (matchMedia("(pointer: coarse)").matches) {
        const evidenceLine = e.target.closest(".document-body tr, .document-body p, .document-body .document-note");
        const hits = evidenceLine ? $$(".evidence-hit:not(.found)", evidenceLine) : [];
        if (hits.length === 1) { hits[0].click(); return; }
      }
      const frame = e.target.closest(".photo-frame");
      if (frame && !frame.closest(".photo-inspection-expanded")) openPhotoViewer(frame);
      else if (frame && nearPhotoTarget(e, frame)) toast("照片检查", "这一区域似乎值得继续检查。");
      else if (frame) toast("照片检查", "这里没有发现值得记录的东西。");
      return;
    }
    if (target.matches("[data-close-modal]")) return closeModal(true);
    if (target.dataset.openPhoto) {
      const frame = target.closest(".photo-card")?.querySelector(".photo-frame");
      clearAttention("photos", target.dataset.openPhoto);
      save();
      updateChrome();
      if (frame) openPhotoViewer(frame);
      return;
    }
    if (target.dataset.goSection) return navigateTo(target.dataset.goSection, target.dataset.goTarget || "", target.dataset.lineId || "");
    if (target.dataset.section) return switchSection(target.dataset.section);
    if (target.dataset.toggleLine) {
      const id = target.dataset.toggleLine;
      if (target.dataset.lineExpanded === "true") {
        addUnique(state.seenLines, id);
        state.expandedLine = null;
      } else state.expandedLine = id;
      save(); render(); return;
    }
    if (target.dataset.archiveFilter) {
      state.archiveFilter = target.dataset.archiveFilter;
      save(); render(); return;
    }
    if (target.hasAttribute("data-toggle-other-clues")) {
      state.otherCluesExpanded = !state.otherCluesExpanded;
      save(); render(); return;
    }
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
      target.textContent = target.dataset.observationIndex ? `${target.dataset.observationIndex} ✓` : `✓ ${clueData[clueId][0]}`;
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
        if (target.dataset.hidden === "H03" && !hasClue("ticket_xu")) discoverClue("ticket_xu");
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
    if (target.dataset.searchTerm) {
      const term = target.dataset.searchTerm;
      switchSection("web");
      const input = $("#search-input");
      if (input) { input.value = term; input.focus(); }
      return;
    }
    if (target.dataset.searchToken) {
      const term = target.dataset.searchToken;
      if (state.searchDraft.includes(term)) state.searchDraft = state.searchDraft.filter(item => item !== term);
      else addUnique(state.searchDraft, term);
      save(); render(); return;
    }
    if (target.hasAttribute("data-use-search-draft")) {
      const term = state.searchDraft.join(" ");
      state.searchDraft = [];
      switchSection("web");
      const input = $("#search-input");
      if (input) { input.value = term; input.focus(); }
      save();
      return;
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
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(true); });

  loadMeta();
  load();
  renderMetaControls();
  if (hasStoredSave()) $("#continue-game").hidden = false;
})();
