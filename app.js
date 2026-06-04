const rootsCircle = ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];
const commonRoots = ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"];
const allRoots = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B", "Cb"];

const sharpChromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatChromatic = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const naturalChromatic = ["C", "D", "E", "F", "G", "A", "B"];
const naturalSemitones = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const flatKeys = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"]);
const enharmonic = {
  "B#": "C",
  "E#": "F",
  "Cb": "B",
  "Fb": "E",
};

const keySignatures = {
  C: "샵/플랫 없음",
  G: "F#",
  D: "F#, C#",
  A: "F#, C#, G#",
  E: "F#, C#, G#, D#",
  B: "F#, C#, G#, D#, A#",
  "F#": "F#, C#, G#, D#, A#, E#",
  "C#": "F#, C#, G#, D#, A#, E#, B#",
  F: "Bb",
  Bb: "Bb, Eb",
  Eb: "Bb, Eb, Ab",
  Ab: "Bb, Eb, Ab, Db",
  Db: "Bb, Eb, Ab, Db, Gb",
  Gb: "Bb, Eb, Ab, Db, Gb, Cb",
  Cb: "Bb, Eb, Ab, Db, Gb, Cb, Fb",
};

const scaleTypes = [
  {
    id: "major",
    name: "Major",
    korean: "메이저 스케일",
    degrees: ["1", "2", "3", "4", "5", "6", "7", "8"],
    intervals: [2, 2, 1, 2, 2, 2, 1],
    formula: "W W H W W W H",
    structure: "밝은 장조의 기본. 1, 3, 5음이 메이저 코드의 뼈대입니다.",
    use: "팝, 록, 발라드, 클래식의 기본 재료입니다. 키를 잡고 멜로디와 다이아토닉 코드를 만들 때 가장 먼저 씁니다.",
  },
  {
    id: "naturalMinor",
    name: "Natural Minor",
    korean: "내추럴 마이너",
    degrees: ["1", "2", "b3", "4", "5", "b6", "b7", "8"],
    intervals: [2, 1, 2, 2, 1, 2, 2],
    formula: "W H W W H W W",
    structure: "메이저보다 3, 6, 7음을 낮춘 자연 단음계입니다.",
    use: "어둡고 담백한 마이너 멜로디에 씁니다. 팝, 록, 영화음악에서 가장 기본적인 마이너 색입니다.",
  },
  {
    id: "harmonicMinor",
    name: "Harmonic Minor",
    korean: "하모닉 마이너",
    degrees: ["1", "2", "b3", "4", "5", "b6", "7", "8"],
    intervals: [2, 1, 2, 2, 1, 3, 1],
    formula: "W H W W H WH H",
    structure: "내추럴 마이너의 b7을 7로 올려 V7 해결감을 강하게 만듭니다.",
    use: "마이너 키에서 도미넌트 V7을 쓰거나, 클래식/집시/네오클래식 느낌을 낼 때 좋습니다.",
  },
  {
    id: "melodicMinor",
    name: "Melodic Minor",
    korean: "멜로딕 마이너",
    degrees: ["1", "2", "b3", "4", "5", "6", "7", "8"],
    intervals: [2, 1, 2, 2, 2, 2, 1],
    formula: "W H W W W W H",
    structure: "마이너 3도는 유지하고 6, 7음을 올린 단음계입니다.",
    use: "재즈 마이너 사운드, 마이너 메이저7, 세련된 마이너 멜로디에 자주 씁니다.",
  },
  {
    id: "majorPentatonic",
    name: "Major Pentatonic",
    korean: "메이저 펜타토닉",
    degrees: ["1", "2", "3", "5", "6", "8"],
    intervals: [2, 2, 3, 2, 3],
    formula: "W W m3 W m3",
    structure: "메이저 스케일에서 4, 7음을 뺀 5음 스케일입니다.",
    use: "밝고 안전한 멜로디를 만들기 쉽습니다. 컨트리, 팝, 포크, 기타 솔로 입문에 좋습니다.",
  },
  {
    id: "minorPentatonic",
    name: "Minor Pentatonic",
    korean: "마이너 펜타토닉",
    degrees: ["1", "b3", "4", "5", "b7", "8"],
    intervals: [3, 2, 2, 3, 2],
    formula: "m3 W W m3 W",
    structure: "마이너 스케일에서 2, b6음을 뺀 5음 스케일입니다.",
    use: "블루스, 록, 펑크, 기타 솔로의 핵심입니다. 코드 위에서 부딪힘이 적어 즉흥연주에 좋습니다.",
  },
  {
    id: "blues",
    name: "Blues",
    korean: "블루스 스케일",
    degrees: ["1", "b3", "4", "b5", "5", "b7", "8"],
    intervals: [3, 2, 1, 1, 3, 2],
    formula: "m3 W H H m3 W",
    structure: "마이너 펜타토닉에 b5 블루 노트를 더합니다.",
    use: "블루스와 록 솔로에서 긴장감 있는 꺾임을 만들 때 씁니다. b5는 길게 머물기보다 지나가듯 쓰면 좋습니다.",
  },
  {
    id: "dorian",
    name: "Dorian",
    korean: "도리안 모드",
    degrees: ["1", "2", "b3", "4", "5", "6", "b7", "8"],
    intervals: [2, 1, 2, 2, 2, 1, 2],
    formula: "W H W W W H W",
    structure: "마이너 느낌이지만 6음이 밝게 열려 있습니다.",
    use: "마이너7 코드 위에서 재즈, 펑크, 소울 느낌을 낼 때 좋습니다. Am7 위의 A Dorian처럼 씁니다.",
  },
  {
    id: "phrygian",
    name: "Phrygian",
    korean: "프리지안 모드",
    degrees: ["1", "b2", "b3", "4", "5", "b6", "b7", "8"],
    intervals: [1, 2, 2, 2, 1, 2, 2],
    formula: "H W W W H W W",
    structure: "b2가 강한 긴장감을 주는 어두운 모드입니다.",
    use: "스페인풍, 메탈, 어둡고 낯선 분위기에 씁니다. b2를 강조하면 캐릭터가 확실해집니다.",
  },
  {
    id: "lydian",
    name: "Lydian",
    korean: "리디안 모드",
    degrees: ["1", "2", "3", "#4", "5", "6", "7", "8"],
    intervals: [2, 2, 2, 1, 2, 2, 1],
    formula: "W W W H W W H",
    structure: "메이저 스케일의 4음을 #4로 올린 밝고 떠 있는 모드입니다.",
    use: "몽환적인 메이저 코드, 영화음악, 게임음악, maj7#11 색채에 잘 맞습니다.",
  },
  {
    id: "mixolydian",
    name: "Mixolydian",
    korean: "믹솔리디안 모드",
    degrees: ["1", "2", "3", "4", "5", "6", "b7", "8"],
    intervals: [2, 2, 1, 2, 2, 1, 2],
    formula: "W W H W W H W",
    structure: "메이저 느낌에 b7이 들어간 도미넌트 모드입니다.",
    use: "7 코드, 블루스, 록, 펑크 리프에 좋습니다. G7 위의 G Mixolydian처럼 씁니다.",
  },
  {
    id: "aeolian",
    name: "Aeolian",
    korean: "에올리안 모드",
    degrees: ["1", "2", "b3", "4", "5", "b6", "b7", "8"],
    intervals: [2, 1, 2, 2, 1, 2, 2],
    formula: "W H W W H W W",
    structure: "내추럴 마이너와 같은 음 구조입니다.",
    use: "마이너 키의 기본 분위기입니다. 어둡고 안정적인 진행이나 멜로디에 씁니다.",
  },
  {
    id: "locrian",
    name: "Locrian",
    korean: "로크리안 모드",
    degrees: ["1", "b2", "b3", "4", "b5", "b6", "b7", "8"],
    intervals: [1, 2, 2, 1, 2, 2, 2],
    formula: "H W W H W W W",
    structure: "b5 때문에 가장 불안정한 모드입니다.",
    use: "m7b5 코드나 긴장감 있는 재즈/실험적 사운드에서 씁니다. 오래 머물기보다 해결을 유도하기 좋습니다.",
  },
];

