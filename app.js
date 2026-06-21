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
  { major: "C", minor: "Am", signature: "샵/플랫 없음" },
  { major: "G", minor: "Em", signature: "F#" },
  { major: "D", minor: "Bm", signature: "F#, C#" },
  { major: "A", minor: "F#m", signature: "F#, C#, G#" },
  { major: "E", minor: "C#m", signature: "F#, C#, G#, D#" },
  { major: "B / Cb", minor: "G#m / Abm", signature: "5# / 7b" },
  { major: "F# / Gb", minor: "D#m / Ebm", signature: "6# / 6b" },
  { major: "C# / Db", minor: "A#m / Bbm", signature: "7# / 5b" },
  { major: "Ab", minor: "Fm", signature: "Bb, Eb, Ab, Db" },
  { major: "Eb", minor: "Cm", signature: "Bb, Eb, Ab" },
  { major: "Bb", minor: "Gm", signature: "Bb, Eb" },
  { major: "F", minor: "Dm", signature: "Bb" },
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
  audioContext: null,
  autoTimer: null,
  autoInterval: null,
};

const els = {
  tabs: document.querySelectorAll("[data-view]"),
  quizView: document.querySelector("#quizView"),
  harmonyView: document.querySelector("#harmonyView"),
  earView: document.querySelector("#earView"),
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
  const settings = {
    quizMode: els.quizMode.value,
    quizScale: els.quizScale.value,
    quizKeySet: els.quizKeySet.value,
    quizDifficulty: els.quizDifficulty.value,
    harmonyDifficulty: els.harmonyDifficulty.value,
    earMode: els.earMode.value,
    earDifficulty: els.earDifficulty.value,
    earNoteSet: els.earNoteSet.value,
    chartScale: els.chartScale.value,
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
  if (settings.chartScale) els.chartScale.value = settings.chartScale;
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
    const chartOption = new Option(`${scale.name} (${scale.korean})`, scale.id);
    els.quizScale.add(quizOption);
    els.chartScale.add(chartOption);
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
  const center = document.createElement("div");
  center.className = "circle-center";
  center.innerHTML = `<div><strong>5도권</strong><span>Major / minor</span></div>`;
  els.circleList.append(center);
  circleOfFifths.forEach((circleItem, index) => {
    const angle = (index * 30 * Math.PI) / 180;
    const radius = 38;
    const x = 50 + Math.sin(angle) * radius;
    const y = 50 - Math.cos(angle) * radius;
    const card = document.createElement("article");
    card.className = "circle-item";
    card.style.left = `${x}%`;
    card.style.top = `${y}%`;
    card.innerHTML = `
      <strong>${circleItem.major}</strong>
      <span class="minor">${circleItem.minor}</span>
      <span class="signature">${circleItem.signature}</span>
    `;
    els.circleList.append(card);
  });
}

function buildHarmonyDeck() {
  clearAutoAdvance();
  const difficulty = els.harmonyDifficulty.value;
  state.harmonyDeck = harmonyQuestions.filter((item) => difficulty === "all" || item.level === difficulty);
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
  state.view = view;
  els.tabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.quizView.classList.toggle("hidden", view !== "quiz");
  els.harmonyView.classList.toggle("hidden", view !== "harmony");
  els.earView.classList.toggle("hidden", view !== "ear");
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
applySettings();
buildDeck();
buildHarmonyDeck();
buildEarDeck();
renderScaleChart();
renderCircle();
renderReview();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
