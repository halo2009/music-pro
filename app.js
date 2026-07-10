const rootsCircle = ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];
const commonRoots = ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"];
const allRoots = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B", "Cb"];
const easyRoots = ["C", "G", "D", "F", "A", "E", "Bb"];
const normalScaleIds = new Set(["major", "naturalMinor", "harmonicMinor", "melodicMinor", "majorPentatonic", "minorPentatonic", "blues"]);

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

const circleOfFifths = [
  { major: "C", minor: "Am", count: "0", type: "natural", notes: [] },
  { major: "G", minor: "Em", count: "1#", type: "sharp", notes: ["F#"] },
  { major: "D", minor: "Bm", count: "2#", type: "sharp", notes: ["F#", "C#"] },
  { major: "A", minor: "F#m", count: "3#", type: "sharp", notes: ["F#", "C#", "G#"] },
  { major: "E", minor: "C#m", count: "4#", type: "sharp", notes: ["F#", "C#", "G#", "D#"] },
  { major: "B", minor: "G#m", count: "5#", type: "sharp", notes: ["F#", "C#", "G#", "D#", "A#"] },
  { major: "F# / Gb", minor: "D#m / Ebm", count: "6# / 6b", type: "both", notes: ["F#", "C#", "G#", "D#", "A#", "E#"], altNotes: ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"] },
  { major: "Db", minor: "Bbm", count: "5b", type: "flat", notes: ["Bb", "Eb", "Ab", "Db", "Gb"] },
  { major: "Ab", minor: "Fm", count: "4b", type: "flat", notes: ["Bb", "Eb", "Ab", "Db"] },
  { major: "Eb", minor: "Cm", count: "3b", type: "flat", notes: ["Bb", "Eb", "Ab"] },
  { major: "Bb", minor: "Gm", count: "2b", type: "flat", notes: ["Bb", "Eb"] },
  { major: "F", minor: "Dm", count: "1b", type: "flat", notes: ["Bb"] },
];

const intervalBank = [
  { semitones: 1, name: "m2", label: "단2도" },
  { semitones: 2, name: "M2", label: "장2도" },
  { semitones: 3, name: "m3", label: "단3도" },
  { semitones: 4, name: "M3", label: "장3도" },
  { semitones: 5, name: "P4", label: "완전4도" },
  { semitones: 6, name: "TT", label: "증4/감5도" },
  { semitones: 7, name: "P5", label: "완전5도" },
  { semitones: 8, name: "m6", label: "단6도" },
  { semitones: 9, name: "M6", label: "장6도" },
  { semitones: 10, name: "m7", label: "단7도" },
  { semitones: 11, name: "M7", label: "장7도" },
  { semitones: 12, name: "P8", label: "옥타브" },
];

const chordEarBank = [
  { id: "major", label: "메이저", intervals: [0, 4, 7] },
  { id: "minor", label: "마이너", intervals: [0, 3, 7] },
  { id: "dim", label: "디미니쉬", intervals: [0, 3, 6] },
  { id: "aug", label: "오그먼트", intervals: [0, 4, 8] },
  { id: "sus4", label: "sus4", intervals: [0, 5, 7] },
];

const degreeEarBank = [
  { degree: "1도", semitones: 0 },
  { degree: "2도", semitones: 2 },
  { degree: "3도", semitones: 4 },
  { degree: "4도", semitones: 5 },
  { degree: "5도", semitones: 7 },
  { degree: "6도", semitones: 9 },
  { degree: "7도", semitones: 11 },
  { degree: "8도", semitones: 12 },
];

const noteEarBank = [
  { label: "C", semitone: 0 },
  { label: "C#", semitone: 1 },
  { label: "D", semitone: 2 },
  { label: "Eb", semitone: 3 },
  { label: "E", semitone: 4 },
  { label: "F", semitone: 5 },
  { label: "F#", semitone: 6 },
  { label: "G", semitone: 7 },
  { label: "Ab", semitone: 8 },
  { label: "A", semitone: 9 },
  { label: "Bb", semitone: 10 },
  { label: "B", semitone: 11 },
];

const guitarRoots = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const guitarPositions = ["C", "D", "E", "G", "A"];
const chordRoots = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const chordTypes = [
  { id: "M", symbol: "", intervals: [0, 4, 7] },
  { id: "m", symbol: "m", intervals: [0, 3, 7] },
  { id: "7", symbol: "7", intervals: [0, 4, 7, 10] },
  { id: "5", symbol: "5", intervals: [0, 7] },
  { id: "dim", symbol: "dim", intervals: [0, 3, 6] },
  { id: "dim7", symbol: "dim7", intervals: [0, 3, 6, 9] },
  { id: "aug", symbol: "aug", intervals: [0, 4, 8] },
  { id: "sus2", symbol: "sus2", intervals: [0, 2, 7] },
  { id: "sus4", symbol: "sus4", intervals: [0, 5, 7] },
  { id: "M7", symbol: "M7", intervals: [0, 4, 7, 11] },
  { id: "m7", symbol: "m7", intervals: [0, 3, 7, 10] },
  { id: "7sus4", symbol: "7sus4", intervals: [0, 5, 7, 10] },
  { id: "M9", symbol: "M9", intervals: [0, 4, 7, 11, 14] },
  { id: "M13", symbol: "M13", intervals: [0, 4, 7, 11, 14, 21] },
  { id: "M9#11", symbol: "M9#11", intervals: [0, 4, 7, 11, 14, 18] },
  { id: "M13#11", symbol: "M13#11", intervals: [0, 4, 7, 11, 14, 18, 21] },
  { id: "add9", symbol: "add9", intervals: [0, 4, 7, 14] },
  { id: "6add9", symbol: "6add9", intervals: [0, 4, 7, 9, 14] },
  { id: "M7b5", symbol: "M7b5", intervals: [0, 4, 6, 11] },
  { id: "M7#5", symbol: "M7#5", intervals: [0, 4, 8, 11] },
  { id: "m6", symbol: "m6", intervals: [0, 3, 7, 9] },
  { id: "m9", symbol: "m9", intervals: [0, 3, 7, 10, 14] },
  { id: "m11", symbol: "m11", intervals: [0, 3, 7, 10, 14, 17] },
  { id: "m13", symbol: "m13", intervals: [0, 3, 7, 10, 14, 17, 21] },
  { id: "madd9", symbol: "madd9", intervals: [0, 3, 7, 14] },
  { id: "mM7", symbol: "mM7", intervals: [0, 3, 7, 11] },
  { id: "m7b5", symbol: "m7b5", intervals: [0, 3, 6, 10] },
  { id: "m7#5", symbol: "m7#5", intervals: [0, 3, 8, 10] },
  { id: "6", symbol: "6", intervals: [0, 4, 7, 9] },
  { id: "9", symbol: "9", intervals: [0, 4, 7, 10, 14] },
  { id: "11", symbol: "11", intervals: [0, 4, 7, 10, 14, 17] },
  { id: "13", symbol: "13", intervals: [0, 4, 7, 10, 14, 17, 21] },
  { id: "7b5", symbol: "7b5", intervals: [0, 4, 6, 10] },
  { id: "7#5", symbol: "7#5", intervals: [0, 4, 8, 10] },
  { id: "7b9", symbol: "7b9", intervals: [0, 4, 7, 10, 13] },
  { id: "7#9", symbol: "7#9", intervals: [0, 4, 7, 10, 15] },
  { id: "7(b5,b9)", symbol: "7(b5,b9)", intervals: [0, 4, 6, 10, 13] },
  { id: "7(b5#9)", symbol: "7(b5#9)", intervals: [0, 4, 6, 10, 15] },
  { id: "7(#5#9)", symbol: "7(#5#9)", intervals: [0, 4, 8, 10, 15] },
  { id: "9b5", symbol: "9b5", intervals: [0, 4, 6, 10, 14] },
  { id: "9#5", symbol: "9#5", intervals: [0, 4, 8, 10, 14] },
  { id: "13#11", symbol: "13#11", intervals: [0, 4, 7, 10, 14, 18, 21] },
  { id: "13b9", symbol: "13b9", intervals: [0, 4, 7, 10, 13, 21] },
  { id: "11b9", symbol: "11b9", intervals: [0, 4, 7, 10, 13, 17] },
  { id: "sus2sus4", symbol: "sus2sus4", intervals: [0, 2, 5, 7] },
  { id: "-5", symbol: "-5", intervals: [0, 4, 6] },
];

const rhythmTypes = [
  {
    id: "quarter",
    name: "4분음표",
    symbol: "♩",
    unit: "한 박에 기본 클릭",
    feel: "메트로놈 기본 박만 듣습니다.",
    say: "하나 둘 셋 넷",
    subdivisions: 1,
  },
  {
    id: "eighth",
    name: "8분음표",
    symbol: "♪♪",
    unit: "한 박 안에 2개",
    feel: "한 박을 둘로 고르게 나눕니다.",
    say: "하나-앤",
    subdivisions: 2,
  },
  {
    id: "eighthTriplet",
    name: "8분 3잇단음",
    symbol: "♪♪♪",
    unit: "1박 안에 3개",
    count: "3등분",
    feel: "한 박을 셋으로 고르게 나눕니다.",
    say: "하나-둘-셋",
    subdivisions: 3,
  },
  {
    id: "quarterTriplet",
    name: "4분 3잇단음",
    symbol: "♩♩♩",
    unit: "4분음표 2개 길이 안에 3개",
    count: "3등분",
    feel: "2박 길이를 셋으로 고르게 나눕니다. 중간 박 클릭 없이 3개가 같은 간격으로 들립니다.",
    say: "하나--둘--셋",
    subdivisions: 3,
    spanBeats: 2,
  },
  {
    id: "triplet",
    name: "3연음",
    symbol: "3",
    unit: "기준 박 안에 3개",
    count: "3등분",
    feel: "기준 길이를 셋으로 나누는 모든 3잇단 느낌입니다.",
    say: "타-타-타",
    subdivisions: 3,
  },
  {
    id: "quintuplet",
    name: "5연음",
    symbol: "5",
    unit: "기준 박 안에 5개",
    count: "5등분",
    feel: "한 박 또는 정해진 길이를 다섯 칸으로 고르게 나눕니다.",
    say: "타-타-타-타-타",
    subdivisions: 5,
  },
  {
    id: "sextuplet",
    name: "6연음",
    symbol: "6",
    unit: "기준 박 안에 6개",
    count: "6등분",
    feel: "여섯 칸으로 고르게 나누며 3+3 또는 2+2+2로 느낄 수 있습니다.",
    say: "타-타-타 타-타-타",
    subdivisions: 6,
  },
  {
    id: "septuplet",
    name: "7연음",
    symbol: "7",
    unit: "기준 박 안에 7개",
    count: "7등분",
    feel: "일곱 칸으로 고르게 나누는 고난도 리듬입니다.",
    say: "타-타-타-타-타-타-타",
    subdivisions: 7,
  },
];

const metronomeSounds = {
  classic: {
    type: "square",
    accent: 1320,
    beat: 980,
    subdivision: 700,
    accentGain: 0.22,
    beatGain: 0.14,
    subGain: 0.06,
    duration: 0.045,
  },
  wood: {
    type: "triangle",
    accent: 1120,
    beat: 760,
    subdivision: 560,
    accentGain: 0.28,
    beatGain: 0.18,
    subGain: 0.08,
    duration: 0.035,
  },
  digital: {
    type: "sine",
    accent: 1760,
    beat: 1320,
    subdivision: 990,
    accentGain: 0.2,
    beatGain: 0.13,
    subGain: 0.07,
    duration: 0.06,
  },
  soft: {
    type: "triangle",
    accent: 880,
    beat: 660,
    subdivision: 520,
    accentGain: 0.16,
    beatGain: 0.1,
    subGain: 0.045,
    duration: 0.08,
  },
  rim: {
    type: "square",
    accent: 1480,
    beat: 1180,
    subdivision: 860,
    accentGain: 0.24,
    beatGain: 0.16,
    subGain: 0.07,
    duration: 0.025,
  },
  clave: {
    type: "triangle",
    accent: 980,
    beat: 820,
    subdivision: 640,
    accentGain: 0.26,
    beatGain: 0.17,
    subGain: 0.075,
    duration: 0.032,
  },
  glass: {
    type: "sine",
    accent: 2200,
    beat: 1660,
    subdivision: 1240,
    accentGain: 0.15,
    beatGain: 0.1,
    subGain: 0.05,
    duration: 0.075,
  },
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

const theoryTopics = [
  {
    id: "diatonic",
    title: "다이아토닉 코드",
    subtitle: "한 키의 스케일 안에서 만들어지는 기본 코드 묶음",
    summary: "다이아토닉 코드는 어떤 키의 스케일 음만 사용해서 쌓은 코드입니다. 키 안에서 안정적으로 들리는 진행의 기본 재료입니다.",
    keyPoints: [
      "Major Key 3화음: I ii iii IV V vi vii°",
      "Major Key 7화음: Imaj7 iim7 iiim7 IVmaj7 V7 vim7 viim7b5",
      "Tonic: I, iii, vi / Subdominant: ii, IV / Dominant: V, vii°",
      "코드 진행을 볼 때 로마숫자로 보면 키가 바뀌어도 기능을 읽을 수 있습니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
    detail: "C Major의 음은 C D E F G A B입니다. 각 음 위에 3도씩 쌓으면 C, Dm, Em, F, G, Am, Bdim이 됩니다. 이 코드들이 C Major 안에서 가장 기본적으로 쓰이는 코드입니다.",
    sections: [
      {
        title: "만드는 법",
        body: "스케일의 각 음 위에 3도씩 음을 쌓습니다. 3화음은 1-3-5, 7화음은 1-3-5-7까지 쌓습니다. 이때 스케일 밖의 음을 쓰지 않는 것이 핵심입니다.",
      },
      {
        title: "왜 중요한가",
        body: "다이아토닉 코드는 곡의 기본 어휘입니다. 어떤 코드가 키 안의 코드인지 알면 진행이 안정적인지, 밖에서 빌려온 코드인지 바로 구분할 수 있습니다.",
      },
    ],
  },
  {
    id: "functions",
    title: "토닉 / 서브도미넌트 / 도미넌트",
    subtitle: "코드가 진행 안에서 맡는 역할",
    summary: "화성 기능은 코드 이름보다 코드의 역할을 읽는 방법입니다. 안정, 이동, 긴장이라는 세 가지 큰 흐름으로 보면 진행이 훨씬 잘 보입니다.",
    keyPoints: [
      "토닉: 안정감. I, vi, iii가 자주 맡습니다.",
      "서브도미넌트: 토닉에서 벗어나 도미넌트로 가는 준비. IV, ii가 대표적입니다.",
      "도미넌트: 토닉으로 해결하고 싶게 만드는 긴장. V, vii°가 대표적입니다.",
      "많은 진행은 T → S → D → T 흐름으로 설명할 수 있습니다.",
    ],
    exampleTitle: "대표 진행",
    examples: ["C", "F", "G", "C"],
    detail: "C-F-G-C는 T-S-D-T 흐름입니다. C에서 안정적으로 시작하고, F가 방향을 만들고, G가 긴장을 만든 뒤 다시 C로 해결됩니다.",
  },
  {
    id: "chordProgressions",
    title: "코드 진행",
    subtitle: "벌스, 코러스, 브릿지에서 자주 쓰는 진행 모음",
    summary: "코드 진행은 곡의 감정과 방향을 만드는 뼈대입니다. 로마숫자로 외우면 키가 바뀌어도 같은 진행을 바로 옮겨 쓸 수 있습니다.",
    keyPoints: [
      "벌스는 보통 안정적이거나 반복적인 진행을 씁니다.",
      "프리코러스는 코러스로 올라가기 위해 긴장과 상승감을 만듭니다.",
      "코러스는 I, IV, V, vi를 중심으로 선명하고 기억하기 쉬운 진행이 많습니다.",
      "브릿지는 기존 진행과 다른 코드, 차용 코드, 마이너 전환으로 분위기를 바꿉니다.",
      "진행은 정답이 아니라 기능입니다. 같은 진행도 리듬, 멜로디, 템포에 따라 전혀 다르게 들립니다.",
    ],
    exampleTitle: "C Major 대표 진행",
    examples: ["C-G-Am-F", "C-Am-F-G", "F-G-Em-Am", "Dm-G-C", "Am-F-C-G", "C-F-G-C"],
    detail: "C Major에서 I-V-vi-IV는 C-G-Am-F입니다. 같은 로마숫자 진행을 G Major로 옮기면 G-D-Em-C가 됩니다. 이렇게 로마숫자로 이해하면 모든 키로 바로 옮길 수 있습니다.",
    sections: [
      {
        title: "팝 기본 진행",
        body: "I-V-vi-IV: 가장 널리 쓰이는 밝고 감정적인 팝 진행입니다. C에서는 C-G-Am-F입니다. I-vi-IV-V: 50s 진행으로 부드럽고 클래식한 느낌입니다. C-Am-F-G입니다. vi-IV-I-V: 벌스나 코러스 모두에 잘 맞고 살짝 애절합니다. Am-F-C-G입니다. I-IV-V-I: 가장 기본적인 안정 진행입니다. C-F-G-C입니다.",
      },
      {
        title: "벌스에 쓰기 좋은 진행",
        body: "I-vi-IV-V는 이야기를 시작하기 좋고 안정적입니다. vi-IV-I-V는 벌스에서 감정을 깔아두기 좋습니다. I-V-vi-iii-IV-I-IV-V는 길게 흐르는 팝 벌스에 좋습니다. I-iii-vi-IV는 담백하고 덜 뻔한 느낌을 줍니다. C 기준 예시는 C-Am-F-G, Am-F-C-G, C-G-Am-Em-F-C-F-G, C-Em-Am-F입니다.",
      },
      {
        title: "프리코러스에 쓰기 좋은 진행",
        body: "IV-V-vi는 코러스로 올라가기 전 기대감을 만듭니다. ii-V는 도미넌트로 밀어 올리는 힘이 강합니다. IV-V-iii-vi는 J-pop, K-pop에서 자주 들리는 상승감 있는 진행입니다. ii-iii-IV-V는 점점 올라가는 느낌이라 코러스 직전에 좋습니다. C 기준 F-G-Am, Dm-G, F-G-Em-Am, Dm-Em-F-G입니다.",
      },
      {
        title: "코러스에 쓰기 좋은 진행",
        body: "I-V-vi-IV는 가장 선명한 후렴 진행입니다. IV-I-V-vi는 시작을 IV로 해서 더 넓게 열리는 느낌을 줍니다. I-IV-vi-V는 밝고 직선적입니다. vi-IV-V-I는 마이너에서 시작해 메이저로 해결되는 감정이 좋습니다. C 기준 C-G-Am-F, F-C-G-Am, C-F-Am-G, Am-F-G-C입니다.",
      },
      {
        title: "브릿지에 쓰기 좋은 진행",
        body: "브릿지는 원래 반복되던 진행에서 벗어나는 구간입니다. bVI-bVII-I는 모달 인터체인지 느낌으로 강하게 돌아옵니다. iv-I는 메이저 곡에서 갑자기 서늘한 색을 줍니다. ii-V-iii-vi는 새 구간처럼 들리면서도 키 중심을 유지합니다. C 기준 Ab-Bb-C, Fm-C, Dm-G-Em-Am입니다.",
      },
      {
        title: "발라드 진행",
        body: "I-V/vi-vi-V-IV-iii-ii-V는 감정선이 길게 이어지는 발라드에 좋습니다. I-iii-IV-iv는 메이저에서 마이너 iv를 빌려와 애절합니다. vi-iii-IV-I는 차분한 벌스에 좋습니다. IV-V-iii-vi-ii-V-I는 후반부로 갈수록 감정이 쌓입니다. C 기준 C-E7-Am-G-F-Em-Dm-G, C-Em-F-Fm, Am-Em-F-C, F-G-Em-Am-Dm-G-C입니다.",
      },
      {
        title: "마이너 키 진행",
        body: "i-bVI-bVII-i는 록, 게임음악, 어두운 팝에 좋습니다. i-bVII-bVI-bVII는 반복감이 강하고 웅장합니다. i-iv-bVII-bIII는 자연단음계 색이 잘 납니다. i-bVI-III-bVII는 현대 팝 마이너 진행에서 자주 씁니다. A minor 기준 Am-F-G-Am, Am-G-F-G, Am-Dm-G-C, Am-F-C-G입니다.",
      },
      {
        title: "록/밴드 진행",
        body: "I-bVII-IV-I는 믹솔리디안 록 느낌입니다. i-bVII-bVI-V는 강한 마이너 록 진행입니다. I-V-bVII-IV는 개방적인 기타 리프에 좋습니다. I-IV-bVII-IV는 반복 리프형 진행에 잘 맞습니다. C 기준 C-Bb-F-C, Cm-Bb-Ab-G, C-G-Bb-F, C-F-Bb-F입니다.",
      },
      {
        title: "재즈 기본 진행",
        body: "ii-V-I는 재즈의 핵심입니다. C에서는 Dm7-G7-Cmaj7입니다. iii-VI-ii-V는 턴어라운드로 많이 씁니다. Em7-A7-Dm7-G7입니다. I-vi-ii-V는 오래된 스탠더드 진행에 많습니다. Cmaj7-Am7-Dm7-G7입니다. ii-V-I-vi는 반복 연습에 좋습니다. Dm7-G7-Cmaj7-Am7입니다.",
      },
      {
        title: "R&B / 소울 진행",
        body: "IVmaj7-iii7-vi7-ii7-V7는 부드러운 순환감이 있습니다. Imaj7-vi7-ii7-V7는 재즈 팝, R&B에 잘 맞습니다. ivm7-bVII7-Imaj7는 차용 코드로 부드럽게 해결됩니다. C 기준 Fmaj7-Em7-Am7-Dm7-G7, Cmaj7-Am7-Dm7-G7, Fm7-Bb7-Cmaj7입니다.",
      },
      {
        title: "시티팝/J-pop 느낌",
        body: "IV-V-iii-vi는 가장 대표적인 감성 진행 중 하나입니다. ii-V-iii-vi는 재즈 색이 조금 더 강합니다. IV-V-I-vi는 밝고 선명합니다. bVII-V7/vi-vi는 세컨더리 도미넌트로 감정이 깊어집니다. C 기준 F-G-Em-Am, Dm-G-Em-Am, F-G-C-Am, Bb-E7-Am입니다.",
      },
      {
        title: "엔딩/마무리 진행",
        body: "IV-V-I는 가장 단순하고 확실한 마무리입니다. ii-V-I는 재즈식 마침입니다. iv-I는 애절한 마지막 해결에 좋습니다. bVI-bVII-I는 웅장하게 끝낼 때 좋습니다. V-vi는 끝나는 척하다가 빗나가는 기만종지입니다. C 기준 F-G-C, Dm-G-C, Fm-C, Ab-Bb-C, G-Am입니다.",
      },
    ],
  },
  {
    id: "subdominant",
    title: "서브도미넌트",
    subtitle: "진행을 앞으로 밀어주는 준비 기능",
    summary: "서브도미넌트는 토닉의 안정감에서 벗어나 다음 코드로 이동하게 만드는 역할입니다. IV와 ii가 가장 기본입니다.",
    keyPoints: [
      "Major Key에서 IV와 ii는 대표적인 서브도미넌트입니다.",
      "서브도미넌트는 도미넌트 앞에 오면 진행이 자연스럽습니다.",
      "ii-V-I는 재즈와 팝에서 가장 중요한 기본 진행입니다.",
      "IV-I는 강한 긴장 없이 부드럽게 돌아오는 느낌을 만듭니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["Dm7", "G7", "Cmaj7"],
    detail: "Dm7은 C Major의 ii 코드입니다. G7으로 이어지면 도미넌트가 만들어지고, Cmaj7로 해결되면서 ii-V-I 진행이 됩니다.",
    sections: [
      {
        title: "어디에 쓰나",
        body: "토닉에서 바로 도미넌트로 가면 진행이 단순하게 들릴 수 있습니다. 그 사이에 ii나 IV를 넣으면 진행이 자연스럽게 앞으로 움직입니다.",
      },
      {
        title: "대표 패턴",
        body: "IV-V-I, ii-V-I, IV-I가 기본입니다. C Major에서는 F-G-C, Dm-G-C, F-C처럼 사용할 수 있습니다.",
      },
    ],
  },
  {
    id: "secondaryDominant",
    title: "세컨더리 도미넌트",
    subtitle: "키 안의 다른 코드를 잠깐 목표로 삼는 V 코드",
    summary: "세컨더리 도미넌트는 원래 키의 I이 아닌 다른 다이아토닉 코드를 잠깐 목표로 삼아 그 코드의 V를 빌려오는 방법입니다.",
    keyPoints: [
      "표기: V/V, V/ii, V/vi처럼 씁니다.",
      "C Major에서 V/V는 G의 V인 D 또는 D7입니다.",
      "해결 대상 코드 바로 앞에 놓으면 진행에 추진력이 생깁니다.",
      "보통 도미넌트7 형태로 쓰면 성격이 더 분명해집니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["C", "D7", "G", "C"],
    detail: "D7은 C Major 안의 다이아토닉 코드는 아니지만, G로 강하게 가고 싶게 만듭니다. 그래서 D7은 C Major에서 V/V로 볼 수 있습니다.",
    sections: [
      {
        title: "무슨 키의 V를 가져오나",
        body: "현재 키 안에 있는 다이아토닉 코드를 잠깐 목표 코드처럼 보고, 그 목표 코드가 I이라고 가정했을 때의 V 또는 V7을 가져옵니다. 예를 들어 C Major 안의 G를 목표로 삼으면, G Key의 V인 D7을 가져와 V/V로 씁니다.",
      },
      {
        title: "C Major에서 자주 가능한 대상",
        body: "ii(Dm), iii(Em), IV(F), V(G), vi(Am)를 목표로 삼는 경우가 많습니다. 그래서 A7→Dm은 V/ii, B7→Em은 V/iii, C7→F는 V/IV, D7→G는 V/V, E7→Am은 V/vi입니다.",
      },
      {
        title: "찾는 순서",
        body: "1. 목표 코드를 정합니다. 2. 그 목표 코드의 루트를 기준으로 완전5도 위 음을 찾습니다. 3. 그 음을 루트로 하는 메이저 코드나 7코드를 만듭니다. 4. 목표 코드 바로 앞에 놓아 해결시킵니다.",
      },
      {
        title: "사용법",
        body: "세컨더리 도미넌트는 보통 목표 코드 바로 앞에 둡니다. C-Am-Dm-G-C 진행에서 Dm을 더 강하게 부르고 싶으면 C-Am-A7-Dm-G-C처럼 A7을 넣을 수 있습니다.",
      },
      {
        title: "주의할 점",
        body: "세컨더리 도미넌트는 잠깐 밖으로 나가는 소리입니다. 너무 자주 쓰면 원래 키의 중심이 흐려질 수 있으니, 목표 코드로 바로 해결되게 쓰면 가장 안정적입니다.",
      },
    ],
  },
  {
    id: "modalInterchange",
    title: "모달 인터체인지",
    subtitle: "같은 으뜸음의 다른 모드에서 코드를 빌려오기",
    summary: "모달 인터체인지는 같은 루트의 다른 스케일이나 모드에서 코드를 빌려와 색채를 바꾸는 방법입니다.",
    keyPoints: [
      "C Major에서 C Minor 계열의 코드를 빌려오는 식으로 자주 씁니다.",
      "대표 차용 코드: bIII, iv, bVI, bVII",
      "Major 진행 안에 마이너 색을 넣고 싶을 때 효과적입니다.",
      "빌린 코드 뒤에는 원래 키의 코드로 돌아오면 중심이 흐트러지지 않습니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["C", "Fm", "C", "Ab", "Bb", "C"],
    detail: "Fm은 C Major 안에는 없지만 C Minor에서 빌려온 iv입니다. C에서 Fm으로 가면 밝은 메이저 안에 어두운 색이 순간적으로 생깁니다.",
    sections: [
      {
        title: "어디서 빌려오나",
        body: "같은 으뜸음의 다른 모드에서 빌려옵니다. C Major라면 C Minor, C Dorian, C Mixolydian 같은 C로 시작하는 모드에서 코드를 가져올 수 있습니다.",
      },
      {
        title: "자주 쓰는 차용 코드",
        body: "C Major 기준으로 Fm(iv), Ab(bVI), Bb(bVII), Eb(bIII), Db(bII)가 자주 쓰입니다. 특히 iv는 팝과 발라드에서 많이 들립니다.",
      },
    ],
  },
  {
    id: "tensions",
    title: "텐션",
    subtitle: "7화음 위에 얹는 9, 11, 13 계열의 색채음",
    summary: "텐션은 코드톤 위에 추가되는 색채음입니다. 9, 11, 13은 각각 2, 4, 6을 한 옥타브 위로 본 이름입니다.",
    keyPoints: [
      "9th = 2도, 11th = 4도, 13th = 6도",
      "maj7에서는 9, #11, 13이 자주 어울립니다.",
      "m7에서는 9, 11이 기본적으로 안정적입니다.",
      "7코드에서는 b9, #9, #11, b13 같은 얼터드 텐션도 자주 씁니다.",
    ],
    exampleTitle: "C 기준",
    examples: ["9 = D", "11 = F", "13 = A", "#11 = F#"],
    detail: "텐션은 코드의 기본 성질을 유지하면서 색을 더합니다. 다만 멜로디와 부딪히는 음은 짧게 지나가거나 해결해 주는 식으로 다루면 자연스럽습니다.",
    sections: [
      {
        title: "계산법",
        body: "9, 11, 13은 각각 2, 4, 6을 한 옥타브 위로 부르는 이름입니다. C 기준 9는 D, 11은 F, 13은 A입니다.",
      },
      {
        title: "코드별 기본 선택",
        body: "maj7에는 9, #11, 13이 잘 어울리고, m7에는 9, 11이 안정적입니다. 7코드에는 b9, #9, #11, b13처럼 긴장감 있는 텐션을 자주 씁니다.",
      },
    ],
  },
  {
    id: "substituteDominant",
    title: "대리 도미넌트",
    subtitle: "트라이톤을 공유하는 도미넌트7로 바꾸기",
    summary: "대리 도미넌트는 원래 도미넌트7과 같은 트라이톤을 가진 다른 도미넌트7으로 바꾸는 방법입니다.",
    keyPoints: [
      "G7의 3음과 b7은 B와 F입니다.",
      "Db7도 F와 Cb(B)를 가져서 G7과 비슷한 긴장을 만듭니다.",
      "그래서 G7 대신 Db7을 쓰면 C로 반음 하행하는 베이스 진행이 생깁니다.",
      "재즈, 보사노바, 세련된 팝 진행에서 자주 나옵니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["Dm7", "Db7", "Cmaj7"],
    detail: "원래 ii-V-I는 Dm7-G7-Cmaj7입니다. 여기서 G7을 Db7로 바꾸면 Dm7-Db7-Cmaj7이 되고, 베이스가 D-Db-C로 부드럽게 내려갑니다.",
  },
  {
    id: "cadence",
    title: "종지",
    subtitle: "프레이즈가 끝나는 느낌을 만드는 화성 마침표",
    summary: "종지는 음악 문장이 어디서 쉬고 끝나는지 알려주는 화성적 마침표입니다.",
    keyPoints: [
      "정격종지: V-I. 가장 강한 해결감입니다.",
      "변격종지: IV-I. 부드러운 마침 느낌입니다.",
      "반종지: 어떤 코드에서 V로 멈춤. 아직 끝나지 않은 느낌입니다.",
      "기만종지: V-vi. 해결할 것처럼 보이다가 살짝 빗나갑니다.",
    ],
    exampleTitle: "C Major 예시",
    examples: ["G-C", "F-C", "C-G", "G-Am"],
    detail: "종지를 알면 코드 진행의 문장 구조가 보입니다. 멜로디가 끝나는 위치와 종지가 만나면 곡의 구성이 더 또렷하게 들립니다.",
  },
];

const harmonyQuestions = [
  {
    level: "easy",
    topic: "다이아토닉",
    prompt: "C Major에서 I 코드는 무엇인가요?",
    answers: ["C", "Dm", "G", "Am"],
    correct: "C",
    explain: "C Major의 1도 음은 C이므로 I 코드는 C입니다.",
  },
  {
    level: "easy",
    topic: "다이아토닉",
    prompt: "Major Key의 다이아토닉 3화음 순서는 무엇인가요?",
    answers: ["I ii iii IV V vi vii°", "i ii° III iv v VI VII", "I iii ii V IV vi vii°", "I IV V ii iii vi vii°"],
    correct: "I ii iii IV V vi vii°",
    explain: "메이저 키 3화음은 메이저, 마이너, 마이너, 메이저, 메이저, 마이너, 디미니쉬 순서입니다.",
  },
  {
    level: "easy",
    topic: "다이아토닉",
    prompt: "C Major에서 V 코드는 무엇인가요?",
    answers: ["G", "F", "Am", "Bdim"],
    correct: "G",
    explain: "C Major의 5도 음은 G이므로 V 코드는 G입니다.",
  },
  {
    level: "easy",
    topic: "코드 구성",
    prompt: "메이저 코드의 구성 공식은 무엇인가요?",
    answers: ["1-3-5", "1-b3-5", "1-4-5", "1-3-b5"],
    correct: "1-3-5",
    explain: "메이저 코드는 근음, 장3도, 완전5도로 이루어집니다.",
  },
  {
    level: "easy",
    topic: "코드 구성",
    prompt: "마이너 코드의 구성 공식은 무엇인가요?",
    answers: ["1-b3-5", "1-3-5", "1-3-b5", "1-4-5"],
    correct: "1-b3-5",
    explain: "마이너 코드는 근음, 단3도, 완전5도로 이루어집니다.",
  },
  {
    level: "normal",
    topic: "7th 코드",
    prompt: "G7의 구성음은 무엇인가요?",
    answers: ["G B D F", "G Bb D F", "G B D F#", "G C D F"],
    correct: "G B D F",
    explain: "도미넌트7은 1-3-5-b7입니다. G7은 G, B, D, F입니다.",
  },
  {
    level: "normal",
    topic: "7th 코드",
    prompt: "Cmaj7의 구성음은 무엇인가요?",
    answers: ["C E G B", "C Eb G Bb", "C E G Bb", "C F G B"],
    correct: "C E G B",
    explain: "maj7 코드는 1-3-5-7입니다. Cmaj7은 C, E, G, B입니다.",
  },
  {
    level: "normal",
    topic: "7th 코드",
    prompt: "Am7의 구성음은 무엇인가요?",
    answers: ["A C E G", "A C# E G", "A C E G#", "A D E G"],
    correct: "A C E G",
    explain: "m7 코드는 1-b3-5-b7입니다. Am7은 A, C, E, G입니다.",
  },
  {
    level: "normal",
    topic: "관계조",
    prompt: "C Major의 관계단조는 무엇인가요?",
    answers: ["A Minor", "C Minor", "G Minor", "F Minor"],
    correct: "A Minor",
    explain: "메이저 키에서 6번째 음부터 시작하면 관계단조가 됩니다. C Major의 vi는 A Minor입니다.",
  },
  {
    level: "normal",
    topic: "조표",
    prompt: "D Major의 조표에 들어가는 샵은 무엇인가요?",
    answers: ["F#, C#", "F#", "F#, C#, G#", "Bb, Eb"],
    correct: "F#, C#",
    explain: "D Major는 샵 2개 키입니다. 조표는 F#, C#입니다.",
  },
  {
    level: "normal",
    topic: "조표",
    prompt: "Bb Major의 조표에 들어가는 플랫은 무엇인가요?",
    answers: ["Bb, Eb", "Bb", "Bb, Eb, Ab", "F#, C#"],
    correct: "Bb, Eb",
    explain: "Bb Major는 플랫 2개 키입니다. 조표는 Bb, Eb입니다.",
  },
  {
    level: "normal",
    topic: "모드",
    prompt: "D Dorian은 어떤 메이저 스케일과 같은 음을 쓰나요?",
    answers: ["C Major", "D Major", "F Major", "G Major"],
    correct: "C Major",
    explain: "도리안은 메이저 스케일의 2번째 모드입니다. C Major를 D부터 보면 D Dorian입니다.",
  },
  {
    level: "normal",
    topic: "모드",
    prompt: "G Mixolydian은 어떤 메이저 스케일과 같은 음을 쓰나요?",
    answers: ["C Major", "G Major", "D Major", "F Major"],
    correct: "C Major",
    explain: "믹솔리디안은 메이저 스케일의 5번째 모드입니다. C Major를 G부터 보면 G Mixolydian입니다.",
  },
  {
    level: "hard",
    topic: "세컨더리 도미넌트",
    prompt: "C Major에서 V/V는 어떤 코드인가요?",
    answers: ["D", "G", "Am", "F"],
    correct: "D",
    explain: "C Major의 V는 G이고, G의 V는 D입니다. 7th까지 쓰면 D7입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "Cmaj7에서 9th 텐션은 어떤 음인가요?",
    answers: ["D", "F", "Bb", "Ab"],
    correct: "D",
    explain: "9th는 2도를 한 옥타브 위로 본 음입니다. C 기준 9th는 D입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "G7에서 13th 텐션은 어떤 음인가요?",
    answers: ["E", "A", "C", "F"],
    correct: "E",
    explain: "13th는 6도를 한 옥타브 위로 본 음입니다. G 기준 13th는 E입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "Dm7에서 11th 텐션은 어떤 음인가요?",
    answers: ["G", "E", "B", "Ab"],
    correct: "G",
    explain: "11th는 4도를 한 옥타브 위로 본 음입니다. D 기준 11th는 G입니다.",
  },
  {
    level: "hard",
    topic: "트라이톤",
    prompt: "G7의 3음과 b7음은 무엇인가요?",
    answers: ["B-F", "G-D", "G-B", "D-F"],
    correct: "B-F",
    explain: "G7은 G, B, D, F입니다. 3음은 B, b7음은 F입니다.",
  },
  {
    level: "hard",
    topic: "코드 구성",
    prompt: "Cdim7의 구성음은 무엇인가요?",
    answers: ["C Eb Gb Bbb", "C Eb G Bb", "C E Gb Bb", "C Eb Gb Bb"],
    correct: "C Eb Gb Bbb",
    explain: "dim7 공식은 1-b3-b5-bb7입니다. Cdim7은 C, Eb, Gb, Bbb입니다.",
  },
  {
    level: "hard",
    topic: "하프 디미니쉬",
    prompt: "Bm7b5의 구성 공식은 무엇인가요?",
    answers: ["1-b3-b5-b7", "1-b3-5-b7", "1-3-b5-b7", "1-b3-b5-bb7"],
    correct: "1-b3-b5-b7",
    explain: "m7b5는 하프 디미니쉬 코드입니다. 디미니쉬 3화음에 단7도를 더합니다.",
  },
  {
    level: "easy",
    topic: "조표",
    prompt: "G Major의 조표에 들어가는 샵은 무엇인가요?",
    answers: ["F#", "C#", "Bb", "F#, C#"],
    correct: "F#",
    explain: "G Major는 샵 1개 키입니다. 조표는 F#입니다.",
  },
  {
    level: "easy",
    topic: "조표",
    prompt: "F Major의 조표에 들어가는 플랫은 무엇인가요?",
    answers: ["Bb", "Eb", "Bb, Eb", "F#"],
    correct: "Bb",
    explain: "F Major는 플랫 1개 키입니다. 조표는 Bb입니다.",
  },
  {
    level: "easy",
    topic: "코드 구성",
    prompt: "C 코드의 구성음은 무엇인가요?",
    answers: ["C E G", "C Eb G", "C F G", "C E Bb"],
    correct: "C E G",
    explain: "메이저 코드는 1-3-5입니다. C 코드는 C, E, G입니다.",
  },
  {
    level: "easy",
    topic: "코드 구성",
    prompt: "Dm 코드의 구성음은 무엇인가요?",
    answers: ["D F A", "D F# A", "D G A", "D F C"],
    correct: "D F A",
    explain: "마이너 코드는 1-b3-5입니다. Dm은 D, F, A입니다.",
  },
  {
    level: "easy",
    topic: "다이아토닉",
    prompt: "G Major에서 vi 코드는 무엇인가요?",
    answers: ["Em", "Am", "Bm", "D"],
    correct: "Em",
    explain: "G Major의 6도 음은 E이고, vi는 마이너 코드라 Em입니다.",
  },
  {
    level: "normal",
    topic: "코드 구성",
    prompt: "Dmaj7의 구성음은 무엇인가요?",
    answers: ["D F# A C#", "D F A C", "D F# A C", "D G A C#"],
    correct: "D F# A C#",
    explain: "maj7 코드는 1-3-5-7입니다. Dmaj7은 D, F#, A, C#입니다.",
  },
  {
    level: "normal",
    topic: "코드 구성",
    prompt: "Em7의 구성음은 무엇인가요?",
    answers: ["E G B D", "E G# B D", "E G B D#", "E A B D"],
    correct: "E G B D",
    explain: "m7 코드는 1-b3-5-b7입니다. Em7은 E, G, B, D입니다.",
  },
  {
    level: "normal",
    topic: "코드 구성",
    prompt: "A7의 구성음은 무엇인가요?",
    answers: ["A C# E G", "A C E G", "A C# E G#", "A D E G"],
    correct: "A C# E G",
    explain: "도미넌트7은 1-3-5-b7입니다. A7은 A, C#, E, G입니다.",
  },
  {
    level: "normal",
    topic: "조표",
    prompt: "A Major의 조표에 들어가는 샵은 무엇인가요?",
    answers: ["F#, C#, G#", "F#, C#", "F#, C#, G#, D#", "Bb, Eb, Ab"],
    correct: "F#, C#, G#",
    explain: "A Major는 샵 3개 키입니다. 조표는 F#, C#, G#입니다.",
  },
  {
    level: "normal",
    topic: "조표",
    prompt: "Eb Major의 조표에 들어가는 플랫은 무엇인가요?",
    answers: ["Bb, Eb, Ab", "Bb, Eb", "Bb", "F#, C#, G#"],
    correct: "Bb, Eb, Ab",
    explain: "Eb Major는 플랫 3개 키입니다. 조표는 Bb, Eb, Ab입니다.",
  },
  {
    level: "normal",
    topic: "텐션",
    prompt: "C 코드에서 9th는 어떤 음인가요?",
    answers: ["D", "F", "A", "Bb"],
    correct: "D",
    explain: "9th는 2도를 한 옥타브 위로 본 음입니다. C 기준 9th는 D입니다.",
  },
  {
    level: "normal",
    topic: "텐션",
    prompt: "F 코드에서 6th는 어떤 음인가요?",
    answers: ["D", "G", "E", "Bb"],
    correct: "D",
    explain: "6th는 루트에서 6번째 음입니다. F 기준 6th는 D입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "A7에서 b9 텐션은 어떤 음인가요?",
    answers: ["Bb", "B", "C", "G"],
    correct: "Bb",
    explain: "A의 9th는 B이고 b9는 반음 낮춘 Bb입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "D7에서 #11 텐션은 어떤 음인가요?",
    answers: ["G#", "G", "A", "C"],
    correct: "G#",
    explain: "D의 11th는 G이고 #11은 반음 올린 G#입니다.",
  },
  {
    level: "hard",
    topic: "텐션",
    prompt: "Cmaj7에서 #11 텐션은 어떤 음인가요?",
    answers: ["F#", "F", "G", "B"],
    correct: "F#",
    explain: "C의 11th는 F이고 #11은 반음 올린 F#입니다.",
  },
  {
    level: "hard",
    topic: "코드 구성",
    prompt: "E7b9의 구성음은 무엇인가요?",
    answers: ["E G# B D F", "E G B D F", "E G# B D F#", "E A B D F"],
    correct: "E G# B D F",
    explain: "E7은 E, G#, B, D이고 b9는 F입니다.",
  },
  {
    level: "hard",
    topic: "코드 구성",
    prompt: "F#m7b5의 구성음은 무엇인가요?",
    answers: ["F# A C E", "F# A C# E", "F# A# C E", "F# A C Eb"],
    correct: "F# A C E",
    explain: "m7b5 공식은 1-b3-b5-b7입니다. F#m7b5는 F#, A, C, E입니다.",
  },
  {
    level: "hard",
    topic: "세컨더리 도미넌트",
    prompt: "G Major에서 V/vi는 어떤 코드인가요?",
    answers: ["B", "D", "E", "A"],
    correct: "B",
    explain: "G Major의 vi는 Em이고, Em으로 가는 V는 B입니다. 7th까지 쓰면 B7입니다.",
  },
];

const state = {
  view: "quiz",
  deck: [],
  scaleCount: 0,
  scaleRecent: [],
  current: null,
  correct: 0,
  answered: 0,
  hintStep: 0,
  scaleTried: false,
  scaleLocked: false,
  reviewItems: loadReviewItems(),
  harmonyDeck: [],
  harmonyCount: 0,
  harmonyRecent: [],
  harmonyCurrent: null,
  harmonyAnswered: false,
  earDeck: [],
  earCount: 0,
  earRecent: [],
  earCurrent: null,
  earAnswered: false,
  guitarDeck: [],
  guitarCount: 0,
  guitarRecent: [],
  guitarCurrent: null,
  chordCurrent: null,
  chordNext: null,
  chordPlaying: false,
  chordTimer: null,
  chordBeat: 1,
  chordCountIn: false,
  metronomeOn: false,
  metronomeTimer: null,
  beatIndex: 0,
  tapTimes: [],
  beatModes: ["accent", "basic", "basic", "basic"],
  beatShape: "circle",
  visualOptions: {
    dots: true,
    pendulum: false,
    flash: false,
  },
  audioContext: null,
  autoTimer: null,
  autoInterval: null,
};

const els = {
  tabs: document.querySelectorAll("[data-view]"),
  quizView: document.querySelector("#quizView"),
  harmonyView: document.querySelector("#harmonyView"),
  earView: document.querySelector("#earView"),
  guitarView: document.querySelector("#guitarView"),
  rhythmView: document.querySelector("#rhythmView"),
  chordView: document.querySelector("#chordView"),
  reviewView: document.querySelector("#reviewView"),
  chartView: document.querySelector("#chartView"),
  circleView: document.querySelector("#circleView"),
  quizMode: document.querySelector("#quizMode"),
  quizScale: document.querySelector("#quizScale"),
  quizKeySet: document.querySelector("#quizKeySet"),
  quizDifficulty: document.querySelector("#quizDifficulty"),
  harmonyDifficulty: document.querySelector("#harmonyDifficulty"),
  earMode: document.querySelector("#earMode"),
  earDifficulty: document.querySelector("#earDifficulty"),
  earNoteSet: document.querySelector("#earNoteSet"),
  chartScale: document.querySelector("#chartScale"),
  quizTypeLabel: document.querySelector("#quizTypeLabel"),
  quizProgress: document.querySelector("#quizProgress"),
  quizPrompt: document.querySelector("#quizPrompt"),
  quizHint: document.querySelector("#quizHint"),
  answerSlots: document.querySelector("#answerSlots"),
  answerInput: document.querySelector("#answerInput"),
  notePad: document.querySelector("#notePad"),
  feedback: document.querySelector("#feedback"),
  checkButton: document.querySelector("#checkButton"),
  hintButton: document.querySelector("#hintButton"),
  nextButton: document.querySelector("#nextButton"),
  shuffleButton: document.querySelector("#shuffleButton"),
  autoNextToggle: document.querySelector("#autoNextToggle"),
  resetScoreButton: document.querySelector("#resetScoreButton"),
  accuracy: document.querySelector("#accuracy"),
  harmonyTopic: document.querySelector("#harmonyTopic"),
  harmonyProgress: document.querySelector("#harmonyProgress"),
  harmonyPrompt: document.querySelector("#harmonyPrompt"),
  harmonyHint: document.querySelector("#harmonyHint"),
  harmonyAnswers: document.querySelector("#harmonyAnswers"),
  harmonyFeedback: document.querySelector("#harmonyFeedback"),
  harmonyNextButton: document.querySelector("#harmonyNextButton"),
  harmonyShuffleButton: document.querySelector("#harmonyShuffleButton"),
  earTopic: document.querySelector("#earTopic"),
  earProgress: document.querySelector("#earProgress"),
  earPrompt: document.querySelector("#earPrompt"),
  earHint: document.querySelector("#earHint"),
  earAnswers: document.querySelector("#earAnswers"),
  earFeedback: document.querySelector("#earFeedback"),
  earPlayButton: document.querySelector("#earPlayButton"),
  earNextButton: document.querySelector("#earNextButton"),
  earShuffleButton: document.querySelector("#earShuffleButton"),
  guitarProgress: document.querySelector("#guitarProgress"),
  guitarRoot: document.querySelector("#guitarRoot"),
  guitarPosition: document.querySelector("#guitarPosition"),
  guitarHint: document.querySelector("#guitarHint"),
  guitarNextButton: document.querySelector("#guitarNextButton"),
  guitarShuffleButton: document.querySelector("#guitarShuffleButton"),
  chordRootSelect: document.querySelector("#chordRootSelect"),
  chordBpmInput: document.querySelector("#chordBpmInput"),
  chordUnitSelect: document.querySelector("#chordUnitSelect"),
  chordChangeEverySelect: document.querySelector("#chordChangeEverySelect"),
  chordTypeOptions: document.querySelector("#chordTypeOptions"),
  clearChordTypesButton: document.querySelector("#clearChordTypesButton"),
  chordPlayToggleButton: document.querySelector("#chordPlayToggleButton"),
  chordNextNowButton: document.querySelector("#chordNextNowButton"),
  chordCurrentDisplay: document.querySelector("#chordCurrentDisplay"),
  chordNextDisplay: document.querySelector("#chordNextDisplay"),
  chordBeatDisplay: document.querySelector("#chordBeatDisplay"),
  rhythmStudyList: document.querySelector("#rhythmStudyList"),
  meterSelect: document.querySelector("#meterSelect"),
  rhythmPatternSelect: document.querySelector("#rhythmPatternSelect"),
  metronomeSoundSelect: document.querySelector("#metronomeSoundSelect"),
  beatShapeButtons: document.querySelector("#beatShapeButtons"),
  visualToggleButtons: document.querySelector("#visualToggleButtons"),
  autoTempoEveryInput: document.querySelector("#autoTempoEveryInput"),
  autoTempoAmountInput: document.querySelector("#autoTempoAmountInput"),
  tempoInput: document.querySelector("#tempoInput"),
  tempoSlider: document.querySelector("#tempoSlider"),
  tempoValue: document.querySelector("#tempoValue"),
  tempoDownButton: document.querySelector("#tempoDownButton"),
  tempoUpButton: document.querySelector("#tempoUpButton"),
  tapTempoButton: document.querySelector("#tapTempoButton"),
  tempoPresetButtons: document.querySelectorAll("[data-tempo-preset]"),
  tempoStage: document.querySelector(".tempo-stage"),
  pendulum: document.querySelector("#pendulum"),
  beatDots: document.querySelector("#beatDots"),
  beatCounter: document.querySelector("#beatCounter"),
  measureCounter: document.querySelector("#measureCounter"),
  rhythmPatternName: document.querySelector("#rhythmPatternName"),
  rhythmPatternInfo: document.querySelector("#rhythmPatternInfo"),
  metronomeToggleButton: document.querySelector("#metronomeToggleButton"),
  reviewSummary: document.querySelector("#reviewSummary"),
  reviewList: document.querySelector("#reviewList"),
  startReviewButton: document.querySelector("#startReviewButton"),
  clearReviewButton: document.querySelector("#clearReviewButton"),
  scaleInfo: document.querySelector("#scaleInfo"),
  scaleChart: document.querySelector("#scaleChart"),
  circleList: document.querySelector("#circleList"),
};

function semitoneOf(note) {
  const normalized = enharmonic[note] || note;
  const sharpIndex = sharpChromatic.indexOf(normalized);
  if (sharpIndex >= 0) return sharpIndex;
  const flatIndex = flatChromatic.indexOf(normalized);
  if (flatIndex >= 0) return flatIndex;
  const match = normalized.match(/^([A-G])([#b]{1,2})$/);
  if (!match) return -1;
  const accidentalOffset = [...match[2]].reduce((sum, accidental) => sum + (accidental === "#" ? 1 : -1), 0);
  return (((naturalSemitones[match[1]] + accidentalOffset) % 12) + 12) % 12;
}

function chooseChromatic(root) {
  if (flatKeys.has(root) || root.includes("b")) return flatChromatic;
  return sharpChromatic;
}

function spellNote(letter, targetSemitone, root) {
  const natural = naturalSemitones[letter];
  const diff = (((targetSemitone - natural) % 12) + 12) % 12;
  if (diff === 0) return letter;
  if (diff === 1) return `${letter}#`;
  if (diff === 2) return noteFromSemitone(targetSemitone, root);
  if (diff === 11) return `${letter}b`;
  if (diff === 10) return noteFromSemitone(targetSemitone, root);
  return noteFromSemitone(targetSemitone, root);
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
    notes.push(spellNote(letter, semitone, root));
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

function formatManualAnswer(value) {
  return value
    .replaceAll("♭", "b")
    .replaceAll("＃", "#")
    .replaceAll(",", " ")
    .replaceAll("-", " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const first = token[0]?.toUpperCase() || "";
      const rest = token.slice(1).replaceAll("B", "b");
      return `${first}${rest}`;
    })
    .join(" ");
}

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem("scaleTrainerSettings") || "{}");
  } catch {
    return {};
  }
}

function saveSettings() {
  const chordTypeIds = [...els.chordTypeOptions.querySelectorAll("input:checked")].map((input) => input.value);
  const settings = {
    quizMode: els.quizMode.value,
    quizScale: els.quizScale.value,
    quizKeySet: els.quizKeySet.value,
    quizDifficulty: els.quizDifficulty.value,
    harmonyDifficulty: els.harmonyDifficulty.value,
    earMode: els.earMode.value,
    earDifficulty: els.earDifficulty.value,
    earNoteSet: els.earNoteSet.value,
    theoryTopic: els.chartScale.value,
    chordRoot: els.chordRootSelect.value,
    chordBpm: els.chordBpmInput.value,
    chordUnit: els.chordUnitSelect.value,
    chordChangeEvery: els.chordChangeEverySelect.value,
    chordTypeIds,
    meter: els.meterSelect.value,
    rhythmPattern: els.rhythmPatternSelect.value,
    metronomeSound: els.metronomeSoundSelect.value,
    beatModes: state.beatModes,
    beatShape: state.beatShape,
    visualOptions: state.visualOptions,
    autoTempoEvery: els.autoTempoEveryInput.value,
    autoTempoAmount: els.autoTempoAmountInput.value,
    tempo: els.tempoInput.value,
    autoNext: els.autoNextToggle.checked,
  };
  localStorage.setItem("scaleTrainerSettings", JSON.stringify(settings));
}

function applySettings() {
  const settings = loadSettings();
  if (settings.quizMode) els.quizMode.value = settings.quizMode;
  if (settings.quizScale) els.quizScale.value = settings.quizScale;
  if (settings.quizKeySet) els.quizKeySet.value = settings.quizKeySet;
  if (settings.quizDifficulty) els.quizDifficulty.value = settings.quizDifficulty;
  if (settings.harmonyDifficulty) els.harmonyDifficulty.value = settings.harmonyDifficulty;
  if (settings.earMode) els.earMode.value = settings.earMode;
  if (settings.earDifficulty) els.earDifficulty.value = settings.earDifficulty;
  if (settings.earNoteSet) els.earNoteSet.value = settings.earNoteSet;
  if (settings.theoryTopic) els.chartScale.value = settings.theoryTopic;
  if (!settings.theoryTopic && settings.chartScale && theoryTopics.some((topic) => topic.id === settings.chartScale)) {
    els.chartScale.value = settings.chartScale;
  }
  if (settings.chordRoot) els.chordRootSelect.value = settings.chordRoot;
  if (settings.chordBpm) els.chordBpmInput.value = settings.chordBpm;
  if (settings.chordUnit) els.chordUnitSelect.value = settings.chordUnit;
  if (settings.chordChangeEvery) els.chordChangeEverySelect.value = settings.chordChangeEvery;
  if (Array.isArray(settings.chordTypeIds) && settings.chordTypeIds.length) {
    [...els.chordTypeOptions.querySelectorAll("input")].forEach((input) => {
      input.checked = settings.chordTypeIds.includes(input.value);
    });
  }
  if (settings.meter) els.meterSelect.value = settings.meter;
  if (settings.rhythmPattern) els.rhythmPatternSelect.value = settings.rhythmPattern;
  if (settings.metronomeSound) els.metronomeSoundSelect.value = settings.metronomeSound;
  if (Array.isArray(settings.beatModes)) state.beatModes = settings.beatModes;
  if (!settings.beatModes && Array.isArray(settings.customAccents)) {
    state.beatModes = Array.from({ length: Number(els.meterSelect.value) || 4 }, (_, index) => (
      settings.customAccents.includes(index) ? "accent" : "basic"
    ));
  }
  if (settings.beatShape) state.beatShape = settings.beatShape;
  if (settings.visualOptions) state.visualOptions = { ...state.visualOptions, ...settings.visualOptions };
  if (settings.visualMode) {
    state.visualOptions = {
      dots: settings.visualMode !== "hidden",
      pendulum: settings.visualMode === "pendulum",
      flash: settings.visualMode === "flash",
    };
  }
  if (settings.autoTempoEvery) els.autoTempoEveryInput.value = settings.autoTempoEvery;
  if (settings.autoTempoAmount) els.autoTempoAmountInput.value = settings.autoTempoAmount;
  if (settings.tempo) setTempo(settings.tempo);
  if (typeof settings.autoNext === "boolean") els.autoNextToggle.checked = settings.autoNext;
}

function loadReviewItems() {
  try {
    return JSON.parse(localStorage.getItem("scaleTrainerReview") || "[]");
  } catch {
    return [];
  }
}

function saveReviewItems() {
  localStorage.setItem("scaleTrainerReview", JSON.stringify(state.reviewItems.slice(0, 40)));
}

function rememberWrongScale(item, expected) {
  const id = `${item.root}-${item.scale.id}-${item.mode}`;
  const nextItem = {
    id,
    root: item.root,
    scaleId: item.scale.id,
    scaleName: item.scale.name,
    mode: item.mode,
    expected,
    notes: item.notes,
    missedAt: new Date().toISOString(),
  };
  state.reviewItems = [nextItem, ...state.reviewItems.filter((entry) => entry.id !== id)].slice(0, 40);
  saveReviewItems();
  renderReview();
}

function clearReviewItems() {
  state.reviewItems = [];
  saveReviewItems();
  renderReview();
}

function populateSelects() {
  scaleTypes.forEach((scale) => {
    const quizOption = new Option(`${scale.name} (${scale.korean})`, scale.id);
    els.quizScale.add(quizOption);
  });
  theoryTopics.forEach((topic) => {
    els.chartScale.add(new Option(topic.title, topic.id));
  });
}

function getScaleById(id) {
  return scaleTypes.find((scale) => scale.id === id) || scaleTypes[0];
}

function getRootsForQuiz() {
  if (els.quizDifficulty.value === "easy") return easyRoots;
  if (els.quizDifficulty.value === "hard") return allRoots;
  if (els.quizKeySet.value === "common") return commonRoots;
  if (els.quizKeySet.value === "all") return allRoots.filter((root) => root !== "C#" && root !== "Cb");
  return rootsCircle.filter((root) => root !== "C#" && root !== "Cb");
}

function pickRandomAvoidingRecent(pool, recent, getId) {
  if (!pool.length) return null;
  const blockSize = Math.min(4, Math.max(0, pool.length - 1));
  const blocked = new Set(recent.slice(-blockSize));
  const candidates = pool.filter((item) => !blocked.has(getId(item)));
  const source = candidates.length ? candidates : pool;
  const item = source[randomInt(0, source.length - 1)];
  recent.push(getId(item));
  if (recent.length > 12) recent.splice(0, recent.length - 12);
  return item;
}

function buildDeck() {
  clearAutoAdvance();
  const scale = getScaleById(els.quizScale.value);
  state.deck = getRootsForQuiz().map((root) => ({
    root,
    scale,
    notes: buildScale(root, scale),
  }));
  state.scaleCount = 0;
  state.scaleRecent = [];
  makeQuestion();
}

function buildReviewDeck() {
  clearAutoAdvance();
  if (!state.reviewItems.length) {
    switchView("review");
    return;
  }
  state.deck = state.reviewItems.map((item) => {
    const scale = getScaleById(item.scaleId);
    return {
      root: item.root,
      scale,
      notes: buildScale(item.root, scale),
    };
  });
  state.scaleCount = 0;
  state.scaleRecent = [];
  els.quizMode.value = "full";
  makeQuestion();
  switchView("quiz");
}

function makeQuestion() {
  clearAutoAdvance();
  if (!state.deck.length) return;
  const mode = els.quizMode.value;
  const item = pickRandomAvoidingRecent(state.deck, state.scaleRecent, (entry) => `${entry.root}-${entry.scale.id}-${mode}`);
  if (!item) return;
  const blankIndex = mode === "partial" ? randomInt(1, item.notes.length - 2) : -1;
  state.scaleCount += 1;
  state.current = { ...item, mode, blankIndex };
  state.hintStep = 0;
  state.scaleTried = false;
  state.scaleLocked = false;
  els.quizTypeLabel.textContent = mode === "full" ? "전체 쓰기" : "부분 맞추기";
  els.quizProgress.textContent = `랜덤 ${state.scaleCount}문제`;
  els.quizPrompt.textContent = mode === "full"
    ? `${item.root} ${item.scale.name} 스케일 전체를 쓰세요.`
    : `${item.root} ${item.scale.name} 스케일에서 빈칸 음을 맞추세요.`;
  els.quizHint.textContent = mode === "full"
    ? `입력 규칙: 대문자 음 이름, 샵은 #, 플랫은 b. 음 사이를 띄어쓰세요.`
    : `입력 규칙: 대문자 음 이름, 샵은 #, 플랫은 b. 빈칸 음 하나만 입력하세요.`;
  els.answerInput.value = "";
  els.answerInput.disabled = false;
  els.answerInput.placeholder = mode === "full" ? "예: C D E F G A B C" : "빈칸 음 하나만 입력";
  setNotePadDisabled(false);
  els.checkButton.disabled = false;
  renderSlots(item.notes, blankIndex, item.scale.degrees, mode);
  hideFeedback();
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

function getAnswerTokens() {
  return els.answerInput.value.trim().split(/\s+/).filter(Boolean);
}

function setAnswerTokens(tokens) {
  els.answerInput.value = tokens.join(" ");
}

function addNote(note) {
  if (state.scaleLocked) return;
  const tokens = getAnswerTokens();
  tokens.push(note);
  setAnswerTokens(tokens);
}

function addAccidental(accidental) {
  if (state.scaleLocked) return;
  const tokens = getAnswerTokens();
  if (!tokens.length) return;
  const last = tokens[tokens.length - 1];
  if (!/^[A-G](?:#|b)*$/i.test(last)) return;
  tokens[tokens.length - 1] = `${last[0].toUpperCase()}${accidental}`;
  setAnswerTokens(tokens);
}

function editNotePad(action) {
  if (state.scaleLocked) return;
  if (action === "clear") {
    els.answerInput.value = "";
    return;
  }
  const tokens = getAnswerTokens();
  tokens.pop();
  setAnswerTokens(tokens);
}

function setNotePadDisabled(disabled) {
  [...els.notePad.querySelectorAll("button")].forEach((button) => {
    button.disabled = disabled;
  });
}

function clearAutoAdvance() {
  if (state.autoTimer) clearTimeout(state.autoTimer);
  if (state.autoInterval) clearInterval(state.autoInterval);
  state.autoTimer = null;
  state.autoInterval = null;
}

function scheduleAutoAdvance(feedbackEl, baseText, nextHandler) {
  clearAutoAdvance();
  if (!els.autoNextToggle.checked) return;
  let remaining = 3;
  feedbackEl.classList.add("pending");
  feedbackEl.textContent = `${baseText} ${remaining}초 뒤 다음 문제`;
  state.autoInterval = setInterval(() => {
    remaining -= 1;
    if (remaining > 0) {
      feedbackEl.textContent = `${baseText} ${remaining}초 뒤 다음 문제`;
    }
  }, 1000);
  state.autoTimer = setTimeout(() => {
    clearAutoAdvance();
    feedbackEl.classList.remove("pending");
    nextHandler();
  }, 3000);
}

function resetScore() {
  state.correct = 0;
  state.answered = 0;
  updateAccuracy();
  els.feedback.classList.remove("hidden", "wrong");
  els.feedback.classList.add("pending");
  els.feedback.textContent = "점수를 초기화했습니다.";
}

function showScaleHint() {
  if (!state.current) return;
  state.hintStep += 1;
  const { root, scale, notes, mode, blankIndex } = state.current;
  const hints = mode === "partial"
    ? [
        `빈칸은 ${scale.degrees[blankIndex]}음입니다.`,
        `구조: ${scale.formula}`,
        `전체 스케일: ${notes.join(" ")}`,
      ]
    : [
        `첫 음과 끝 음은 ${root}입니다.`,
        `구조: ${scale.formula}`,
        `도수: ${scale.degrees.join(" - ")}`,
      ];
  const hint = hints[Math.min(state.hintStep - 1, hints.length - 1)];
  els.feedback.classList.remove("hidden", "wrong");
  els.feedback.textContent = hint;
}

function checkAnswer() {
  if (!state.current || state.scaleLocked) return;
  els.answerInput.value = formatManualAnswer(els.answerInput.value);
  const userAnswer = normalizeAnswer(els.answerInput.value);
  const expected = state.current.mode === "full"
    ? normalizeAnswer(state.current.notes.join(" "))
    : normalizeAnswer(state.current.notes[state.current.blankIndex]);
  const isCorrect = userAnswer === expected;

  if (!state.scaleTried) {
    state.answered += 1;
    if (isCorrect) state.correct += 1;
    if (!isCorrect) rememberWrongScale(state.current, expected);
    state.scaleTried = true;
  }
  updateAccuracy();
  showFeedback(isCorrect, expected);
}

function showFeedback(isCorrect, expected) {
  els.feedback.classList.remove("hidden", "wrong", "pending");
  if (!isCorrect) els.feedback.classList.add("wrong");
  const fullScale = state.current.notes.join(" ");
  const message = isCorrect
    ? `정답입니다. ${state.current.root} ${state.current.scale.name}: ${fullScale}`
    : `아쉬워요. 정답은 ${expected} 입니다. 전체 스케일: ${fullScale}`;
  els.feedback.textContent = message;
  if (isCorrect) {
    state.scaleLocked = true;
    els.answerInput.disabled = true;
    els.checkButton.disabled = true;
    setNotePadDisabled(true);
    scheduleAutoAdvance(els.feedback, message, nextQuestion);
  }
}

function hideFeedback() {
  els.feedback.classList.add("hidden");
  els.feedback.classList.remove("wrong", "pending");
  els.feedback.textContent = "";
}

function nextQuestion() {
  clearAutoAdvance();
  makeQuestion();
}

function updateAccuracy() {
  const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
  els.accuracy.textContent = `${accuracy}%`;
}

function getTheoryTopicById(id) {
  return theoryTopics.find((topic) => topic.id === id) || theoryTopics[0];
}

function renderScaleChart() {
  const topic = getTheoryTopicById(els.chartScale.value);
  els.scaleInfo.innerHTML = `
    <article class="info-box">
      <span>개념</span>
      <strong>${topic.title}</strong>
      <p>${topic.subtitle}<br>${topic.summary}</p>
    </article>
    <article class="info-box">
      <span>예시</span>
      <strong>${topic.exampleTitle}</strong>
      <p>${topic.detail}</p>
    </article>
  `;

  els.scaleChart.innerHTML = "";
  const pointCard = document.createElement("article");
  pointCard.className = "scale-row theory-card";
  pointCard.innerHTML = `
    <div class="scale-row-head">
      <h3>핵심 정리</h3>
      <span class="badge">Theory</span>
    </div>
    <ul class="theory-points">${topic.keyPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
  els.scaleChart.append(pointCard);

  const exampleCard = document.createElement("article");
  exampleCard.className = "scale-row theory-card";
  exampleCard.innerHTML = `
      <div class="scale-row-head">
        <h3>${topic.exampleTitle}</h3>
        <span class="badge">Example</span>
      </div>
      <div class="notes">${topic.examples.map((example) => `<span class="note theory-note">${example}</span>`).join("")}</div>
  `;
  els.scaleChart.append(exampleCard);

  (topic.sections || []).forEach((section, index) => {
    const sectionCard = document.createElement("article");
    sectionCard.className = "scale-row theory-card theory-section-card";
    sectionCard.innerHTML = `
      <div class="scale-row-head">
        <h3>${section.title}</h3>
        <span class="badge">${index + 1}</span>
      </div>
      <p class="theory-section-text">${section.body}</p>
    `;
    els.scaleChart.append(sectionCard);
  });
}

function renderCircle() {
  els.circleList.innerHTML = "";
  const center = document.createElement("div");
  center.className = "circle-center";
  center.innerHTML = `<div><strong>5도권</strong><span># 오른쪽<br>b 왼쪽</span></div>`;
  els.circleList.append(center);
  circleOfFifths.forEach((circleItem, index) => {
    const angle = (index * 30 * Math.PI) / 180;
    const radius = 38;
    const x = 50 + Math.sin(angle) * radius;
    const y = 50 - Math.cos(angle) * radius;
    const card = document.createElement("article");
    card.className = `circle-item ${circleItem.type}`;
    card.style.left = `${x}%`;
    card.style.top = `${y}%`;
    card.innerHTML = `
      <strong>${circleItem.major}</strong>
      <span class="minor">${circleItem.minor}</span>
      <span class="signature-count">${circleItem.count}</span>
    `;
    els.circleList.append(card);
  });
}

const chordToneQuestionTypes = [
  { level: "easy", suffix: "", name: "메이저", tones: [{ label: "3음", interval: 4 }, { label: "5음", interval: 7 }] },
  { level: "easy", suffix: "m", name: "마이너", tones: [{ label: "b3음", interval: 3 }, { label: "5음", interval: 7 }] },
  { level: "normal", suffix: "7", name: "도미넌트7", tones: [{ label: "3음", interval: 4 }, { label: "5음", interval: 7 }, { label: "b7음", interval: 10 }] },
  { level: "normal", suffix: "maj7", name: "메이저7", tones: [{ label: "3음", interval: 4 }, { label: "5음", interval: 7 }, { label: "7음", interval: 11 }] },
  { level: "normal", suffix: "m7", name: "마이너7", tones: [{ label: "b3음", interval: 3 }, { label: "5음", interval: 7 }, { label: "b7음", interval: 10 }] },
  { level: "hard", suffix: "m7b5", name: "하프 디미니쉬", tones: [{ label: "b3음", interval: 3 }, { label: "b5음", interval: 6 }, { label: "b7음", interval: 10 }] },
  { level: "hard", suffix: "7b9", name: "도미넌트7 b9", tones: [{ label: "3음", interval: 4 }, { label: "b7음", interval: 10 }, { label: "b9음", interval: 13 }] },
  { level: "hard", suffix: "7#9", name: "도미넌트7 #9", tones: [{ label: "3음", interval: 4 }, { label: "b7음", interval: 10 }, { label: "#9음", interval: 15 }] },
];

const majorDiatonicTriads = [
  { roman: "I", quality: "", level: "easy" },
  { roman: "ii", quality: "m", level: "normal" },
  { roman: "iii", quality: "m", level: "normal" },
  { roman: "IV", quality: "", level: "easy" },
  { roman: "V", quality: "", level: "easy" },
  { roman: "vi", quality: "m", level: "easy" },
  { roman: "vii°", quality: "dim", level: "hard" },
];

const minorDiatonicTriads = [
  { roman: "i", quality: "m", level: "easy" },
  { roman: "ii°", quality: "dim", level: "hard" },
  { roman: "III", quality: "", level: "normal" },
  { roman: "iv", quality: "m", level: "normal" },
  { roman: "v", quality: "m", level: "easy" },
  { roman: "VI", quality: "", level: "normal" },
  { roman: "VII", quality: "", level: "normal" },
];

function chordToneChoices(root, correct, intervals) {
  const rootSemitone = semitoneOf(root);
  const pool = [...new Set([
    correct,
    ...intervals.map((interval) => noteFromSemitone(rootSemitone + interval, root)),
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((interval) => noteFromSemitone(rootSemitone + interval, root)),
  ])].filter(Boolean);
  return [correct, ...pool.filter((note) => note !== correct).slice(0, 3)];
}

function buildChordToneQuestions() {
  const roots = ["C", "D", "E", "F", "G", "A", "Bb", "B", "C#", "F#"];
  return roots.flatMap((root) => chordToneQuestionTypes.flatMap((type) => type.tones.map((tone) => {
    const intervals = type.tones.map((item) => item.interval);
    const correct = noteFromSemitone(semitoneOf(root) + tone.interval, root);
    return {
      level: type.level,
      topic: "코드톤",
      prompt: `${root}${type.suffix}의 ${tone.label}은 무엇인가요?`,
      answers: chordToneChoices(root, correct, intervals),
      correct,
      explain: `${root}${type.suffix}는 ${type.name} 코드입니다. ${tone.label}은 ${correct}입니다.`,
    };
  })));
}

function buildDiatonicQuestions() {
  const majorKeys = ["C", "G", "D", "A", "E", "F", "Bb", "Eb"];
  const minorKeys = ["A", "E", "B", "D", "G", "C"];
  const majorScale = getScaleById("major");
  const minorScale = getScaleById("naturalMinor");
  const majorQuestions = majorKeys.flatMap((key) => {
    const scaleNotes = buildScale(key, majorScale).slice(0, -1);
    const chords = scaleNotes.map((note, index) => `${note}${majorDiatonicTriads[index].quality}`);
    return majorDiatonicTriads.map((degree, index) => ({
      level: degree.level,
      topic: "다이아토닉",
      prompt: `${key} Major의 ${degree.roman} 코드는 무엇인가요?`,
      answers: [chords[index], ...chords.filter((chord) => chord !== chords[index]).slice(0, 3)],
      correct: chords[index],
      explain: `${key} Major의 ${degree.roman}는 ${scaleNotes[index]}에서 시작하므로 ${chords[index]}입니다.`,
    }));
  });
  const minorQuestions = minorKeys.flatMap((key) => {
    const scaleNotes = buildScale(key, minorScale).slice(0, -1);
    const chords = scaleNotes.map((note, index) => `${note}${minorDiatonicTriads[index].quality}`);
    return minorDiatonicTriads.map((degree, index) => ({
      level: degree.level,
      topic: "다이아토닉",
      prompt: `${key} Natural Minor의 ${degree.roman} 코드는 무엇인가요?`,
      answers: [chords[index], ...chords.filter((chord) => chord !== chords[index]).slice(0, 3)],
      correct: chords[index],
      explain: `${key} Natural Minor의 ${degree.roman}는 ${scaleNotes[index]}에서 시작하므로 ${chords[index]}입니다.`,
    }));
  });
  return [...majorQuestions, ...minorQuestions];
}

function buildHarmonyQuestionPool() {
  return [...harmonyQuestions, ...buildChordToneQuestions(), ...buildDiatonicQuestions()];
}

function buildHarmonyDeck() {
  clearAutoAdvance();
  const difficulty = els.harmonyDifficulty.value;
  state.harmonyDeck = buildHarmonyQuestionPool().filter((item) => difficulty === "all" || item.level === difficulty);
  state.harmonyCount = 0;
  state.harmonyRecent = [];
  renderHarmonyQuestion();
}

function renderHarmonyQuestion() {
  clearAutoAdvance();
  if (!state.harmonyDeck.length) return;
  const item = pickRandomAvoidingRecent(state.harmonyDeck, state.harmonyRecent, (entry) => entry.prompt);
  if (!item) return;
  state.harmonyCount += 1;
  state.harmonyCurrent = item;
  state.harmonyAnswered = false;
  els.harmonyTopic.textContent = item.topic;
  els.harmonyProgress.textContent = `랜덤 ${state.harmonyCount}문제`;
  els.harmonyPrompt.textContent = item.prompt;
  els.harmonyHint.textContent = `난이도: ${levelLabel(item.level)}`;
  els.harmonyFeedback.classList.add("hidden");
  els.harmonyFeedback.classList.remove("wrong", "pending");
  els.harmonyAnswers.innerHTML = "";
  shuffle(item.answers).forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkHarmonyAnswer(button, answer));
    els.harmonyAnswers.append(button);
  });
}

function checkHarmonyAnswer(button, answer) {
  const item = state.harmonyCurrent;
  if (!item || state.harmonyAnswered) return;
  state.harmonyAnswered = true;
  const isCorrect = answer === item.correct;
  [...els.harmonyAnswers.children].forEach((choice) => {
    choice.disabled = true;
    if (choice.textContent === item.correct) choice.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  els.harmonyFeedback.classList.remove("hidden", "wrong", "pending");
  if (!isCorrect) els.harmonyFeedback.classList.add("wrong");
  const message = isCorrect ? `정답입니다. ${item.explain}` : `정답은 ${item.correct}. ${item.explain}`;
  els.harmonyFeedback.textContent = message;
  if (isCorrect) scheduleAutoAdvance(els.harmonyFeedback, message, nextHarmonyQuestion);
}

function nextHarmonyQuestion() {
  clearAutoAdvance();
  renderHarmonyQuestion();
}

async function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!state.audioContext) state.audioContext = new AudioContextClass();
  if (state.audioContext.state === "suspended") await state.audioContext.resume();
  return state.audioContext;
}

function midiToFrequency(midi) {
  return 440 * (2 ** ((midi - 69) / 12));
}

function midiToNoteName(midi) {
  const names = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  const pitch = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${names[pitch]}${octave}`;
}

function playTone(context, midi, startTime, duration = 0.42) {
  if (!context) return;
  const output = context.createGain();
  output.gain.setValueAtTime(0.0001, startTime);
  output.gain.exponentialRampToValueAtTime(0.16, startTime + 0.018);
  output.gain.exponentialRampToValueAtTime(0.05, startTime + duration * 0.45);
  output.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  output.connect(context.destination);

  [
    { type: "triangle", ratio: 1, gain: 0.75 },
    { type: "sine", ratio: 2, gain: 0.18 },
    { type: "sine", ratio: 3, gain: 0.07 },
  ].forEach((voice) => {
    const oscillator = context.createOscillator();
    const voiceGain = context.createGain();
    oscillator.type = voice.type;
    oscillator.frequency.value = midiToFrequency(midi) * voice.ratio;
    voiceGain.gain.value = voice.gain;
    oscillator.connect(voiceGain).connect(output);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.04);
  });
}

async function playEarCurrent() {
  els.earPlayButton.disabled = true;
  els.earPlayButton.textContent = "재생 중";
  const context = await getAudioContext();
  const item = state.earCurrent;
  if (!context || !item) {
    els.earPlayButton.disabled = false;
    els.earPlayButton.textContent = "재생";
    return;
  }
  const now = context.currentTime + 0.05;
  if (item.kind === "note") {
    playTone(context, item.midi, now, 0.72);
    setTimeout(() => {
      els.earPlayButton.disabled = false;
      els.earPlayButton.textContent = "재생";
    }, 850);
    return;
  }
  if (item.kind === "interval" || item.kind === "degree") {
    playTone(context, item.rootMidi, now, 0.46);
    playTone(context, item.targetMidi, now + 0.62, 0.58);
    setTimeout(() => {
      els.earPlayButton.disabled = false;
      els.earPlayButton.textContent = "재생";
    }, 1300);
    return;
  }
  if (item.kind === "chord") {
    item.notes.forEach((midi, index) => playTone(context, midi, now + index * 0.22, 0.34));
    item.notes.forEach((midi) => playTone(context, midi, now + 0.92, 0.72));
    setTimeout(() => {
      els.earPlayButton.disabled = false;
      els.earPlayButton.textContent = "재생";
    }, 1800);
  }
}

function earPoolByDifficulty(kind) {
  const difficulty = els.earDifficulty.value;
  if (kind === "note") {
    if (els.earNoteSet.value === "white") return noteEarBank.filter((item) => ["C", "D", "E", "F", "G", "A", "B"].includes(item.label));
    if (els.earNoteSet.value === "black") return noteEarBank.filter((item) => ["C#", "Eb", "F#", "Ab", "Bb"].includes(item.label));
    return noteEarBank;
  }
  if (kind === "interval") {
    if (difficulty === "easy") return intervalBank.filter((item) => ["m3", "M3", "P4", "P5", "P8"].includes(item.name));
    if (difficulty === "hard") return intervalBank;
    return intervalBank.filter((item) => ["M2", "m3", "M3", "P4", "P5", "m6", "M6", "P8"].includes(item.name));
  }
  if (kind === "chord") {
    if (difficulty === "easy") return chordEarBank.filter((item) => ["major", "minor"].includes(item.id));
    if (difficulty === "hard") return chordEarBank;
    return chordEarBank.filter((item) => ["major", "minor", "dim", "sus4"].includes(item.id));
  }
  if (difficulty === "easy") return degreeEarBank.filter((item) => ["1도", "3도", "5도", "8도"].includes(item.degree));
  if (difficulty === "hard") return degreeEarBank;
  return degreeEarBank.filter((item) => item.degree !== "7도");
}

function buildEarDeck() {
  clearAutoAdvance();
  const mode = els.earMode.value;
  const pool = earPoolByDifficulty(mode);
  state.earDeck = pool;
  state.earCount = 0;
  state.earRecent = [];
  renderEarQuestion();
}

function makeEarQuestion(mode, pool, forcedAnswer) {
  const rootMidi = randomInt(48, 60);
  const answer = forcedAnswer || pool[randomInt(0, pool.length - 1)];
  if (mode === "note") {
    const midi = (randomInt(4, 5) + 1) * 12 + answer.semitone;
    return {
      kind: "note",
      topic: "음 맞추기",
      prompt: "들리는 음 이름을 맞추세요.",
      hint: "한 음만 재생됩니다.",
      midi,
      correct: answer.label,
      choices: pool.map((item) => item.label),
      explain: `들린 음은 ${midiToNoteName(midi)}입니다. 답은 ${answer.label}입니다.`,
    };
  }
  if (mode === "interval") {
    const targetMidi = rootMidi + answer.semitones;
    return {
      kind: "interval",
      topic: "음정",
      prompt: "두 음 사이의 음정을 맞추세요.",
      hint: "첫 음 뒤에 두 번째 음이 순서대로 재생됩니다.",
      rootMidi,
      targetMidi,
      correct: answer.label,
      choices: pool.map((item) => item.label),
      explain: `${midiToNoteName(rootMidi)}에서 ${midiToNoteName(targetMidi)}까지 ${answer.label}입니다. 피아노 기준 바로 옆 건반 간격을 ${answer.semitones}칸 지난 거리입니다.`,
    };
  }
  if (mode === "chord") {
    const notes = answer.intervals.map((interval) => rootMidi + interval);
    return {
      kind: "chord",
      topic: "코드 성질",
      prompt: "들리는 코드의 성질을 맞추세요.",
      hint: "분산화음으로 한 번, 동시에 한 번 재생됩니다.",
      rootMidi,
      notes,
      correct: answer.label,
      choices: pool.map((item) => item.label),
      explain: `${notes.map(midiToNoteName).join(" - ")}로 들린 ${answer.label} 코드입니다.`,
    };
  }
  const targetMidi = rootMidi + answer.semitones;
  return {
    kind: "degree",
    topic: "스케일 도수",
    prompt: "기준음 다음에 들리는 음의 도수를 맞추세요.",
    hint: "Major scale 기준입니다.",
    rootMidi,
    targetMidi,
    correct: answer.degree,
    choices: pool.map((item) => item.degree),
    explain: `${midiToNoteName(rootMidi)} Major 기준 ${midiToNoteName(targetMidi)}는 ${answer.degree}입니다.`,
  };
}

function makeChoices(labels, correct) {
  const rest = shuffle(labels.filter((label) => label !== correct)).slice(0, 3);
  return shuffle([correct, ...rest]);
}

function renderEarQuestion() {
  clearAutoAdvance();
  if (!state.earDeck.length) return;
  const mode = els.earMode.value;
  const answer = pickRandomAvoidingRecent(state.earDeck, state.earRecent, (entry) => entry.label || entry.degree);
  if (!answer) return;
  const item = makeEarQuestion(mode, state.earDeck, answer);
  state.earCount += 1;
  state.earCurrent = item;
  state.earAnswered = false;
  els.earTopic.textContent = item.topic;
  els.earProgress.textContent = `랜덤 ${state.earCount}문제`;
  els.earPrompt.textContent = item.prompt;
  els.earHint.textContent = item.hint;
  els.earFeedback.classList.add("hidden");
  els.earFeedback.classList.remove("wrong", "pending");
  els.earAnswers.innerHTML = "";
  els.earAnswers.classList.toggle("piano-grid", item.kind === "note");
  item.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    if (item.kind === "note") {
      button.classList.add("piano-key", isWhiteKey(choice) ? "white-key" : "black-key");
      button.style.setProperty("--key-pos", String(noteKeyPosition(choice)));
    }
    button.addEventListener("click", () => checkEarAnswer(button, choice));
    els.earAnswers.append(button);
  });
}

function isWhiteKey(note) {
  return ["C", "D", "E", "F", "G", "A", "B"].includes(note);
}

function noteKeyPosition(note) {
  return {
    C: 1,
    "C#": 2,
    D: 3,
    Eb: 4,
    E: 5,
    F: 6,
    "F#": 7,
    G: 8,
    Ab: 9,
    A: 10,
    Bb: 11,
    B: 12,
  }[note] || 1;
}

function checkEarAnswer(button, answer) {
  const item = state.earCurrent;
  if (!item || state.earAnswered) return;
  state.earAnswered = true;
  const isCorrect = answer === item.correct;
  [...els.earAnswers.children].forEach((choice) => {
    choice.disabled = true;
    if (choice.textContent === item.correct) choice.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  els.earFeedback.classList.remove("hidden", "wrong", "pending");
  if (!isCorrect) els.earFeedback.classList.add("wrong");
  const message = isCorrect ? `정답입니다. ${item.explain}` : `정답은 ${item.correct}. ${item.explain}`;
  els.earFeedback.textContent = message;
  if (isCorrect) scheduleAutoAdvance(els.earFeedback, message, nextEarQuestion);
}

function nextEarQuestion() {
  clearAutoAdvance();
  renderEarQuestion();
}

function buildGuitarDeck() {
  clearAutoAdvance();
  state.guitarDeck = guitarRoots;
  state.guitarCount = 0;
  state.guitarRecent = [];
  nextGuitarPrompt();
}

function nextGuitarPrompt() {
  clearAutoAdvance();
  if (!state.guitarDeck.length) return;
  const blockedRoots = new Set(state.guitarRecent.slice(-(guitarRoots.length - 1)));
  const candidates = guitarRoots.filter((root) => !blockedRoots.has(root));
  const source = candidates.length ? candidates : guitarRoots;
  const root = source[randomInt(0, source.length - 1)];
  const position = guitarPositions[randomInt(0, guitarPositions.length - 1)];
  const item = { root, position };
  state.guitarCurrent = item;
  state.guitarRecent.push(root);
  if (state.guitarRecent.length > guitarRoots.length - 1) state.guitarRecent.shift();
  state.guitarCount += 1;
  els.guitarProgress.textContent = `랜덤 ${state.guitarCount}문제`;
  els.guitarRoot.textContent = item.root;
  els.guitarPosition.textContent = item.position;
  els.guitarHint.textContent = `${item.root} 스케일을 ${item.position} 포지션으로 잡고 연주하세요. 이 루트는 다음 한 바퀴 전까지 제외됩니다.`;
}

function populateChordControls() {
  chordRoots.forEach((root) => {
    els.chordRootSelect.add(new Option(root, root));
  });
  els.chordTypeOptions.innerHTML = "";
  chordTypes.forEach((type) => {
    const label = document.createElement("label");
    label.className = "chord-type-option";
    label.innerHTML = `
      <input type="checkbox" value="${type.id}" ${["M", "m", "7", "M7", "m7"].includes(type.id) ? "checked" : ""}>
      <span>${type.id}</span>
    `;
    els.chordTypeOptions.append(label);
  });
}

function selectedChordTypes() {
  const selected = new Set([...els.chordTypeOptions.querySelectorAll("input:checked")].map((input) => input.value));
  const picked = chordTypes.filter((type) => selected.has(type.id));
  return picked.length ? picked : chordTypes.filter((type) => ["M", "m", "7"].includes(type.id));
}

function selectedChordRoots() {
  return els.chordRootSelect.value === "random" ? chordRoots : [els.chordRootSelect.value];
}

function chordName(root, type) {
  return `${root}${type.symbol}`;
}

function buildChord(root, type) {
  const rootSemitone = semitoneOf(root);
  const notes = type.intervals.map((interval) => noteFromSemitone(rootSemitone + interval, root));
  const midis = type.intervals.map((interval) => 48 + rootSemitone + interval);
  return {
    root,
    type,
    name: chordName(root, type),
    notes,
    midis,
  };
}

function randomChordItem(rootPool = null, typePool = null) {
  const roots = rootPool || selectedChordRoots();
  const types = typePool || selectedChordTypes();
  const root = roots[randomInt(0, roots.length - 1)];
  const type = types[randomInt(0, types.length - 1)];
  return buildChord(root, type);
}

function renderChordTrainer() {
  if (!state.chordCurrent) state.chordCurrent = randomChordItem();
  if (!state.chordNext) state.chordNext = randomChordItem();
  els.chordCurrentDisplay.textContent = state.chordCountIn ? String(state.chordBeat) : state.chordCurrent.name;
  els.chordCurrentDisplay.classList.toggle("count-in", state.chordCountIn);
  els.chordNextDisplay.textContent = state.chordCountIn ? state.chordCurrent.name : state.chordNext.name;
  els.chordBeatDisplay.textContent = String(state.chordBeat);
}

async function playChordClick(isAccent = false) {
  const context = await getAudioContext();
  if (!context) return;
  const now = context.currentTime + 0.02;
  playClick(context, now, isAccent ? 1320 : 920, isAccent ? 0.18 : 0.11, 0.04, "square");
}

function chordIntervalMs() {
  const bpm = Math.min(240, Math.max(30, Number(els.chordBpmInput.value) || 80));
  const quarter = 60000 / bpm;
  if (els.chordUnitSelect.value === "eighth") return quarter / 2;
  if (els.chordUnitSelect.value === "sixteenth") return quarter / 4;
  return quarter;
}

function advanceChordCount() {
  const changeEvery = Number(els.chordChangeEverySelect.value) || 4;
  if (state.chordCountIn) {
    if (state.chordBeat > changeEvery) {
      state.chordCountIn = false;
      state.chordBeat = 1;
      renderChordTrainer();
      playChordClick(true);
      return;
    }
    renderChordTrainer();
    playChordClick(state.chordBeat === 1);
    state.chordBeat += 1;
    return;
  }
  if (state.chordBeat >= changeEvery) {
    state.chordCurrent = state.chordNext || randomChordItem();
    state.chordNext = randomChordItem();
    state.chordBeat = 1;
    playChordClick(true);
  } else {
    state.chordBeat += 1;
    playChordClick(false);
  }
  renderChordTrainer();
}

function nextChordNow() {
  state.chordCurrent = state.chordNext || randomChordItem();
  state.chordNext = randomChordItem();
  state.chordBeat = 1;
  state.chordCountIn = false;
  renderChordTrainer();
  playChordClick(true);
}

function resetChordTrainer() {
  state.chordCurrent = randomChordItem();
  state.chordNext = randomChordItem();
  state.chordBeat = 1;
  state.chordCountIn = false;
  renderChordTrainer();
}

function restartChordTimer() {
  if (!state.chordPlaying) return;
  if (state.chordTimer) clearInterval(state.chordTimer);
  state.chordTimer = setInterval(advanceChordCount, chordIntervalMs());
}

function toggleChordTrainer() {
  if (state.chordPlaying) {
    state.chordPlaying = false;
    if (state.chordTimer) clearInterval(state.chordTimer);
    state.chordTimer = null;
    els.chordPlayToggleButton.textContent = "재생";
    state.chordCountIn = false;
    state.chordBeat = 1;
    renderChordTrainer();
    return;
  }
  state.chordPlaying = true;
  els.chordPlayToggleButton.textContent = "정지";
  state.chordBeat = 1;
  state.chordCountIn = true;
  renderChordTrainer();
  playChordClick(true);
  state.chordBeat = 2;
  restartChordTimer();
}

function selectBasicChordTypes() {
  [...els.chordTypeOptions.querySelectorAll("input")].forEach((input) => {
    input.checked = ["M", "m", "7", "M7", "m7"].includes(input.value);
  });
  saveSettings();
  state.chordCurrent = randomChordItem();
  state.chordNext = randomChordItem();
  state.chordBeat = 1;
  renderChordTrainer();
}

function renderRhythmStudy() {
  els.rhythmStudyList.innerHTML = "";
  rhythmTypes.forEach((item) => {
    const card = document.createElement("article");
    card.className = "rhythm-study-card";
    card.innerHTML = `
      <div class="rhythm-symbol">${item.symbol}</div>
      <div>
        <strong>${item.name}</strong>
        <span>${item.unit}</span>
        <p>${item.feel}<br>읽기: ${item.say}</p>
      </div>
    `;
    els.rhythmStudyList.append(card);
  });
}

function populateRhythmPatterns() {
  els.rhythmPatternSelect.innerHTML = "";
  rhythmTypes.forEach((item) => {
    els.rhythmPatternSelect.add(new Option(item.name, item.id));
  });
}

function currentRhythmPattern() {
  return rhythmTypes.find((item) => item.id === els.rhythmPatternSelect.value) || rhythmTypes[0];
}

function normalizeBeatModes() {
  const beats = Number(els.meterSelect.value) || 4;
  state.beatModes = Array.from({ length: beats }, (_, index) => state.beatModes[index] || "basic");
}

function renderBeatShapeButtons() {
  els.beatShapeButtons.querySelectorAll("[data-beat-shape]").forEach((button) => {
    button.classList.toggle("active", button.dataset.beatShape === state.beatShape);
  });
}

function renderVisualToggleButtons() {
  els.visualToggleButtons.querySelectorAll("[data-visual-toggle]").forEach((button) => {
    button.classList.toggle("active", Boolean(state.visualOptions[button.dataset.visualToggle]));
  });
}

function renderBeatDots() {
  const beats = Number(els.meterSelect.value) || 4;
  normalizeBeatModes();
  els.beatDots.innerHTML = "";
  els.beatDots.dataset.shape = state.beatShape;
  els.tempoStage.classList.toggle("show-dots", state.visualOptions.dots);
  els.tempoStage.classList.toggle("show-pendulum", state.visualOptions.pendulum);
  const activeBeat = state.beatIndex % beats;
  const measureNumber = Math.floor(state.beatIndex / beats) + 1;
  els.beatCounter.textContent = `${activeBeat + 1} / ${beats}`;
  renderMeasureCounter(measureNumber);
  Array.from({ length: beats }).forEach((_, index) => {
    const dot = document.createElement("span");
    const mode = state.beatModes[index] || "basic";
    dot.className = [
      mode,
      index === activeBeat ? "active" : "",
    ].filter(Boolean).join(" ");
    dot.dataset.beatIndex = String(index);
    dot.title = `${index + 1}박 ${beatModeLabel(mode)}`;
    dot.innerHTML = `<b>${beatModeText(mode)}</b>`;
    els.beatDots.append(dot);
  });
  updatePendulum();
  renderBeatShapeButtons();
  renderVisualToggleButtons();
}

function beatModeLabel(mode) {
  if (mode === "accent") return "강세";
  if (mode === "mute") return "무음";
  return "기본";
}

function beatModeText(mode) {
  if (mode === "accent") return "강";
  if (mode === "mute") return "무";
  return "기";
}

function nextBeatMode(mode) {
  if (mode === "accent") return "basic";
  if (mode === "basic") return "mute";
  return "accent";
}

function renderMeasureCounter(measureNumber = 1) {
  const every = Number(els.autoTempoEveryInput.value) || 0;
  const amount = Number(els.autoTempoAmountInput.value) || 0;
  els.measureCounter.classList.toggle("hidden", !(every > 0 && amount > 0));
  if (!(every > 0 && amount > 0)) return;
  const until = every - ((measureNumber - 1) % every);
  els.measureCounter.textContent = `${measureNumber}마디 · ${until}마디 후 +${amount} BPM`;
}

function renderRhythmPatternInfo() {
  const pattern = currentRhythmPattern();
  els.rhythmPatternName.textContent = pattern.name;
  els.rhythmPatternInfo.textContent = `${pattern.unit}. ${pattern.feel} 읽기: ${pattern.say}`;
  renderBeatDots();
}

function setTempo(value) {
  const tempo = Math.min(240, Math.max(30, Number(value) || 80));
  els.tempoInput.value = String(tempo);
  els.tempoSlider.value = String(tempo);
  els.tempoValue.textContent = String(tempo);
  renderTempoPresets(tempo);
  return tempo;
}

function renderTempoPresets(tempo = Number(els.tempoInput.value)) {
  els.tempoPresetButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.tempoPreset) === Number(tempo));
  });
}

function currentMetronomeSound() {
  return metronomeSounds[els.metronomeSoundSelect.value] || metronomeSounds.classic;
}

function shouldAccent(beatInMeasure) {
  return state.beatModes[beatInMeasure] === "accent";
}

function shouldMuteBeat(beatInMeasure) {
  return state.beatModes[beatInMeasure] === "mute";
}

function maybeAutoIncreaseTempo(measureIndex, beatInMeasure) {
  const autoEvery = Number(els.autoTempoEveryInput.value) || 0;
  const autoAmount = Number(els.autoTempoAmountInput.value) || 0;
  if (!autoEvery || !autoAmount || beatInMeasure !== 0 || measureIndex === 0 || measureIndex % autoEvery !== 0) return;
  setTempo(Number(els.tempoInput.value) + autoAmount);
  saveSettings();
  setTimeout(restartMetronomeTimer, 0);
}

function updatePendulum() {
  const beats = Number(els.meterSelect.value) || 4;
  const beat = state.beatIndex % beats;
  const direction = beat % 2 === 0 ? -1 : 1;
  const spread = beats === 3 ? 24 : 32;
  els.pendulum.style.setProperty("--pendulum-x", `${direction * spread}px`);
}

function flashStage() {
  if (!state.visualOptions.flash) return;
  els.tempoStage.classList.remove("flash");
  void els.tempoStage.offsetWidth;
  els.tempoStage.classList.add("flash");
}

function playClick(context, time, frequency, gainValue, duration = 0.045, type = "square") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(gainValue, time + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.02);
}

function scheduleQuarterTriplet(context, start, beatSeconds, beatInMeasure, sound, isAccent) {
  if (beatInMeasure % 2 !== 0) return false;
  const frequencies = [isAccent ? sound.accent : sound.beat, sound.subdivision, sound.subdivision];
  const gains = [isAccent ? sound.accentGain : sound.beatGain, sound.subGain * 1.15, sound.subGain * 1.15];
  [0, (2 / 3) * beatSeconds, (4 / 3) * beatSeconds].forEach((offset, index) => {
    playClick(context, start + offset, frequencies[index], gains[index], sound.duration, sound.type);
  });
  return true;
}

function scheduleRhythmSubdivision(context, start, beatSeconds, pattern, beatInMeasure) {
  const sound = currentMetronomeSound();
  if (pattern.id === "quarter") return;
  const count = pattern.subdivisions || 1;
  for (let index = 1; index < count; index += 1) {
    playClick(context, start + (beatSeconds / count) * index, sound.subdivision, sound.subGain, sound.duration * 0.75, sound.type);
  }
}

async function playMetronomeBeat() {
  const context = await getAudioContext();
  if (!context) return;
  const beats = Number(els.meterSelect.value) || 4;
  const beatSeconds = 60 / setTempo(els.tempoInput.value);
  const beatInMeasure = state.beatIndex % beats;
  const measureIndex = Math.floor(state.beatIndex / beats);
  maybeAutoIncreaseTempo(measureIndex, beatInMeasure);
  const now = context.currentTime + 0.025;
  const isAccent = shouldAccent(beatInMeasure);
  const sound = currentMetronomeSound();
  const pattern = currentRhythmPattern();
  if (!shouldMuteBeat(beatInMeasure)) {
    const handled = pattern.id === "quarterTriplet"
      ? scheduleQuarterTriplet(context, now, beatSeconds, beatInMeasure, sound, isAccent)
      : false;
    if (!handled && pattern.id !== "quarterTriplet") {
      playClick(
        context,
        now,
        isAccent ? sound.accent : sound.beat,
        isAccent ? sound.accentGain : sound.beatGain,
        sound.duration,
        sound.type,
      );
      scheduleRhythmSubdivision(context, now, beatSeconds, pattern, beatInMeasure);
    }
  }
  renderBeatDots();
  flashStage();
  state.beatIndex += 1;
}

function restartMetronomeTimer() {
  if (!state.metronomeOn) return;
  if (state.metronomeTimer) clearInterval(state.metronomeTimer);
  const interval = (60 / setTempo(els.tempoInput.value)) * 1000;
  state.metronomeTimer = setInterval(playMetronomeBeat, interval);
}

async function toggleMetronome() {
  if (state.metronomeOn) {
    state.metronomeOn = false;
    if (state.metronomeTimer) clearInterval(state.metronomeTimer);
    state.metronomeTimer = null;
    els.metronomeToggleButton.textContent = "▶";
    els.metronomeToggleButton.classList.remove("playing");
    renderBeatDots();
    return;
  }
  state.metronomeOn = true;
  state.beatIndex = 0;
  els.metronomeToggleButton.textContent = "■";
  els.metronomeToggleButton.classList.add("playing");
  await playMetronomeBeat();
  restartMetronomeTimer();
}

function handleTapTempo() {
  const now = Date.now();
  state.tapTimes = [...state.tapTimes.filter((time) => now - time < 2500), now].slice(-4);
  if (state.tapTimes.length < 2) return;
  const gaps = state.tapTimes.slice(1).map((time, index) => time - state.tapTimes[index]);
  const average = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
  setTempo(Math.round(60000 / average));
  saveSettings();
  restartMetronomeTimer();
}

function levelLabel(level) {
  if (level === "easy") return "쉬움";
  if (level === "normal") return "보통";
  return "어려움";
}

function renderReview() {
  const count = state.reviewItems.length;
  els.reviewSummary.textContent = count ? `최근 틀린 스케일 ${count}개가 저장되어 있습니다.` : "틀린 스케일이 여기에 쌓입니다.";
  els.startReviewButton.disabled = count === 0;
  els.clearReviewButton.disabled = count === 0;
  els.reviewList.innerHTML = "";
  if (!count) {
    const empty = document.createElement("article");
    empty.className = "review-item";
    empty.innerHTML = `<strong>아직 오답이 없습니다</strong><span>문제를 틀리면 자동으로 이곳에 저장됩니다.</span>`;
    els.reviewList.append(empty);
    return;
  }
  state.reviewItems.forEach((item) => {
    const row = document.createElement("article");
    row.className = "review-item";
    row.innerHTML = `
      <strong>${item.root} ${item.scaleName}</strong>
      <span>정답: ${item.notes.join(" ")}</span>
      <span>방식: ${item.mode === "full" ? "전체 쓰기" : "부분 맞추기"}</span>
    `;
    els.reviewList.append(row);
  });
}

function switchView(view) {
  clearAutoAdvance();
  if (state.view === "rhythm" && view !== "rhythm" && state.metronomeOn) toggleMetronome();
  if (state.view === "chord" && view !== "chord" && state.chordPlaying) toggleChordTrainer();
  state.view = view;
  els.tabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.quizView.classList.toggle("hidden", view !== "quiz");
  els.harmonyView.classList.toggle("hidden", view !== "harmony");
  els.earView.classList.toggle("hidden", view !== "ear");
  els.guitarView.classList.toggle("hidden", view !== "guitar");
  els.rhythmView.classList.toggle("hidden", view !== "rhythm");
  els.chordView.classList.toggle("hidden", view !== "chord");
  els.reviewView.classList.toggle("hidden", view !== "review");
  els.chartView.classList.toggle("hidden", view !== "chart");
  els.circleView.classList.toggle("hidden", view !== "circle");
  if (view === "review") renderReview();
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

els.quizMode.addEventListener("change", () => {
  saveSettings();
  makeQuestion();
});
els.quizScale.addEventListener("change", () => {
  saveSettings();
  buildDeck();
});
els.quizKeySet.addEventListener("change", () => {
  saveSettings();
  buildDeck();
});
els.quizDifficulty.addEventListener("change", () => {
  saveSettings();
  buildDeck();
});
els.chartScale.addEventListener("change", () => {
  saveSettings();
  renderScaleChart();
});
els.checkButton.addEventListener("click", checkAnswer);
els.hintButton.addEventListener("click", showScaleHint);
els.nextButton.addEventListener("click", nextQuestion);
els.shuffleButton.addEventListener("click", buildDeck);
els.resetScoreButton.addEventListener("click", resetScore);
els.autoNextToggle.addEventListener("change", () => {
  saveSettings();
  if (!els.autoNextToggle.checked) clearAutoAdvance();
});
els.harmonyDifficulty.addEventListener("change", () => {
  saveSettings();
  buildHarmonyDeck();
});
els.harmonyNextButton.addEventListener("click", nextHarmonyQuestion);
els.harmonyShuffleButton.addEventListener("click", buildHarmonyDeck);
els.earMode.addEventListener("change", () => {
  saveSettings();
  buildEarDeck();
});
els.earDifficulty.addEventListener("change", () => {
  saveSettings();
  buildEarDeck();
});
els.earNoteSet.addEventListener("change", () => {
  saveSettings();
  buildEarDeck();
});
els.earPlayButton.addEventListener("click", playEarCurrent);
els.earNextButton.addEventListener("click", nextEarQuestion);
els.earShuffleButton.addEventListener("click", buildEarDeck);
els.guitarNextButton.addEventListener("click", nextGuitarPrompt);
els.guitarShuffleButton.addEventListener("click", buildGuitarDeck);
els.chordPlayToggleButton.addEventListener("click", toggleChordTrainer);
els.chordNextNowButton.addEventListener("click", nextChordNow);
els.clearChordTypesButton.addEventListener("click", selectBasicChordTypes);
els.chordRootSelect.addEventListener("change", () => {
  saveSettings();
  resetChordTrainer();
});
els.chordBpmInput.addEventListener("input", () => {
  saveSettings();
  restartChordTimer();
});
els.chordUnitSelect.addEventListener("change", () => {
  saveSettings();
  restartChordTimer();
});
els.chordChangeEverySelect.addEventListener("change", () => {
  saveSettings();
  state.chordBeat = 1;
  renderChordTrainer();
  restartChordTimer();
});
els.chordTypeOptions.addEventListener("change", () => {
  saveSettings();
  resetChordTrainer();
});
els.metronomeToggleButton.addEventListener("click", toggleMetronome);
els.rhythmPatternSelect.addEventListener("change", () => {
  saveSettings();
  renderRhythmPatternInfo();
});
els.metronomeSoundSelect.addEventListener("change", saveSettings);
els.beatDots.addEventListener("click", (event) => {
  const beat = event.target.closest("[data-beat-index]");
  if (!beat) return;
  const index = Number(beat.dataset.beatIndex);
  state.beatModes[index] = nextBeatMode(state.beatModes[index] || "basic");
  normalizeBeatModes();
  saveSettings();
  renderBeatDots();
});
els.beatShapeButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-beat-shape]");
  if (!button) return;
  state.beatShape = button.dataset.beatShape;
  saveSettings();
  renderBeatDots();
});
els.visualToggleButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-visual-toggle]");
  if (!button) return;
  const key = button.dataset.visualToggle;
  state.visualOptions[key] = !state.visualOptions[key];
  saveSettings();
  renderBeatDots();
});
els.meterSelect.addEventListener("change", () => {
  saveSettings();
  state.beatIndex = 0;
  normalizeBeatModes();
  renderBeatDots();
});
els.autoTempoEveryInput.addEventListener("input", () => {
  saveSettings();
  renderBeatDots();
});
els.autoTempoAmountInput.addEventListener("input", () => {
  saveSettings();
  renderBeatDots();
});
els.tapTempoButton.addEventListener("click", handleTapTempo);
els.tempoPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTempo(button.dataset.tempoPreset);
    saveSettings();
    restartMetronomeTimer();
  });
});
els.tempoInput.addEventListener("input", () => {
  setTempo(els.tempoInput.value);
  saveSettings();
  restartMetronomeTimer();
});
els.tempoSlider.addEventListener("input", () => {
  setTempo(els.tempoSlider.value);
  saveSettings();
  restartMetronomeTimer();
});
els.tempoDownButton.addEventListener("click", () => {
  setTempo(Number(els.tempoInput.value) - 1);
  saveSettings();
  restartMetronomeTimer();
});
els.tempoUpButton.addEventListener("click", () => {
  setTempo(Number(els.tempoInput.value) + 1);
  saveSettings();
  restartMetronomeTimer();
});
els.startReviewButton.addEventListener("click", buildReviewDeck);
els.clearReviewButton.addEventListener("click", clearReviewItems);
els.notePad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.note) addNote(button.dataset.note);
  if (button.dataset.accidental) addAccidental(button.dataset.accidental);
  if (button.dataset.padAction) editNotePad(button.dataset.padAction);
});
els.answerInput.addEventListener("blur", () => {
  els.answerInput.value = formatManualAnswer(els.answerInput.value);
});
els.answerInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (state.scaleLocked) {
    nextQuestion();
    return;
  }
  checkAnswer();
});

populateSelects();
populateChordControls();
renderRhythmStudy();
populateRhythmPatterns();
applySettings();
state.chordCurrent = randomChordItem();
state.chordNext = randomChordItem();
renderChordTrainer();
buildDeck();
buildHarmonyDeck();
buildEarDeck();
buildGuitarDeck();
renderRhythmPatternInfo();
renderScaleChart();
renderCircle();
renderReview();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