const state = {
  view: "quiz",
  deck: [],
  index: 0,
  current: null,
  correct: 0,
  answered: 0,
};

const els = {
  tabs: document.querySelectorAll("[data-view]"),
  quizView: document.querySelector("#quizView"),
  chartView: document.querySelector("#chartView"),
  circleView: document.querySelector("#circleView"),
  quizMode: document.querySelector("#quizMode"),
  quizScale: document.querySelector("#quizScale"),
  quizKeySet: document.querySelector("#quizKeySet"),
  chartScale: document.querySelector("#chartScale"),
  quizTypeLabel: document.querySelector("#quizTypeLabel"),
  quizProgress: document.querySelector("#quizProgress"),
  quizPrompt: document.querySelector("#quizPrompt"),
  quizHint: document.querySelector("#quizHint"),
  answerSlots: document.querySelector("#answerSlots"),
  answerInput: document.querySelector("#answerInput"),
  feedback: document.querySelector("#feedback"),
  checkButton: document.querySelector("#checkButton"),
  nextButton: document.querySelector("#nextButton"),
  shuffleButton: document.querySelector("#shuffleButton"),
  accuracy: document.querySelector("#accuracy"),
  scaleInfo: document.querySelector("#scaleInfo"),
  scaleChart: document.querySelector("#scaleChart"),
  circleList: document.querySelector("#circleList"),
};

function semitoneOf(note) {
  const normalized = enharmonic[note] || note;
  const sharpIndex = sharpChromatic.indexOf(normalized);
  if (sharpIndex >= 0) return sharpIndex;
  return flatChromatic.indexOf(normalized);
}

function chooseChromatic(root) {
  if (flatKeys.has(root) || root.includes("b")) return flatChromatic;
  return sharpChromatic;
}

function spellNote(letter, targetSemitone) {
  const natural = naturalSemitones[letter];
  const diff = (((targetSemitone - natural) % 12) + 12) % 12;
  if (diff === 0) return letter;
  if (diff === 1) return `${letter}#`;
  if (diff === 2) return `${letter}##`;
  if (diff === 11) return `${letter}b`;
  if (diff === 10) return `${letter}bb`;
  return noteFromSemitone(targetSemitone, letter);
}

function noteFromSemitone(semitone, root) {
  const chromatic = chooseChromatic(root);
  return chromatic[((semitone % 12) + 12) % 12];
}

function buildScale(root, scale) {
  const notes = [root];
  const rootLetterIndex = naturalChromatic.indexOf(root[0]);
  let semitone = semitoneOf(root);
  scale.intervals.forEach((step, index) => {
    semitone += step;
    if (index === scale.intervals.length - 1) {
      notes.push(root);
      return;
    }
    const letter = naturalChromatic[(rootLetterIndex + index + 1) % naturalChromatic.length];
    notes.push(spellNote(letter, semitone));
  });
  return notes;
}

function normalizeAnswer(value) {
  return value
    .toUpperCase()
    .replaceAll("♭", "B")
    .replaceAll("＃", "#")
    .replaceAll(",", " ")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function populateSelects() {
  scaleTypes.forEach((scale) => {
    const quizOption = new Option(`${scale.name} (${scale.korean})`, scale.id);
    const chartOption = new Option(`${scale.name} (${scale.korean})`, scale.id);
    els.quizScale.add(quizOption);
    els.chartScale.add(chartOption);
  });
}

function getScaleById(id) {
  return scaleTypes.find((scale) => scale.id === id) || scaleTypes[0];
}

function getRootsForQuiz() {
  if (els.quizKeySet.value === "common") return commonRoots;
  if (els.quizKeySet.value === "all") return allRoots;
  return rootsCircle;
}

function buildDeck() {
  const scale = getScaleById(els.quizScale.value);
  state.deck = getRootsForQuiz().map((root) => ({
    root,
    scale,
    notes: buildScale(root, scale),
  }));
  state.deck = shuffle(state.deck);
  state.index = 0;
  makeQuestion();
}

function makeQuestion() {
  if (!state.deck.length) return;
  const item = state.deck[state.index % state.deck.length];
  const mode = els.quizMode.value;
  const blankIndex = mode === "partial" ? randomInt(1, item.notes.length - 2) : -1;
  state.current = { ...item, mode, blankIndex };
  els.quizTypeLabel.textContent = mode === "full" ? "전체 쓰기" : "부분 맞추기";
  els.quizProgress.textContent = `${state.index + 1} / ${state.deck.length}`;
  els.quizPrompt.textContent = mode === "full"
    ? `${item.root} ${item.scale.name} 스케일 전체를 쓰세요.`
    : `${item.root} ${item.scale.name} 스케일에서 빈칸 음을 맞추세요.`;
  els.quizHint.textContent = mode === "full"
    ? `입력 규칙: 대문자 음 이름, 샵은 #, 플랫은 b. 음 사이를 띄어쓰세요.`
    : `입력 규칙: 대문자 음 이름, 샵은 #, 플랫은 b. 빈칸 음 하나만 입력하세요.`;
  els.answerInput.value = "";
  els.answerInput.placeholder = mode === "full" ? "예: C D E F G A B C" : "빈칸 음 하나만 입력";
  renderSlots(item.notes, blankIndex, item.scale.degrees, mode);
  hideFeedback();
  els.answerInput.focus();
}

function renderSlots(notes, blankIndex, degrees, mode) {
  els.answerSlots.innerHTML = "";
  els.answerSlots.classList.toggle("full-mode", mode === "full");
  if (mode === "full") return;
  notes.forEach((note, index) => {
    const slot = document.createElement("div");
    const isBlank = index === blankIndex;
    slot.className = isBlank ? "slot blank" : "slot";
    slot.textContent = isBlank ? degrees[index] || "?" : note;
    els.answerSlots.append(slot);
  });
}

function checkAnswer() {
  if (!state.current) return;
  const userAnswer = normalizeAnswer(els.answerInput.value);
  const expected = state.current.mode === "full"
    ? normalizeAnswer(state.current.notes.join(" "))
    : normalizeAnswer(state.current.notes[state.current.blankIndex]);
  const isCorrect = userAnswer === expected;

  state.answered += 1;
  if (isCorrect) state.correct += 1;
  updateAccuracy();
  showFeedback(isCorrect, expected);
}

function showFeedback(isCorrect, expected) {
  els.feedback.classList.remove("hidden", "wrong");
  if (!isCorrect) els.feedback.classList.add("wrong");
  const fullScale = state.current.notes.join(" ");
  els.feedback.textContent = isCorrect
    ? `정답입니다. ${state.current.root} ${state.current.scale.name}: ${fullScale}`
    : `아쉬워요. 정답은 ${expected} 입니다. 전체 스케일: ${fullScale}`;
}

function hideFeedback() {
  els.feedback.classList.add("hidden");
  els.feedback.classList.remove("wrong");
  els.feedback.textContent = "";
}

function nextQuestion() {
  state.index = (state.index + 1) % state.deck.length;
  makeQuestion();
}

function updateAccuracy() {
  const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
  els.accuracy.textContent = `${accuracy}%`;
}

function renderScaleChart() {
  const scale = getScaleById(els.chartScale.value);
  els.scaleInfo.innerHTML = `
    <article class="info-box">
      <span>구조</span>
      <strong>${scale.name}</strong>
      <p>${scale.korean}<br>${scale.formula}<br>${scale.degrees.join(" - ")}</p>
    </article>
    <article class="info-box">
      <span>사용법</span>
      <strong>어떻게 쓰나</strong>
      <p>${scale.structure}<br>${scale.use}</p>
    </article>
  `;

  els.scaleChart.innerHTML = "";
  rootsCircle.forEach((root, index) => {
    const notes = buildScale(root, scale);
    const row = document.createElement("article");
    row.className = "scale-row";
    row.innerHTML = `
      <div class="scale-row-head">
        <h3>${root} ${scale.name}</h3>
        <span class="badge">${index + 1}</span>
      </div>
      <div class="notes">${notes.map((note) => `<span class="note">${note}</span>`).join("")}</div>
    `;
    els.scaleChart.append(row);
  });
}

function renderCircle() {
  els.circleList.innerHTML = "";
  rootsCircle.forEach((root, index) => {
    const item = document.createElement("article");
    item.className = "circle-item";
    item.innerHTML = `
      <strong>${root} Major</strong>
      <span>${index + 1}번째</span>
      <span>조표: ${keySignatures[root] || "표기 확인"}</span>
      <span>스케일: ${buildScale(root, scaleTypes[0]).join(" ")}</span>
    `;
    els.circleList.append(item);
  });
}

function switchView(view) {
  state.view = view;
  els.tabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.quizView.classList.toggle("hidden", view !== "quiz");
  els.chartView.classList.toggle("hidden", view !== "chart");
  els.circleView.classList.toggle("hidden", view !== "circle");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

els.tabs.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

els.quizMode.addEventListener("change", makeQuestion);
els.quizScale.addEventListener("change", buildDeck);
els.quizKeySet.addEventListener("change", buildDeck);
els.chartScale.addEventListener("change", renderScaleChart);
els.checkButton.addEventListener("click", checkAnswer);
els.nextButton.addEventListener("click", nextQuestion);
els.shuffleButton.addEventListener("click", buildDeck);
els.answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkAnswer();
});

populateSelects();
buildDeck();
renderScaleChart();
renderCircle();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
