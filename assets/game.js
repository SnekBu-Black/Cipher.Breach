
const GS = 9, SP = 1.25;
const FREE='free', GOAL='goal', START='start', WALL='wall';
const ROOM_COUNT = 6;
const ROOM_MEDKITS = [1,1,1,1,1,1];
const MEDKIT_HEAL = 5;
const BATTLE_TICK_DAMAGE = 10;
const WRONG_ANSWER_DAMAGE = 5;
const HINT_DAMAGE = 2;
const RETREAT_DAMAGE = 5;
const RETREAT_FREEZE_TURNS = 4;
const ROOK_SIGHT_RANGE = 4;
const BISHOP_SIGHT_RANGE = 4;
const ROOK_STEP_LIMIT = 2;
const AGGRO_MEMORY_TURNS = 3;
const AGGRO_BREAK_COVER_TURNS = 1;
const ENCOUNTER_TRANSITION_MS = 380;
const SUCCESS_BEAT_MS = 360;
const ROOM_CLEAR_BEAT_MS = 520;
const ROOM_TRAVEL_MS = 1100;
const ROOM_DAEMONS = [2,2,3,3,4,4];

const ROOM_PUZZLES = [
  {
    roomTitle:'الغرفة 1 // Cipher Relay',
    domain:'Cryptography',
    cipherType:'caesar',
    brief:'فك الشيفرة القصيرة لفتح المرحّل الأول.',
    prompt:'استخدم Caesar cipher.',
    methodLabel:'Caesar cipher',
    wordPool:['CODE','KEY','SAFE','LOCK','VAULT','SHIFT','CIPHER','SECRET','GLYPH','MATRIX','ENIGMA','VECTOR','PAYLOAD','ROTATE','ENCRYPT','OBSCURE','SIGNAL','MASKING','SCRAMBLE','KEYHOLE'],
    displayStyle:'code',
    shiftOptions:[1,2,3,4],
    guide:'اعتمد الإزاحة المعروضة على كامل النص حتى تستعيد الكلمة الصحيحة.',
    hintCategory:'مرتبطة بالحماية أو القفل أو إخفاء الرسالة',
    concept:'التشفير يحجب النص الأصلي عبر تحويل قابل للعكس يعتمد على مفتاح.',
    lesson:'رغم ضعف Caesar cipher، فإنه يوضح الفكرة الأساسية في cryptography: لا تُقرأ البيانات إلا بعد معرفة طريقة عكس التحويل.',
    referenceType:'caesar'
  },
  {
    roomTitle:'الغرفة 2 // Token Cache',
    domain:'Cryptography',
    cipherType:'reverse',
    brief:'استعد كلمة الجلسة المقلوبة قبل أن تختفي من الذاكرة.',
    prompt:'استخدم Reverse.',
    methodLabel:'Reverse',
    wordPool:['TOKEN','NONCE','CACHE','PROXY','ROUTE','LOGIN','HEADER','BUFFER','COOKIE','TUNNEL','PACKET','CLIENT','SERVER','DIGEST','SESSION','REQUEST','PAYLOAD','CHANNEL','SIGNAL','GATEWAY'],
    displayStyle:'code',
    guide:'اقرأ الحروف بالعكس من النهاية إلى البداية.',
    hintCategory:'مرتبطة بالجلسات أو الرموز أو المكوّنات التي تمر عبر الاتصال',
    concept:'الرموز والجلسات أسرار صغيرة لكنها حساسة، وأي كشف لها قد يمنح المهاجم وصولًا مباشرًا.',
    lesson:'حتى عندما يكون التحويل بسيطًا، تذكّر أن session tokens وcookies وnonces يجب التعامل معها كمواد حساسة لا كبيانات عادية.',
    referenceType:'reverse'
  },
  {
    roomTitle:'الغرفة 3 // Password Vault',
    domain:'Authentication',
    cipherType:'atbash',
    brief:'استخرج الدليل المخفي المرتبط بتخزين كلمات المرور.',
    prompt:'استخدم Atbash.',
    methodLabel:'Atbash',
    wordPool:['SALT','HASH','PEPPER','VERIFY','SECRET','LOGIN','CREDS','PROOF','VAULT','SECURE','SHIELD','MEMORY','PHRASE','REHASH','PASSCODE','HARDEN','STRETCH','STORAGE','DEFENSE','DIGEST'],
    displayStyle:'code',
    guide:'Atbash يعكس الأبجدية: A مع Z، وB مع Y، وهكذا.',
    hintCategory:'مرتبطة بكلمات المرور أو التحقق من الهوية',
    concept:'أنظمة authentication يجب أن تخزن salted password hashes بدل كلمات المرور الخام.',
    lesson:'Argon2id يبطئ هجمات التخمين غير المتصل ويجبر المهاجم على استهلاك ذاكرة وقدرة حسابية معتبرة مع كل محاولة.',
    referenceType:'atbash'
  },
  {
    roomTitle:'الغرفة 4 // Identity Gate',
    domain:'Authentication',
    cipherType:'railfence',
    brief:'فك النص المتشابك لكشف دليل التحقق متعدد العوامل.',
    prompt:'استخدم Rail Fence.',
    methodLabel:'Rail Fence',
    wordPool:['FACTOR','DEVICE','VERIFY','SECOND','BACKUP','PROMPT','PASSKEY','ACCOUNT','CONFIRM','APPROVE','BIOMETRY','RECOVERY','AUTHAPP','OTPCODE','PUSHAPP','ONETIME','TRUSTED','WEBAUTH','CHALLENGE','CONSENT'],
    displayStyle:'code',
    guide:'وزّع الحروف على سطرين متناوبين ثم أعد تركيبها.',
    hintCategory:'مرتبطة بخطوة إضافية أو أداة إضافية في authentication',
    concept:'التحقق من الهوية يصبح أقوى عند استخدام عدة عوامل مستقلة.',
    lesson:'MFA يوقف كثيرًا من اختراقات الحسابات لأن كلمة المرور المسروقة وحدها لم تعد كافية لعبور التحقق.',
    referenceType:'railfence'
  },
  {
    roomTitle:'الغرفة 5 // Payroll Gate',
    domain:'Access Control',
    cipherType:'scytale',
    brief:'أعد لف النص حول الأسطوانة الذهنية لكشف كلمة السياسة.',
    prompt:'استخدم Scytale.',
    methodLabel:'Scytale',
    wordPool:['ACCESS','PERMIT','GRANTS','SCOPES','POLICY','ALLOWED','CONTROL','MAPPING','GATEWAY','APPROVE','ROLEMAP','ROLESET','ENTITLE','SEGMENT','TRUSTED','BARRIER','GUARDED','PERMITS','GROUPS','BINDING'],
    displayStyle:'code',
    scytaleColumns:3,
    guide:'رتّب النص ضمن 3 أعمدة ثم اقرأه صفًا صفًا.',
    hintCategory:'مرتبطة بالأدوار أو الأذونات أو سياسات الوصول',
    concept:'سياسات access control تصبح أوضح وأسهل توسعًا عندما ترتبط الصلاحيات بالأدوار.',
    lesson:'RBAC يخفف الفوضى الإدارية لأن الفِرَق تعرف الأدوار مرة واحدة بدل تعديل أذونات كل مستخدم يدويًا في كل نظام.',
    referenceType:'scytale'
  },
  {
    roomTitle:'الغرفة 6 // Contractor Window',
    domain:'Access Control',
    cipherType:'columnar',
    brief:'فك ترتيب الأعمدة لاستعادة كلمة الامتياز المقيد.',
    prompt:'استخدم Columnar Transposition.',
    methodLabel:'Columnar',
    wordPool:['SCOPED','REVOKE','EXPIRE','SANDBOX','MINIMAL','LIMITED','BOUNDED','ISOLATE','CONTAIN','NARROW','TIMEBOX','SECLUDE','LEASED','EXPIRY','CURTAIL','TEMPKEY','SHORTEN','REDUCED','GUARDED','FENCED'],
    displayStyle:'code',
    columnOrders:[[2,0,1],[1,2,0]],
    guide:'اكتب الحروف في شبكة قصيرة ثم أعد الأعمدة إلى ترتيبها الطبيعي.',
    hintCategory:'مرتبطة بتقليل الصلاحية أو تضييق المدى أو المدة',
    concept:'يجب أن يُحصر access في أقل قدرة وأقصر مدة لازمتين لإنجاز المهمة.',
    lesson:'Least privilege يقلل نصف قطر الضرر. إذا أسيء استخدام الحساب فلن يرث المهاجم إلا قدرًا محدودًا جدًا من الصلاحيات.',
    referenceType:'columnar'
  }
];
const ROOM_THEMES = [
  {
    label:'Relay Atrium',
    arabic:'ردهة المرحّل',
    bg:0x031219, fog:0x031219, fogDensity:0.024,
    floor:0x041018, cable:0x124659,
    free:0x08131c, freeEm:0x004f68,
    start:0x062116, startEm:0x00ff88,
    goal:0x07253a, goalEm:0x00dfff,
    wall:0x142430, wallEm:0x005a74, wallCap:0x1d4a5f,
    particle:0x00e5ff, accent:0x00e5ff, accent2:0xffc040,
    ambient:0x0b1b29, ambientIntensity:2.9,
    sun:0x20556a, sunIntensity:0.82,
    rim:0x00e5ff, rimIntensity:0.75,
    fillSky:0x2a5367, fillGround:0x041019, fillIntensity:0.72,
    decor:'relay'
  },
  {
    label:'Token Archive',
    arabic:'أرشيف الرموز',
    bg:0x07140f, fog:0x07140f, fogDensity:0.025,
    floor:0x07150f, cable:0x396a22,
    free:0x0d1711, freeEm:0x2e6721,
    start:0x08311a, startEm:0x00ff88,
    goal:0x233114, goalEm:0xffc040,
    wall:0x1b2417, wallEm:0x4e7c24, wallCap:0x698f33,
    particle:0xb9ff52, accent:0xb9ff52, accent2:0xffc040,
    ambient:0x132313, ambientIntensity:2.8,
    sun:0x55701f, sunIntensity:0.88,
    rim:0xb8ff47, rimIntensity:0.72,
    fillSky:0x41541f, fillGround:0x081108, fillIntensity:0.7,
    decor:'cache'
  },
  {
    label:'Vault Forge',
    arabic:'مصهر الخزنة',
    bg:0x1a0b0b, fog:0x1a0b0b, fogDensity:0.028,
    floor:0x130808, cable:0x6f2b21,
    free:0x160d0d, freeEm:0x6d231f,
    start:0x0e261a, startEm:0x00ff88,
    goal:0x2a1511, goalEm:0xff6f47,
    wall:0x291717, wallEm:0x8b2b25, wallCap:0xa54835,
    particle:0xff7d54, accent:0xff7d54, accent2:0xffd28a,
    ambient:0x28120f, ambientIntensity:2.85,
    sun:0x7a2f22, sunIntensity:0.86,
    rim:0xff7c4d, rimIntensity:0.74,
    fillSky:0x6f261d, fillGround:0x120607, fillIntensity:0.66,
    decor:'vault'
  },
  {
    label:'Identity Gate',
    arabic:'بوابة الهوية',
    bg:0x06111b, fog:0x06111b, fogDensity:0.023,
    floor:0x07121d, cable:0x2d7c86,
    free:0x091520, freeEm:0x136472,
    start:0x08301e, startEm:0x00ff88,
    goal:0x0c2138, goalEm:0x7fdcff,
    wall:0x152938, wallEm:0x2f8ea0, wallCap:0x4eb4c2,
    particle:0x7feaff, accent:0x7feaff, accent2:0x00e5ff,
    ambient:0x0d1b2e, ambientIntensity:2.92,
    sun:0x2c7183, sunIntensity:0.84,
    rim:0x7fdcff, rimIntensity:0.7,
    fillSky:0x396a7f, fillGround:0x061019, fillIntensity:0.73,
    decor:'gate'
  },
  {
    label:'Policy Grid',
    arabic:'شبكة السياسات',
    bg:0x120d05, fog:0x120d05, fogDensity:0.026,
    floor:0x130c06, cable:0x8a5d17,
    free:0x17110a, freeEm:0x7a5617,
    start:0x14311c, startEm:0x00ff88,
    goal:0x2f2109, goalEm:0xffc040,
    wall:0x24180d, wallEm:0x8c661f, wallCap:0xb88b2e,
    particle:0xffcc64, accent:0xffcc64, accent2:0xff8d3a,
    ambient:0x24180a, ambientIntensity:2.86,
    sun:0x80541b, sunIntensity:0.88,
    rim:0xffc040, rimIntensity:0.72,
    fillSky:0x6e4a18, fillGround:0x140d05, fillIntensity:0.68,
    decor:'grid'
  },
  {
    label:'Contractor Throne',
    arabic:'عرش النافذة',
    bg:0x17060d, fog:0x17060d, fogDensity:0.029,
    floor:0x14050b, cable:0x8b1f3f,
    free:0x180912, freeEm:0x6e1830,
    start:0x0f2d18, startEm:0x00ff88,
    goal:0x2b0a15, goalEm:0xff4f7d,
    wall:0x271018, wallEm:0x8b1d3e, wallCap:0xc33860,
    particle:0xff5a8a, accent:0xff5a8a, accent2:0xffc040,
    ambient:0x240c16, ambientIntensity:2.95,
    sun:0x7d2040, sunIntensity:0.9,
    rim:0xff5a8a, rimIntensity:0.78,
    fillSky:0x66213e, fillGround:0x14050a, fillIntensity:0.69,
    decor:'throne'
  }
];
const BOSS_PROFILE = {
  name:'راس البلا',
  title:'قاعة العرش',
  intro:'انفتحت القاعة الأخيرة. الآن راس البلا سيختبرك في الشيفرات الست كلها.',
  defeat:'سقط راس البلا، وانفتح طريق الخروج أخيرًا.'
};
const MODE_RUN = 'run';
const MODE_TUTORIAL = 'tutorial';
const BATTLE_TIME_LIMIT = 17;
const TUTORIAL_THEME = {
  label:'Primer Loop',
  arabic:'حلقة التهيئة',
  bg:0x05111a, fog:0x05111a, fogDensity:0.022,
  floor:0x07131d, cable:0x345b91,
  free:0x091723, freeEm:0x1f5e82,
  start:0x0c2e20, startEm:0x00ff88,
  goal:0x0d2438, goalEm:0x8ce8ff,
  wall:0x162739, wallEm:0x2c6283, wallCap:0x457ea4,
  particle:0x7fdcff, accent:0x7fdcff, accent2:0xffc040,
  ambient:0x102237, ambientIntensity:2.9,
  sun:0x35698a, sunIntensity:0.84,
  rim:0x7fdcff, rimIntensity:0.76,
  fillSky:0x3d5f7f, fillGround:0x051019, fillIntensity:0.72,
  decor:'tutorial'
};
const TUTORIAL_PUZZLE = {
  roomTitle:'التمهيد // معرض الشيفرات',
  domain:'Orientation',
  cipherType:'caesar',
  brief:'هذا المعرض الهادئ يعرّفك على الشيفرات الست واحدة واحدة من دون قتال أو ضغط.',
  prompt:'اختر التدريب الذي تريد تجربته وابدأ على راحتك.',
  methodLabel:'معرض الشيفرات',
  wordPool:['KEY','CODE','EXIT','GATE','CIPHER','MATRIX','SIGNAL','SECRET'],
  displayStyle:'code',
  shiftOptions:[1,2],
  guide:'اقترب من أي رمز ثم اضغط E أو Enter عندما تكون جاهزًا.',
  hintCategory:'مرتبطة بالتعلّم والاستكشاف',
  concept:'هنا تتعرف على شكل كل شيفرة وطريقة التفكير فيها قبل دخول الغرف الأساسية.',
  lesson:'إذا أنهيت جولة في هذا المعرض، ستدخل المهمة الأساسية وأنت فاهم الحركة والواجهات وطريقة قراءة كل لغز.',
  referenceType:'caesar'
};
const TUTORIAL_STORY_BEAT = 'هذه مساحة آمنة لتتعرف على الديمونات وتجرب الشيفرات الست واحدة واحدة، ثم تغادر من عقدة الخروج عندما تنتهي.';
const TUTORIAL_DAEMON_EXHIBITS = [
  {
    type:'rook',
    pos:{x:-0.72,z:2.15},
    rotY:0.28,
    tag:'تعريف الديمون',
    title:'ROOK // حارس المسارات',
    body:'يتحرك بخط مستقيم حتى خطوتين ويهدد الممرات المفتوحة. استخدم الجدران والزوايا لكسر خطه قبل أن يثبتك.'
  },
  {
    type:'bishop',
    pos:{x:8.72,z:2.15},
    rotY:-0.28,
    tag:'تعريف الديمون',
    title:'BISHOP // قناص الزوايا',
    body:'يتحرك قطريًا خطوة واحدة، لذلك يعاقب الحركة المائلة والتمركز المكشوف قرب الأركان.'
  }
];
const TUTORIAL_PRACTICE_STATIONS = [
  {id:'caesar', roomIdx:0, label:'CAESAR', x:1, z:7},
  {id:'reverse', roomIdx:1, label:'REVERSE', x:3, z:7},
  {id:'atbash', roomIdx:2, label:'ATBASH', x:5, z:7},
  {id:'railfence', roomIdx:3, label:'RAIL FENCE', x:7, z:7},
  {id:'scytale', roomIdx:4, label:'SCYTALE', x:2, z:2},
  {id:'columnar', roomIdx:5, label:'COLUMNAR', x:5, z:1}
];
const TUTORIAL_MEDKITS = [];
const ROOM_TRANSMISSIONS = [
  'Transmission 01: Relay Atrium unstable. Track the keyholder before the relay collapses back into static.',
  'Transmission 02: Token Archive is bleeding session residue. Recover the word before the cache seals.',
  'Transmission 03: Password Vault still answers recovery probes. Move fast before the forge rehashes the sector.',
  'Transmission 04: Identity Gate is challenging every movement pattern. Expect sharper patrol reactions here.',
  'Transmission 05: Policy Grid is constricting permissions mid-run. Read the space before you commit to a path.',
  'Transmission 06: Contractor Window is narrowing. Secure the key and prepare for throne escalation.'
];
const ROOM_DEBRIEF_NOTES = [
  'المرحّل عاد إلى حالة مستقرة بعد كسر أول طبقة.',
  'تسرب الجلسة توقف، لكن آثار الوصول ما زالت نشطة في العمق.',
  'الخزنة فقدت تماسكها، وبدأت أدلة الاسترداد تتكشف في الشبكة.',
  'بوابة الهوية سقطت، وأصبح التقدم عبر القطاع أسرع وأكثر وضوحًا.',
  'ممر الصلاحيات انفتح، وبدأت سجلات الوصول تتبع انسحاب الحارس.',
  'النافذة الأخيرة انكسرت، والعرش المركزي بات مكشوفًا.'
];
const KEYHOLDER_CALLSIGN = 'حامل المفتاح';
const ROOM_PUZZLES_EN = [
  {
    roomTitle:'Room 1 // Cipher Relay',
    brief:'Break the short cipher to open the first relay.',
    prompt:'Use the Caesar cipher.',
    guide:'Apply the displayed shift to the whole text until the original word returns.',
    hintCategory:'Related to protection, locks, or hidden messages',
    concept:'Encryption hides plaintext through a reversible transformation that depends on a key.',
    lesson:'Caesar cipher is weak, but it shows the core idea of cryptography: data should not be readable unless you know how to reverse the transformation.'
  },
  {
    roomTitle:'Room 2 // Token Cache',
    brief:'Recover the reversed session word before it disappears from memory.',
    prompt:'Use Reverse.',
    guide:'Read the letters backward from the end to the beginning.',
    hintCategory:'Related to sessions, tokens, or components moving through a connection',
    concept:'Tokens and sessions are small secrets, but exposing one can give an attacker direct access.',
    lesson:'Even simple transformations are a reminder that session tokens, cookies, and nonces must be treated as sensitive material, not ordinary text.'
  },
  {
    roomTitle:'Room 3 // Password Vault',
    brief:'Extract the hidden clue linked to password storage.',
    prompt:'Use Atbash.',
    guide:'Atbash mirrors the alphabet: A pairs with Z, B with Y, and so on.',
    hintCategory:'Related to passwords or identity checks',
    concept:'Authentication systems should store salted password hashes instead of raw passwords.',
    lesson:'Argon2id slows offline guessing attacks by forcing every attempt to spend meaningful memory and compute resources.'
  },
  {
    roomTitle:'Room 4 // Identity Gate',
    brief:'Untangle the pattern to reveal the multi-factor authentication clue.',
    prompt:'Use Rail Fence.',
    guide:'Split letters between two alternating rails, then rebuild them in the correct order.',
    hintCategory:'Related to an extra step or tool in authentication',
    concept:'Authentication becomes stronger when it uses several independent factors.',
    lesson:'MFA blocks many account takeovers because a stolen password alone is no longer enough to pass the check.'
  },
  {
    roomTitle:'Room 5 // Payroll Gate',
    brief:'Wrap the text back around the mental cylinder to reveal the policy word.',
    prompt:'Use Scytale.',
    guide:'Place the text into 3 columns, then read the rows to recover the word.',
    hintCategory:'Related to roles, permissions, or access policies',
    concept:'Access control policies scale better when permissions are connected to roles.',
    lesson:'RBAC reduces administrative chaos because teams define roles once instead of manually editing every user on every system.'
  },
  {
    roomTitle:'Room 6 // Contractor Window',
    brief:'Restore the column order to recover the limited-privilege word.',
    prompt:'Use Columnar Transposition.',
    guide:'Write the letters into a short grid, return the columns to their natural order, then read the rows.',
    hintCategory:'Related to reducing privilege, scope, or duration',
    concept:'Access should be limited to the smallest useful scope and shortest useful time.',
    lesson:'Least privilege reduces blast radius. If an account is abused, the attacker inherits only a narrow set of permissions.'
  }
];
const TUTORIAL_PUZZLE_EN = {
  roomTitle:'Primer // Cipher Gallery',
  brief:'This quiet gallery introduces the six ciphers one by one without combat or pressure.',
  prompt:'Choose the training station you want to try and start at your own pace.',
  methodLabel:'Cipher Gallery',
  guide:'Walk up to any symbol, then press E or Enter when you are ready.',
  hintCategory:'Related to learning and exploration',
  concept:'Here you learn the shape of each cipher and how to think through it before entering the main rooms.',
  lesson:'After one pass through the gallery, the main run should feel clearer: move, get intercepted, solve, then escape.'
};
const TUTORIAL_STORY_BEAT_EN = 'This is a safe space to study the daemons and try all six ciphers one by one, then leave through the exit node when you are done.';
const TUTORIAL_DAEMON_EXHIBITS_EN = [
  {
    tag:'Daemon Brief',
    title:'ROOK // Lane Guard',
    body:'Moves in a straight line up to two steps and threatens open lanes. Use walls and corners to break its line before it pins you down.'
  },
  {
    tag:'Daemon Brief',
    title:'BISHOP // Corner Sniper',
    body:'Moves diagonally one step, so it punishes exposed diagonal movement and careless positioning near corners.'
  }
];
const ROOM_STORY_BEATS_EN = [
  'The first relay is still responding. Open the path before the noise layer locks it again.',
  'The session store is leaking temporary secrets. Recover the word and cross before the daemons reseal it.',
  'The password vault still exposes a recovery clue. Take it and keep moving through the network.',
  'The identity gate checks every step. Break its pattern and prove your identity still holds.',
  'The permission corridor folds its access logs inward. Open it to track the keyholder through the sector.',
  'The final window is narrowing. Extract the exit key and finish the escape before the frame collapses.'
];
const ROOM_DEBRIEF_NOTES_EN = [
  'The relay returned to a stable state after the first layer broke.',
  'The session leak stopped, but access residue is still active deeper inside.',
  'The vault lost cohesion, and recovery clues are surfacing across the network.',
  'The identity gate fell, making the path forward faster and clearer.',
  'The permission corridor opened, and the access logs started tracking the guard withdrawal.',
  'The final window broke, exposing the central throne.'
];
const ROOM_DEBRIEF_HEADLINES_EN = [
  'Break Caesar to escape the first room',
  'Reverse the letters to escape the second room',
  'Use Atbash to reveal the password clue and escape the third room',
  'Untangle the rail pattern to escape the fourth room',
  'Rewrap the text to recover the access word and escape the fifth room',
  'Restore the columns to escape the sixth room'
];
const ROOM_GAMEPLAY_CONTEXT_EN = [
  'Caesar cipher shifts alphabet letters backward by the shown key.',
  'Reverse is solved by reading the letters from end to start until the original word returns.',
  'Atbash mirrors the alphabet so the first letter matches the last, the second matches the one before it, and so on.',
  'Rail Fence splits letters between two alternating rails, then asks you to rebuild the original order.',
  'Scytale places letters into three columns, then reads rows to recover the word.',
  'Columnar asks you to return scrambled columns to their correct order, then read the rows.'
];
const BOSS_PROFILE_EN = {
  name:'Core Tyrant',
  title:'Throne Chamber',
  intro:'The final chamber opened. The Core Tyrant will now test you across all six ciphers.',
  defeat:'The Core Tyrant fell, and the exit route finally opened.'
};
const KEYHOLDER_CALLSIGN_EN = 'Keyholder';

const COVER_SHAPES = [
  [{x:0,z:0},{x:1,z:0}],
  [{x:0,z:0},{x:0,z:1}],
  [{x:0,z:0},{x:1,z:0},{x:0,z:1}],
  [{x:0,z:0},{x:1,z:0},{x:1,z:1}]
];
const COVER_PIECE_TARGET = 5;
const COVER_ATTEMPT_LIMIT = 220;
const COVER_ZONES = [
  {minX:1,maxX:3,minZ:1,maxZ:3},
  {minX:4,maxX:6,minZ:1,maxZ:3},
  {minX:1,maxX:3,minZ:4,maxZ:6},
  {minX:4,maxX:6,minZ:4,maxZ:6},
  {minX:2,maxX:5,minZ:2,maxZ:5},
  {minX:5,maxX:7,minZ:5,maxZ:7}
];
const ROOM_COVER_PROFILES = [
  {targetPieces:5, zoneOrder:[4,0,4,1,2,3]},
  {targetPieces:6, zoneOrder:[1,4,1,5,2,4]},
  {targetPieces:5, zoneOrder:[0,2,4,2,3,4]},
  {targetPieces:6, zoneOrder:[1,3,4,1,3,5]},
  {targetPieces:6, zoneOrder:[0,1,2,3,4,4]},
  {targetPieces:5, zoneOrder:[3,5,4,3,5,1]}
];

const ROOM_PATROLS = [
  [
    [{x:8,z:0},{x:8,z:1},{x:8,z:2},{x:7,z:2},{x:6,z:2},{x:6,z:1},{x:6,z:0},{x:7,z:0}],
    [{x:4,z:7},{x:5,z:6},{x:6,z:5},{x:5,z:4},{x:4,z:3},{x:3,z:4},{x:2,z:5},{x:3,z:6}],
    [{x:0,z:2},{x:1,z:2},{x:2,z:2},{x:2,z:1},{x:2,z:0},{x:1,z:0},{x:0,z:0},{x:0,z:1}]
  ],
  [
    [{x:8,z:0},{x:8,z:1},{x:8,z:2},{x:8,z:3},{x:7,z:3},{x:6,z:3},{x:6,z:2},{x:6,z:1},{x:6,z:0},{x:7,z:0}],
    [{x:3,z:7},{x:4,z:6},{x:5,z:5},{x:4,z:4},{x:3,z:3},{x:2,z:4},{x:1,z:5},{x:2,z:6}],
    [{x:4,z:0},{x:5,z:0},{x:6,z:0},{x:7,z:0},{x:7,z:1},{x:7,z:2},{x:6,z:2},{x:5,z:2},{x:4,z:2},{x:4,z:1}]
  ],
  [
    [{x:8,z:1},{x:8,z:2},{x:8,z:3},{x:7,z:3},{x:6,z:3},{x:5,z:3},{x:5,z:2},{x:5,z:1},{x:6,z:1},{x:7,z:1}],
    [{x:2,z:7},{x:3,z:6},{x:4,z:5},{x:3,z:4},{x:2,z:3},{x:1,z:4},{x:0,z:5},{x:1,z:6}],
    [{x:4,z:0},{x:5,z:0},{x:6,z:0},{x:7,z:0},{x:8,z:0},{x:8,z:1},{x:8,z:2},{x:7,z:2},{x:6,z:2},{x:5,z:2},{x:4,z:2},{x:4,z:1}]
  ],
  [
    [{x:8,z:0},{x:8,z:1},{x:8,z:2},{x:8,z:3},{x:7,z:3},{x:6,z:3},{x:6,z:2},{x:6,z:1},{x:6,z:0},{x:7,z:0}],
    [{x:4,z:8},{x:5,z:7},{x:6,z:6},{x:5,z:5},{x:4,z:4},{x:3,z:5},{x:2,z:6},{x:3,z:7}],
    [{x:4,z:0},{x:5,z:0},{x:6,z:0},{x:7,z:0},{x:7,z:1},{x:7,z:2},{x:6,z:2},{x:5,z:2},{x:4,z:2},{x:4,z:1}],
    [{x:3,z:8},{x:4,z:7},{x:3,z:6},{x:2,z:7}]
  ],
  [
    [{x:8,z:1},{x:8,z:2},{x:8,z:3},{x:7,z:3},{x:6,z:3},{x:6,z:2},{x:6,z:1},{x:7,z:1}],
    [{x:3,z:8},{x:4,z:7},{x:5,z:6},{x:4,z:5},{x:3,z:4},{x:2,z:5},{x:1,z:6},{x:2,z:7}],
    [{x:3,z:0},{x:4,z:0},{x:5,z:0},{x:6,z:0},{x:7,z:0},{x:7,z:1},{x:7,z:2},{x:6,z:2},{x:5,z:2},{x:4,z:2},{x:3,z:2},{x:3,z:1}],
    [{x:6,z:8},{x:7,z:7},{x:8,z:6},{x:7,z:5},{x:6,z:4},{x:5,z:5},{x:4,z:6},{x:5,z:7}]
  ],
  [
    [{x:8,z:0},{x:8,z:1},{x:8,z:2},{x:7,z:2},{x:6,z:2},{x:6,z:1},{x:6,z:0},{x:7,z:0}],
    [{x:4,z:8},{x:5,z:7},{x:6,z:6},{x:5,z:5},{x:4,z:4},{x:3,z:5},{x:2,z:6},{x:3,z:7}],
    [{x:3,z:0},{x:4,z:0},{x:5,z:0},{x:6,z:0},{x:7,z:0},{x:7,z:1},{x:7,z:2},{x:6,z:2},{x:5,z:2},{x:4,z:2},{x:3,z:2},{x:3,z:1}],
    [{x:6,z:7},{x:7,z:6},{x:8,z:5},{x:7,z:4},{x:6,z:3},{x:5,z:4},{x:4,z:5},{x:5,z:6}]
  ]
];
const DAEMON_PERSONALITIES = {
  default:{holdChance:0.12, patrolFlipChance:0.22, alertTurns:3, commitTurns:3, threatBonus:0, bestWeight:5.2, secondWeight:3.15, thirdWeight:1.6, candidateDepth:2},
  sentry:{holdChance:0.2, patrolFlipChance:0.14, alertTurns:4, commitTurns:4, threatBonus:0.35, bestWeight:6.3, secondWeight:2.6, thirdWeight:1.1, candidateDepth:1},
  hunter:{holdChance:0.05, patrolFlipChance:0.1, alertTurns:5, commitTurns:6, threatBonus:0.9, bestWeight:7.1, secondWeight:2.2, thirdWeight:0.9, candidateDepth:1},
  lurker:{holdChance:0.26, patrolFlipChance:0.32, alertTurns:2, commitTurns:2, threatBonus:-0.2, bestWeight:4.2, secondWeight:3.7, thirdWeight:2.4, candidateDepth:3},
  sweeper:{holdChance:0.08, patrolFlipChance:0.46, alertTurns:4, commitTurns:5, threatBonus:0.45, bestWeight:5.7, secondWeight:3.4, thirdWeight:1.9, candidateDepth:2},
  flanker:{holdChance:0.1, patrolFlipChance:0.28, alertTurns:4, commitTurns:5, threatBonus:0.25, bestWeight:5.4, secondWeight:3.8, thirdWeight:2.2, candidateDepth:3}
};
const ROOM_DAEMON_PLANS = [
  [{type:'rook',personality:'sentry'},{type:'bishop',personality:'sweeper'}],
  [{type:'bishop',personality:'lurker'},{type:'bishop',personality:'flanker'}],
  [{type:'rook',personality:'hunter'},{type:'bishop',personality:'lurker'},{type:'rook',personality:'sentry'}],
  [{type:'bishop',personality:'flanker'},{type:'rook',personality:'hunter'},{type:'bishop',personality:'sweeper'}],
  [{type:'rook',personality:'sentry'},{type:'bishop',personality:'lurker'},{type:'rook',personality:'hunter'},{type:'bishop',personality:'flanker'}],
  [{type:'rook',personality:'hunter'},{type:'bishop',personality:'flanker'},{type:'rook',personality:'sentry'},{type:'bishop',personality:'hunter'}]
];

let scene, camera, renderer;
let heroGroup, daemonGroups = [];
let nodeMeshes = [], nodeLights = [];
let floatParticles = [];
let roomDecor = [];
let lerpHero = {active:false, from:{x:0,y:0,z:0}, to:{x:0,y:0,z:0}, t:0};
let daemonLerps = [];
let G = {};
let battle = {active:false, mode:null, daemonId:null, daemonType:null, keyCarrier:false, puzzle:null, timer:null, hintStep:0, hintRevealedIndices:[], timeLeft:0, boss:null, practice:null};
let explainState = {active:false, pendingGameOver:false};
let pauseState = {active:false, prevInputLocked:false, resumeBattleTimer:false};
let roomBriefState = {active:false, room:null, onContinue:null};
let bossSceneState = {active:false, introActive:false, archon:null, throne:null, stand:0, targetStand:0, cameraOverride:false, cameraPos:null, lookAt:null, clashTimer:null, riseTimer:null};
let camFollow = {x:0,z:0};
let UI = {tutorialChatAnchor:null, hpFloatTimer:null, swipe:null};
let FX = {cameraKick:0, engageTimer:null, beatTimer:null, travelTimer:null, engageActive:false, beatActive:false, travelActive:false, audioCtx:null, logFlashTimer:null};
let activeLang = (()=>{ try { return localStorage.getItem('cipherLanguage') || 'ar'; } catch { return 'ar'; } })();
const RUNNER_NAME = 'المُرسَل';
const RUNNER_NAME_EN = 'the Runner';
const ROOM_STORY_BEATS = [
  'المرحّل الأول ما زال يستجيب. افتح المسار قبل أن تغلقه طبقة التشويش.',
  'مخزن الجلسات ينزف أسرارًا مؤقتة. استعد الكلمة واعبر قبل أن تعيد الديمونات قفله.',
  'خزنة كلمات المرور تحتوي على دليل الاسترداد. التقطه ثم واصل التقدم داخل الشبكة.',
  'بوابة الهوية تفحص كل خطوة. اكسر نمطها السريع لتثبت أن هويتك ما زالت صالحة.',
  'ممر الصلاحيات يلف سجلاته حول نفسه. افتحه لتتبع حامل المفتاح داخل القطاع.',
  'النافذة الأخيرة تضيق بسرعة. استخرج مفتاح الخروج وأنهِ الهروب قبل أن ينهار القالب.'
];
let currentTheme = ROOM_THEMES[0];
let sceneLights = {ambient:null, sun:null, rim:null, fill:null};
let VIEW = {w:window.innerWidth, h:window.innerHeight, mobile:false, phone:false, portrait:false};
let renderViewportCache = {w:0, h:0, dpr:0, mobile:null};

function getViewportSize(){
  const vv = window.visualViewport;
  return {
    w: Math.max(1, Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth || 1)),
    h: Math.max(1, Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight || 1))
  };
}

function refreshViewportProfile(){
  const size = getViewportSize();
  const coarse = window.matchMedia?.('(pointer: coarse)').matches || false;
  VIEW.w = size.w;
  VIEW.h = size.h;
  VIEW.portrait = size.h > size.w;
  VIEW.mobile = coarse || size.w <= 980 || size.h <= 620;
  VIEW.phone = VIEW.mobile && Math.min(size.w, size.h) <= 760;
  if(document.body){
    document.body.classList.toggle('mobile-fit', VIEW.mobile);
    document.body.classList.toggle('portrait-fit', VIEW.mobile && VIEW.portrait);
  }
  updateMobileControlsVisibility();
  return VIEW;
}

function getCameraProfile(){
  refreshViewportProfile();
  if(VIEW.phone && VIEW.portrait) return {fov:76, x:8.8, y:15.2, z:10.5, lerp:0.1};
  if(VIEW.phone) return {fov:64, x:9.4, y:12.1, z:9.7, lerp:0.1};
  if(VIEW.mobile) return {fov:60, x:9.8, y:11.6, z:9.8, lerp:0.09};
  return {fov:50, x:10.2, y:10.2, z:10.2, lerp:0.08};
}

function getRenderDpr(){
  const raw = window.devicePixelRatio || 1;
  const cap = VIEW.mobile ? 2 : 2.5;
  return Math.max(1, Math.min(raw, cap));
}

function applyRendererViewport(force=false){
  if(!camera || !renderer) return;
  const profile = getCameraProfile();
  const dpr = getRenderDpr();
  const changed = force ||
    renderViewportCache.w !== VIEW.w ||
    renderViewportCache.h !== VIEW.h ||
    renderViewportCache.dpr !== dpr ||
    renderViewportCache.mobile !== VIEW.mobile;
  if(!changed) return;
  camera.fov = profile.fov;
  camera.aspect = VIEW.w / VIEW.h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(dpr);
  renderer.setSize(VIEW.w, VIEW.h, true);
  renderViewportCache = {w:VIEW.w, h:VIEW.h, dpr, mobile:VIEW.mobile};
  refreshMatrixRain();
  if(G?.nodes?.length) updateMinimap();
}

const $ = id => document.getElementById(id);
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const shuffle = a => { for(let i=a.length-1;i>0;i--){const j=~~(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const gToW = (gx,gz)=>({x:(gx-((GS-1)/2))*SP,y:0,z:(gz-((GS-1)/2))*SP});
const keyOf = (x,z)=>`${x},${z}`;
function isEditableElement(el){
  if(!el || typeof el.tagName!=='string') return false;
  if(el.isContentEditable) return true;
  const tag = el.tagName.toUpperCase();
  if(tag==='TEXTAREA' || tag==='SELECT') return true;
  if(tag!=='INPUT') return false;
  const type = (el.getAttribute('type') || 'text').toLowerCase();
  return !['button','checkbox','color','file','hidden','image','radio','range','reset','submit'].includes(type);
}
function isTextEntryContext(target){
  return isEditableElement(target) || isEditableElement(document.activeElement);
}
const setDisplay = (id, value) => {
  const el=$(id);
  if(el) el.style.display=value;
  if(id==='hud') updateMobileControlsVisibility();
  return el;
};
const setText = (id, value) => { const el=$(id); if(el) el.textContent=value; return el; };
const setHtml = (id, value) => { const el=$(id); if(el) el.innerHTML=value; return el; };
const isFlexVisible = id => $(id)?.style.display==='flex';
const hideDisplays = ids => ids.forEach(id=>setDisplay(id,'none'));
const RESULT_SCREENS = ['battle-screen','s-explain','s-pause','s-room-brief','s-tutorial-exit'];
const ACTIVE_RUN_SCREENS = ['battle-screen','s-explain','s-over','s-win','s-pause','s-tutorial-exit','s-room-brief'];
const SESSION_BOOT_SCREENS = ['s-title','s-over','s-win','s-explain','s-pause','s-tutorial-exit','s-room-brief'];
const UI_TEXT = {
  ar:{
    titleStory:'أنت المُرسَل، عالق داخل شبكة أمنية خربانة، وكل غرفة فيها شيفرة لازم تفكها.<br>خذ المفتاح واهرب من كل قطاع قبل ما يمسكك الحراس.<br>وإذا وصلت للنهاية، بتقابل راس البلا.',
    startBtn:'[ ابدأ ] دخول الشبكة',
    tutorialBtn:'[ تدريب ] محاكاة تمهيدية',
    menuNote:'تعرّف على الديمونات، جرّب الشيفرات الست، ثم ابدأ المهمة الأساسية وأنت فاهم النظام.',
    room:'الغرفة',
    health:'الصحة',
    exitKey:'مفتاح الخروج',
    keySeek:'ابحث عن حامل المفتاح',
    turns:'الأدوار',
    pause:'Tab | إيقاف',
    interact:'تفاعل',
    pauseShort:'إيقاف',
    tutorialTag:'التدريب',
    tutorialTitle:'دليل التدريب',
    battleTitle:'واجهة التحدي',
    battleSub:'تم اعتراضك بواسطة ديمون',
    engageTitle:'تم اعتراضك',
    engageSub:'استعد للاشتباك القصير.',
    statusClearTitle:'تم فتح المسار',
    statusClearSub:'المشهد يلتقط أنفاسه قبل العودة للحركة.',
    travelTitle:'الانتقال إلى الغرفة التالية',
    travelSub:'تتدفق الرموز عبر الممرات قبل تثبيت القطاع الجديد.',
    explainEyebrow:'مراجعة اللغز',
    explainTitle:'الدرس الأمني',
    continue:'متابعة',
    pauseKicker:'إيقاف',
    pauseTitle:'تم إيقاف التشغيل',
    pauseCopy:'تم تجميد الحركة مؤقتًا. يمكنك العودة إلى الجولة أو الخروج إلى القائمة الرئيسية.',
    pauseQuit:'الخروج إلى القائمة',
    tutorialExitKicker:'إنهاء التدريب',
    tutorialExitTitle:'انتهى التدريب الآن',
    tutorialExitCopy:'المعرض التمهيدي أدى دوره. ابدأ المهمة الأساسية مباشرة لو أنك جاهز، أو عد إلى القائمة الرئيسية.',
    tutorialExitContinue:'استمر في التدريب',
    tutorialExitMenu:'العودة للقائمة',
    tutorialExitStart:'ابدأ المهمة',
    overTitle:'[ انتهى الاتصال ]',
    winTitle:'[ هروب ناجح ]',
    roomBriefKicker:'MISSION DEBRIEF',
    roomBriefStart:'ابدأ الاختراق',
    roomBriefContinue:'تابع المهمة',
    roomBriefMethod:'الطريقة',
    roomBriefPlay:'طريقة اللعب',
    roomBriefGameContext:'سياق اللعبة',
    roomBriefSecurity:'المفهوم الامني الاصلي',
    roomBriefPlayText:'تحرك بهدوء، استغل الجدران والزوايا، ولا تترك الديمونز تقطع عليك الطريق.',
    roomBriefFallback:'تابع المهمة للهروب من الغرفة {room}',
    tutorialExitNodeTag:'بوابة الخروج',
    tutorialExitNodeTitle:'بوابة إنهاء التدريب',
    tutorialExitNodeBody:'هذه العقدة لا تقفز بك مباشرة إلى الغرفة الأولى. اضغط E أو Enter لفتح خيارات البدء أو العودة إلى القائمة.',
    daemonBrief:'تعريف الديمون',
    statusOk:'نجاح',
    statusGold:'مفتاح',
    statusClear:'غرفة',
    intercept:'اعتراض',
    daemonPinned:'تم تثبيت الديمون',
    keyPinned:'تم تثبيت {name}',
    keyEncounter:'اشتباك قصير. هذا هو حامل المفتاح الفعلي في هذا القطاع.',
    daemonEncounter:'الواجهة تنفتح الآن. اقرأ الأثر بسرعة ثم أرسل الحل.',
    freeTraining:'تدريب حر',
    practiceOverlay:'{label} // تدريب بلا ضرر ولا مؤقت.',
    challengeInterface:'واجهة التحدي',
    keyDetected:'تم رصد {name}. حل التحدي لتأمين مفتاح الخروج.',
    daemonDetected:'تم الاشتباك مع الديمون. حل التحدي قبل أن يغلق المسار.',
    practiceNotice:'وضع تدريبي: هذه المحطة لا تسبب ضررًا، ويمكنك إعادة المحاولة قدر ما تريد.',
    method:'الطريقة',
    key:'المفتاح',
    trainingPrefix:'تدريب {label}',
    freeHint:'كل ضغطة على التلميح تكشف حرفًا جديدًا من الحل هنا مجانًا.',
    paidHint:'كل ضغطة على التلميح تكشف حرفًا جديدًا من الحل وتكلفك {damage} HP.',
    answerPlaceholder:'اكتب الإجابة هنا',
    hintBtn:'تلميح',
    submitBtn:'إرسال',
    closeBtn:'إغلاق',
    retreatBtn:'انسحاب',
    target:'الهدف',
    piece:'القطعة',
    timer:'المؤقت',
    coreRole:'نواة العرش',
    keyRole:'حامل المفتاح',
    daemonRole:'ديمون معترض',
    finalSequence:'FINAL SEQUENCE',
    bossLayerText:'كل شيفرة صحيحة تكسر طبقة من النواة. الشيفرة السادسة وحدها تنهي العرش.',
    phase:'المرحلة',
    coreHealth:'سلامة النواة',
    correctAnswer:'الحل الصحيح',
    securityConcept:'المفهوم الأمني',
    whyMatters:'لماذا يهم',
    challengeText:'نص التحدي',
    explainSuccess:'تم تجاوز التحدي بنجاح.',
    explainTimeout:'استنزفك المؤقت قبل إرسال الحل الصحيح.',
    explainClosed:'أُغلقت المواجهة قبل حل التحدي بنجاح.',
    explainSolvedKey:'حللت اللغز، وأسقطت حامل المفتاح، واستحوذت على مفتاح الخروج.',
    explainSolvedDaemon:'حللت اللغز وأزلت الديمون المعترض من الغرفة.',
    explainCorrectShown:'يظهر الحل الصحيح أدناه حتى يبقى المفهوم الأمني واضحًا بعد المواجهة.',
    practiceSolvedTitle:'اكتمل تدريب {label}',
    practiceSolvedSub:'يمكنك إعادة التدريب متى شئت أو الانتقال إلى تدريب آخر داخل المعرض.',
    keyDroppedTitle:'تم إسقاط حامل المفتاح',
    pathOpenedTitle:'تم فتح المسار',
    keyDroppedSub:'{name} سقط. دخل القطاع في حالة extraction؛ اتجه الآن إلى عقدة الخروج.',
    pathOpenedSub:'تم إخماد الديمون وعادت الحركة إلى الشبكة.',
    wrongPractice:'ليست الإجابة الصحيحة بعد. جرّب مرة أخرى أو خذ تلميحًا مجانيًا.',
    solvedKeyResult:'حللت التحدي الأمني واستحوذت على مفتاح الخروج.',
    solvedPathResult:'حللت التحدي الأمني وفتحت الطريق.',
    timeoutResult:'انتهت دورة المؤقت وأصابك الديمون بـ {damage} HP حتى سقطت.',
    retreatResult:'انسحبت من المواجهة، خسرت {damage} HP، وتعطّل الديمون لمدة {turns} أدوار قبل أن يتحرك مجددًا.',
    roomSecured:'غرفة مؤمّنة',
    layersBroken:'انكسرت الطبقات الست. النواة المركزية بدأت بالظهور.',
    roomSafe:'الغرفة {room} أصبحت آمنة. {note}',
    throneWake:'استيقاظ العرش',
    throneApproach:'الانتقال إلى قاعة العرش',
    throneApproachSub:'انكسرت الطبقات الست، وبقيت النواة وحدها في آخر الغرفة. هذه المرة سترى صاحب العرش قبل أن يبدأ التحدي.',
    bossRises:'{name} يقوم من العرش',
    bossClashSub:'توقفت المطاردة التقليدية. النواة خرجت بنفسها لتختبرك مباشرة في التسلسل الأخير.',
    throneBattle:'عرش الشيفرات',
    bossFall:'سقوط {name}',
    bossFinal:'{defeat} الشيفرة الأخيرة كانت {method}.',
    bossHit:'ضربة على النواة',
    bossHitSub:'أصبت {name} بشيفرة {method}. بقي {hp} من {max}.',
    tutorialStartTitle:'محاكاة تمهيدية',
    tutorialStartSub:'هذا معرض آمن: كل رمز يحمل شكلًا صغيرًا يلمّح إلى شيفرته، والاقتراب من أي رمز أو من ROOK وBISHOP يفتح شرحًا سريعًا فوقه.',
    overTutorial:'تعطلت <span>{runner}</span> داخل محاكاة التهيئة قبل بلوغ عقدة الخروج.<br>مجموع الأدوار: <span>{turns}</span>',
    overRun:'سقط <span>{runner}</span> قبل بلوغ بوابة الخروج.<br>وصلت إلى الغرفة <span>{room}</span> من {count}<br>مجموع الأدوار: <span>{turns}</span>',
    retryTraining:'↺ إعادة التدريب',
    retryRun:'↺ إعادة المحاولة',
    winTutorialTitle:'[ محاكاة مكتملة ]',
    winRunTitle:'[ هروب ناجح ]',
    winTutorial:'أكمل <span>{runner}</span> مسار التهيئة واستوعب الحلقة الأساسية: حركة، اعتراض، حل، ثم خروج.<br>مجموع الأدوار: <span>{turns}</span>',
    winRun:'استعاد <span>{runner}</span> مفتاح الخروج وأسقط <span>{boss}</span> بعد كسر القطاعات الستة.<br>مجموع الأدوار: <span>{turns}</span>',
    mainMenu:'العودة إلى القائمة الرئيسية'
  },
  en:{
    titleStory:'You are the Runner, trapped inside a broken security network. Every room hides a cipher you must break.<br>Take the key and escape each sector before the guards catch you.<br>If you reach the end, the Core Tyrant is waiting.',
    startBtn:'[ START ] Enter the Network',
    tutorialBtn:'[ TRAINING ] Primer Simulation',
    menuNote:'Study the daemons, try all six ciphers, then start the main mission with the system already understood.',
    room:'Room',
    health:'Health',
    exitKey:'Exit Key',
    keySeek:'Find the keyholder',
    turns:'Turns',
    pause:'Tab | Pause',
    interact:'Interact',
    pauseShort:'Pause',
    tutorialTag:'Training',
    tutorialTitle:'Training Guide',
    battleTitle:'Challenge Interface',
    battleSub:'Intercepted by a daemon',
    engageTitle:'Intercepted',
    engageSub:'Prepare for a short breach.',
    statusClearTitle:'Path opened',
    statusClearSub:'The scene catches its breath before movement resumes.',
    travelTitle:'Moving to the next room',
    travelSub:'Code streams through the corridors before the new sector locks in.',
    explainEyebrow:'Puzzle Review',
    explainTitle:'Security Lesson',
    continue:'Continue',
    pauseKicker:'Pause',
    pauseTitle:'Run Paused',
    pauseCopy:'Movement is frozen for now. You can return to the run or exit to the main menu.',
    pauseQuit:'Exit to Menu',
    tutorialExitKicker:'End Training',
    tutorialExitTitle:'Training is complete',
    tutorialExitCopy:'The primer gallery has done its job. Start the main mission if you are ready, or return to the main menu.',
    tutorialExitContinue:'Stay in Training',
    tutorialExitMenu:'Return to Menu',
    tutorialExitStart:'Start Mission',
    overTitle:'[ CONNECTION LOST ]',
    winTitle:'[ ESCAPE COMPLETE ]',
    roomBriefKicker:'MISSION DEBRIEF',
    roomBriefStart:'Start Breach',
    roomBriefContinue:'Continue Mission',
    roomBriefMethod:'Method',
    roomBriefPlay:'How to Play',
    roomBriefGameContext:'Game Context',
    roomBriefSecurity:'Security Concept',
    roomBriefPlayText:'Move carefully, use walls and corners, and do not let the daemons cut off your route.',
    roomBriefFallback:'Continue the mission to escape room {room}',
    tutorialExitNodeTag:'Exit Gate',
    tutorialExitNodeTitle:'Training Exit',
    tutorialExitNodeBody:'This node does not jump straight into the first room. Press E or Enter to open the start or menu options.',
    daemonBrief:'Daemon Brief',
    statusOk:'Success',
    statusGold:'Key',
    statusClear:'Room',
    intercept:'Intercept',
    daemonPinned:'Daemon pinned',
    keyPinned:'{name} pinned',
    keyEncounter:'Short breach. This is the real keyholder in this sector.',
    daemonEncounter:'The interface is opening. Read the artifact quickly, then submit the answer.',
    freeTraining:'Free Training',
    practiceOverlay:'{label} // Training with no damage and no timer.',
    challengeInterface:'Challenge Interface',
    keyDetected:'{name} detected. Solve the challenge to secure the exit key.',
    daemonDetected:'A daemon intercepted you. Solve the challenge before it closes the route.',
    practiceNotice:'Training mode: this station deals no damage, and you can retry as much as you want.',
    method:'Method',
    key:'Key',
    trainingPrefix:'Training {label}',
    freeHint:'Each hint press reveals one more answer letter here for free.',
    paidHint:'Each hint press reveals one more answer letter and costs {damage} HP.',
    answerPlaceholder:'Type the answer here',
    hintBtn:'Hint',
    submitBtn:'Submit',
    closeBtn:'Close',
    retreatBtn:'Retreat',
    target:'Target',
    piece:'Piece',
    timer:'Timer',
    coreRole:'Throne Core',
    keyRole:'Keyholder',
    daemonRole:'Intercepting Daemon',
    finalSequence:'FINAL SEQUENCE',
    bossLayerText:'Every correct cipher breaks one core layer. The sixth cipher ends the throne.',
    phase:'Phase',
    coreHealth:'Core Integrity',
    correctAnswer:'Correct Answer',
    securityConcept:'Security Concept',
    whyMatters:'Why It Matters',
    challengeText:'Challenge Text',
    explainSuccess:'Challenge cleared successfully.',
    explainTimeout:'The timer drained you before the correct answer was submitted.',
    explainClosed:'The encounter closed before the challenge was solved.',
    explainSolvedKey:'You solved the puzzle, dropped the keyholder, and secured the exit key.',
    explainSolvedDaemon:'You solved the puzzle and removed the intercepting daemon from the room.',
    explainCorrectShown:'The correct answer is shown below so the security concept stays clear after the encounter.',
    practiceSolvedTitle:'{label} training complete',
    practiceSolvedSub:'You can repeat this station whenever you want or move to another one inside the gallery.',
    keyDroppedTitle:'Keyholder down',
    pathOpenedTitle:'Path opened',
    keyDroppedSub:'{name} fell. The sector entered extraction; head to the exit node now.',
    pathOpenedSub:'The daemon was suppressed and movement returned to the network.',
    wrongPractice:'Not the right answer yet. Try again or take a free hint.',
    solvedKeyResult:'You solved the security challenge and secured the exit key.',
    solvedPathResult:'You solved the security challenge and opened the path.',
    timeoutResult:'The timer cycle ended and the daemon hit you for {damage} HP until you fell.',
    retreatResult:'You retreated from the encounter, lost {damage} HP, and disabled the daemon for {turns} turns before it moves again.',
    roomSecured:'Room secured',
    layersBroken:'All six layers broke. The central core is starting to appear.',
    roomSafe:'Room {room} is safe. {note}',
    throneWake:'Throne waking',
    throneApproach:'Moving to the Throne Chamber',
    throneApproachSub:'The six layers broke, and only the core remains in the final room. This time you will see the owner of the throne before the challenge begins.',
    bossRises:'{name} rises from the throne',
    bossClashSub:'The normal chase has stopped. The core came out to test you directly in the final sequence.',
    throneBattle:'Throne of Ciphers',
    bossFall:'{name} falls',
    bossFinal:'{defeat} The final cipher was {method}.',
    bossHit:'Core hit',
    bossHitSub:'You struck {name} with {method}. {hp} of {max} layers remain.',
    tutorialStartTitle:'Primer Simulation',
    tutorialStartSub:'This is a safe gallery: each symbol hints at its cipher, and approaching any symbol, ROOK, or BISHOP opens a quick explanation above it.',
    overTutorial:'<span>{runner}</span> broke down inside the primer simulation before reaching the exit node.<br>Total turns: <span>{turns}</span>',
    overRun:'<span>{runner}</span> fell before reaching the exit gate.<br>Reached room <span>{room}</span> of {count}<br>Total turns: <span>{turns}</span>',
    retryTraining:'↺ Restart Training',
    retryRun:'↺ Retry',
    winTutorialTitle:'[ SIMULATION COMPLETE ]',
    winRunTitle:'[ ESCAPE COMPLETE ]',
    winTutorial:'<span>{runner}</span> completed the primer and understood the core loop: move, intercept, solve, then exit.<br>Total turns: <span>{turns}</span>',
    winRun:'<span>{runner}</span> recovered the exit key and defeated <span>{boss}</span> after breaking all six sectors.<br>Total turns: <span>{turns}</span>',
    mainMenu:'Return to Main Menu'
  }
};

function isEnglish(){
  return activeLang === 'en';
}

function textFor(key){
  return UI_TEXT[activeLang]?.[key] ?? UI_TEXT.ar[key] ?? key;
}

function fillText(key, values={}){
  return textFor(key).replace(/\{(\w+)\}/g, (_, name)=>values[name] ?? '');
}

function getRunnerName(){
  return isEnglish() ? RUNNER_NAME_EN : RUNNER_NAME;
}

function getBossProfile(){
  return isEnglish() ? BOSS_PROFILE_EN : BOSS_PROFILE;
}

function setLanguage(lang){
  activeLang = lang === 'en' ? 'en' : 'ar';
  try { localStorage.setItem('cipherLanguage', activeLang); } catch {}
  applyLanguage();
}

function applyLanguage(){
  if(activeLang !== 'en') activeLang = 'ar';
  const dir = isEnglish() ? 'ltr' : 'rtl';
  document.documentElement.lang = activeLang;
  document.documentElement.dir = dir;
  if(document.body) document.body.dir = dir;
  setHtml('title-story', textFor('titleStory'));
  setText('start-btn', textFor('startBtn'));
  setText('tutorial-btn', textFor('tutorialBtn'));
  setText('menu-note', textFor('menuNote'));
  setText('h-room-label', textFor('room'));
  setText('h-health-label', textFor('health'));
  setText('h-key-label', textFor('exitKey'));
  setText('h-turns-label', textFor('turns'));
  setText('desktop-pause-btn', textFor('pause'));
  setText('mobile-action', textFor('interact'));
  setText('mobile-pause', textFor('pauseShort'));
  setText('tutorial-chat-tag', textFor('tutorialTag'));
  setText('tutorial-chat-title', textFor('tutorialTitle'));
  setText('battle-title', textFor('battleTitle'));
  setText('battle-sub', textFor('battleSub'));
  setText('engage-title', textFor('engageTitle'));
  setText('engage-sub', textFor('engageSub'));
  setText('status-title', textFor('statusClearTitle'));
  setText('status-sub', textFor('statusClearSub'));
  setText('travel-title', textFor('travelTitle'));
  setText('travel-sub', textFor('travelSub'));
  setText('explain-eyebrow', textFor('explainEyebrow'));
  setText('explain-title', textFor('explainTitle'));
  setText('explain-continue-btn', textFor('continue'));
  setText('pause-kicker', textFor('pauseKicker'));
  setText('pause-title', textFor('pauseTitle'));
  setText('pause-copy', textFor('pauseCopy'));
  setText('pause-quit-btn', textFor('pauseQuit'));
  setText('pause-resume-btn', textFor('continue'));
  setText('tutorial-exit-kicker', textFor('tutorialExitKicker'));
  setText('tutorial-exit-title', textFor('tutorialExitTitle'));
  setText('tutorial-exit-copy', textFor('tutorialExitCopy'));
  setText('tutorial-exit-continue-btn', textFor('tutorialExitContinue'));
  setText('tutorial-exit-menu-btn', textFor('tutorialExitMenu'));
  setText('tutorial-exit-start-btn', textFor('tutorialExitStart'));
  setText('over-title', textFor('overTitle'));
  setText('win-title', textFor('winTitle'));
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === activeLang);
  });
  if(G && Number.isFinite(G.turns)) updateHud();
  refreshMatrixRain();
}

function hideAnimatedScreen(id){
  const screen=$(id);
  if(!screen) return;
  screen.classList.remove('show');
  setTimeout(()=>{
    if(!screen.classList.contains('show')) screen.style.display='none';
  },180);
}

function resetBattleState(){
  stopBattleTimer();
  Object.assign(battle, {
    active:false, mode:null, daemonId:null, daemonType:null, keyCarrier:false,
    puzzle:null, timer:null, hintStep:0, hintRevealedIndices:[], timeLeft:0, boss:null, practice:null
  });
}

function resetFlowState(){
  Object.assign(explainState, {active:false, pendingGameOver:false});
  Object.assign(pauseState, {active:false, prevInputLocked:false, resumeBattleTimer:false});
  Object.assign(roomBriefState, {active:false, room:null, onContinue:null});
}

function hideEncounterScreen(){
  hideAnimatedScreen('engage-screen');
}

function hideStatusBeat(){
  hideAnimatedScreen('status-beat');
}

function hideRoomTravel(){
  clearTimeout(FX.travelTimer);
  FX.travelTimer=null;
  FX.travelActive=false;
  hideAnimatedScreen('room-travel');
}

function hideRoomBrief(clearCallback=true){
  roomBriefState.active=false;
  roomBriefState.room=null;
  if(clearCallback) roomBriefState.onContinue=null;
  setDisplay('s-room-brief','none');
}

function resetSceneFx(){
  clearTimeout(FX.engageTimer);
  clearTimeout(FX.beatTimer);
  clearTimeout(FX.travelTimer);
  clearTimeout(FX.logFlashTimer);
  FX.engageTimer=null;
  FX.beatTimer=null;
  FX.travelTimer=null;
  FX.logFlashTimer=null;
  FX.engageActive=false;
  FX.beatActive=false;
  FX.travelActive=false;
  FX.cameraKick=0;
  clearBossSceneState();
  hideEncounterScreen();
  hideStatusBeat();
  hideRoomTravel();
  const strip=$('log-strip');
  if(strip) strip.classList.remove('flash-ok','flash-gold');
}

function clearBossSceneState(){
  clearTimeout(bossSceneState.clashTimer);
  clearTimeout(bossSceneState.riseTimer);
  [bossSceneState.archon, bossSceneState.throne].forEach(obj=>{
    if(obj?.parent) obj.parent.remove(obj);
  });
  bossSceneState.active=false;
  bossSceneState.introActive=false;
  bossSceneState.archon=null;
  bossSceneState.throne=null;
  bossSceneState.stand=0;
  bossSceneState.targetStand=0;
  bossSceneState.cameraOverride=false;
  bossSceneState.cameraPos=null;
  bossSceneState.lookAt=null;
  bossSceneState.clashTimer=null;
  bossSceneState.riseTimer=null;
}

function getRoomTheme(room){
  if(G && G.mode===MODE_TUTORIAL) return TUTORIAL_THEME;
  return ROOM_THEMES[(Math.max(1, room) - 1) % ROOM_THEMES.length];
}

function isTutorialMode(){
  return !!(G && G.mode===MODE_TUTORIAL);
}

function getActiveRoomCount(){
  return isTutorialMode() ? 1 : ROOM_COUNT;
}

function formatRoomCounter(room){
  return `${String(room).padStart(2,'0')}/${String(getActiveRoomCount()).padStart(2,'0')}`;
}

function formatNodeCoord(x,z){
  return `${String(x).padStart(2,'0')},${String(z).padStart(2,'0')}`;
}

function clearRoomDecor(){
  roomDecor.forEach(obj=>scene.remove(obj));
  roomDecor = [];
  if(G){
    G.tutorialStations = [];
    G.tutorialExhibits = [];
    G.tutorialPrompt = null;
  }
}

function setTutorialChat(tag, title, body, anchor=null){
  const box=document.getElementById('tutorial-chat');
  if(!box) return;
  const tagEl=document.getElementById('tutorial-chat-tag');
  tagEl.textContent = tag || '';
  tagEl.style.display = tag ? 'block' : 'none';
  document.getElementById('tutorial-chat-title').textContent = title;
  document.getElementById('tutorial-chat-body').textContent = body;
  UI.tutorialChatAnchor = anchor;
  box.style.display='block';
  positionTutorialChat();
}

function hideTutorialChat(){
  const box=document.getElementById('tutorial-chat');
  UI.tutorialChatAnchor = null;
  if(box) box.style.display='none';
}

function getTutorialChatAnchorWorld(){
  const anchor=UI.tutorialChatAnchor;
  if(!anchor) return null;
  if(anchor.kind==='object' && anchor.object){
    const pos=new THREE.Vector3();
    anchor.object.getWorldPosition(pos);
    pos.y += anchor.offsetY || 0;
    return pos;
  }
  if(anchor.kind==='world' && anchor.position){
    return anchor.position.clone();
  }
  return null;
}

function positionTutorialChat(){
  const box=document.getElementById('tutorial-chat');
  if(!box || !camera || !renderer || !UI.tutorialChatAnchor) return;
  const worldPos=getTutorialChatAnchorWorld();
  if(!worldPos){
    box.style.display='none';
    return;
  }
  const projected=worldPos.clone().project(camera);
  if(projected.z < -1 || projected.z > 1){
    box.style.display='none';
    return;
  }
  const rect=renderer.domElement.getBoundingClientRect();
  const x=rect.left + ((projected.x + 1) * 0.5 * rect.width);
  const y=rect.top + ((-projected.y + 1) * 0.5 * rect.height) - 18;
  const margin=18;
  const width=Math.min(box.offsetWidth || 320, rect.width - (margin*2));
  const clampedX=Math.max(rect.left + margin + (width/2), Math.min(rect.right - margin - (width/2), x));
  const clampedY=Math.max(rect.top + 78, Math.min(rect.bottom - 24, y));
  box.style.display='block';
  box.style.left=`${clampedX}px`;
  box.style.top=`${clampedY}px`;
}

function getNearbyTutorialExhibit(){
  if(!isTutorialMode() || !G?.tutorialExhibits?.length) return null;
  const heroPos=gToW(G.hero.x,G.hero.z);
  return G.tutorialExhibits.find(exhibit=>{
    const pos=exhibit.group?.position;
    if(!pos) return false;
    return Math.hypot(heroPos.x-pos.x, heroPos.z-pos.z) <= 2.15;
  }) || null;
}

function updateTutorialChat(){
  if(
    !isTutorialMode() ||
    document.getElementById('hud').style.display!=='flex' ||
    battle.active ||
    explainState.active ||
    pauseState.active ||
    roomBriefState.active ||
    FX.travelActive ||
    document.getElementById('s-tutorial-exit').style.display==='flex'
  ){
    hideTutorialChat();
    return;
  }

  if(G?.tutorialPrompt?.type==='station'){
    const station=getTutorialStationById(G.tutorialPrompt.stationId);
    if(station){
      const copy=getTutorialStationCopy(station, true);
      setTutorialChat(
        copy.tag,
        copy.title,
        copy.body,
        {kind:'object', object:station.group, offsetY:1.62}
      );
      return;
    }
  }

  if(G?.tutorialPrompt?.type==='exit'){
    const exitNode = G.nodes.find(n=>n.x===8 && n.z===0);
    setTutorialChat(
      textFor('tutorialExitNodeTag'),
      textFor('tutorialExitNodeTitle'),
      textFor('tutorialExitNodeBody'),
      exitNode?.mesh ? {kind:'object', object:exitNode.mesh, offsetY:1.05} : {kind:'world', position:new THREE.Vector3(gToW(8,0).x,1.05,gToW(8,0).z)}
    );
    return;
  }

  const nearbyStation=getNearbyTutorialStation();
  if(nearbyStation){
    const copy=getTutorialStationCopy(nearbyStation, false);
    setTutorialChat(
      copy.tag,
      copy.title,
      copy.body,
      {kind:'object', object:nearbyStation.group, offsetY:1.62}
    );
    return;
  }

  const exhibit=getNearbyTutorialExhibit();
  if(exhibit){
    setTutorialChat(
      exhibit.tag || textFor('daemonBrief'),
      exhibit.title,
      exhibit.body,
      {kind:'object', object:exhibit.group, offsetY:1.7}
    );
    return;
  }
  hideTutorialChat();
}

function closeTutorialExitMenu(restoreControl=true){
  const modal=document.getElementById('s-tutorial-exit');
  if(modal) modal.style.display='none';
  if(restoreControl && G){
    G.inputLocked=false;
  }
}

function openTutorialExitMenu(){
  if(!isTutorialMode()) return;
  if(G) G.inputLocked=true;
  document.getElementById('s-tutorial-exit').style.display='flex';
}

function resumePauseMenu(){
  if(!pauseState.active) return;
  pauseState.active=false;
  setDisplay('s-pause','none');
  if(G) G.inputLocked = pauseState.prevInputLocked;
  if(pauseState.resumeBattleTimer && battle.active){
    startBattleTimer();
    updateBattleTimerDisplay();
  }
  pauseState.resumeBattleTimer=false;
  const input=$('battle-input');
  if(battle.active && input) input.focus();
}

function togglePauseMenu(){
  if(!isFlexVisible('hud')) return;
  if(explainState.active || FX.engageActive || FX.beatActive || FX.travelActive || roomBriefState.active || isFlexVisible('s-tutorial-exit')) return;
  if(pauseState.active){
    resumePauseMenu();
    return;
  }
  pauseState.active=true;
  pauseState.prevInputLocked=!!G?.inputLocked;
  pauseState.resumeBattleTimer=!!battle.timer;
  if(pauseState.resumeBattleTimer) stopBattleTimer();
  if(G) G.inputLocked=true;
  setDisplay('s-pause','flex');
}

function returnToMainMenu(){
  if(G){
    G.inputLocked=false;
    G.roomClearing=false;
  }
  resetBattleState();
  resetFlowState();
  resetSceneFx();
  hideDisplays(ACTIVE_RUN_SCREENS);
  setDisplay('hud','none');
  hideTutorialChat();
  applyLanguage();
  setDisplay('s-title','flex');
  refreshMatrixRain();
}

function quitToMainMenu(){
  returnToMainMenu();
}

function startGameFromTutorialExit(){
  closeTutorialExitMenu(false);
  startGame();
}

function applyRoomTheme(theme){
  currentTheme = theme || ROOM_THEMES[0];
  if(!scene) return;
  scene.background = new THREE.Color(currentTheme.bg);
  scene.fog = new THREE.FogExp2(currentTheme.fog, currentTheme.fogDensity);
  if(sceneLights.ambient){
    sceneLights.ambient.color.setHex(currentTheme.ambient);
    sceneLights.ambient.intensity = currentTheme.ambientIntensity;
  }
  if(sceneLights.sun){
    sceneLights.sun.color.setHex(currentTheme.sun);
    sceneLights.sun.intensity = currentTheme.sunIntensity;
  }
  if(sceneLights.rim){
    sceneLights.rim.color.setHex(currentTheme.rim);
    sceneLights.rim.intensity = currentTheme.rimIntensity;
  }
  if(sceneLights.fill){
    sceneLights.fill.color.setHex(currentTheme.fillSky);
    sceneLights.fill.groundColor.setHex(currentTheme.fillGround);
    sceneLights.fill.intensity = currentTheme.fillIntensity;
  }
  applySceneModeAdjustments();
}

function applySceneModeAdjustments(){
  if(!scene || !currentTheme) return;
  if(isTutorialMode()) return;
  if(G?.extractionActive){
    sceneLights.rim?.color.setHex(0xffc040);
    if(sceneLights.rim) sceneLights.rim.intensity = currentTheme.rimIntensity + 0.26;
    if(sceneLights.sun) sceneLights.sun.intensity = currentTheme.sunIntensity + 0.12;
    if(sceneLights.fill) sceneLights.fill.intensity = currentTheme.fillIntensity + 0.08;
  }
}

function activateExtractionState(){
  if(isTutorialMode()) return;
  G.extractionActive=true;
  applyRoomTheme(currentTheme);
  pulseLog('gold');
}

function triggerRoomTransmission(room){
  if(isTutorialMode()) return;
  const msg = getRoomTransmission(room);
  if(!msg) return;
  G.inputLocked=true;
  triggerStatusBeat(
    isEnglish() ? `Sector ${String(room).padStart(2,'0')} transmission` : `إرسال القطاع ${String(room).padStart(2,'0')}`,
    msg,
    'gold',
    520,
    ()=>{
      G.inputLocked=false;
    }
  );
}

function addDecorBlock(group, w, h, d, color, emissive, emissiveIntensity, x, y, z, rotY=0){
  const mesh = V(w,h,d,color,emissive,emissiveIntensity);
  mesh.position.set(x,y,z);
  mesh.rotation.y = rotY;
  group.add(mesh);
  return mesh;
}

function addDecorOrb(group, radius, color, emissive, emissiveIntensity, x, y, z){
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 16, 12),
    new THREE.MeshLambertMaterial({color, emissive, emissiveIntensity})
  );
  orb.position.set(x,y,z);
  group.add(orb);
  return orb;
}

function addDecorLight(group, color, intensity, distance, x, y, z){
  const light = new THREE.PointLight(color, intensity, distance);
  light.position.set(x,y,z);
  group.add(light);
  return light;
}

function addDecorBeam(group, from, to, thickness, color, emissive=0, emissiveIntensity=0){
  const delta = new THREE.Vector3(to.x-from.x, to.y-from.y, to.z-from.z);
  const length = Math.max(0.001, delta.length());
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, thickness, length),
    new THREE.MeshLambertMaterial({color, emissive, emissiveIntensity})
  );
  beam.position.set(
    (from.x + to.x) * 0.5,
    (from.y + to.y) * 0.5,
    (from.z + to.z) * 0.5
  );
  beam.quaternion.setFromUnitVectors(
    new THREE.Vector3(0,0,1),
    delta.normalize()
  );
  group.add(beam);
  return beam;
}

function buildTutorialRoomDecor(theme, anchors, makeGroup){
  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    addDecorBlock(g,0.18,1.25,0.18,0x18354a,theme.accent,0.14,0,0.62,0);
    addDecorBlock(g,0.56,0.08,0.22,theme.accent2,theme.accent,0.22,0,1.08,0);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.24,0.32,18),
      new THREE.MeshBasicMaterial({color:theme.accent, side:THREE.DoubleSide, transparent:true, opacity:0.82})
    );
    ring.rotation.x=-Math.PI/2;
    ring.position.y=0.08;
    g.add(ring);
    g.rotation.y = idx % 2 === 0 ? Math.PI/5 : -Math.PI/5;
  });
  const exhibits = isEnglish()
    ? TUTORIAL_DAEMON_EXHIBITS.map((exhibit, idx)=>({...exhibit, ...(TUTORIAL_DAEMON_EXHIBITS_EN[idx] || {})}))
    : TUTORIAL_DAEMON_EXHIBITS;
  G.tutorialExhibits = exhibits.map(exhibit=>({
    ...exhibit,
    group:addTutorialDaemonExhibit(exhibit, theme)
  }));
  G.tutorialStations = TUTORIAL_PRACTICE_STATIONS.map(station=>({
    ...station,
    group:addTutorialPracticePad(station, theme)
  }));
  updateTutorialPracticeVisuals();
}

function buildCaesarSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildDial = (group, scale, detailed=false)=>{
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32*scale,0.42*scale,0.16*scale,20),
      new THREE.MeshLambertMaterial({color:0x0c1a25, emissive:theme.accent, emissiveIntensity:0.08})
    );
    base.position.y=0.08*scale;
    group.add(base);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(0.34*scale,0.03*scale,10,42),
      new THREE.MeshBasicMaterial({color:theme.accent, transparent:true, opacity:0.9})
    );
    ringA.rotation.x=Math.PI/2;
    ringA.position.y=0.22*scale;
    group.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(0.2*scale,0.024*scale,10,32),
      new THREE.MeshBasicMaterial({color:theme.accent2, transparent:true, opacity:0.92})
    );
    ringB.rotation.x=Math.PI/2;
    ringB.position.set(0.12*scale,0.4*scale,0);
    group.add(ringB);

    const core = addDecorOrb(group, 0.05*scale, theme.accent2, theme.accent2, 1, 0, 0.4*scale, 0);
    const light = addDecorLight(group, theme.accent, 0.72, 2.8*scale, 0, 0.48*scale, 0);

    if(detailed){
      for(let i=0;i<8;i++){
        const angle=(i/8)*Math.PI*2;
        const tick=V(0.045*scale,0.14*scale,0.045*scale,theme.accent2,theme.accent2,0.45);
        tick.position.set(Math.cos(angle)*0.34*scale,0.24*scale,Math.sin(angle)*0.34*scale);
        tick.rotation.y=angle;
        group.add(tick);
      }
    }

    group.userData.decorMotion = {
      type:'caesar',
      ringA,
      ringB,
      core,
      light,
      ringBX:0.12*scale,
      coreY:0.4*scale,
      ringOffsetAmp:0.04*scale,
      coreBobAmp:0.05*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildDial(hero, 1.16, true);
  hero.rotation.y = -0.42;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildDial(g, idx>=4 ? 0.72 : 0.64, false);
    g.rotation.y = idx * 0.58;
  });
}

function buildReverseSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildMirror = (group, scale)=>{
    addDecorBlock(group,0.82*scale,0.1*scale,0.28*scale,0x13200f,theme.accent,0.08,0,0.05*scale,0);
    const left = V(0.16*scale,0.92*scale,0.18*scale,0x1b2813,theme.accent,0.12);
    left.position.set(-0.3*scale,0.48*scale,0.16*scale);
    left.rotation.z = 0.24;
    group.add(left);

    const right = V(0.16*scale,0.92*scale,0.18*scale,0x1b2813,theme.accent,0.12);
    right.position.set(0.3*scale,0.48*scale,-0.16*scale);
    right.rotation.z = -0.24;
    group.add(right);

    const laneA = addDecorBlock(group,0.34*scale,0.05*scale,0.08*scale,theme.accent2,theme.accent,0.2,-0.14*scale,0.22*scale,-0.08*scale,0.48);
    const laneB = addDecorBlock(group,0.34*scale,0.05*scale,0.08*scale,theme.accent2,theme.accent,0.2,0.14*scale,0.22*scale,0.08*scale,-0.48);
    const core = addDecorBlock(group,0.12*scale,0.12*scale,0.2*scale,theme.accent,theme.accent,0.58,0,0.6*scale,0);
    const light = addDecorLight(group, theme.accent2, 0.62, 2.6*scale, 0, 0.72*scale, 0);

    group.userData.decorMotion = {
      type:'reverse',
      left,
      right,
      laneA,
      laneB,
      core,
      light,
      baseTilt:0.24,
      coreY:0.6*scale,
      coreBobAmp:0.05*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildMirror(hero, 1.08);
  hero.rotation.y = -0.55;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildMirror(g, idx>=4 ? 0.7 : 0.62);
    g.rotation.y = idx % 2 === 0 ? 0.42 : -0.42;
  });
}

function buildAtbashSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildPair = (group, scale)=>{
    addDecorBlock(group,0.9*scale,0.08*scale,0.2*scale,0x160b0d,theme.accent,0.08,0,0.04*scale,0);
    addDecorBlock(group,0.72*scale,0.04*scale,0.04*scale,0x1e1012,theme.accent,0.06,0,0.12*scale,0);

    const left = V(0.12*scale,0.98*scale,0.12*scale,0x2b1612,theme.accent,0.16);
    left.position.set(-0.34*scale,0.5*scale,0);
    group.add(left);

    const right = V(0.12*scale,0.98*scale,0.12*scale,0x2b1612,theme.accent,0.16);
    right.position.set(0.34*scale,0.5*scale,0);
    group.add(right);

    const beam = addDecorBlock(group,0.7*scale,0.06*scale,0.1*scale,theme.accent2,theme.accent,0.24,0,0.96*scale,0);
    const leftOrb = addDecorOrb(group, 0.06*scale, theme.accent2, theme.accent2, 1, -0.34*scale, 1.12*scale, 0);
    const rightOrb = addDecorOrb(group, 0.06*scale, theme.accent2, theme.accent2, 1, 0.34*scale, 1.12*scale, 0);
    const leftLight = addDecorLight(group, theme.accent, 0.55, 2.2*scale, -0.34*scale, 0.86*scale, 0);
    const rightLight = addDecorLight(group, theme.accent, 0.55, 2.2*scale, 0.34*scale, 0.86*scale, 0);

    group.userData.decorMotion = {
      type:'atbash',
      beam,
      leftOrb,
      rightOrb,
      leftLight,
      rightLight,
      orbY:1.12*scale,
      orbBobAmp:0.04*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildPair(hero, 1.05);
  hero.rotation.y = -0.34;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildPair(g, idx>=4 ? 0.68 : 0.58);
    g.rotation.y = idx * 0.5;
  });
}

function buildRailFenceSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildRail = (group, scale)=>{
    addDecorBlock(group,0.9*scale,0.08*scale,0.22*scale,0x0b1821,theme.accent,0.08,0,0.04*scale,0);
    const points = [
      {x:-0.46*scale,y:0.34*scale,z:-0.06*scale},
      {x:-0.16*scale,y:0.78*scale,z:0.08*scale},
      {x:0.16*scale,y:0.34*scale,z:-0.04*scale},
      {x:0.46*scale,y:0.78*scale,z:0.1*scale}
    ];

    const nodes = points.map((pt, idx)=>{
      const post = V(0.08*scale, pt.y, 0.08*scale, 0x102535, theme.accent, 0.12);
      post.position.set(pt.x, pt.y*0.5, pt.z);
      group.add(post);
      return addDecorOrb(
        group,
        0.055*scale,
        idx % 2 === 0 ? theme.accent : theme.accent2,
        idx % 2 === 0 ? theme.accent : theme.accent2,
        0.95,
        pt.x, pt.y, pt.z
      );
    });

    const rails = [
      addDecorBeam(group, points[0], points[1], 0.05*scale, theme.accent2, theme.accent, 0.18),
      addDecorBeam(group, points[1], points[2], 0.05*scale, theme.accent, theme.accent, 0.18),
      addDecorBeam(group, points[2], points[3], 0.05*scale, theme.accent2, theme.accent, 0.18)
    ];
    const light = addDecorLight(group, theme.accent2, 0.62, 2.6*scale, 0.16*scale, 0.78*scale, 0);

    group.userData.decorMotion = {
      type:'railfence',
      nodes,
      rails,
      light,
      baseYs:points.map(pt=>pt.y),
      nodeBobAmp:0.03*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildRail(hero, 1.02);
  hero.rotation.y = -0.52;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildRail(g, idx>=4 ? 0.68 : 0.58);
    g.rotation.y = idx % 2 === 0 ? 0.3 : -0.3;
  });
}

function buildScytaleSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildSpindle = (group, scale)=>{
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3*scale,0.36*scale,0.14*scale,18),
      new THREE.MeshLambertMaterial({color:0x1c1309, emissive:theme.accent2, emissiveIntensity:0.08})
    );
    base.position.y=0.07*scale;
    group.add(base);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18*scale,0.22*scale,1.18*scale,18),
      new THREE.MeshLambertMaterial({color:0x2b1b0b, emissive:theme.accent, emissiveIntensity:0.12})
    );
    core.position.y=0.64*scale;
    group.add(core);

    const bands = [];
    const straps = [];
    [0.26,0.5,0.74,0.98].forEach((y, idx)=>{
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.24*scale,0.02*scale,10,34),
        new THREE.MeshBasicMaterial({color:idx % 2 === 0 ? theme.accent : theme.accent2, transparent:true, opacity:0.84})
      );
      ring.rotation.x = Math.PI/2;
      ring.position.y = y*scale;
      group.add(ring);
      bands.push(ring);

      const angle = 0.55 + (idx * 0.72);
      const strap = V(0.34*scale,0.05*scale,0.06*scale,theme.accent2,theme.accent2,0.42);
      strap.position.set(Math.cos(angle)*0.14*scale, y*scale, Math.sin(angle)*0.14*scale);
      strap.rotation.y = angle;
      strap.rotation.x = 0.52;
      group.add(strap);
      straps.push(strap);
    });

    const tip = addDecorOrb(group, 0.06*scale, theme.accent, theme.accent, 0.95, 0, 1.28*scale, 0);
    const light = addDecorLight(group, theme.accent2, 0.68, 2.8*scale, 0, 0.82*scale, 0);

    group.userData.decorMotion = {
      type:'scytale',
      core,
      bands,
      straps,
      tip,
      light,
      tipY:1.28*scale,
      bandSwayAmp:0.03*scale,
      tipBobAmp:0.05*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildSpindle(hero, 1.08);
  hero.rotation.y = -0.48;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildSpindle(g, idx>=4 ? 0.7 : 0.62);
    g.rotation.y = idx * 0.44;
  });
}

function buildColumnarSignatureDecor(theme, anchors, heroPos, makeGroup){
  const buildStacks = (group, scale, heights, xOffsets)=>{
    addDecorBlock(group,0.98*scale,0.08*scale,0.24*scale,0x18080c,theme.accent,0.08,0,0.04*scale,0);
    const columns = [];
    const caps = [];

    heights.forEach((height, idx)=>{
      const x=xOffsets[idx]*scale;
      const column = V(0.16*scale,height*scale,0.16*scale,0x29121a,theme.accent,0.14);
      column.position.set(x,(height*scale)*0.5,0);
      group.add(column);
      columns.push(column);

      const cap = V(0.22*scale,0.06*scale,0.22*scale,idx % 2 === 0 ? theme.accent2 : theme.accent,theme.accent,0.45);
      cap.position.set(x,height*scale + 0.04*scale,0);
      group.add(cap);
      caps.push(cap);
    });

    const light = addDecorLight(group, theme.accent2, 0.64, 2.6*scale, 0.16*scale, Math.max(...heights)*scale, 0);
    group.userData.decorMotion = {
      type:'columnar',
      columns,
      caps,
      light,
      capLift:0.04*scale,
      capBobAmp:0.04*scale,
      phase:Math.random()*Math.PI*2
    };
  };

  const hero=makeGroup(heroPos.x, heroPos.z);
  buildStacks(hero, 1.02, [1.12,0.66,1.42,0.88], [-0.42,-0.12,0.18,0.48]);
  hero.rotation.y = -0.4;

  anchors.forEach((pos, idx)=>{
    const g=makeGroup(pos.x,pos.z);
    buildStacks(g, idx>=4 ? 0.72 : 0.62, [0.72,0.44,0.92], [-0.22,0.04,0.28]);
    g.rotation.y = idx * 0.36;
  });
}

function buildCipherSignatureDecor(theme, puzzle, anchors, heroPos, makeGroup){
  switch(puzzle?.cipherType){
    case 'caesar':
      buildCaesarSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    case 'reverse':
      buildReverseSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    case 'atbash':
      buildAtbashSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    case 'railfence':
      buildRailFenceSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    case 'scytale':
      buildScytaleSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    case 'columnar':
      buildColumnarSignatureDecor(theme, anchors, heroPos, makeGroup);
      return;
    default:
      buildCaesarSignatureDecor(theme, anchors, heroPos, makeGroup);
  }
}

function buildCipherRow(text){
  return (text || '').split('').map((ch, idx)=>{
    const cls = idx % 2 === 0 ? 'odd' : 'even';
    return `<span class="ct-cell ${cls}">${ch}</span>`;
  }).join('');
}

function getDaemonProfile(dm){
  return DAEMON_PERSONALITIES[dm?.personality] || DAEMON_PERSONALITIES.default;
}

function localizeRoomPuzzle(base, roomIdx){
  if(!isEnglish()) return base;
  return {...base, ...(ROOM_PUZZLES_EN[roomIdx] || {})};
}

function getTutorialPuzzle(){
  return isEnglish() ? {...TUTORIAL_PUZZLE, ...TUTORIAL_PUZZLE_EN} : TUTORIAL_PUZZLE;
}

function getRoomPuzzle(roomIdx){
  if(isTutorialMode()) return getTutorialPuzzle();
  return localizeRoomPuzzle(ROOM_PUZZLES[roomIdx] || ROOM_PUZZLES[0], roomIdx);
}

function getRoomStoryBeat(room){
  return isTutorialMode()
    ? (isEnglish() ? TUTORIAL_STORY_BEAT_EN : TUTORIAL_STORY_BEAT)
    : (isEnglish()
      ? (ROOM_STORY_BEATS_EN[room-1] || 'Keep moving through the matrix and find the keyholder.')
      : (ROOM_STORY_BEATS[room-1] || 'استمر في التقدم داخل المصفوفة وابحث عن حامل المفتاح.'));
}

function getRoomPatrols(room){
  return isTutorialMode() ? [] : (ROOM_PATROLS[room-1] || []);
}

function getRoomTransmission(room){
  return ROOM_TRANSMISSIONS[(Math.max(1, room) - 1) % ROOM_TRANSMISSIONS.length];
}

function getRoomDebrief(room){
  const notes = isEnglish() ? ROOM_DEBRIEF_NOTES_EN : ROOM_DEBRIEF_NOTES;
  return notes[(Math.max(1, room) - 1) % notes.length];
}

function getKeyholderCallsign(room){
  return isEnglish() ? KEYHOLDER_CALLSIGN_EN : KEYHOLDER_CALLSIGN;
}

function getRoomDebriefHeadline(room, base){
  if(isEnglish()) return ROOM_DEBRIEF_HEADLINES_EN[room-1] || base?.brief || fillText('roomBriefFallback',{room});
  const custom = [
    'فك شفرة قيصر للهروب من الغرفة الاولى',
    'اعكس ترتيب الحروف للهروب من الغرفة الثانية',
    'استخدم أتباش لكشف دليل كلمات المرور والهروب من الغرفة الثالثة',
    'فك النمط المتشابك للهروب من الغرفة الرابعة',
    'أعد لف النص لاستعادة كلمة الصلاحيات والهروب من الغرفة الخامسة',
    'رتب الأعمدة بشكل صحيح للهروب من الغرفة السادسة'
  ];
  return custom[room-1] || base?.brief || `تابع المهمة للهروب من الغرفة ${room}`;
}

function getRoomGameplayContext(room, base){
  if(isEnglish()) return ROOM_GAMEPLAY_CONTEXT_EN[room-1] || base?.guide || '';
  const custom = [
    'شفرة قيصر تعتمد على ازاحة الحروف الابجدية للخلف بناء على المفتاح المعطى',
    'Reverse يعتمد على قراءة الحروف من النهاية الى البداية حتى تستعيد الكلمة الصحيحة',
    'Atbash يعتمد على عكس الحروف الابجدية بحيث يقابل الحرف الاول الحرف الاخير والثاني ما قبله وهكذا',
    'Rail Fence يعتمد على توزيع الحروف بين سطرين بالتناوب ثم اعادة جمعها بالترتيب الصحيح',
    'Scytale يعتمد على ترتيب الحروف داخل ثلاثة اعمدة ثم قراءة الصفوف حتى تستعيد الكلمة',
    'Columnar يعتمد على اعادة الاعمدة المخلوطة الى ترتيبها الصحيح ثم قراءة الصفوف لاستعادة النص'
  ];
  return custom[room-1] || base?.guide || '';
}

function buildRoomBriefGrid(base, room){
  const cards = [
    `<div class="room-brief-block"><div class="hlabel">${textFor('roomBriefMethod')}</div><div class="room-brief-value">${base.methodLabel || base.domain}</div></div>`,
    `<div class="room-brief-block"><div class="hlabel">${textFor('roomBriefPlay')}</div><div class="room-brief-text">${textFor('roomBriefPlayText')}</div></div>`,
    `<div class="room-brief-block"><div class="hlabel">${textFor('roomBriefGameContext')}</div><div class="room-brief-text">${getRoomGameplayContext(room, base)}</div></div>`,
    `<div class="room-brief-block"><div class="hlabel">${textFor('roomBriefSecurity')}</div><div class="room-brief-text"><strong>${base.domain || ''}</strong><br>${base.concept || ''}</div></div>`
  ];
  return cards.join('');
}

function hexToCss(hex){
  return `#${(hex || 0).toString(16).padStart(6,'0')}`;
}

function hexToRgba(hex, alpha=1){
  const safe=hex || 0;
  const r=(safe>>16)&255;
  const g=(safe>>8)&255;
  const b=safe&255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function setMatrixRainColor(canvasId, color){
  const state=matrixRainStates.find(entry=>entry.id===canvasId);
  if(state) state.color=color;
}

function showRoomTravel(room, cb=null, options={}){
  if(isTutorialMode()) return cb && cb();
  const base=getRoomPuzzle(room-1);
  const theme=getRoomTheme(room);
  const screen=document.getElementById('room-travel');
  if(!screen) return cb && cb();
  const copy=screen.querySelector('.travel-copy');
  const kicker=document.getElementById('travel-kicker');
  const title=document.getElementById('travel-title');
  const sub=document.getElementById('travel-sub');
  const accent=hexToCss(theme.accent || theme.particle || 0x00ff88);
  const accent2=hexToCss(theme.accent2 || theme.goalEm || theme.accent || 0xffc040);
  const glow=hexToRgba(theme.accent || theme.particle || 0x00ff88,0.14);
  const border=hexToRgba(theme.accent || theme.particle || 0x00ff88,0.24);
  const deep=hexToRgba(theme.bg || 0x020609,0.92);
  const cardBg=`linear-gradient(180deg, ${hexToRgba(theme.bg || 0x020609,0.5)}, ${hexToRgba(theme.bg || 0x020609,0.78)})`;
  G.inputLocked=true;
  FX.travelActive=true;
  kicker.textContent = options.kicker || `SECTOR ${String(room).padStart(2,'0')}`;
  title.textContent = options.title || (isEnglish() ? `Moving to ${base.roomTitle}` : `الانتقال إلى ${base.roomTitle}`);
  sub.textContent = options.sub || (isEnglish()
    ? `Routes are being reshaped. The next sector carries the signature of ${base.methodLabel || base.domain}.`
    : `تُعاد صياغة المسارات الآن. القطاع القادم يحمل بصمة ${base.methodLabel || base.domain}.`);
  kicker.style.color = accent2;
  title.style.color = accent;
  sub.style.color = hexToRgba(theme.accent2 || theme.particle || theme.accent || 0x9dd7e6,0.88);
  if(copy){
    copy.style.borderColor = border;
    copy.style.background = cardBg;
    copy.style.boxShadow = `0 18px 42px rgba(0,0,0,0.35), 0 0 34px ${glow}`;
  }
  screen.style.background = `radial-gradient(circle at center, ${hexToRgba(theme.accent || theme.particle || 0x00ff88,0.18)}, ${deep} 42%, rgba(2,6,9,0.98))`;
  setMatrixRainColor('travel-rain', accent);
  screen.style.display='flex';
  refreshMatrixRain();
  screen.offsetWidth;
  screen.classList.add('show');
  playUiTone(392,100,{type:'triangle',gain:0.026});
  playUiTone(587,180,{type:'sine',gain:0.02});
  clearTimeout(FX.travelTimer);
  FX.travelTimer=setTimeout(()=>{
    hideRoomTravel();
    if(cb) cb();
  },ROOM_TRAVEL_MS);
}

function showRoomBrief(room, onContinue=null){
  if(isTutorialMode()) return;
  const base=getRoomPuzzle(room-1);
  const headline = getRoomDebriefHeadline(room, base);
  G.inputLocked=true;
  roomBriefState.active=true;
  roomBriefState.room=room;
  roomBriefState.onContinue=onContinue;
  document.getElementById('room-brief-kicker').textContent = textFor('roomBriefKicker');
  document.getElementById('room-brief-title').textContent = headline;
  document.getElementById('room-brief-copy').textContent = '';
  document.getElementById('room-brief-copy').style.display = 'none';
  document.getElementById('room-brief-grid').innerHTML = buildRoomBriefGrid(base, room);
  document.getElementById('room-brief-btn').textContent = room===1 ? textFor('roomBriefStart') : textFor('roomBriefContinue');
  document.getElementById('s-room-brief').style.display='flex';
}

function continueRoomBrief(){
  const cb=roomBriefState.onContinue;
  hideRoomBrief();
  if(cb){
    cb();
    return;
  }
  if(G) G.inputLocked=false;
}

function beginRoomArrival(room, options={}){
  if(isTutorialMode()) return;
  const afterBrief = ()=>{
    showRoomBrief(room, ()=>{
      if(G) G.inputLocked=false;
      showPuzzlePanel();
    });
  };
  if(options.travel) showRoomTravel(room, afterBrief);
  else afterBrief();
}

function getTutorialStationList(){
  return (G?.tutorialStations?.length ? G.tutorialStations : TUTORIAL_PRACTICE_STATIONS) || [];
}

function getTutorialStationById(id){
  return getTutorialStationList().find(st=>st.id===id) || null;
}

function getTutorialStationAt(x,z){
  return getTutorialStationList().find(st=>st.x===x && st.z===z) || null;
}

function getNearbyTutorialStation(radius=1.8){
  if(!isTutorialMode() || !G?.tutorialStations?.length) return null;
  const heroPos=gToW(G.hero.x,G.hero.z);
  let nearest=null;
  let best=Infinity;
  G.tutorialStations.forEach(station=>{
    const pos=station.group?.position;
    if(!pos) return;
    const dist=Math.hypot(heroPos.x-pos.x, heroPos.z-pos.z);
    if(dist<=radius && dist<best){
      best=dist;
      nearest=station;
    }
  });
  return nearest;
}

function getTutorialStationCopy(station, interactive=false){
  const puzzle=localizeRoomPuzzle(ROOM_PUZZLES[station?.roomIdx] || ROOM_PUZZLES[0], station?.roomIdx || 0);
  if(isEnglish()){
    const actionCopy = interactive
      ? 'Walk up to the symbol and press E or Enter to start training with no damage or timer.'
      : 'Move closer to the symbol, then press E or Enter to open training.';
    switch(puzzle.cipherType){
      case 'caesar':
        return {tag:'', title:'CAESAR', body:`In Caesar cipher, every letter moves by a fixed number of steps in the alphabet. Once you know the shift, the whole word comes back cleanly. ${actionCopy}`};
      case 'reverse':
        return {tag:'', title:'REVERSE', body:`This is the simplest one: the letters are already correct, but the order is flipped. Read from the last letter to the first and the word appears. ${actionCopy}`};
      case 'atbash':
        return {tag:'', title:'ATBASH', body:`In Atbash, each letter has a fixed partner from the other side of the alphabet: A with Z, B with Y, and so on. ${actionCopy}`};
      case 'railfence':
        return {tag:'', title:'RAIL FENCE', body:`Here the letters do not change, but they split between two rails and are collected again. Trace the zigzag calmly and the original word returns. ${actionCopy}`};
      case 'scytale':
        return {tag:'', title:'SCYTALE', body:`Imagine the text placed in a three-column grid and read in a different direction. Put the letters back into columns first, then read the rows. ${actionCopy}`};
      case 'columnar':
        return {tag:'', title:'COLUMNAR', body:`In this type, the column chunks arrived in the wrong order. Return each chunk to its correct column, then read the rows normally. ${actionCopy}`};
      default:
        return {tag:'', title:station?.label || puzzle.methodLabel || 'Cipher', body:`This is a quick practice station for ${puzzle.methodLabel || 'the current cipher'}. ${actionCopy}`};
    }
  }
  const actionCopy = interactive
    ? 'اقترب من الرمز واضغط E أو Enter لبدء التدريب بلا ضرر أو مؤقت.'
    : 'اقترب أكثر من الرمز ثم اضغط E أو Enter لفتح التدريب.';

  switch(puzzle.cipherType){
    case 'caesar':
      return {
        tag:'',
        title:'CAESAR',
        body:`في شيفرة قيصر، كل حرف يتحرك بعدد ثابت من الخطوات داخل الأبجدية. إذا عرفت مقدار الإزاحة، سترجع الكلمة كاملة بسهولة. ${actionCopy}`
      };
    case 'reverse':
      return {
        tag:'',
        title:'REVERSE',
        body:`هذه أبسط واحدة: الحروف نفسها صحيحة، لكن ترتيبها مقلوب. اقرأ من آخر حرف إلى أول حرف وستظهر لك الكلمة فورًا. ${actionCopy}`
      };
    case 'atbash':
      return {
        tag:'',
        title:'ATBASH',
        body:`في أتباش، كل حرف له مقابل ثابت من الطرف الآخر في الأبجدية. فكر فيها كأزواج ثابتة: A مع Z، وB مع Y، وهكذا. ${actionCopy}`
      };
    case 'railfence':
      return {
        tag:'',
        title:'RAIL FENCE',
        body:`هنا الحروف لا تتبدل، لكنها تتوزع بين مسارين ثم تُجمع من جديد. إذا تتبعت النمط المتعرج بهدوء، سترى الكلمة الأصلية. ${actionCopy}`
      };
    case 'scytale':
      return {
        tag:'',
        title:'SCYTALE',
        body:`تخيل أن النص وُضع داخل شبكة من ثلاثة أعمدة ثم قُرئ بطريقة مختلفة. رتّب الحروف داخل الأعمدة أولًا، وبعدها اقرأ الصفوف لتستعيد الكلمة. ${actionCopy}`
      };
    case 'columnar':
      return {
        tag:'',
        title:'COLUMNAR',
        body:`في هذا النوع، الأعمدة نفسها خرجت بترتيب خاطئ. أعد كل كتلة إلى عمودها الصحيح، ثم اقرأ الصفوف بالترتيب الطبيعي. ${actionCopy}`
      };
    default:
      return {
        tag:'',
        title:station?.label || puzzle.methodLabel || 'شيفرة',
        body:`هذا تدريب سريع على ${puzzle.methodLabel || 'الشيفرة الحالية'}. ${actionCopy}`
      };
  }
}

function buildTutorialPracticeGlyph(station, theme, group){
  const glyph=new THREE.Group();
  glyph.position.y=0.3;
  group.add(glyph);

  switch(station.id){
    case 'caesar':{
      const outer=new THREE.Mesh(
        new THREE.TorusGeometry(0.18,0.018,10,28),
        new THREE.MeshBasicMaterial({color:theme.accent, transparent:true, opacity:0.9})
      );
      outer.rotation.x=Math.PI/2;
      outer.position.y=0.08;
      glyph.add(outer);

      const inner=new THREE.Mesh(
        new THREE.TorusGeometry(0.1,0.014,10,24),
        new THREE.MeshBasicMaterial({color:theme.accent2, transparent:true, opacity:0.92})
      );
      inner.rotation.x=Math.PI/2;
      inner.position.set(0.07,0.22,0);
      glyph.add(inner);

      const core=addDecorOrb(glyph,0.03,theme.accent2,theme.accent2,0.95,0,0.22,0);
      return {type:'caesar', outer, inner, core};
    }
    case 'reverse':{
      const left=V(0.06,0.32,0.06,0x16210f,theme.accent,0.14);
      left.position.set(-0.11,0.16,0.03);
      left.rotation.z=0.32;
      glyph.add(left);

      const right=V(0.06,0.32,0.06,0x16210f,theme.accent,0.14);
      right.position.set(0.11,0.16,-0.03);
      right.rotation.z=-0.32;
      glyph.add(right);

      const beam=addDecorBlock(glyph,0.3,0.04,0.06,theme.accent2,theme.accent,0.24,0,0.34,0);
      return {type:'reverse', left, right, beam};
    }
    case 'atbash':{
      const left=V(0.06,0.34,0.06,0x241115,theme.accent,0.14);
      left.position.set(-0.13,0.17,0);
      glyph.add(left);

      const right=V(0.06,0.34,0.06,0x241115,theme.accent,0.14);
      right.position.set(0.13,0.17,0);
      glyph.add(right);

      const bridge=addDecorBlock(glyph,0.32,0.04,0.05,theme.accent2,theme.accent,0.22,0,0.34,0);
      const leftOrb=addDecorOrb(glyph,0.03,theme.accent2,theme.accent2,1,-0.13,0.42,0);
      const rightOrb=addDecorOrb(glyph,0.03,theme.accent2,theme.accent2,1,0.13,0.42,0);
      return {type:'atbash', bridge, leftOrb, rightOrb};
    }
    case 'railfence':{
      const points=[
        {x:-0.18,y:0.12,z:-0.02},
        {x:-0.06,y:0.32,z:0.04},
        {x:0.06,y:0.12,z:-0.02},
        {x:0.18,y:0.32,z:0.04}
      ];
      const nodes=points.map((pt, idx)=>addDecorOrb(
        glyph,
        0.025,
        idx % 2 === 0 ? theme.accent : theme.accent2,
        idx % 2 === 0 ? theme.accent : theme.accent2,
        0.95,
        pt.x,pt.y,pt.z
      ));
      const rails=[
        addDecorBeam(glyph, points[0], points[1], 0.026, theme.accent2, theme.accent, 0.18),
        addDecorBeam(glyph, points[1], points[2], 0.026, theme.accent, theme.accent, 0.18),
        addDecorBeam(glyph, points[2], points[3], 0.026, theme.accent2, theme.accent, 0.18)
      ];
      return {type:'railfence', nodes, rails, baseYs:points.map(pt=>pt.y)};
    }
    case 'scytale':{
      const core=new THREE.Mesh(
        new THREE.CylinderGeometry(0.08,0.1,0.48,14),
        new THREE.MeshLambertMaterial({color:0x2b1b0b, emissive:theme.accent, emissiveIntensity:0.12})
      );
      core.position.y=0.24;
      glyph.add(core);

      const bandA=new THREE.Mesh(
        new THREE.TorusGeometry(0.11,0.012,8,24),
        new THREE.MeshBasicMaterial({color:theme.accent2, transparent:true, opacity:0.88})
      );
      bandA.rotation.x=Math.PI/2;
      bandA.position.y=0.16;
      glyph.add(bandA);

      const bandB=new THREE.Mesh(
        new THREE.TorusGeometry(0.11,0.012,8,24),
        new THREE.MeshBasicMaterial({color:theme.accent, transparent:true, opacity:0.88})
      );
      bandB.rotation.x=Math.PI/2;
      bandB.position.y=0.3;
      glyph.add(bandB);

      return {type:'scytale', core, bands:[bandA, bandB]};
    }
    case 'columnar':{
      const heights=[0.18,0.32,0.25];
      const xOffsets=[-0.12,0,0.12];
      const columns=heights.map((height, idx)=>{
        const column=V(0.06,height,0.06,0x29121a,theme.accent,0.14);
        column.position.set(xOffsets[idx],height*0.5,0);
        glyph.add(column);
        return column;
      });
      const caps=heights.map((height, idx)=>{
        const cap=V(0.085,0.035,0.085,idx % 2 === 0 ? theme.accent2 : theme.accent,theme.accent,0.32);
        cap.position.set(xOffsets[idx],height+0.025,0);
        glyph.add(cap);
        return cap;
      });
      return {type:'columnar', columns, caps};
    }
    default:
      return null;
  }
}

function addTutorialPracticePad(station, theme){
  const pos=gToW(station.x,station.z);
  const group=new THREE.Group();
  group.position.set(pos.x,0,pos.z);

  const baseMat=new THREE.MeshLambertMaterial({color:0x101a26, emissive:theme.accent, emissiveIntensity:0.12});
  const base=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.52,0.14,18),baseMat);
  base.position.y=0.08;
  group.add(base);

  const ringMat=new THREE.MeshBasicMaterial({color:theme.accent2, transparent:true, opacity:0.82});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(0.46,0.034,10,36),ringMat);
  ring.rotation.x=Math.PI/2;
  ring.position.y=0.16;
  group.add(ring);

  const beaconMat=new THREE.MeshBasicMaterial({color:theme.accent, transparent:true, opacity:0.4});
  const beacon=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.16,0.9,10,1,true),beaconMat);
  beacon.position.y=0.58;
  group.add(beacon);

  const glyph=buildTutorialPracticeGlyph(station, theme, group);

  group.userData.practicePad = {
    id:station.id,
    base,
    ring,
    beacon,
    glyph,
    phase:Math.random()*Math.PI*2
  };

  scene.add(group);
  roomDecor.push(group);
  return group;
}

function addTutorialDaemonExhibit(exhibit, theme){
  const pos=gToW(exhibit.pos.x,exhibit.pos.z);
  const pedestal=new THREE.Group();
  pedestal.position.set(pos.x,0,pos.z);
  const dais=V(0.9,0.18,0.9,0x121e2a,theme.accent,0.1);
  dais.position.y=0.09;
  pedestal.add(dais);
  const halo=new THREE.Mesh(
    new THREE.TorusGeometry(0.52,0.028,10,40),
    new THREE.MeshBasicMaterial({color:theme.accent2, transparent:true, opacity:0.65})
  );
  halo.rotation.x=Math.PI/2;
  halo.position.y=0.2;
  pedestal.add(halo);
  const model=buildDaemonMesh(exhibit.type);
  model.scale.setScalar(0.82);
  model.position.y=0.18;
  model.rotation.y=Math.PI + exhibit.rotY;
  pedestal.add(model);
  pedestal.userData.exhibitHalo=halo;
  pedestal.userData.exhibit=exhibit;
  scene.add(pedestal);
  roomDecor.push(pedestal);
  return pedestal;
}

function updateTutorialPracticeVisuals(){
  if(!isTutorialMode() || !G.tutorialStations) return;
  G.tutorialStations.forEach(station=>{
    const completed = !!G.practiceClears?.[station.id];
    if(!station.group?.userData?.practicePad) return;
    const pad=station.group.userData.practicePad;
    pad.base.material.emissiveIntensity = completed ? 0.28 : 0.12;
    pad.base.material.color.setHex(completed ? 0x16301d : 0x101a26);
    pad.ring.material.color.setHex(completed ? 0x00ff88 : currentTheme.accent2);
    pad.beacon.material.opacity = completed ? 0.64 : 0.4;
  });
}

function buildRoomDecor(theme){
  clearRoomDecor();
  if(!scene || !theme) return;

  const anchors = [
    gToW(-0.85,-0.65), gToW(8.85,-0.65),
    gToW(-0.85,8.65), gToW(8.85,8.65),
    gToW(4,-1.05), gToW(4,9.05)
  ];
  const heroPos = gToW(8.95,1.15);
  const makeGroup = (x,z)=>{
    const g = new THREE.Group();
    g.position.set(x,0,z);
    scene.add(g);
    roomDecor.push(g);
    return g;
  };

  if(theme.decor==='tutorial' || isTutorialMode()){
    buildTutorialRoomDecor(theme, anchors, makeGroup);
    return;
  }

  const puzzle = getRoomPuzzle(Math.max(0, (G?.layer || 1) - 1));
  buildCipherSignatureDecor(theme, puzzle, anchors, heroPos, makeGroup);
}

function pulseLog(mode='ok'){
  const strip=document.getElementById('log-strip');
  if(!strip) return;
  strip.classList.remove('flash-ok','flash-gold');
  strip.classList.add(mode==='gold' ? 'flash-gold' : 'flash-ok');
  clearTimeout(FX.logFlashTimer);
  FX.logFlashTimer=setTimeout(()=>{
    strip.classList.remove('flash-ok','flash-gold');
  },420);
}

function ensureAudioContext(){
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if(!AudioCtor) return null;
  if(!FX.audioCtx) FX.audioCtx = new AudioCtor();
  if(FX.audioCtx.state==='suspended') FX.audioCtx.resume().catch(()=>{});
  return FX.audioCtx;
}

function playUiTone(freq, durationMs=110, opts={}){
  const ctx=ensureAudioContext();
  if(!ctx) return;
  const osc=ctx.createOscillator();
  const gain=ctx.createGain();
  const start=ctx.currentTime;
  const end=start+(durationMs/1000);
  const peak=opts.gain ?? 0.03;
  osc.type=opts.type || 'triangle';
  osc.frequency.setValueAtTime(freq,start);
  if(opts.endFreq){
    osc.frequency.exponentialRampToValueAtTime(Math.max(45, opts.endFreq), end);
  }
  gain.gain.setValueAtTime(0.0001,start);
  gain.gain.exponentialRampToValueAtTime(peak,start+0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001,end);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(end+0.03);
}

function setCameraKick(amount){
  FX.cameraKick=Math.max(FX.cameraKick, amount);
}

function triggerEncounter(daemon){
  if(!daemon || battle.active || FX.engageActive || G?.roomClearing) return;
  const heroNode=G?.nodes?.find?.(n=>n.x===G.hero.x&&n.z===G.hero.z);
  if(!isTutorialMode() && G?.keyCollected && heroNode?.state===GOAL){
    roomClear();
    return;
  }
  FX.engageActive=true;
  G.inputLocked=true;
  setCameraKick(0.42);
  playUiTone(166,150,{type:'sawtooth',gain:0.045,endFreq:118});
  playUiTone(248,90,{type:'triangle',gain:0.026});

  const screen=document.getElementById('engage-screen');
  const card=document.getElementById('engage-card');
  const piece=document.getElementById('engage-piece');
  const tag=document.getElementById('engage-tag');
  const title=document.getElementById('engage-title');
  const sub=document.getElementById('engage-sub');
  const pieceLabel=daemon.type==='bishop' ? 'BISHOP' : 'ROOK';
  const isKey=!!daemon.hasKey;
  const keyName = daemon.callsign || getKeyholderCallsign(G.layer);

  card.classList.toggle('key', isKey);
  tag.textContent=isKey ? keyName : textFor('intercept');
  title.textContent=isKey ? fillText('keyPinned',{name:keyName}) : textFor('daemonPinned');
  sub.textContent=isKey
    ? textFor('keyEncounter')
    : textFor('daemonEncounter');
  piece.textContent=pieceLabel;

  screen.style.display='flex';
  screen.offsetWidth;
  screen.classList.add('show');

  clearTimeout(FX.engageTimer);
  FX.engageTimer=setTimeout(()=>{
    FX.engageActive=false;
    hideEncounterScreen();
    openBattle(daemon);
  },ENCOUNTER_TRANSITION_MS);
}

function triggerStatusBeat(title, sub, mode='ok', duration=SUCCESS_BEAT_MS, cb=null){
  const screen=document.getElementById('status-beat');
  const card=document.getElementById('status-card');
  const tag=document.getElementById('status-tag');
  const titleEl=document.getElementById('status-title');
  const subEl=document.getElementById('status-sub');
  const tagLabels={ok:textFor('statusOk'),gold:textFor('statusGold'),clear:textFor('statusClear')};
  FX.beatActive=true;
  card.className=`status-card ${mode}`;
  tag.textContent=tagLabels[mode] || textFor('statusOk');
  titleEl.textContent=title;
  subEl.textContent=sub;
  screen.style.display='flex';
  screen.offsetWidth;
  screen.classList.add('show');
  pulseLog(mode==='gold' ? 'gold' : 'ok');
  if(mode==='gold'){
    playUiTone(392,150,{type:'triangle',gain:0.032});
    playUiTone(523,180,{type:'sine',gain:0.025});
  } else if(mode==='clear'){
    playUiTone(294,120,{type:'triangle',gain:0.028});
    playUiTone(440,210,{type:'sine',gain:0.024});
  } else {
    playUiTone(262,110,{type:'triangle',gain:0.028});
    playUiTone(392,160,{type:'sine',gain:0.022});
  }

  clearTimeout(FX.beatTimer);
  FX.beatTimer=setTimeout(()=>{
    FX.beatActive=false;
    hideStatusBeat();
    if(cb) cb();
  },duration);
}

function rotateOffset(x,z,turns){
  let nx=x, nz=z;
  for(let i=0;i<turns;i++) [nx,nz]=[-nz,nx];
  return {x:nx,z:nz};
}

function transformShape(shape, turns=0, flip=false){
  return shape.map(p=>{
    const baseX = flip ? -p.x : p.x;
    return rotateOffset(baseX,p.z,turns);
  });
}

function buildRouteReserve(room){
  const reserved = new Set([
    keyOf(0,8), keyOf(0,7), keyOf(1,8), keyOf(1,7),
    keyOf(8,0), keyOf(8,1), keyOf(7,0), keyOf(7,1)
  ]);
  const routes = getRoomPatrols(room);
  routes.forEach(route=>route.forEach(p=>reserved.add(keyOf(p.x,p.z))));
  return reserved;
}

function hasGoalPath(blocked){
  const start=keyOf(0,8), goal=keyOf(8,0);
  const q=[[0,8]], seen=new Set([start]);
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length){
    const [x,z]=q.shift();
    if(keyOf(x,z)===goal) return true;
    for(const [dx,dz] of dirs){
      const nx=x+dx, nz=z+dz, k=keyOf(nx,nz);
      if(nx<0||nx>=GS||nz<0||nz>=GS||blocked.has(k)||seen.has(k)) continue;
      seen.add(k);
      q.push([nx,nz]);
    }
  }
  return false;
}

function canPlaceCoverPiece(cells, occupied, reserved){
  const local = new Set(cells.map(c=>keyOf(c.x,c.z)));
  for(const c of cells){
    const k=keyOf(c.x,c.z);
    if(c.x<1||c.x>GS-2||c.z<1||c.z>GS-2) return false;
    if(reserved.has(k) || occupied.has(k)) return false;
  }
  for(const c of cells){
    for(let ox=-1;ox<=1;ox++) for(let oz=-1;oz<=1;oz++){
      const nk=keyOf(c.x+ox,c.z+oz);
      if(local.has(nk)) continue;
      if(occupied.has(nk)) return false;
    }
  }
  return true;
}

function randomAnchorInZone(zone){
  return {
    x: zone.minX + Math.floor(Math.random()*(zone.maxX-zone.minX+1)),
    z: zone.minZ + Math.floor(Math.random()*(zone.maxZ-zone.minZ+1))
  };
}

function buildRoomWalls(room){
  if(isTutorialMode()) return [];
  const profile = ROOM_COVER_PROFILES[room-1] || {};
  const reserved = buildRouteReserve(room);
  const occupied = new Set();
  const walls = [];
  const targetPieces = profile.targetPieces || (COVER_PIECE_TARGET + Math.floor(Math.random()*2));
  let pieces=0, attempts=0;
  const zonePool = profile.zoneOrder
    ? profile.zoneOrder.map(idx=>({...(COVER_ZONES[idx] || COVER_ZONES[0])}))
    : shuffle(COVER_ZONES.map(z=>({...z})));

  while(pieces<targetPieces && attempts<COVER_ATTEMPT_LIMIT){
    attempts++;
    const zone = zonePool[pieces % zonePool.length];
    const shape = transformShape(pick(COVER_SHAPES), Math.floor(Math.random()*4), Math.random()<0.5);
    const anchor = attempts < zonePool.length * 8
      ? randomAnchorInZone(zone)
      : {x:1+Math.floor(Math.random()*(GS-2)), z:1+Math.floor(Math.random()*(GS-2))};
    const cells = shape.map(p=>({x:anchor.x+p.x, z:anchor.z+p.z}));
    if(!canPlaceCoverPiece(cells, occupied, reserved)) continue;
    const testBlocked = new Set(occupied);
    cells.forEach(c=>testBlocked.add(keyOf(c.x,c.z)));
    if(!hasGoalPath(testBlocked)) continue;
    cells.forEach(c=>{ occupied.add(keyOf(c.x,c.z)); walls.push(c); });
    pieces++;
  }

  let fallbackAttempts=0;
  while(walls.length<10 && fallbackAttempts<120){
    fallbackAttempts++;
    const cell={x:1+Math.floor(Math.random()*(GS-2)), z:1+Math.floor(Math.random()*(GS-2))};
    if(!canPlaceCoverPiece([cell], occupied, reserved)) continue;
    const testBlocked = new Set(occupied);
    testBlocked.add(keyOf(cell.x,cell.z));
    if(!hasGoalPath(testBlocked)) continue;
    occupied.add(keyOf(cell.x,cell.z));
    walls.push(cell);
  }

  return walls;
}

function V(w,h,d,col,emCol=0,emI=0){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), new THREE.MeshLambertMaterial({color:col,emissive:emCol,emissiveIntensity:emI}));
  m.castShadow=true; m.receiveShadow=true; return m;
}

function initThree(){
  const cv = document.getElementById('cv3');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(currentTheme.bg);
  scene.fog = new THREE.FogExp2(currentTheme.fog,currentTheme.fogDensity);
  const camProfile = getCameraProfile();
  camera = new THREE.PerspectiveCamera(camProfile.fov, VIEW.w/VIEW.h, 0.1, 200);
  camera.position.set(camProfile.x,camProfile.y,camProfile.z);
  camera.lookAt(0,0,0);
  renderer = new THREE.WebGLRenderer({canvas:cv, antialias:false, powerPreference:VIEW.mobile?'low-power':'high-performance'});
  applyRendererViewport();
  renderer.shadowMap.enabled = !VIEW.mobile;
  sceneLights.ambient = new THREE.AmbientLight(currentTheme.ambient,currentTheme.ambientIntensity); scene.add(sceneLights.ambient);
  sceneLights.sun = new THREE.DirectionalLight(currentTheme.sun,currentTheme.sunIntensity); sceneLights.sun.position.set(8,14,8); sceneLights.sun.castShadow=true; scene.add(sceneLights.sun);
  sceneLights.rim = new THREE.PointLight(currentTheme.rim,currentTheme.rimIntensity,18); sceneLights.rim.position.set(0,5,0); scene.add(sceneLights.rim);
  sceneLights.fill = new THREE.HemisphereLight(currentTheme.fillSky,currentTheme.fillGround,currentTheme.fillIntensity); scene.add(sceneLights.fill);
  window.addEventListener('resize', applyRendererViewport);
  window.visualViewport?.addEventListener('resize', applyRendererViewport);
  renderLoop();
}

function buildGridVisuals(nodes){
  nodeMeshes.forEach(g=>scene.remove(g)); nodeLights.forEach(l=>scene.remove(l)); floatParticles.forEach(p=>scene.remove(p));
  nodeMeshes=[]; nodeLights=[]; floatParticles=[];
  clearRoomDecor();
  const of = scene.getObjectByName('floor'); if(of) scene.remove(of);
  const theme=currentTheme || ROOM_THEMES[0];
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(GS*SP+0.4,GS*SP+0.4), new THREE.MeshLambertMaterial({color:theme.floor}));
  floor.rotation.x=-Math.PI/2; floor.name='floor'; floor.receiveShadow=true; scene.add(floor);

  const oldLines = scene.getObjectByName('cables'); if(oldLines) scene.remove(oldLines);
  const pts=[]; for(let x=0;x<GS;x++) for(let z=0;z<GS;z++){
    const p=gToW(x,z);
    if(x<GS-1){const p2=gToW(x+1,z); pts.push(p.x,0.12,p.z,p2.x,0.12,p2.z);}
    if(z<GS-1){const p2=gToW(x,z+1); pts.push(p.x,0.12,p.z,p2.x,0.12,p2.z);}
  }
  const cGeo=new THREE.BufferGeometry(); cGeo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
  const cables=new THREE.LineSegments(cGeo,new THREE.LineBasicMaterial({color:theme.cable,transparent:true,opacity:0.76}));
  cables.name='cables'; scene.add(cables);

  nodes.forEach(n=>{
    const pos=gToW(n.x,n.z), g=new THREE.Group(); g.position.set(pos.x,0,pos.z);
    let col=theme.free, emCol=theme.freeEm, emI=0.15;
    if(n.state===START){col=theme.start;emCol=theme.startEm;emI=0.35;}
    else if(n.state===GOAL){col=theme.goal;emCol=theme.goalEm;emI=0.5;}
    else if(n.state===WALL){col=theme.wall;emCol=theme.wallEm;emI=0.22;}
    const base=V(0.88,0.18,0.88,col,emCol,emI); base.position.y=0.09; g.add(base);
    if(n.state===WALL){
      const colA = V(0.72,0.8,0.72,theme.wall,theme.wallEm,0.25);
      colA.position.y=0.5;
      g.add(colA);
      const cap = V(0.82,0.08,0.82,theme.wallCap,theme.wallEm,0.22);
      cap.position.y=0.94;
      g.add(cap);
    }
    if(n.state===GOAL){
      const ring=new THREE.Mesh(new THREE.TorusGeometry(0.35,0.04,6,12),new THREE.MeshBasicMaterial({color:theme.accent}));
      ring.rotation.x=Math.PI/2; ring.position.y=0.22; g.userData.ring=ring; g.add(ring);
    }
    n.mesh=g; scene.add(g); nodeMeshes.push(g);
    const shouldUseNodeLight = !VIEW.mobile || n.state===GOAL || n.state===START;
    if(shouldUseNodeLight){
      const lt=new THREE.PointLight(emCol,n.state===GOAL?1.2:n.state===START?0.8:0.4,2.1);
      lt.position.set(pos.x,0.4,pos.z); n.light=lt; scene.add(lt); nodeLights.push(lt);
    }
    const particleBudgetOk = !VIEW.mobile || n.state===GOAL || n.state===START || ((n.x+n.z)%3===0);
    if(n.state!==WALL && particleBudgetOk){
      const particleColor = n.state===START ? theme.startEm : n.state===GOAL ? theme.accent2 : theme.particle;
      const pt=V(0.04,0.04,0.04, particleColor, particleColor,1);
      pt.position.set(pos.x,0.6+Math.random()*0.2,pos.z);
      pt.userData={baseY:pt.position.y,phase:Math.random()*Math.PI*2,speed:0.8+Math.random()*0.6};
      scene.add(pt); floatParticles.push(pt);
    }
  });
  buildRoomDecor(theme);
}

function buildHeroMesh(){
  const g=new THREE.Group();
  const bootL=V(0.12,0.18,0.15,0x0b1826,0x00a6c0,0.08); bootL.position.set(-0.08,0.09,0.01); g.add(bootL);
  const bootR=V(0.12,0.18,0.15,0x0b1826,0x00a6c0,0.08); bootR.position.set(0.08,0.09,0.01); g.add(bootR);

  const shinL=V(0.09,0.22,0.1,0x10314a,0x00c9ff,0.06); shinL.position.set(-0.08,0.27,-0.01); g.add(shinL);
  const shinR=V(0.09,0.22,0.1,0x10314a,0x00c9ff,0.06); shinR.position.set(0.08,0.27,-0.01); g.add(shinR);

  const torso=V(0.28,0.34,0.24,0x081f32,0x00c9ff,0.16); torso.position.set(0,0.48,0); g.add(torso);
  const chestPlate=V(0.2,0.16,0.25,0x0c3950,0x00e5ff,0.24); chestPlate.position.set(0,0.5,0.01); g.add(chestPlate);
  const relayCore=V(0.08,0.1,0.26,0x00e5ff,0x00e5ff,1); relayCore.position.set(0,0.5,0.01); g.add(relayCore);

  const satchel=V(0.1,0.18,0.14,0x23410f,0xffc040,0.12); satchel.position.set(-0.19,0.44,-0.01); satchel.rotation.z=0.16; g.add(satchel);
  const strap=V(0.04,0.42,0.04,0x35556b,0x00c9ff,0.08); strap.position.set(-0.03,0.5,0); strap.rotation.z=0.48; g.add(strap);

  const cloak=V(0.34,0.24,0.28,0x061423,0x0090b0,0.08); cloak.position.set(0,0.62,-0.02); g.add(cloak);
  const collar=V(0.3,0.08,0.22,0x0b3042,0x00d6ff,0.18); collar.position.set(0,0.77,0); g.add(collar);

  const hood=V(0.24,0.22,0.22,0x0b2133,0x00d6ff,0.1); hood.position.set(0,0.92,0); g.add(hood);
  const visor=V(0.18,0.07,0.23,0x00e5ff,0x00e5ff,0.72); visor.position.set(0,0.92,0.01); g.add(visor);
  const jaw=V(0.14,0.08,0.18,0x081621,0x00a6c0,0.08); jaw.position.set(0,0.82,0); g.add(jaw);

  const antenna=V(0.03,0.34,0.03,0x3a5c70,0x00e5ff,0.2); antenna.position.set(0.11,1.08,-0.05); antenna.rotation.z=-0.12; g.add(antenna);
  const antennaTip=V(0.06,0.06,0.06,0xffc040,0xffc040,1); antennaTip.position.set(0.12,1.26,-0.05); g.add(antennaTip);

  const armL=V(0.08,0.26,0.08,0x0f3244,0x00b8e6,0.06); armL.position.set(-0.2,0.49,0); armL.rotation.z=0.18; g.add(armL);
  const armR=V(0.08,0.26,0.08,0x0f3244,0x00b8e6,0.06); armR.position.set(0.2,0.49,0); armR.rotation.z=-0.18; g.add(armR);
  const gloveR=V(0.08,0.08,0.08,0x00e5ff,0x00e5ff,0.6); gloveR.position.set(0.22,0.34,0.02); g.add(gloveR);
  return g;
}

function buildDaemonMesh(type='rook'){
  const g=new THREE.Group();
  if(type==='rook'){
    const base=V(0.56,0.1,0.56,0x4a2e00,0xffc040,0.3); base.position.set(0,0.05,0); g.add(base);
    const body=V(0.46,0.5,0.46,0x3a2200,0xffc040,0.2); body.position.set(0,0.35,0); g.add(body);
    const band=V(0.5,0.08,0.5,0x6a3c00,0xffc040,0.5); band.position.set(0,0.44,0); g.add(band);
    const neck=V(0.3,0.1,0.3,0x4a2e00); neck.position.set(0,0.65,0); g.add(neck);
    const head=V(0.52,0.16,0.52,0x5a3800,0xffc040,0.35); head.position.set(0,0.78,0); g.add(head);
    const vis=V(0.32,0.06,0.54,0xff2255,0xff2255,0.9); vis.position.set(0,0.8,0); g.add(vis);
    const mPos=[[-0.17,-0.17],[0.17,-0.17],[-0.17,0.17],[0.17,0.17]];
    mPos.forEach(([mx,mz])=>{
      const m=V(0.14,0.2,0.14,0x6a3c00,0xffc040,0.4); m.position.set(mx,0.97,mz); g.add(m);
    });
    const cm=V(0.1,0.15,0.1,0x7a4800,0xffc040,0.5); cm.position.set(0,0.95,0); g.add(cm);
    const core=V(0.12,0.08,0.12,0xffc040,0xffc040,1); core.position.set(0,0.91,0); g.add(core);
    const sigil=new THREE.Mesh(new THREE.RingGeometry(0.3,0.38,4),new THREE.MeshBasicMaterial({color:0xffc040,side:THREE.DoubleSide}));
    sigil.rotation.x=-Math.PI/2; sigil.rotation.z=Math.PI/4; sigil.position.y=0.04; g.add(sigil);
  } else {
    const fL=V(0.1,0.14,0.1,0x003a50); fL.position.set(-0.07,0.07,0); g.add(fL);
    const fR=V(0.1,0.14,0.1,0x003a50); fR.position.set(0.07,0.07,0); g.add(fR);
    const robe=V(0.3,0.48,0.24,0x002a3e,0x00e5ff,0.18); robe.position.set(0,0.38,0); g.add(robe);
    const robeTop=V(0.22,0.24,0.18,0x002a3e,0x00e5ff,0.22); robeTop.position.set(0,0.68,0); g.add(robeTop);
    const collar=V(0.28,0.06,0.22,0x00475f,0x00e5ff,0.4); collar.position.set(0,0.83,0); g.add(collar);
    const head=V(0.2,0.2,0.18,0x003040,0x00e5ff,0.2); head.position.set(0,0.98,0); g.add(head);
    const eL=V(0.07,0.05,0.19,0xff2255,0xff2255,1); eL.position.set(-0.05,0.99,0); g.add(eL);
    const eR=V(0.07,0.05,0.19,0xff2255,0xff2255,1); eR.position.set(0.05,0.99,0); g.add(eR);
    const hat1=V(0.18,0.22,0.16,0x004060,0x00e5ff,0.5); hat1.position.set(0,1.2,0); g.add(hat1);
    const hat2=V(0.12,0.22,0.1,0x005070,0x00e5ff,0.7); hat2.position.set(0,1.46,0); g.add(hat2);
    const hat3=V(0.07,0.2,0.06,0x006080,0x00e5ff,0.9); hat3.position.set(0,1.7,0); g.add(hat3);
    const tip=V(0.08,0.08,0.08,0x00e5ff,0x00e5ff,1); tip.position.set(0,1.86,0); g.add(tip);
    const notch=V(0.06,0.12,0.17,0x001820,0x00e5ff,0.1); notch.position.set(0,1.2,0); g.add(notch);
    const sashA=V(0.04,0.42,0.04,0x00607a,0x00e5ff,0.6); sashA.position.set(-0.09,0.5,0); sashA.rotation.z=0.4; g.add(sashA);
    const sashB=V(0.04,0.42,0.04,0x00607a,0x00e5ff,0.6); sashB.position.set(0.09,0.5,0); sashB.rotation.z=-0.4; g.add(sashB);
    const sigil=new THREE.Mesh(new THREE.RingGeometry(0.3,0.38,4),new THREE.MeshBasicMaterial({color:0x00e5ff,side:THREE.DoubleSide}));
    sigil.rotation.x=-Math.PI/2; sigil.position.y=0.04; g.add(sigil);
  }
  return g;
}

function buildKeyBearerMarker(type='rook'){
  const g=new THREE.Group();
  const isBishop=type==='bishop';
  const marker = new THREE.Mesh(
    new THREE.OctahedronGeometry(isBishop ? 0.16 : 0.12,0),
    new THREE.MeshBasicMaterial({color:0xffd56a, transparent:true, opacity:0.96})
  );
  marker.scale.set(isBishop ? 0.95 : 1, isBishop ? 1.55 : 1.08, isBishop ? 0.95 : 1);
  marker.position.y=isBishop ? 2.18 : 1.34;
  g.add(marker);

  const light = new THREE.PointLight(0xffc040,isBishop ? 1.45 : 1.15,isBishop ? 4.4 : 3.4);
  light.position.copy(marker.position);
  g.add(light);

  g.userData.marker=marker;
  g.userData.light=light;
  g.userData.baseY=marker.position.y;
  g.userData.phase=Math.random()*Math.PI*2;
  return g;
}

function buildMedkitMarker(){
  const g=new THREE.Group();

  const floorRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.24,0.026,8,24),
    new THREE.MeshBasicMaterial({color:0x00ff88,transparent:true,opacity:0.95})
  );
  floorRing.rotation.x=Math.PI/2;
  floorRing.position.y=0.05;
  g.add(floorRing);

  const staff = V(0.04,0.54,0.04,0xffc040,0xffc040,0.35);
  staff.position.y=0.35;
  g.add(staff);

  const bowl = new THREE.Mesh(
    new THREE.TorusGeometry(0.12,0.018,8,20),
    new THREE.MeshBasicMaterial({color:0xffd05a})
  );
  bowl.scale.set(1,0.45,1);
  bowl.position.y=0.58;
  g.add(bowl);

  const snakeA = V(0.07,0.05,0.04,0x00ff88,0x00ff88,0.85);
  snakeA.position.set(-0.03,0.21,0);
  snakeA.rotation.z=0.55;
  g.add(snakeA);

  const snakeB = V(0.07,0.05,0.04,0x00ff88,0x00ff88,0.85);
  snakeB.position.set(0.03,0.35,0);
  snakeB.rotation.z=-0.55;
  g.add(snakeB);

  const snakeC = V(0.07,0.05,0.04,0x00ff88,0x00ff88,0.85);
  snakeC.position.set(-0.03,0.49,0);
  snakeC.rotation.z=0.55;
  g.add(snakeC);

  const snakeHead = V(0.06,0.06,0.05,0x00ff88,0x00ff88,1);
  snakeHead.position.set(0.045,0.62,0);
  g.add(snakeHead);

  const light = new THREE.PointLight(0x00ff88,0.9,2.2);
  light.position.y=0.45;
  g.add(light);

  g.userData.floorRing=floorRing;
  g.userData.baseY=0.08;
  g.userData.phase=Math.random()*Math.PI*2;
  return g;
}

function buildBossThrone(theme){
  const g=new THREE.Group();

  const floorSeal=new THREE.Mesh(
    new THREE.RingGeometry(0.78,1.08,8,1),
    new THREE.MeshBasicMaterial({color:theme.accent2,transparent:true,opacity:0.62,side:THREE.DoubleSide})
  );
  floorSeal.rotation.x=-Math.PI/2;
  floorSeal.position.y=0.04;
  g.add(floorSeal);

  const dais=V(1.92,0.28,1.46,0x2d0a17,theme.accent,0.2);
  dais.position.y=0.14;
  g.add(dais);

  const stepFront=V(1.54,0.16,0.58,0x3b101c,theme.accent2,0.14);
  stepFront.position.set(0,0.08,0.74);
  g.add(stepFront);

  const stepMid=V(1.16,0.16,0.42,0x48121f,theme.accent2,0.16);
  stepMid.position.set(0,0.18,0.36);
  g.add(stepMid);

  const seat=V(0.94,0.18,0.68,0x11070b,theme.accent,0.12);
  seat.position.set(0,0.58,-0.04);
  g.add(seat);

  const back=V(0.94,1.26,0.24,0x210710,theme.accent,0.18);
  back.position.set(0,1.06,-0.42);
  g.add(back);

  const crown=V(1.1,0.12,0.28,0x5b1328,theme.accent2,0.24);
  crown.position.set(0,1.76,-0.38);
  g.add(crown);

  [-0.44,-0.18,0.18,0.44].forEach((x,idx)=>{
    const fang=V(0.08,0.28 + (idx%2===0 ? 0.1 : 0),0.08,0x8d1f46,theme.accent2,0.35);
    fang.position.set(x,1.95 + (idx%2===0 ? 0.08 : 0),-0.38);
    g.add(fang);
  });

  [-0.62,0.62].forEach(x=>{
    const arm=V(0.22,0.46,0.88,0x220811,theme.accent,0.12);
    arm.position.set(x,0.78,0.02);
    g.add(arm);

    const sideSpire=V(0.18,1.34,0.18,0x2f0915,theme.accent2,0.22);
    sideSpire.position.set(x*1.03,1.08,-0.18);
    g.add(sideSpire);

    const sideOrb=V(0.12,0.12,0.12,theme.accent2,theme.accent2,1);
    sideOrb.position.set(x*1.03,1.82,-0.18);
    g.add(sideOrb);
  });

  const seatAnchor=new THREE.Object3D();
  seatAnchor.position.set(0,0.88,-0.08);
  g.add(seatAnchor);

  const standAnchor=new THREE.Object3D();
  standAnchor.position.set(0,1.08,1.18);
  g.add(standAnchor);

  g.userData.floorSeal=floorSeal;
  g.userData.seatAnchor=seatAnchor;
  g.userData.standAnchor=standAnchor;
  return g;
}

function buildArchonBossMesh(theme){
  const root=new THREE.Group();
  const pose=new THREE.Group();
  root.add(pose);

  const lower=V(0.64,0.62,0.42,0x13060e,theme.accent,0.22);
  lower.position.set(0,0.38,0);
  pose.add(lower);

  const torso=V(0.52,0.58,0.34,0x1b0711,theme.accent2,0.18);
  torso.position.set(0,0.96,-0.04);
  pose.add(torso);

  const chest=V(0.3,0.2,0.36,0x5e1427,theme.accent2,0.55);
  chest.position.set(0,1.02,0.04);
  pose.add(chest);

  const neck=V(0.18,0.16,0.18,0x2c0913,theme.accent,0.16);
  neck.position.set(0,1.34,-0.08);
  pose.add(neck);

  const head=V(0.34,0.34,0.26,0x13050c,theme.accent,0.2);
  head.position.set(0,1.58,-0.04);
  pose.add(head);

  const jaw=V(0.26,0.12,0.22,0x080306,theme.accent2,0.18);
  jaw.position.set(0,1.42,0.02);
  pose.add(jaw);

  const eyeL=V(0.08,0.06,0.27,0xff2255,0xff2255,1);
  eyeL.position.set(-0.08,1.6,0.02);
  pose.add(eyeL);

  const eyeR=V(0.08,0.06,0.27,0xff2255,0xff2255,1);
  eyeR.position.set(0.08,1.6,0.02);
  pose.add(eyeR);

  const crownBase=V(0.42,0.08,0.28,0x6c1730,theme.accent2,0.34);
  crownBase.position.set(0,1.84,-0.08);
  pose.add(crownBase);

  [-0.14,0,0.14].forEach((x,idx)=>{
    const horn=V(0.08,0.26 + (idx===1 ? 0.12 : 0),0.08,0x8f2045,theme.accent2,0.6);
    horn.position.set(x,2.03 + (idx===1 ? 0.06 : 0),-0.08);
    pose.add(horn);
  });

  [-0.44,0.44].forEach((x,idx)=>{
    const shoulder=V(0.18,0.18,0.18,0x2b0914,theme.accent2,0.18);
    shoulder.position.set(x,1.16,-0.02);
    pose.add(shoulder);

    const arm=V(0.12,0.7,0.12,0x16060b,theme.accent,0.16);
    arm.position.set(x*1.05,0.84,0.04);
    arm.rotation.z=idx===0 ? 0.28 : -0.28;
    pose.add(arm);

    const claw=V(0.14,0.14,0.14,theme.accent2,theme.accent2,0.7);
    claw.position.set(x*1.18,0.42,0.12);
    pose.add(claw);
  });

  const spine=V(0.12,0.86,0.12,0x5d1530,theme.accent2,0.26);
  spine.position.set(0,1.2,-0.22);
  pose.add(spine);

  const halo=new THREE.Mesh(
    new THREE.TorusGeometry(0.42,0.032,8,36),
    new THREE.MeshBasicMaterial({color:theme.accent2,transparent:true,opacity:0.78})
  );
  halo.rotation.x=Math.PI/2;
  halo.position.set(0,1.56,-0.22);
  pose.add(halo);

  const coreLight=new THREE.PointLight(theme.accent2,1.3,4.8);
  coreLight.position.set(0,1.3,0.18);
  root.add(coreLight);

  root.userData.pose=pose;
  root.userData.halo=halo;
  root.userData.coreLight=coreLight;
  root.userData.eyeL=eyeL;
  root.userData.eyeR=eyeR;
  return root;
}

function buildBossChamberDecor(theme){
  const entrance=gToW(4,8);
  const throneSpot=gToW(4,0);

  const aisleZs=[7.2,6.1,5,3.9,2.8,1.7,0.85];
  aisleZs.forEach((z,idx)=>{
    const plate=new THREE.Mesh(
      new THREE.BoxGeometry(1.2 - (idx*0.06),0.05,0.54),
      new THREE.MeshLambertMaterial({color:0x2d0b16,emissive:theme.accent,emissiveIntensity:0.12 + (idx*0.015)})
    );
    const wp=gToW(4,z);
    plate.position.set(wp.x,0.05,wp.z);
    scene.add(plate);
    roomDecor.push(plate);
  });

  [
    {x:1.08,z:6.45},{x:6.92,z:6.45},
    {x:1.08,z:4.2},{x:6.92,z:4.2},
    {x:1.08,z:1.95},{x:6.92,z:1.95}
  ].forEach((spot,idx)=>{
    const pylon=new THREE.Group();
    const wp=gToW(spot.x,spot.z);
    pylon.position.set(wp.x,0,wp.z);
    const base=V(0.4,0.2,0.4,0x220811,theme.accent,0.12);
    base.position.y=0.1;
    pylon.add(base);
    const shaft=V(0.18,1.12,0.18,0x300a15,theme.accent,0.18);
    shaft.position.y=0.76;
    pylon.add(shaft);
    const ember=V(0.14,0.14,0.14,idx%2===0 ? theme.accent2 : theme.accent,theme.accent2,1);
    ember.position.y=1.46;
    pylon.add(ember);
    const light=new THREE.PointLight(idx%2===0 ? theme.accent2 : theme.accent,0.9,3.4);
    light.position.y=1.36;
    pylon.add(light);
    pylon.userData.ember=ember;
    scene.add(pylon);
    roomDecor.push(pylon);
  });

  const throne=buildBossThrone(theme);
  throne.position.set(throneSpot.x,0,throneSpot.z-0.14);
  scene.add(throne);
  roomDecor.push(throne);

  const archon=buildArchonBossMesh(theme);
  scene.add(archon);
  roomDecor.push(archon);

  bossSceneState.throne=throne;
  bossSceneState.archon=archon;
  bossSceneState.active=true;
  return {throne, archon, entrance};
}

function clearMedkits(){
  (G.medkits || []).forEach(mk=>{
    if(mk.mesh) scene.remove(mk.mesh);
  });
  if(G) G.medkits = [];
}

function placeMedkits(room){
  clearMedkits();
  if(isTutorialMode()){
    G.medkits = TUTORIAL_MEDKITS.map(item=>{
      const mesh = buildMedkitMarker();
      const wp=gToW(item.x,item.z);
      mesh.position.set(wp.x,mesh.userData.baseY,wp.z);
      scene.add(mesh);
      return {
        id:(window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : String(Math.random()),
        x:item.x,z:item.z,heal:item.heal,mesh
      };
    });
    return;
  }
  const occupied = new Set(daemonGroups.map(d=>keyOf(d.x,d.z)));
  const options = G.nodes.filter(n=>{
    if(n.state!==FREE) return false;
    if(occupied.has(keyOf(n.x,n.z))) return false;
    if(Math.abs(n.x-0)+Math.abs(n.z-8)<=2) return false;
    if(Math.abs(n.x-8)+Math.abs(n.z-0)<=2) return false;
    return true;
  });
  const count = Math.min(ROOM_MEDKITS[room-1] || 0, options.length);
  const picks = shuffle(options.slice()).slice(0,count);
  G.medkits = picks.map(node=>{
    const mesh = buildMedkitMarker();
    const wp=gToW(node.x,node.z);
    mesh.position.set(wp.x,mesh.userData.baseY,wp.z);
    scene.add(mesh);
    return {
      id:(window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : String(Math.random()),
      x:node.x,z:node.z,heal:MEDKIT_HEAL,mesh
    };
  });
}

function tweenHero(toGX,toGZ,cb){
  const wp=gToW(toGX,toGZ);
  lerpHero={active:true,t:0,from:{x:heroGroup.position.x,y:heroGroup.position.y,z:heroGroup.position.z},to:{x:wp.x,y:0,z:wp.z},cb};
}

function tweenDaemon(dm,toX,toZ){
  const wp=gToW(toX,toZ);
  daemonLerps.push({dm,t:0,from:{x:dm.mesh.position.x,z:dm.mesh.position.z},to:{x:wp.x,z:wp.z}});
}

function renderLoop(){
  requestAnimationFrame(renderLoop);
  applyRendererViewport();
  const t=Date.now()*0.001;
  if(lerpHero.active){
    lerpHero.t=Math.min(1,lerpHero.t+0.12);
    const e=1-Math.pow(1-lerpHero.t,3);
    heroGroup.position.x=lerpHero.from.x+(lerpHero.to.x-lerpHero.from.x)*e;
    heroGroup.position.z=lerpHero.from.z+(lerpHero.to.z-lerpHero.from.z)*e;
    heroGroup.position.y=Math.sin(lerpHero.t*Math.PI)*0.12;
    if(lerpHero.t>=1){lerpHero.active=false; heroGroup.position.y=0; if(lerpHero.cb) lerpHero.cb();}
  } else if(heroGroup){ heroGroup.position.y=Math.sin(t*2)*0.03; heroGroup.rotation.y=Math.sin(t*0.5)*0.06; }

  daemonLerps = daemonLerps.filter(l=>{
    l.t=Math.min(1,l.t+0.14);
    const e=1-Math.pow(1-l.t,3);
    l.dm.mesh.position.x=l.from.x+(l.to.x-l.from.x)*e;
    l.dm.mesh.position.z=l.from.z+(l.to.z-l.from.z)*e;
    return l.t<1;
  });

  daemonGroups.forEach((dg,i)=>{
    if(dg.mesh){
      dg.mesh.position.y=0.06+Math.sin(t*2.4+i*1.4)*0.05;
      dg.mesh.rotation.y=Math.PI+Math.sin(t*0.7+i)*0.12;
      if(dg.keyMarker){
        const phase=dg.keyMarker.userData.phase;
        const marker=dg.keyMarker.userData.marker;
        const pulse=1+Math.sin(t*4.6+phase)*0.14;
        marker.position.y = dg.keyMarker.userData.baseY + Math.sin(t*4.1+phase)*0.06;
        marker.rotation.y = t*2.8;
        marker.rotation.x = Math.sin(t*1.8+phase)*0.2;
        marker.scale.setScalar(pulse);
        dg.keyMarker.userData.light.position.copy(marker.position);
        dg.keyMarker.userData.light.intensity=0.95+((Math.sin(t*4.6+phase)+1)*0.22);
      }
    }
  });
  if(bossSceneState.active && bossSceneState.archon){
    bossSceneState.stand += (bossSceneState.targetStand-bossSceneState.stand)*0.08;
    const archon=bossSceneState.archon;
    const pose=archon.userData.pose;
    const seatPos=archon.userData.seatPos;
    const standPos=archon.userData.standPos;
    if(seatPos && standPos){
      archon.position.lerpVectors(seatPos, standPos, bossSceneState.stand);
    }
    if(pose){
      pose.rotation.x = (-0.48 * (1-bossSceneState.stand)) + (Math.sin(t*2.1)*0.015);
      pose.position.y = Math.sin(t*1.7)*0.04;
    }
    archon.rotation.y = Math.PI + (Math.sin(t*0.85)*0.04);
    if(archon.userData.halo){
      archon.userData.halo.rotation.z = t*(0.65 + (bossSceneState.stand*0.4));
      archon.userData.halo.scale.setScalar(1 + Math.sin(t*2.8)*0.04);
    }
    if(archon.userData.coreLight){
      archon.userData.coreLight.intensity = 1.2 + ((Math.sin(t*4.4)+1)*0.22) + (bossSceneState.stand*0.45);
    }
    if(archon.userData.eyeL && archon.userData.eyeR){
      const blink = 0.88 + (Math.sin(t*5.2)*0.12);
      archon.userData.eyeL.scale.y = blink;
      archon.userData.eyeR.scale.y = blink;
    }
  }
  (G.medkits || []).forEach((mk,i)=>{
    if(mk.mesh){
      mk.mesh.position.y = mk.mesh.userData.baseY + Math.sin(t*3.2 + mk.mesh.userData.phase + i)*0.05;
      mk.mesh.rotation.y = t*1.45;
      mk.mesh.userData.floorRing.rotation.z = -t*1.8;
    }
  });
  roomDecor.forEach((obj, idx)=>{
    if(obj.userData?.practicePad){
      const pad=obj.userData.practicePad;
      const completeBoost = G.practiceClears?.[pad.id] ? 0.08 : 0;
      pad.ring.rotation.z = -t*(1.4 + completeBoost*8);
      pad.ring.scale.setScalar(1 + Math.sin(t*3.8 + pad.phase)*0.06);
      pad.beacon.material.opacity = (G.practiceClears?.[pad.id] ? 0.56 : 0.34) + ((Math.sin(t*3.2 + pad.phase)+1)*0.08);
      if(pad.glyph){
        switch(pad.glyph.type){
          case 'caesar':
            pad.glyph.outer.rotation.z = t*0.9;
            pad.glyph.inner.rotation.z = -t*1.25;
            pad.glyph.core.position.y = 0.22 + (Math.sin(t*3.8 + pad.phase)*0.035);
            break;
          case 'reverse':
            pad.glyph.left.rotation.z = 0.32 + (Math.sin(t*2.8 + pad.phase)*0.08);
            pad.glyph.right.rotation.z = -0.32 - (Math.sin(t*2.8 + pad.phase)*0.08);
            pad.glyph.beam.position.y = 0.34 + (Math.sin(t*3 + pad.phase)*0.02);
            break;
          case 'atbash':
            pad.glyph.leftOrb.position.y = 0.42 + (Math.sin(t*3.4 + pad.phase)*0.025);
            pad.glyph.rightOrb.position.y = 0.42 - (Math.sin(t*3.4 + pad.phase)*0.025);
            pad.glyph.leftOrb.scale.setScalar(1 + (Math.sin(t*3.4 + pad.phase)*0.08));
            pad.glyph.rightOrb.scale.setScalar(1 - (Math.sin(t*3.4 + pad.phase)*0.08));
            break;
          case 'railfence':
            pad.glyph.nodes.forEach((node, nodeIdx)=>{
              const chase=Math.sin(t*4 - (nodeIdx*0.8) + pad.phase);
              node.position.y = pad.glyph.baseYs[nodeIdx] + (chase*0.02);
              node.scale.setScalar(1 + (chase*0.1));
            });
            break;
          case 'scytale':
            pad.glyph.core.rotation.y = t*0.5;
            pad.glyph.bands.forEach((band, bandIdx)=>{
              band.rotation.z = t*(0.8 + (bandIdx*0.06));
            });
            break;
          case 'columnar':
            pad.glyph.caps.forEach((cap, capIdx)=>{
              const offset=Math.sin(t*3 + pad.phase + (capIdx*0.4));
              const column=pad.glyph.columns[capIdx];
              cap.position.y = column.geometry.parameters.height + 0.025 + (offset*0.025);
            });
            break;
        }
      }
    }
    if(obj.userData?.exhibitHalo){
      obj.userData.exhibitHalo.rotation.z = t*(0.8 + idx*0.03);
    }
    if(obj.userData?.decorMotion){
      const motion=obj.userData.decorMotion;
      const wave=Math.sin((t*2.2) + motion.phase);
      switch(motion.type){
        case 'caesar':
          motion.ringA.rotation.z = t*0.95;
          motion.ringB.rotation.z = -t*1.3;
          motion.ringB.position.x = motion.ringBX + (wave*motion.ringOffsetAmp);
          motion.core.position.y = motion.coreY + (wave*motion.coreBobAmp);
          motion.core.scale.setScalar(1 + (Math.sin(t*4.2 + motion.phase)*0.08));
          motion.light.intensity = 0.62 + ((Math.sin(t*3.6 + motion.phase)+1)*0.12);
          break;
        case 'reverse':
          motion.left.rotation.z = motion.baseTilt + (wave*0.08);
          motion.right.rotation.z = -motion.baseTilt - (wave*0.08);
          motion.laneA.rotation.y = 0.48 + (wave*0.08);
          motion.laneB.rotation.y = -0.48 - (wave*0.08);
          motion.core.position.y = motion.coreY + (Math.sin(t*3.4 + motion.phase)*motion.coreBobAmp);
          motion.light.intensity = 0.56 + ((Math.sin(t*3.2 + motion.phase)+1)*0.1);
          break;
        case 'atbash':
          motion.leftOrb.scale.setScalar(1 + (wave*0.1));
          motion.rightOrb.scale.setScalar(1 - (wave*0.1));
          motion.leftOrb.position.y = motion.orbY + (wave*motion.orbBobAmp);
          motion.rightOrb.position.y = motion.orbY - (wave*motion.orbBobAmp);
          motion.beam.material.emissiveIntensity = 0.18 + ((Math.sin(t*4 + motion.phase)+1)*0.06);
          motion.leftLight.intensity = 0.42 + ((Math.sin(t*4 + motion.phase)+1)*0.09);
          motion.rightLight.intensity = 0.42 + ((Math.sin(t*4 + motion.phase + Math.PI)+1)*0.09);
          break;
        case 'railfence':
          motion.nodes.forEach((node, nodeIdx)=>{
            const chase = Math.sin((t*4.1) - (nodeIdx*0.8) + motion.phase);
            node.scale.setScalar(1 + (chase*0.12));
            node.position.y = motion.baseYs[nodeIdx] + (chase*motion.nodeBobAmp);
          });
          motion.rails.forEach((rail, railIdx)=>{
            rail.material.emissiveIntensity = 0.14 + ((Math.sin(t*4.1 - (railIdx*0.75) + motion.phase)+1)*0.08);
          });
          motion.light.intensity = 0.48 + ((Math.sin(t*4.1 + motion.phase)+1)*0.1);
          break;
        case 'scytale':
          motion.core.rotation.y = t*0.35;
          motion.bands.forEach((band, bandIdx)=>{
            band.rotation.z = t*(0.7 + (bandIdx*0.04));
            band.position.x = Math.sin(t*1.8 + motion.phase + bandIdx)*motion.bandSwayAmp;
          });
          motion.straps.forEach((strap, strapIdx)=>{
            strap.rotation.y += 0.01 + (strapIdx*0.001);
          });
          motion.tip.position.y = motion.tipY + (wave*motion.tipBobAmp);
          motion.light.intensity = 0.52 + ((Math.sin(t*3.5 + motion.phase)+1)*0.11);
          break;
        case 'columnar':
          motion.caps.forEach((cap, capIdx)=>{
            const offset = Math.sin((t*3.1) + motion.phase + (capIdx*0.45));
            const column = motion.columns[capIdx];
            cap.position.y = (column.position.y + (column.geometry.parameters.height * 0.5)) + motion.capLift + (offset*motion.capBobAmp);
            cap.scale.setScalar(1 + (offset*0.08));
          });
          motion.light.intensity = 0.5 + ((Math.sin(t*3.1 + motion.phase)+1)*0.1);
          break;
      }
    }
    if(obj.userData?.ember){
      obj.userData.ember.position.y = 1.46 + (Math.sin(t*3.6 + idx)*0.04);
    }
    if(obj.userData?.floorSeal){
      obj.userData.floorSeal.rotation.z = t*0.72;
      obj.userData.floorSeal.scale.setScalar(1 + (Math.sin(t*2.8)*0.025));
    }
  });
  nodeMeshes.forEach(g=>{
    if(g.userData.ring){
      const pulse = G.extractionActive && !isTutorialMode() ? 1 + Math.sin(t*4.6)*0.12 : 1;
      g.userData.ring.rotation.z=t*(G.extractionActive ? 2.4 : 1.2);
      g.userData.ring.scale.setScalar(pulse);
    }
    if(g.userData.orb) g.userData.orb.rotation.y=t*2;
  });
  floatParticles.forEach(p=>{ p.position.y=p.userData.baseY+Math.sin(t*p.userData.speed+p.userData.phase)*0.1; });

  if(heroGroup){
    FX.cameraKick*=0.86;
    const kickWave=Math.sin(t*42)*FX.cameraKick;
    if(bossSceneState.cameraOverride && bossSceneState.cameraPos && bossSceneState.lookAt){
      const desiredX = bossSceneState.cameraPos.x + (kickWave*0.42);
      const desiredY = bossSceneState.cameraPos.y + (FX.cameraKick*0.3);
      const desiredZ = bossSceneState.cameraPos.z - (kickWave*0.3);
      camera.position.x += (desiredX-camera.position.x)*0.07;
      camera.position.y += (desiredY-camera.position.y)*0.07;
      camera.position.z += (desiredZ-camera.position.z)*0.07;
      camera.lookAt(bossSceneState.lookAt.x,bossSceneState.lookAt.y,bossSceneState.lookAt.z);
    } else {
      camFollow.x += (heroGroup.position.x-camFollow.x)*0.08;
      camFollow.z += (heroGroup.position.z-camFollow.z)*0.08;
      const camProfile = getCameraProfile();
      const desiredX = camFollow.x + camProfile.x + kickWave;
      const desiredY = camProfile.y + (FX.cameraKick*0.34);
      const desiredZ = camFollow.z + camProfile.z - (kickWave*0.65);
      camera.position.x += (desiredX-camera.position.x)*camProfile.lerp;
      camera.position.y += (desiredY-camera.position.y)*camProfile.lerp;
      camera.position.z += (desiredZ-camera.position.z)*camProfile.lerp;
      camera.lookAt(camFollow.x,0,camFollow.z);
    }
  }
  positionTutorialChat();
  renderer.render(scene,camera);
}

function caesarEnc(w,s){return w.split('').map(c=>String.fromCharCode(((c.charCodeAt(0)-65+s)%26)+65)).join('');}
function atbash(w){return w.split('').map(c=>String.fromCharCode(90-(c.charCodeAt(0)-65))).join('');}
function railFenceEnc(w){
  let top='', bottom='';
  for(let i=0;i<w.length;i++){
    if(i%2===0) top+=w[i];
    else bottom+=w[i];
  }
  return top+bottom;
}

function reverseEnc(w){
  return w.split('').reverse().join('');
}

function scytaleEnc(w, cols=3){
  const rows=Math.ceil(w.length/cols);
  const grid=Array.from({length:rows},()=>Array(cols).fill(''));
  let idx=0;
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      grid[r][c]=w[idx] || '';
      idx++;
    }
  }
  let out='';
  for(let c=0;c<cols;c++){
    for(let r=0;r<rows;r++){
      if(grid[r][c]) out+=grid[r][c];
    }
  }
  return out;
}

function columnarEnc(w, order=[2,0,1]){
  const cols=order.length;
  const rows=Math.ceil(w.length/cols);
  const grid=Array.from({length:rows},()=>Array(cols).fill(''));
  let idx=0;
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      grid[r][c]=w[idx] || '';
      idx++;
    }
  }
  let out='';
  order.forEach(colIdx=>{
    for(let r=0;r<rows;r++){
      if(grid[r][colIdx]) out+=grid[r][colIdx];
    }
  });
  return out;
}

function getFilledColumnLengths(textLength, cols){
  const rows=Math.ceil(textLength/cols);
  const remainder=textLength % cols;
  return Array.from({length:cols},(_,idx)=>{
    if(remainder===0) return rows;
    return idx < remainder ? rows : rows-1;
  });
}

function splitByLengths(text, lengths){
  let cursor=0;
  return lengths.map(len=>{
    const part=text.slice(cursor,cursor+len);
    cursor+=len;
    return part;
  });
}

function getBalancedPuzzleWordPool(base){
  const pool=base.wordPool || ['CODE'];
  if(base.cipherType==='scytale' || base.cipherType==='columnar'){
    const compact=pool.filter(word=>word.length<=7);
    if(compact.length) return compact;
  }
  return pool;
}

const puzzleWordState = new Map();
function getWordRandomInt(max){
  if(max<=1) return 0;
  if(window.crypto?.getRandomValues){
    const buf = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;
    let value = 0;
    do{
      window.crypto.getRandomValues(buf);
      value = buf[0];
    }while(value>=limit);
    return value % max;
  }
  return Math.floor(Math.random()*max);
}
function getPuzzleWordStateKey(base){
  return `${base.roomTitle}|${base.cipherType}|${base.referenceType || ''}`;
}
function buildPuzzleWordBag(pool, lastWord=''){
  const bag=[...pool];
  for(let i=bag.length-1;i>0;i--){
    const j=getWordRandomInt(i+1);
    [bag[i],bag[j]]=[bag[j],bag[i]];
  }
  if(lastWord && bag.length>1 && bag[bag.length-1]===lastWord){
    const swapIdx=getWordRandomInt(bag.length-1);
    [bag[bag.length-1],bag[swapIdx]]=[bag[swapIdx],bag[bag.length-1]];
  }
  return bag;
}
function pickPuzzleWord(base){
  const pool=[...getBalancedPuzzleWordPool(base)];
  if(!pool.length) return 'CODE';
  const key=getPuzzleWordStateKey(base);
  const signature=pool.join('|');
  let state=puzzleWordState.get(key);
  if(!state || state.signature!==signature || !state.bag?.length){
    state={
      signature,
      bag:buildPuzzleWordBag(pool,state?.lastWord || ''),
      lastWord:state?.lastWord || ''
    };
  }
  const answer=state.bag.pop() || pool[0];
  state.lastWord=answer;
  puzzleWordState.set(key,state);
  return answer;
}

function normalizeAnswer(value){
  return (value || '').toUpperCase().replace(/[^A-Z0-9]/g,'');
}

function buildPuzzleInstance(base){
  const answer = pickPuzzleWord(base);
  const puzzle = {
    ...base,
    answer,
    answerLabel:answer,
    acceptedAnswers:[normalizeAnswer(answer)]
  };
  switch(base.cipherType){
    case 'caesar':{
      const shift = pick(base.shiftOptions || [3]);
      puzzle.artifact = caesarEnc(answer, shift);
      puzzle.keyLabel = String(shift);
      puzzle.referenceShift = shift;
      break;
    }
    case 'reverse':
      puzzle.artifact = reverseEnc(answer);
      puzzle.keyLabel = 'Read backward';
      break;
    case 'atbash':
      puzzle.artifact = atbash(answer);
      puzzle.keyLabel = 'A <-> Z';
      break;
    case 'railfence':
      puzzle.artifact = railFenceEnc(answer);
      puzzle.keyLabel = '2 rails';
      break;
    case 'scytale':{
      const cols = base.scytaleColumns || 3;
      puzzle.artifact = scytaleEnc(answer, cols);
      puzzle.keyLabel = `${cols} columns`;
      puzzle.referenceRows = Math.ceil(answer.length/cols);
      puzzle.referenceColumns = cols;
      puzzle.referenceChunkLengths = getFilledColumnLengths(answer.length, cols);
      puzzle.referenceChunks = splitByLengths(puzzle.artifact, puzzle.referenceChunkLengths).map((text, idx)=>({
        colIdx:idx,
        text
      }));
      break;
    }
    case 'columnar':{
      const order = pick(base.columnOrders || [[2,0,1]]);
      puzzle.artifact = columnarEnc(answer, order);
      puzzle.keyLabel = order.map(idx=>idx+1).join('-');
      puzzle.referenceRows = Math.ceil(answer.length/order.length);
      puzzle.referenceOrder = order;
      puzzle.referenceChunkLengths = getFilledColumnLengths(answer.length, order.length);
      const encodedChunks=splitByLengths(
        puzzle.artifact,
        order.map(colIdx=>puzzle.referenceChunkLengths[colIdx])
      );
      puzzle.referenceChunks = encodedChunks.map((text, idx)=>({
        colIdx:order[idx],
        text
      }));
      break;
    }
    default:
      puzzle.artifact = answer;
      puzzle.keyLabel = base.keyLabel || '-';
  }
  return puzzle;
}

function genPuzzle(roomIdx){
  const base = getRoomPuzzle(roomIdx);
  return buildPuzzleInstance(base);
}

function genPracticePuzzle(roomIdx){
  const base = localizeRoomPuzzle(ROOM_PUZZLES[roomIdx] || ROOM_PUZZLES[0], roomIdx);
  return buildPuzzleInstance(base);
}

function getPuzzleGuide(puzzle){
  return puzzle.guide || '';
}

function getCipherStructureHint(puzzle){
  if(isEnglish()){
    switch(puzzle.cipherType){
      case 'caesar':
        return 'This is a substitution cipher: every letter changes by the same amount, so look for a fixed pattern across the whole word.';
      case 'reverse':
        return 'There is no alphabet swap here. The same letters are correct, but their order is completely reversed.';
      case 'atbash':
        return 'Atbash mirrors the alphabet from both ends: every letter has one fixed opposite.';
      case 'railfence':
        return 'This is a two-rail transposition. Letters alternate between an upper and lower path before being merged again.';
      case 'scytale':
        return 'Think of it as a short grid. Place the characters in a regular shape, then read them in the right direction.';
      case 'columnar':
        return 'The letters are intact, but the columns were read in a different order and merged into one line.';
      default:
        return 'Break the artifact into small pieces and look for the pattern that stays consistent across the word.';
    }
  }
  switch(puzzle.cipherType){
    case 'caesar':
      return 'هذه الشيفرة من نوع substitution: كل حرف يتغير بالمقدار نفسه، لذلك ابحث عن نمط ثابت عبر الكلمة كاملة.';
    case 'reverse':
      return 'هنا لا يوجد تبديل للأبجدية أصلًا؛ الحروف نفسها صحيحة لكن ترتيبها مقلوب بالكامل.';
    case 'atbash':
      return 'Atbash يعكس طرفي الأبجدية: بداية السطر تقابل نهايته، وكل حرف له مرآته الثابتة.';
    case 'railfence':
      return 'هذه transposition على سطرين: الحروف تتناوب بين مسار علوي ومسار سفلي قبل دمجها من جديد.';
    case 'scytale':
      return 'فكّر فيها كشبكة قصيرة؛ املأ الخانات بطريقة منتظمة ثم أعد القراءة بالاتجاه الصحيح.';
    case 'columnar':
      return 'هنا الحروف نفسها سليمة، لكن الأعمدة قُرئت بترتيب مختلف ثم دُمجت في سطر واحد.';
    default:
      return 'قسّم الأثر إلى أجزاء قصيرة وابحث عن النمط الذي يظل ثابتًا عبر كامل الكلمة.';
  }
}

function getCipherKeyHint(puzzle){
  if(isEnglish()){
    switch(puzzle.cipherType){
      case 'caesar':
        return `The key is ${puzzle.keyLabel}. Shift every letter by the same amount to recover the original text.`;
      case 'reverse':
        return 'The key is only the reading direction: start at the last letter and move toward the first.';
      case 'atbash':
        return `The key is fixed: ${puzzle.keyLabel}. Use the A↔Z and B↔Y map on every letter.`;
      case 'railfence':
        return `The key is ${puzzle.keyLabel}. Split the letters between an upper and lower rail, then rebuild them.`;
      case 'scytale':
        return `The key is ${puzzle.keyLabel}. Build a grid with the shown column count, then read rows to recover the word.`;
      case 'columnar':
        return `The key is the column order ${puzzle.keyLabel}. Return the columns to natural order before reading.`;
      default:
        return 'Use the displayed key directly and keep the transformation type the same.';
    }
  }
  switch(puzzle.cipherType){
    case 'caesar':
      return `المفتاح هو ${puzzle.keyLabel}. أزح كل حرف بالمقدار نفسه حتى يعود النص إلى شكله الأصلي.`;
    case 'reverse':
      return 'المفتاح هنا هو اتجاه القراءة فقط: ابدأ من آخر حرف وتقدم نحو الأول.';
    case 'atbash':
      return `المفتاح ثابت: ${puzzle.keyLabel}. استخدم خريطة A↔Z و B↔Y على كل حرف.`;
    case 'railfence':
      return `المفتاح هو ${puzzle.keyLabel}. وزّع الأحرف بالتناوب بين سطر علوي وسطر سفلي ثم أعد تركيبها.`;
    case 'scytale':
      return `المفتاح هو ${puzzle.keyLabel}. ابنِ شبكة بعدد الأعمدة المذكور ثم اقرأ الصفوف لاستعادة الكلمة.`;
    case 'columnar':
      return `المفتاح هو ترتيب الأعمدة ${puzzle.keyLabel}. أعد الأعمدة إلى ترتيبها الطبيعي قبل القراءة.`;
    default:
      return 'استعمل المفتاح المعروض مباشرة ولا تغيّر نوع التحويل من عندك.';
  }
}

function getCipherProcessHint(puzzle){
  if(puzzle.cipherType==='scytale'){
    const lengths=(puzzle.referenceChunkLengths || []).join('-');
    if(isEnglish()) return `The artifact length is ${puzzle.artifact.length}. With ${puzzle.referenceColumns} columns, that gives ${puzzle.referenceRows} rows. Split it into column chunks of ${lengths}, return them left to right, then read the rows.`;
    return `طول الأثر ${puzzle.artifact.length}، ومع ${puzzle.referenceColumns} أعمدة فهذا يعني ${puzzle.referenceRows} صفوف. قسّمه ذهنيًا إلى كتل أعمدة بطول ${lengths} ثم أعدها من اليسار إلى اليمين واقرأ الصفوف.`;
  }
  if(puzzle.cipherType==='columnar'){
    const layout=(puzzle.referenceChunks || []).map((chunk, idx)=>isEnglish() ? `chunk ${idx+1} → column ${chunk.colIdx+1}` : `الكتلة ${idx+1} → العمود ${chunk.colIdx+1}`).join(isEnglish() ? ', ' : '، ');
    if(isEnglish()) return `This is not a new grid. These are the same columns after reordering. You have ${puzzle.referenceRows} rows, and the current text arrives as: ${layout}. Return the columns to 1-2-3, then read the rows.`;
    return `هذه ليست شبكة جديدة؛ إنها الأعمدة نفسها بعد إعادة ترتيبها. لديك ${puzzle.referenceRows} صفوف، والنص الحالي يصل بهذه الصورة: ${layout}. بعد إرجاع الأعمدة إلى 1-2-3 اقرأ الصفوف.`;
  }
  return '';
}

function getProgressiveHint(puzzle, step){
  const answer = String(puzzle?.answerLabel || puzzle?.answer || '').toUpperCase();
  if(!answer) return isEnglish() ? 'No hint is available right now.' : 'لا يوجد تلميح متاح الآن.';
  const revealable = answer
    .split('')
    .map((ch, idx)=>(/[A-Z0-9]/.test(ch) ? idx : -1))
    .filter(idx=>idx>=0);
  if(!revealable.length) return isEnglish() ? `Answer: ${answer}` : `الحل: ${answer}`;

  battle.hintRevealedIndices = Array.from(new Set(battle.hintRevealedIndices || []))
    .filter(idx=>revealable.includes(idx))
    .sort((a,b)=>a-b);

  const hidden = revealable.filter(idx=>!battle.hintRevealedIndices.includes(idx));
  if(hidden.length){
    const nextIndex = hidden[getWordRandomInt(hidden.length)];
    battle.hintRevealedIndices.push(nextIndex);
    battle.hintRevealedIndices.sort((a,b)=>a-b);
  }

  const masked = answer.split('').map((ch, idx)=>{
    if(!/[A-Z0-9]/.test(ch)) return ch;
    return battle.hintRevealedIndices.includes(idx) ? ch : '_';
  }).join(' ');

  return battle.hintRevealedIndices.length >= revealable.length
    ? (isEnglish() ? `Full answer revealed: ${masked}` : `انكشف الحل كاملًا: ${masked}`)
    : (isEnglish() ? `New letter revealed: ${masked}` : `انكشف حرف جديد: ${masked}`);
}

function formatReferenceChunks(chunks, formatter){
  return (chunks || []).map((chunk, idx)=>formatter(chunk, idx)).join(' / ');
}

function buildScytaleReference(puzzle){
  const cols = puzzle.referenceColumns || 3;
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/cols);
  const lengths = (puzzle.referenceChunkLengths || getFilledColumnLengths((puzzle.artifact || '').length, cols)).join(' - ');
  const chunkText = formatReferenceChunks(
    puzzle.referenceChunks || [],
    chunk=>`C${chunk.colIdx+1}=${chunk.text}`
  );
  return `<div class="caesar-table">
    <div class="cp-hint cp-hint--meta">${cols} COLUMNS / ${rows} ROWS</div>
    <div class="cp-hint cp-hint--gold">${isEnglish() ? `First split the artifact into columns with these lengths: ${lengths}` : `قسّم الأثر أولًا إلى أعمدة بهذا الطول: ${lengths}`}</div>
    <div class="cp-hint cp-hint--meta">${chunkText}</div>
    <div class="cp-hint cp-hint--note">${isEnglish() ? 'After returning the chunks to columns 1, 2, then 3, read rows horizontally.' : 'بعد إعادة الكتل إلى الأعمدة 1 ثم 2 ثم 3، اقرأ الصفوف أفقياً.'}</div>
  </div>`;
}

function buildColumnarReference(puzzle){
  const order = puzzle.referenceOrder || [2,0,1];
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/order.length);
  const chunkText = formatReferenceChunks(
    puzzle.referenceChunks || [],
    chunk=>`[${chunk.colIdx+1}] ${chunk.text}`
  );
  return `<div class="caesar-table">
    <div class="cp-hint cp-hint--meta">COLUMN ORDER: ${order.map(idx=>idx+1).join(' - ')} / ${rows} ROWS</div>
    <div class="cp-hint cp-hint--gold">${isEnglish() ? 'The cipher text arrived as column chunks in this order:' : 'النص المشفّر خرج ككتل أعمدة بهذا الترتيب:'}</div>
    <div class="cp-hint cp-hint--meta">${chunkText}</div>
    <div class="cp-hint cp-hint--note">${isEnglish() ? 'Place each chunk in its correct column, then read rows left to right.' : 'ضع كل كتلة في عمودها الصحيح ثم اقرأ الصفوف من اليسار إلى اليمين.'}</div>
  </div>`;
}

function getCipherProcessHintV2(puzzle){
  if(puzzle.cipherType==='scytale'){
    const chunkText = formatReferenceChunks(
      puzzle.referenceChunks || [],
      chunk=>`C${chunk.colIdx+1}=${chunk.text}`
    );
    if(isEnglish()) return `Split the text into short columns first: ${chunkText}. Then return the columns to 1, 2, and 3, and read the rows.`;
    return `قسّم النص إلى أعمدة قصيرة أولًا: ${chunkText}. بعد ذلك أعد الأعمدة إلى 1 ثم 2 ثم 3، ثم اقرأ الصفوف.`;
  }
  if(puzzle.cipherType==='columnar'){
    const layout=(puzzle.referenceChunks || []).map((chunk, idx)=>isEnglish() ? `chunk ${idx+1} belongs to column ${chunk.colIdx+1}` : `الكتلة ${idx+1} للعمود ${chunk.colIdx+1}`).join(isEnglish() ? ', ' : '، ');
    const lengths=(puzzle.referenceChunkLengths || []).join('-');
    if(isEnglish()) return `You have ${puzzle.referenceRows} rows, and column lengths are ${lengths}. The mixed reading order is ${puzzle.keyLabel}: ${layout}. Return the columns to 1-2-3, then read the rows.`;
    return `لديك ${puzzle.referenceRows} صفوف، وأطوال الأعمدة ${lengths}. هذا هو ترتيب القراءة بعد الخلط ${puzzle.keyLabel}: ${layout}. أعد الأعمدة إلى 1-2-3 ثم اقرأ الصفوف.`;
  }
  return getCipherProcessHint(puzzle);
}

function buildCipherGridTable(headers, rows){
  return `<table class="cipher-grid-table">
    <thead><tr>${headers.map(head=>`<th>${head}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(row=>`<tr>${row.map(cell=>{
      const empty = cell===undefined || cell===null || cell==='';
      return `<td class="${empty ? 'empty' : ''}">${empty ? '&middot;' : cell}</td>`;
    }).join('')}</tr>`).join('')}</tbody>
  </table>`;
}

function buildScytaleLayoutRows(puzzle){
  const cols = puzzle.referenceColumns || 3;
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/cols);
  let slot = 1;
  const max = (puzzle.answer || '').length;
  return Array.from({length:rows},()=>Array.from({length:cols},()=>{
    if(slot>max) return '';
    return String(slot++);
  }));
}

function buildColumnarResolvedRows(puzzle){
  const order = puzzle.referenceOrder || [2,0,1];
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/order.length);
  const columns = Array.from({length:order.length},()=>[]);
  (puzzle.referenceChunks || []).forEach(chunk=>{
    columns[chunk.colIdx] = chunk.text.split('');
  });
  return Array.from({length:rows},(_,rowIdx)=>Array.from({length:order.length},(_,colIdx)=>columns[colIdx][rowIdx] || ''));
}

function buildColumnarScrambledRows(puzzle){
  const order = puzzle.referenceOrder || [2,0,1];
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/order.length);
  const columns = (puzzle.referenceChunks || []).map(chunk=>chunk.text.split(''));
  return Array.from({length:rows},(_,rowIdx)=>Array.from({length:order.length},(_,colIdx)=>columns[colIdx]?.[rowIdx] || ''));
}

function buildScytaleReferenceV2(puzzle){
  const cols = puzzle.referenceColumns || 3;
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/cols);
  const headers = Array.from({length:cols},(_,idx)=>`C${idx+1}`);
  const layoutGrid = buildCipherGridTable(headers, buildScytaleLayoutRows(puzzle));
  return `<div class="caesar-table">
    <div class="cp-hint cp-hint--meta">${cols} COLUMNS / ${rows} ROWS</div>
    ${layoutGrid}
    <div class="cipher-grid-note">${isEnglish() ? 'This is only the grid shape. Return the letters to the three columns, then read rows horizontally.' : 'هذا قالب الشبكة فقط. أعد الحروف إلى الأعمدة الثلاثة ثم اقرأ الصفوف أفقيًا.'}</div>
  </div>`;
}

function buildColumnarReferenceV2(puzzle){
  const order = puzzle.referenceOrder || [2,0,1];
  const rows = puzzle.referenceRows || Math.ceil((puzzle.artifact || '').length/order.length);
  const headers = order.map(idx=>String(idx+1));
  const scrambledGrid = buildCipherGridTable(headers, buildColumnarScrambledRows(puzzle));
  return `<div class="caesar-table">
    <div class="cp-hint cp-hint--meta">READ ORDER: ${order.map(idx=>idx+1).join(' - ')} / ${rows} ROWS</div>
    ${scrambledGrid}
    <div class="cipher-grid-note">${isEnglish() ? 'These are the columns as they arrived after mixing. Reorder them to 1-2-3, then read rows horizontally.' : 'هذه هي الأعمدة كما وصلت بعد الخلط. أعد ترتيبها إلى 1-2-3 ثم اقرأ الصفوف أفقيًا.'}</div>
  </div>`;
}

function buildArtifactBlock(puzzle){
  const cls = puzzle.displayStyle === 'code' ? 'cp-encoded' : 'cp-artifact-text';
  return `<div class="${cls}">${puzzle.artifact}</div>`;
}

function buildReferenceBlock(puzzle){
  if(puzzle.referenceType==='caesar') return buildCaesarTable(puzzle.referenceShift || 3);
  if(puzzle.referenceType==='reverse') return buildReverseReference();
  if(puzzle.referenceType==='atbash') return buildAtbashTable();
  if(puzzle.referenceType==='railfence') return buildRailFenceReference();
  if(puzzle.referenceType==='scytale') return buildScytaleReferenceV2(puzzle);
  if(puzzle.referenceType==='columnar') return buildColumnarReferenceV2(puzzle);
  return '';
}

function formatTimer(seconds){
  return `${Math.max(0, seconds)}s`;
}

function initG(){
  G={
    hero:{x:0,z:8,hp:100,maxHp:100},
    nodes:[], medkits:[], layer:1, turns:0,
    keyCollected:false,
    roomClearing:false,
    inputLocked:false,
    mode:MODE_RUN,
    extractionActive:false,
    tutorialStations:[],
    tutorialExhibits:[],
    tutorialPrompt:null,
    practiceClears:{}
  };
}

function generateNodes(room){
  const nodes=[]; for(let x=0;x<GS;x++) for(let z=0;z<GS;z++) nodes.push({x,z,state:FREE,mesh:null,light:null});
  const get=(x,z)=>nodes.find(n=>n.x===x&&n.z===z);
  get(0,8).state=START;
  get(8,0).state=GOAL;
  G.roomWalls = buildRoomWalls(room);
  G.roomWalls.forEach(w=>{ get(w.x,w.z).state=WALL; });
  return nodes;
}

function generateBossNodes(){
  const nodes=[]; for(let x=0;x<GS;x++) for(let z=0;z<GS;z++) nodes.push({x,z,state:FREE,mesh:null,light:null});
  const get=(x,z)=>nodes.find(n=>n.x===x&&n.z===z);
  get(4,8).state=START;
  get(4,0).state=GOAL;
  [
    {x:1,z:2},{x:7,z:2},
    {x:2,z:3},{x:6,z:3},
    {x:1,z:5},{x:7,z:5},
    {x:2,z:6},{x:6,z:6}
  ].forEach(w=>{
    const node=get(w.x,w.z);
    if(node) node.state=WALL;
  });
  return nodes;
}

function pickSpawnPointForRoute(route){
  const startX=0, startZ=8;
  const points = (route && route.length) ? route : [{x:8,z:0}];
  const preferredPoints = points.filter(pt=>{
    const dx=Math.abs(pt.x-startX), dz=Math.abs(pt.z-startZ);
    return (dx+dz)>=7 && !(pt.x<=2 && pt.z>=6);
  });
  const candidates = preferredPoints.length ? preferredPoints : points;
  let best = {point:candidates[0] || {x:8,z:0}, index:0, score:-Infinity};
  (route || []).forEach((pt, idx)=>{
    if(!candidates.includes(pt)) return;
    const dx=Math.abs(pt.x-startX), dz=Math.abs(pt.z-startZ);
    const manhattan=dx+dz;
    const chebyshev=Math.max(dx,dz);
    const immediateThreat = (dx===1&&dz===1) || (dx+dz===1);
    const startQuadrant = pt.x<=2 && pt.z>=6;
    const closeToStart = manhattan<7;
    const score = (manhattan*14) + (chebyshev*5) + (pt.x*2) + ((startZ-pt.z)*2)
      - (immediateThreat ? 140 : 0)
      - (startQuadrant ? 120 : 0)
      - (closeToStart ? 70 : 0);
    if(score>best.score) best = {point:pt, index:idx, score};
  });
  return best;
}

function initDaemons(room){
  daemonGroups.forEach(d=>{if(d.mesh) scene.remove(d.mesh);});
  daemonGroups=[]; daemonLerps=[];
  if(isTutorialMode()) return;
  const routes=getRoomPatrols(room);
  const roomPlan = ROOM_DAEMON_PLANS[room-1] || [];
  const desiredCount = roomPlan.length || ROOM_DAEMONS[G.layer-1] || routes.length;
  const count=Math.max(1, Math.min(routes.length, desiredCount));
  const spawns=routes.slice(0,count).map(route=>{
    const picked = pickSpawnPointForRoute(route);
    return {
      point:picked.point,
      routeIndex:picked.index,
      route:route
    };
  });
  if(!spawns.length) spawns.push({point:{x:8,z:0}, routeIndex:0, route:[{x:8,z:0}]});
  const forcedKeyHolderIndex = roomPlan.findIndex(plan=>plan.hasKey);
  const keyHolderIndex = forcedKeyHolderIndex>=0 ? forcedKeyHolderIndex : Math.floor(Math.random()*spawns.length);
  spawns.forEach((spawn,idx)=>{
    const s = spawn.point;
    const plan = roomPlan[idx] || {};
    const type = plan.type || (idx===0 ? 'rook' : idx===1 ? 'bishop' : (idx%2===0 ? 'rook' : 'bishop'));
    const dm=buildDaemonMesh(type); const wp=gToW(s.x,s.z); dm.position.set(wp.x,0,wp.z); scene.add(dm);
    daemonGroups.push({
      id:(window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : String(Math.random()),
      x:s.x,z:s.z,mesh:dm,hasKey:false,route:spawn.route || [{x:s.x,z:s.z}],routeIndex:spawn.routeIndex || 0,
      type, personality:plan.personality || 'default', facing:{x:0,z:1}, alertTurns:0, commitTurns:0, freezeTurns:0,
      lastKnownHero:null, searchTurns:0, coverTurns:0
    });
  });
  if(!daemonGroups.length){
    const dm=buildDaemonMesh('rook'); const wp=gToW(8,0); dm.position.set(wp.x,0,wp.z); scene.add(dm);
    daemonGroups.push({id:String(Math.random()),x:8,z:0,mesh:dm,hasKey:true,route:[{x:8,z:0},{x:8,z:1},{x:7,z:1},{x:7,z:0}],routeIndex:0,type:'rook',personality:'default',facing:{x:0,z:1},alertTurns:0,commitTurns:0,freezeTurns:0,lastKnownHero:null,searchTurns:0,coverTurns:0});
  }
  if(daemonGroups[keyHolderIndex]) daemonGroups[keyHolderIndex].hasKey = true;
  daemonGroups.forEach(dm=>{
    dm.callsign = dm.hasKey
      ? getKeyholderCallsign(room)
      : '';
    if(dm.hasKey && dm.mesh){
      const marker = buildKeyBearerMarker(dm.type);
      dm.keyMarker = marker;
      dm.mesh.add(marker);
    }
  });
}

function getNodeState(x,z){
  const n=G.nodes.find(nn=>nn.x===x&&nn.z===z);
  return n?n.state:WALL;
}

function isInsideBoard(x,z){
  return x>=0&&x<GS&&z>=0&&z<GS;
}

function isRookStep(fromX,fromZ,toX,toZ){
  const dx=Math.abs(toX-fromX), dz=Math.abs(toZ-fromZ);
  const dist=dx+dz;
  return ((dx>0&&dz===0)||(dx===0&&dz>0)) && dist>=1 && dist<=ROOK_STEP_LIMIT;
}

function isBishopStep(fromX,fromZ,toX,toZ){
  return Math.abs(toX-fromX)===1&&Math.abs(toZ-fromZ)===1;
}

function getRookPathCells(fromX,fromZ,toX,toZ){
  const dx=toX-fromX, dz=toZ-fromZ;
  if(dx!==0 && dz!==0) return [];
  const dist=Math.abs(dx)+Math.abs(dz);
  const sx=Math.sign(dx), sz=Math.sign(dz);
  const cells=[];
  for(let i=1;i<=dist;i++){
    cells.push({x:fromX+sx*i,z:fromZ+sz*i});
  }
  return cells;
}

function isRookPathClear(fromX,fromZ,toX,toZ){
  if(!isRookStep(fromX,fromZ,toX,toZ)) return false;
  return getRookPathCells(fromX,fromZ,toX,toZ).every(cell=>getNodeState(cell.x,cell.z)!==WALL);
}

function isBishopPathClear(fromX,fromZ,toX,toZ){
  const dx=toX-fromX, dz=toZ-fromZ;
  if(Math.abs(dx)!==Math.abs(dz) || dx===0) return false;
  const dist=Math.abs(dx);
  const sx=Math.sign(dx), sz=Math.sign(dz);
  for(let i=1;i<=dist;i++){
    const nx=fromX+sx*i, nz=fromZ+sz*i;
    if(getNodeState(nx,nz)===WALL) return false;
  }
  return true;
}

function wouldCollideWithHero(dm,toX,toZ){
  if(dm.type==='rook'){
    return getRookPathCells(dm.x,dm.z,toX,toZ).some(cell=>cell.x===G.hero.x && cell.z===G.hero.z);
  }
  return toX===G.hero.x && toZ===G.hero.z;
}

function isDaemonStepLegal(dm,toX,toZ,occupied=null){
  if(!isInsideBoard(toX,toZ)) return false;
  if(occupied && occupied.has(keyOf(toX,toZ))) return false;
  if(getNodeState(toX,toZ)===WALL) return false;
  if(dm.type==='rook') return isRookPathClear(dm.x,dm.z,toX,toZ);
  if(!isBishopStep(dm.x,dm.z,toX,toZ)) return false;
  return isBishopPathClear(dm.x,dm.z,toX,toZ);
}

function getLegalMoves(dm, occupied){
  if(dm.type==='rook'){
    const raw = [];
    for(let dist=1;dist<=ROOK_STEP_LIMIT;dist++){
      raw.push(
        {x:dm.x+dist,z:dm.z},{x:dm.x-dist,z:dm.z},
        {x:dm.x,z:dm.z+dist},{x:dm.x,z:dm.z-dist}
      );
    }
    return raw.filter(m=>isDaemonStepLegal(dm,m.x,m.z,occupied));
  }

  const raw = [
    {x:dm.x+1,z:dm.z+1},{x:dm.x+1,z:dm.z-1},
    {x:dm.x-1,z:dm.z+1},{x:dm.x-1,z:dm.z-1}
  ];
  return raw.filter(m=>isDaemonStepLegal(dm,m.x,m.z,occupied));
}

function canCatchFrom(dm, fromX, fromZ){
  return wouldCollideWithHero(dm, fromX, fromZ);
}

function hasRookSightFrom(fromX,fromZ,targetX,targetZ,range=ROOK_SIGHT_RANGE){
  const dx=targetX-fromX, dz=targetZ-fromZ;
  if(dx!==0 && dz!==0) return false;
  const dist=Math.abs(dx)+Math.abs(dz);
  if(dist===0||dist>range) return false;
  const sx=Math.sign(dx), sz=Math.sign(dz);
  for(let i=1;i<dist;i++){
    const tx=fromX+sx*i, tz=fromZ+sz*i;
    if(getNodeState(tx,tz)===WALL) return false;
  }
  return true;
}

function hasBishopSightFrom(fromX,fromZ,targetX,targetZ,range=BISHOP_SIGHT_RANGE){
  const dx=targetX-fromX, dz=targetZ-fromZ;
  if(Math.abs(dx)!==Math.abs(dz) || dx===0) return false;
  const dist=Math.abs(dx);
  if(dist>range) return false;
  const sx=Math.sign(dx), sz=Math.sign(dz);
  for(let i=1;i<dist;i++){
    const nx=fromX+sx*i, nz=fromZ+sz*i;
    if(getNodeState(nx,nz)===WALL) return false;
  }
  return true;
}

function hasLineOfSightRook(dm){
  return hasRookSightFrom(dm.x,dm.z,G.hero.x,G.hero.z);
}

function hasLineOfSightBishop(dm){
  return hasBishopSightFrom(dm.x,dm.z,G.hero.x,G.hero.z);
}

function canDaemonSeeHero(dm){
  return dm.type==='rook' ? hasLineOfSightRook(dm) : hasLineOfSightBishop(dm);
}

function hasAlignedCoverBetween(fromX,fromZ,targetX,targetZ){
  const dx=targetX-fromX, dz=targetZ-fromZ;
  const rookLine = dx===0 || dz===0;
  const bishopLine = Math.abs(dx)===Math.abs(dz);
  if(!rookLine && !bishopLine) return false;
  const steps=rookLine ? Math.abs(dx)+Math.abs(dz) : Math.abs(dx);
  if(steps<=1) return false;
  const sx=Math.sign(dx), sz=Math.sign(dz);
  for(let i=1;i<steps;i++){
    if(getNodeState(fromX+sx*i,fromZ+sz*i)===WALL) return true;
  }
  return false;
}

function isHeroBehindAdjacentCover(dm){
  const hx=G.hero.x, hz=G.hero.z;
  const dx=dm.x-hx, dz=dm.z-hz;
  const probes=[];
  if(dx!==0 && Math.abs(dx)>=Math.abs(dz)) probes.push({x:hx+Math.sign(dx),z:hz});
  if(dz!==0 && Math.abs(dz)>=Math.abs(dx)) probes.push({x:hx,z:hz+Math.sign(dz)});
  if(dx!==0 && dz!==0){
    probes.push({x:hx+Math.sign(dx),z:hz});
    probes.push({x:hx,z:hz+Math.sign(dz)});
  }
  const seen=new Set();
  return probes.some(p=>{
    const key=keyOf(p.x,p.z);
    if(seen.has(key)) return false;
    seen.add(key);
    return getNodeState(p.x,p.z)===WALL;
  });
}

function hasNearbyCover(x,z){
  return [
    {x:x+1,z},{x:x-1,z},{x,z:z+1},{x,z:z-1}
  ].some(p=>getNodeState(p.x,p.z)===WALL);
}

function isHeroWellHiddenFrom(dm){
  if(canDaemonSeeHero(dm)) return false;
  if(hasAlignedCoverBetween(dm.x,dm.z,G.hero.x,G.hero.z)) return true;
  const dist=Math.abs(dm.x-G.hero.x)+Math.abs(dm.z-G.hero.z);
  if(dist>=5 && hasNearbyCover(G.hero.x,G.hero.z)) return true;
  if(dist>=7) return true;
  return dist>1 && isHeroBehindAdjacentCover(dm);
}

function getChaseTargetTo(dm, target, occupied){
  if(!target) return null;
  if(dm.type==='rook'){
    const dx=target.x-dm.x, dz=target.z-dm.z;
    if(dx!==0 && dz!==0) return null;
    const sx=Math.sign(dx), sz=Math.sign(dz);
    const dist=Math.abs(dx)+Math.abs(dz);
    for(let step=Math.min(ROOK_STEP_LIMIT, dist);step>=1;step--){
      const tx=dm.x+(sx*step), tz=dm.z+(sz*step);
      if(isDaemonStepLegal(dm,tx,tz,occupied)) return {x:tx,z:tz};
    }
    return null;
  }
  const dx=target.x-dm.x, dz=target.z-dm.z;
  if(Math.abs(dx)!==Math.abs(dz) || dx===0) return null;
  const sx=Math.sign(dx), sz=Math.sign(dz);
  const tx=dm.x+sx, tz=dm.z+sz;
  return isDaemonStepLegal(dm,tx,tz,occupied) ? {x:tx,z:tz} : null;
}

function getChaseTarget(dm, occupied){
  return getChaseTargetTo(dm, G.hero, occupied);
}

function getDistanceToPoint(dm, move, target){
  const dx=Math.abs(move.x-target.x);
  const dz=Math.abs(move.z-target.z);
  return dm.type==='bishop'
    ? Math.max(dx,dz) + (Math.abs(dx-dz)*0.25)
    : dx+dz;
}

function moveThreatensTarget(dm, move, target){
  return dm.type==='rook'
    ? hasRookSightFrom(move.x,move.z,target.x,target.z)
    : hasBishopSightFrom(move.x,move.z,target.x,target.z);
}

function pickAggroMove(dm, legalMoves, target, preferredMove=null){
  if(!target || !legalMoves.length) return {x:dm.x,z:dm.z};
  const profile=getDaemonProfile(dm);
  const preferredKey=preferredMove ? keyOf(preferredMove.x,preferredMove.z) : null;
  const ranked=legalMoves.map(move=>{
    const catches=canCatchFrom(dm,move.x,move.z);
    const preferred=preferredKey && keyOf(move.x,move.z)===preferredKey;
    const threatens=moveThreatensTarget(dm,move,target);
    const dist=getDistanceToPoint(dm,move,target);
    const align=dm.type==='rook'
      ? (move.x===target.x || move.z===target.z)
      : (Math.abs(move.x-target.x)===Math.abs(move.z-target.z));
    const closing=getDistanceToPoint(dm,move,target)<getDistanceToPoint(dm,{x:dm.x,z:dm.z},target);
    const facing=(Math.sign(move.x-dm.x)===dm.facing.x && Math.sign(move.z-dm.z)===dm.facing.z);
    let score=dist*9;
    if(catches) score-=100;
    if(preferred) score-=24;
    if(threatens) score-=10;
    if(align) score-=3;
    if(closing) score-=5;
    if(facing) score-=1.2;
    return {move,score};
  }).sort((a,b)=>a.score-b.score);
  const best=ranked[0];
  if(!best) return {x:dm.x,z:dm.z};
  if(best.score<-50 || preferredKey) return best.move;
  const spread=dm.commitTurns>0 ? 9 : 6;
  const maxChoices=Math.max(1, Math.min(ranked.length, (profile.candidateDepth || 1) + 2));
  const candidates=ranked.filter((entry,idx)=>idx<maxChoices && entry.score<=best.score+spread);
  const weights=candidates.map((_,idx)=>idx===0 ? profile.bestWeight : idx===1 ? profile.secondWeight : profile.thirdWeight);
  let roll=Math.random()*weights.reduce((sum,w)=>sum+w,0);
  for(let i=0;i<candidates.length;i++){
    roll-=weights[i];
    if(roll<=0) return candidates[i].move;
  }
  return best.move;
}

function pickSearchMove(dm, legalMoves, target){
  if(!target || !legalMoves.length) return null;
  const profile=getDaemonProfile(dm);
  const sorted=legalMoves.slice().sort((a,b)=>{
    const distA=getDistanceToPoint(dm,a,target);
    const distB=getDistanceToPoint(dm,b,target);
    if(distA!==distB) return distA-distB;

    const alignA = dm.type==='rook'
      ? ((a.x===target.x || a.z===target.z) ? 0 : 1)
      : (Math.abs(a.x-target.x)===Math.abs(a.z-target.z) ? 0 : 1);
    const alignB = dm.type==='rook'
      ? ((b.x===target.x || b.z===target.z) ? 0 : 1)
      : (Math.abs(b.x-target.x)===Math.abs(b.z-target.z) ? 0 : 1);
    return alignA-alignB;
  });

  const choiceCount=Math.max(1, Math.min(sorted.length, (profile.candidateDepth || 1) + 1));
  return sorted[getWordRandomInt(choiceCount)] || sorted[0] || null;
}

function buildCaesarTable(shift){
  const alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return `<div class="caesar-table"><div class="cp-hint cp-hint--meta">KEY ${shift}</div><div class="ct-row">${buildCipherRow(alpha)}</div></div>`;
}

function buildReverseReference(){
  return `<div class="caesar-table"><div class="cp-hint cp-hint--meta">READ FROM RIGHT TO LEFT</div></div>`;
}

function buildAtbashTable(){
  const alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const reversed=alpha.split('').reverse().join('');
  return `<div class="caesar-table"><div class="ct-row">${buildCipherRow(alpha)}</div><div class="ct-row ct-row--atbash">${buildCipherRow(reversed)}</div></div>`;
}

function buildRailFenceReference(){
  return `<div class="caesar-table"><div class="cp-hint cp-hint--meta">2 RAILS: TOP = 1,3,5 ... / BOTTOM = 2,4,6 ...</div></div>`;
}

function showPuzzlePanel(){
}

function getPuzzleTimeLimit(puzzle){
  if(!puzzle) return BATTLE_TIME_LIMIT;
  if(puzzle.cipherType==='scytale') return BATTLE_TIME_LIMIT + 3;
  if(puzzle.cipherType==='columnar') return BATTLE_TIME_LIMIT + 4;
  return BATTLE_TIME_LIMIT;
}

function stopBattleTimer(){
  clearInterval(battle.timer);
  battle.timer=null;
}

function startBattleTimer(){
  stopBattleTimer();
  battle.timer=setInterval(()=>{
    if(!battle.active) return;
    battle.timeLeft=Math.max(0,battle.timeLeft-1);
    updateBattleTimerDisplay();
    if(battle.timeLeft<=0){
      heroTakeDamage(BATTLE_TICK_DAMAGE,{deferGameOver:true});
      log(isEnglish() ? `// Timer cycle ended: -${BATTLE_TICK_DAMAGE} HP` : `// انتهت دورة المؤقت: -${BATTLE_TICK_DAMAGE} HP`,'dmg');
      if(G.hero.hp<=0){
        stopBattleTimer();
        closeBattle(false,{reason:'timeout'});
        return;
      }
      battle.timeLeft=getPuzzleTimeLimit(battle.puzzle);
      updateBattleTimerDisplay();
    }
  },1000);
}

function updateBattleTimerDisplay(){
  const label = formatTimer(battle.timeLeft);
  document.querySelectorAll('[data-battle-timer]').forEach(el=>{
    el.textContent = label;
    const pill = el.closest('.timer-pill');
    if(pill) pill.classList.toggle('alert', battle.timeLeft <= 3);
  });
}

function buildBossSegments(currentHp, maxHp){
  return Array.from({length:maxHp},(_,idx)=>{
    const active = idx < currentHp;
    return `<span class="boss-seg ${active ? 'on' : 'off'}"></span>`;
  }).join('');
}

function openPracticeStation(station){
  if(!station) return;
  battle.active=true;
  battle.mode='practice';
  battle.daemonId=null;
  battle.daemonType='practice';
  battle.keyCarrier=false;
  battle.boss=null;
  battle.practice={stationId:station.id, label:station.label, roomIdx:station.roomIdx};
  battle.puzzle=genPracticePuzzle(station.roomIdx);
  battle.hintStep=0;
  battle.timeLeft=0;
  showBattleOverlay(textFor('freeTraining'), '#00e5ff', fillText('practiceOverlay',{label:station.label}));
  renderBattlePanel();
}

function showBattleOverlay(title, titleColor, sub){
  G.inputLocked=true;
  setDisplay('battle-screen','flex');
  document.getElementById('battle-screen').style.pointerEvents='auto';
  const heading=document.querySelector('.battle-title');
  if(heading){
    heading.textContent = title;
    heading.style.color = titleColor || '';
  }
  setText('battle-sub', sub);
}

function setupBossChamber(){
  clearMedkits();
  daemonGroups.forEach(d=>{ if(d.mesh) scene.remove(d.mesh); });
  daemonGroups=[];
  daemonLerps=[];
  clearBossSceneState();

  G.layer=ROOM_COUNT;
  G.hero.x=4;
  G.hero.z=8;
  G.keyCollected=false;
  G.roomClearing=false;
  G.inputLocked=true;
  G.extractionActive=false;
  G.tutorialPrompt=null;
  G.roomWalls=[];
  G.nodes=generateBossNodes();

  applyRoomTheme(getRoomTheme(ROOM_COUNT));
  buildGridVisuals(G.nodes);
  clearRoomDecor();
  const chamber=buildBossChamberDecor(currentTheme);

  const wp=gToW(G.hero.x,G.hero.z);
  heroGroup.position.set(wp.x,0,wp.z);
  camFollow.x=wp.x;
  camFollow.z=wp.z;
  updateNodeHighlight();
  updateMinimap();
  updateHud();

  const seatPos=new THREE.Vector3();
  const standPos=new THREE.Vector3();
  chamber.throne.userData.seatAnchor.getWorldPosition(seatPos);
  chamber.throne.userData.standAnchor.getWorldPosition(standPos);
  chamber.archon.position.copy(seatPos);
  chamber.archon.userData.seatPos=seatPos.clone();
  chamber.archon.userData.standPos=standPos.clone();

  const throneFocus=gToW(4,1.45);
  bossSceneState.stand=0;
  bossSceneState.targetStand=0;
  bossSceneState.cameraOverride=true;
  bossSceneState.cameraPos=new THREE.Vector3(wp.x+2.8,5.9,wp.z+3.45);
  bossSceneState.lookAt=new THREE.Vector3(throneFocus.x,1.42,throneFocus.z);

  const bossProfile=getBossProfile();
  log(isEnglish() ? `// ${bossProfile.name}: the throne is open. No more guards stand between you and it.` : `// ${bossProfile.name}: العرش مفتوح الآن. لا مزيد من الحراس بينك وبينه.`,'gold');
}

function triggerBossClash(){
  if(FX.engageActive || battle.active) return;
  bossSceneState.introActive=false;
  bossSceneState.cameraOverride=false;
  FX.engageActive=true;
  G.inputLocked=true;
  setCameraKick(0.56);
  playUiTone(110,180,{type:'sawtooth',gain:0.05,endFreq:80});
  playUiTone(220,160,{type:'triangle',gain:0.03});

  const screen=document.getElementById('engage-screen');
  const card=document.getElementById('engage-card');
  const tag=document.getElementById('engage-tag');
  const title=document.getElementById('engage-title');
  const sub=document.getElementById('engage-sub');
  const piece=document.getElementById('engage-piece');
  if(!screen || !card || !tag || !title || !sub || !piece){
    FX.engageActive=false;
    startBossFight();
    return;
  }

  card.className='engage-card key';
  tag.textContent='THRONE BREACH';
  const bossProfile=getBossProfile();
  title.textContent=fillText('bossRises',{name:bossProfile.name});
  sub.textContent=textFor('bossClashSub');
  piece.textContent=`${bossProfile.name} // FINAL`;
  screen.style.display='flex';
  screen.offsetWidth;
  screen.classList.add('show');

  clearTimeout(FX.engageTimer);
  FX.engageTimer=setTimeout(()=>{
    FX.engageActive=false;
    hideEncounterScreen();
    startBossFight();
  },ENCOUNTER_TRANSITION_MS + 120);
}

function startBossEncounter(){
  showRoomTravel(
    ROOM_COUNT,
    ()=>{
      setupBossChamber();
      bossSceneState.introActive=true;
      playUiTone(124,220,{type:'triangle',gain:0.032,endFreq:98});
      playUiTone(248,260,{type:'sine',gain:0.022,endFreq:180});
      bossSceneState.riseTimer=setTimeout(()=>{
        bossSceneState.targetStand=1;
        setCameraKick(0.3);
        const bossProfile=getBossProfile();
        log(isEnglish() ? `// ${bossProfile.name} rose from the throne. Impact is close.` : `// ${bossProfile.name} نهض من فوق العرش. الاصطدام وشيك.`,'dmg');
        playUiTone(92,260,{type:'sawtooth',gain:0.048,endFreq:72});
      },720);
      bossSceneState.clashTimer=setTimeout(triggerBossClash, 1880);
    },
    {
      kicker:'THRONE APPROACH',
      title:textFor('throneApproach'),
      sub:textFor('throneApproachSub')
    }
  );
}

function startBossFight(){
  clearTimeout(bossSceneState.riseTimer);
  clearTimeout(bossSceneState.clashTimer);
  bossSceneState.riseTimer=null;
  bossSceneState.clashTimer=null;
  bossSceneState.cameraOverride=false;
  bossSceneState.introActive=false;
  const phases = ROOM_PUZZLES.map((_, idx)=>genPuzzle(idx));
  const bossProfile=getBossProfile();
  battle.active=true;
  battle.mode='boss';
  battle.daemonId=bossProfile.name;
  battle.daemonType='boss';
  battle.keyCarrier=false;
  battle.boss={
    name:bossProfile.name,
    title:bossProfile.title,
    phaseIndex:0,
    maxHp:phases.length,
    hp:phases.length,
    phases
  };
  battle.practice=null;
  battle.puzzle=phases[0];
  battle.hintStep=0;
  battle.timeLeft=getPuzzleTimeLimit(battle.puzzle);
  showBattleOverlay(textFor('throneBattle'), '#ffc040', bossProfile.intro);
  renderBattlePanel();
  updateBattleTimerDisplay();
  startBattleTimer();
}

function openBattle(daemon){
  battle.active=true;
  battle.mode='standard';
  battle.daemonId=daemon.id;
  battle.daemonType=daemon.type;
  battle.keyCarrier=daemon.hasKey;
  battle.boss=null;
  battle.practice=null;
  battle.puzzle=genPuzzle(G.layer-1);
  battle.hintStep=0;
  battle.timeLeft=getPuzzleTimeLimit(battle.puzzle);
  showBattleOverlay(
    textFor('challengeInterface'),
    '',
    daemon.hasKey
    ? fillText('keyDetected',{name:daemon.callsign || getKeyholderCallsign(G.layer)})
    : textFor('daemonDetected')
  );
  renderBattlePanel();
  updateBattleTimerDisplay();
  startBattleTimer();
}

function renderBattlePanel(){
  const p=battle.puzzle;
  const bossMode = battle.mode==='boss' && battle.boss;
  const practiceMode = battle.mode==='practice' && battle.practice;
  if(practiceMode){
    const methodLabel = p.methodLabel || p.domain;
    const keyLabel = p.keyLabel || 'N/A';
    const referenceBlock = buildReferenceBlock(p);
    const artifactBlock = buildArtifactBlock(p);
    document.getElementById('battle-panel').innerHTML=`
      <div class="battle-panel-block battle-meta">
        <div class="battle-subtle">${textFor('practiceNotice')}</div>
        <div class="battle-intel-grid">
          <div class="battle-intel-block">
            <div class="hlabel">${textFor('method')}</div>
            <div class="battle-intel-value">${methodLabel}</div>
          </div>
          <div class="battle-intel-block">
            <div class="hlabel">${textFor('key')}</div>
            <div class="battle-intel-value">${keyLabel}</div>
          </div>
        </div>
      </div>
        <div class="cp-title">${fillText('trainingPrefix',{label:battle.practice.label})}</div>
      <div class="cp-brief">${p.brief}</div>
      ${artifactBlock}
      ${referenceBlock}
      <div id="battle-hint" class="cp-feedback hint">${textFor('freeHint')}</div>
      <input id="battle-input" class="cp-input" placeholder="${textFor('answerPlaceholder')}" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" />
      <div class="cp-action">
        <button class="cp-btn" onclick="requestHint()">${textFor('hintBtn')}</button>
        <button class="cp-btn" onclick="submitBattle()">${textFor('submitBtn')}</button>
        <button class="cp-btn" onclick="closeBattle(false,{reason:'practice-close', practice:true})">${textFor('closeBtn')}</button>
      </div>`;
    const practiceInput=document.getElementById('battle-input');
    practiceInput.focus();
    practiceInput.onkeydown=(e)=>{ if(e.key==='Enter') submitBattle(); };
    return;
  }
  const bossProfile=getBossProfile();
  const pieceLabel = bossMode ? bossProfile.name : battle.daemonType==='bishop' ? 'BISHOP' : 'ROOK';
  const roleLabel = bossMode ? textFor('coreRole') : battle.keyCarrier ? textFor('keyRole') : textFor('daemonRole');
  const hpPct = Math.max(0, (G.hero.hp / G.hero.maxHp) * 100);
  const hpClass = hpPct<35 ? ' low' : hpPct<65 ? ' mid' : '';
  const referenceBlock = buildReferenceBlock(p);
  const artifactBlock = buildArtifactBlock(p);
  const methodLabel = p.methodLabel || p.domain;
  const keyLabel = p.keyLabel || 'N/A';
  const bossStrip = bossMode ? `
    <div class="boss-strip">
      <div class="boss-kicker">${textFor('finalSequence')}</div>
      <div class="boss-title">${battle.boss.title} // ${battle.boss.name}</div>
      <div class="boss-sub">${textFor('bossLayerText')}</div>
      <div class="boss-meta-grid">
        <div class="boss-meta">
          <div class="boss-meta-label">${textFor('phase')}</div>
          <div class="boss-meta-value">${battle.boss.phaseIndex + 1} / ${battle.boss.maxHp}</div>
        </div>
        <div class="boss-meta">
          <div class="boss-meta-label">${textFor('coreHealth')}</div>
          <div class="boss-meta-value">${battle.boss.hp} / ${battle.boss.maxHp}</div>
        </div>
      </div>
      <div class="boss-segments">${buildBossSegments(battle.boss.hp,battle.boss.maxHp)}</div>
    </div>` : '';
  const actionButtons = bossMode
    ? `<div class="cp-action">
      <button class="cp-btn" onclick="requestHint()">${textFor('hintBtn')}</button>
      <button class="cp-btn" onclick="submitBattle()">${textFor('submitBtn')}</button>
    </div>`
    : `<div class="cp-action">
      <button class="cp-btn" onclick="requestHint()">${textFor('hintBtn')}</button>
      <button class="cp-btn" onclick="submitBattle()">${textFor('submitBtn')}</button>
      <button class="cp-btn" onclick="closeBattle(false,{reason:'retreat'})">${textFor('retreatBtn')}</button>
    </div>`;

  document.getElementById('battle-panel').innerHTML=`
    <div class="battle-status">
      <div class="battle-panel-block">
        <div class="hlabel">${textFor('health')}</div>
        <div class="battle-hp-row">
          <div class="battle-hpbar"><div id="battle-hp-fill" class="hp-fill${hpClass}" style="width:${hpPct}%"></div></div>
          <div id="battle-hp-value" class="battle-hp-value">${G.hero.hp}/${G.hero.maxHp}</div>
        </div>
        <div class="battle-detail-stack">
          <div class="battle-detail-row">
            <span class="battle-detail-label">${textFor('target')}</span>
            <span class="battle-detail-value ${battle.keyCarrier ? 'ok' : 'warn'}">${roleLabel}</span>
          </div>
          <div class="battle-detail-row">
            <span class="battle-detail-label">${textFor('piece')}</span>
            <span class="battle-detail-value">${pieceLabel}</span>
          </div>
        </div>
      </div>
      <div class="battle-panel-block battle-meta">
        <div class="timer-pill"><span>${textFor('timer')}</span><strong data-battle-timer>${formatTimer(battle.timeLeft)}</strong></div>
        <div class="battle-intel-grid">
          <div class="battle-intel-block">
            <div class="hlabel">${textFor('method')}</div>
            <div class="battle-intel-value">${methodLabel}</div>
          </div>
          <div class="battle-intel-block">
            <div class="hlabel">${textFor('key')}</div>
            <div class="battle-intel-value">${keyLabel}</div>
          </div>
        </div>
      </div>
    </div>
    ${bossStrip}
    <div class="cp-title">${p.roomTitle}</div>
    ${artifactBlock}
    ${referenceBlock}
    <div id="battle-hint" class="cp-feedback hint">${fillText('paidHint',{damage:HINT_DAMAGE})}</div>
    <input id="battle-input" class="cp-input" placeholder="${textFor('answerPlaceholder')}" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" />
    ${actionButtons}`;
  const input=document.getElementById('battle-input');
  input.focus();
  input.onkeydown=(e)=>{ if(e.key==='Enter') submitBattle(); };
  updateBattleTimerDisplay();
}

function requestHint(){
  if(!battle.active||!battle.puzzle) return;
  const el=document.getElementById('battle-hint');
  if(!el) return;
  const msg=getProgressiveHint(battle.puzzle,battle.hintStep);
  battle.hintStep++;
  el.textContent=msg;
  if(battle.mode==='practice'){
    log(isEnglish() ? '// Free training hint' : '// تلميح تدريبي مجاني','sys');
    return;
  }
  heroTakeDamage(HINT_DAMAGE);
  log(isEnglish() ? '// Hint used' : '// تم استخدام التلميح','sys');
}

function handleBossSolve(){
  const boss=battle.boss;
  if(!boss) return;
  const solvedMethod = battle.puzzle.methodLabel || battle.puzzle.domain;
  boss.hp = Math.max(0, boss.hp-1);
  stopBattleTimer();
  document.getElementById('battle-screen').style.pointerEvents='none';

  if(boss.phaseIndex >= boss.maxHp - 1){
    const bossProfile=getBossProfile();
    battle.active=false;
    triggerStatusBeat(
      fillText('bossFall',{name:bossProfile.name}),
      fillText('bossFinal',{defeat:bossProfile.defeat, method:solvedMethod}),
      'clear',
      760,
      ()=>{
        closeBattle(true,{reason:'boss-win', boss:true});
        winGame();
      }
    );
    return;
  }

  boss.phaseIndex++;
  battle.puzzle = boss.phases[boss.phaseIndex];
  battle.hintStep = 0;
  battle.timeLeft = getPuzzleTimeLimit(battle.puzzle);
  triggerStatusBeat(
    textFor('bossHit'),
    fillText('bossHitSub',{name:boss.name, method:solvedMethod, hp:boss.hp, max:boss.maxHp}),
    'gold',
    430,
    ()=>{
      document.getElementById('battle-screen').style.pointerEvents='auto';
      renderBattlePanel();
      updateBattleTimerDisplay();
      startBattleTimer();
    }
  );
}

function submitBattle(){
  if(!battle.active) return;
  const val=normalizeAnswer((document.getElementById('battle-input').value||'').trim());
  if(!val) return;
  if(val===battle.puzzle.answer || battle.puzzle.acceptedAnswers.includes(val)){
    if(battle.mode==='practice'){
      const station = getTutorialStationById(battle.practice?.stationId);
      if(station){
        G.practiceClears[station.id]=true;
        updateTutorialPracticeVisuals();
        updateMinimap();
      }
      battle.active=false;
      document.getElementById('battle-screen').style.pointerEvents='none';
      triggerStatusBeat(
        fillText('practiceSolvedTitle',{label:battle.practice?.label || (isEnglish() ? 'training' : 'التدريب')}),
        textFor('practiceSolvedSub'),
        'ok',
        SUCCESS_BEAT_MS,
        ()=>closeBattle(true,{reason:'practice-solved', practice:true, stationId:battle.practice?.stationId})
      );
      return;
    }
    if(battle.mode==='boss'){
      const bossProfile=getBossProfile();
      log(isEnglish() ? `// ${bossProfile.name} was hit by ${battle.puzzle.methodLabel}` : `// تمت إصابة ${bossProfile.name} بطبقة ${battle.puzzle.methodLabel}`,'ok');
      handleBossSolve();
      return;
    }
    const idx=daemonGroups.findIndex(d=>d.id===battle.daemonId);
    let hadKey=false;
    let keyholderName='';
    if(idx>=0){
      const target=daemonGroups[idx];
      hadKey=target.hasKey;
      keyholderName=target.callsign || '';
      if(target.mesh) scene.remove(target.mesh);
      daemonGroups.splice(idx,1);
      updateHud();
      updateMinimap();
      log(hadKey
        ? (isEnglish() ? `// Keyholder ${target.callsign || ''} dropped`.trim() : `// تم إسقاط حامل المفتاح ${target.callsign || ''}`.trim())
        : (isEnglish() ? '// Intercepting daemon dropped' : '// تم إسقاط الديمون المعترض'),'ok');
    }
    if(hadKey){
      G.keyCollected=true;
      activateExtractionState();
      updateHud();
      log(isEnglish() ? `// Exit key secured from ${getKeyholderCallsign(G.layer)}: head to the exit node` : `// تم تأمين مفتاح الخروج من ${getKeyholderCallsign(G.layer)}: توجّه إلى عقدة الخروج`,'ok');
    }
    clearInterval(battle.timer);
    battle.timer=null;
    battle.active=false;
    document.getElementById('battle-screen').style.pointerEvents='none';
    triggerStatusBeat(
      hadKey ? textFor('keyDroppedTitle') : textFor('pathOpenedTitle'),
      hadKey ? fillText('keyDroppedSub',{name:keyholderName || getKeyholderCallsign(G.layer)}) : textFor('pathOpenedSub'),
      hadKey ? 'gold' : 'ok',
      SUCCESS_BEAT_MS,
      ()=>closeBattle(true,{reason:'solved', hadKey})
    );
  } else {
    if(battle.mode==='practice'){
      const hint=document.getElementById('battle-hint');
      if(hint) hint.textContent=textFor('wrongPractice');
      log(isEnglish() ? '// Training attempt missed. No damage in training mode.' : '// محاولة تدريبية غير صحيحة. لا ضرر في وضع التدريب.','sys');
      return;
    }
    heroTakeDamage(WRONG_ANSWER_DAMAGE);
    log(isEnglish() ? `// Wrong answer: -${WRONG_ANSWER_DAMAGE} HP` : `// إجابة خاطئة: -${WRONG_ANSWER_DAMAGE} HP`,'dmg');
  }
}

function showPuzzleExplanation(payload){
  const puzzle = payload.puzzle;
  if(!puzzle) return;
  explainState.active=true;
  explainState.pendingGameOver = G.hero.hp<=0;
  G.inputLocked=true;

  const outcome = payload.success ? textFor('explainSuccess') : payload.reason==='timeout' ? textFor('explainTimeout') : textFor('explainClosed');
  const detail = payload.result || (payload.success
    ? (payload.hadKey ? textFor('explainSolvedKey') : textFor('explainSolvedDaemon'))
    : textFor('explainCorrectShown'));

  document.getElementById('explain-title').textContent = puzzle.roomTitle;
  document.getElementById('explain-summary').textContent = `${outcome} ${detail}`;
  document.getElementById('explain-grid').innerHTML = `
    <div class="explain-block">
      <div class="hlabel">${textFor('correctAnswer')}</div>
      <div class="explain-answer">${puzzle.answerLabel || puzzle.answer}</div>
    </div>
    <div class="explain-block">
      <div class="hlabel">${textFor('securityConcept')}</div>
      <div class="explain-text"><strong>${puzzle.domain}</strong><br>${puzzle.concept}</div>
    </div>
    <div class="explain-block">
      <div class="hlabel">${textFor('whyMatters')}</div>
      <div class="explain-text">${puzzle.lesson}</div>
    </div>
    <div class="explain-block">
      <div class="hlabel">${textFor('challengeText')}</div>
      <div class="explain-text">${puzzle.prompt}</div>
    </div>`;
  document.getElementById('s-explain').style.display='flex';
}

function dismissExplanation(){
  document.getElementById('s-explain').style.display='none';
  explainState.active=false;
  if(explainState.pendingGameOver){
    explainState.pendingGameOver=false;
    gameOver();
    return;
  }
  G.inputLocked=false;
  showPuzzlePanel();
}

function closeBattle(success, options={}){
  const bossMode = battle.mode==='boss';
  const practiceMode = battle.mode==='practice';
  const targetDaemon = daemonGroups.find(d=>d.id===battle.daemonId);
  const resolvedPuzzle = battle.puzzle;
  battle.active=false;
  battle.mode=null;
  battle.daemonId=null;
  battle.daemonType=null;
  battle.keyCarrier=false;
  battle.boss=null;
  battle.practice=null;
  battle.puzzle=null;
  battle.timeLeft=0;
  stopBattleTimer();
  document.getElementById('battle-screen').style.display='none';
  document.getElementById('battle-screen').style.pointerEvents='auto';
  G.inputLocked=true;
  explainState.active=false;
  explainState.pendingGameOver=false;

  if(practiceMode){
    G.inputLocked=false;
    showPuzzlePanel();
    return;
  }

  if(bossMode){
    if(success){
      G.inputLocked=false;
      return;
    }
    if(options.reason==='timeout'){
      if(G.hero.hp<=0){
        const bossProfile=getBossProfile();
        showPuzzleExplanation({
          success:false,
          reason:'timeout',
          hadKey:false,
          result:isEnglish()
            ? `The timer cycle ended during the fight with ${bossProfile.name}, and you fell before finishing the full sequence.`
            : `انتهت دورة المؤقت أثناء مواجهة ${bossProfile.name} وسقطت قبل إنهاء التسلسل الكامل.`,
          puzzle:resolvedPuzzle
        });
        return;
      }
      G.inputLocked=false;
      return;
    }
  }

  let resultMessage='';
  if(success){
    resultMessage = options.hadKey
      ? textFor('solvedKeyResult')
      : textFor('solvedPathResult');
  } else if(options.reason==='timeout'){
    resultMessage = fillText('timeoutResult',{damage:BATTLE_TICK_DAMAGE});
  } else {
    if(targetDaemon){
      targetDaemon.freezeTurns = RETREAT_FREEZE_TURNS;
      targetDaemon.alertTurns = 0;
      targetDaemon.commitTurns = 0;
    }
    heroTakeDamage(RETREAT_DAMAGE,{deferGameOver:true});
    resultMessage = fillText('retreatResult',{damage:RETREAT_DAMAGE, turns:RETREAT_FREEZE_TURNS});
    log(isEnglish() ? `// Tactical retreat: -${RETREAT_DAMAGE} HP, daemon disabled for ${RETREAT_FREEZE_TURNS} turns` : `// انسحاب تكتيكي: -${RETREAT_DAMAGE} HP، الديمون متعطل ${RETREAT_FREEZE_TURNS} أدوار`,'dmg');
  }

  if(!success && G.hero.hp<=0){
    showPuzzleExplanation({
      success,
      reason:options.reason || 'failure',
      hadKey:!!options.hadKey,
      result:resultMessage,
      puzzle:resolvedPuzzle
    });
    return;
  }

  const heroNode=G.nodes.find(n=>n.x===G.hero.x&&n.z===G.hero.z);
  if(success && !isTutorialMode() && G.keyCollected && heroNode?.state===GOAL){
    roomClear();
    return;
  }

  G.inputLocked=false;
  showPuzzlePanel();
}

function choosePatrolTarget(dm, occupied){
  if(!dm.route || !dm.route.length) return {x:dm.x,z:dm.z};
  const profile=getDaemonProfile(dm);
  const depthLimit=Math.max(1, Math.min(dm.route.length-1, profile.candidateDepth || 1));

  if(Math.random()<profile.holdChance) return {x:dm.x,z:dm.z};

  const valid = getLegalMoves(dm, occupied);
  if(!valid.length) return {x:dm.x,z:dm.z};

  const directionOrder = Math.random()<profile.patrolFlipChance ? [-1,1] : [1,-1];
  const offsets = [];
  for(let depth=1; depth<=depthLimit; depth++){
    directionOrder.forEach(dir=>offsets.push(dir*depth));
  }
  for(const off of offsets){
    const idx = (dm.routeIndex + off + dm.route.length) % dm.route.length;
    const target = dm.route[idx];
    if(!isDaemonStepLegal(dm,target.x,target.z,occupied)) continue;
    dm.routeIndex = idx;
    return target;
  }

  const scoreMove = (move, routeIdx)=>{
    const target = dm.route[routeIdx];
    if(!target) return Infinity;
    const dx = Math.abs(move.x-target.x);
    const dz = Math.abs(move.z-target.z);
    const travel = dm.type==='rook' ? (dx+dz) : Math.max(dx,dz);
    const exactBonus = (move.x===target.x && move.z===target.z) ? -4 : 0;
    return travel + exactBonus;
  };

  let bestMove = null;
  let bestScore = Infinity;
  let bestRouteIndex = dm.routeIndex;
  const candidateRouteIndices = [dm.routeIndex];
  for(let depth=1; depth<=depthLimit; depth++){
    directionOrder.forEach(dir=>{
      const idx = (dm.routeIndex + (dir*depth) + dm.route.length) % dm.route.length;
      if(!candidateRouteIndices.includes(idx)) candidateRouteIndices.push(idx);
    });
  }

  valid.forEach(move=>{
    candidateRouteIndices.forEach(routeIdx=>{
      const score = scoreMove(move, routeIdx);
      if(score < bestScore){
        bestScore = score;
        bestMove = move;
        bestRouteIndex = routeIdx;
      }
    });
  });

  if(bestMove){
    if(dm.route[bestRouteIndex] && bestMove.x===dm.route[bestRouteIndex].x && bestMove.z===dm.route[bestRouteIndex].z){
      dm.routeIndex = bestRouteIndex;
    }
    return bestMove;
  }

  return {x:dm.x,z:dm.z};
}

function updateNodeHighlight(){
  nodeMeshes.forEach(g=>{
    const rem=[]; g.children.forEach(c=>{if(c.userData&&c.userData.isHighlight) rem.push(c);});
    rem.forEach(c=>g.remove(c));
  });
  const n=G.nodes.find(n=>n.x===G.hero.x&&n.z===G.hero.z);
  if(n&&n.mesh){
    const ring=new THREE.Mesh(new THREE.RingGeometry(0.48,0.55,16),new THREE.MeshBasicMaterial({color:0x00e5ff,transparent:true,opacity:0.6,side:THREE.DoubleSide}));
    ring.rotation.x=-Math.PI/2; ring.position.y=0.2; ring.userData.isHighlight=true; n.mesh.add(ring);
  }
}

function tryMove(nx,nz){
  if(G.inputLocked||lerpHero.active||battle.active||pauseState.active||document.getElementById('s-tutorial-exit').style.display==='flex') return;
  if(nx<0||nx>=GS||nz<0||nz>=GS) return;
  const tNode=G.nodes.find(n=>n.x===nx&&n.z===nz);
  if(!tNode||tNode.state===WALL) return;
  G.hero.x=nx; G.hero.z=nz;
  G.turns++; updateHud();
  tweenHero(nx,nz,()=>{
    updateNodeHighlight();
    onHeroArrive();
    if(!battle.active && !G.roomClearing) daemonTurn();
    updateMinimap();
  });
}

function updateHeroVitals(){
  const pct=G.hero.hp/G.hero.maxHp*100;
  const hpClass='hp-fill'+(pct<35?' low':pct<65?' mid':'');
  const fill=document.getElementById('hp-fill');
  if(fill){
    fill.style.width=pct+'%';
    fill.className=hpClass;
  }
  const topHp=document.getElementById('h-hp');
  if(topHp) topHp.textContent=G.hero.hp;

  const battleFill=document.getElementById('battle-hp-fill');
  if(battleFill){
    battleFill.style.width=pct+'%';
    battleFill.className=hpClass;
  }
  const battleVal=document.getElementById('battle-hp-value');
  if(battleVal) battleVal.textContent=`${G.hero.hp}/${G.hero.maxHp}`;
}

function showHpFloat(amount){
  const el=document.getElementById('hp-float');
  if(!el || !amount) return;
  clearTimeout(UI.hpFloatTimer);
  el.textContent = amount>0 ? `+${amount}` : `${amount}`;
  el.className = `hp-float show ${amount>0 ? 'gain' : 'loss'}`;
  UI.hpFloatTimer=setTimeout(()=>{
    el.className='hp-float';
    el.textContent='';
  },900);
}

function heroHeal(amount){
  const before=G.hero.hp;
  G.hero.hp=Math.min(G.hero.maxHp,G.hero.hp+amount);
  updateHeroVitals();
  const gained=G.hero.hp-before;
  if(gained>0) showHpFloat(gained);
  return gained;
}

function collectMedkitAtHero(){
  if(G.hero.hp>=G.hero.maxHp) return;
  const idx=(G.medkits || []).findIndex(mk=>mk.x===G.hero.x&&mk.z===G.hero.z);
  if(idx<0) return;
  const medkit=G.medkits[idx];
  if(medkit.mesh) scene.remove(medkit.mesh);
  G.medkits.splice(idx,1);
  const gained=heroHeal(medkit.heal);
  updateMinimap();
  log(isEnglish() ? `// Medkit collected: +${gained} HP` : `// تم التقاط حزمة علاج: +${gained} HP`,'ok');
}

function onHeroArrive(){
  collectMedkitAtHero();
  const node=G.nodes.find(n=>n.x===G.hero.x&&n.z===G.hero.z);
  if(isTutorialMode()){
    const station=getTutorialStationAt(G.hero.x,G.hero.z);
    if(station){
      const samePrompt = G.tutorialPrompt?.type==='station' && G.tutorialPrompt.stationId===station.id;
      G.tutorialPrompt={type:'station', stationId:station.id};
      if(!samePrompt) log(isEnglish() ? `// ${station.label}: press E or Enter to start training` : `// ${station.label}: اضغط E أو Enter لبدء التدريب`,'sys');
      updateTutorialChat();
      return;
    }
    if(node&&node.state===GOAL){
      const samePrompt = G.tutorialPrompt?.type==='exit';
      G.tutorialPrompt={type:'exit'};
      if(!samePrompt) log(isEnglish() ? '// Training exit is ready: press E or Enter to finish the gallery' : '// بوابة الخروج التدريبية جاهزة: اضغط E أو Enter لإنهاء المعرض','ok');
      updateTutorialChat();
      return;
    }
    G.tutorialPrompt=null;
    updateTutorialChat();
    return;
  }
  if(node&&node.state===GOAL){
    if(G.keyCollected){ roomClear(); }
    else{ log(isEnglish() ? '// You cannot exit before securing the key' : '// لا يمكنك الخروج قبل الاستحواذ على المفتاح','sys'); }
  }
}

function daemonTurn(){
  if(battle.active || G.roomClearing) return;
  const occupied = new Set(daemonGroups.map(d=>`${d.x},${d.z}`));
  let catcher = null;
  daemonGroups.forEach(dm=>{
    if(!dm.route || !dm.route.length) return;
    const profile=getDaemonProfile(dm);
    occupied.delete(`${dm.x},${dm.z}`);

    const sees = canDaemonSeeHero(dm);
    let hidden=false;
    if(sees){
      dm.lastKnownHero = {x:G.hero.x, z:G.hero.z};
      dm.searchTurns = Math.max(dm.searchTurns || 0, AGGRO_MEMORY_TURNS);
      dm.alertTurns = Math.max(dm.alertTurns, profile.alertTurns);
      dm.commitTurns = Math.max(dm.commitTurns, profile.commitTurns);
      dm.coverTurns = 0;
    } else if(dm.lastKnownHero || dm.alertTurns>0 || dm.commitTurns>0){
      hidden = isHeroWellHiddenFrom(dm);
      if(hidden){
        dm.coverTurns = (dm.coverTurns || 0) + 1;
        if(dm.coverTurns>=AGGRO_BREAK_COVER_TURNS){
          dm.alertTurns = 0;
          dm.commitTurns = 0;
          dm.searchTurns = 0;
          dm.lastKnownHero = null;
        } else {
          dm.alertTurns = Math.max(0, dm.alertTurns-1);
          dm.commitTurns = Math.max(0, dm.commitTurns-1);
          dm.searchTurns = Math.max(0, (dm.searchTurns || 0) - 1);
        }
      } else {
        dm.coverTurns = 0;
        dm.alertTurns = Math.max(0, dm.alertTurns-1);
        dm.commitTurns = Math.max(0, dm.commitTurns-1);
        dm.searchTurns = Math.max(0, (dm.searchTurns || 0) - 1);
        if(dm.searchTurns===0) dm.lastKnownHero = null;
      }
    } else {
      dm.coverTurns = 0;
    }

    let chosen={x:dm.x,z:dm.z};
    if(dm.x===G.hero.x && dm.z===G.hero.z){
      catcher=dm;
    } else if(dm.freezeTurns && dm.freezeTurns>0){
      dm.freezeTurns--;
    } else if(sees){
      const valid = getLegalMoves(dm, occupied);
      const chase = getChaseTarget(dm, occupied);
      chosen = pickAggroMove(dm, valid, G.hero, chase);
    } else if((dm.searchTurns||0)>0 && dm.lastKnownHero){
      const valid = getLegalMoves(dm, occupied);
      chosen = pickSearchMove(dm, valid, dm.lastKnownHero) || choosePatrolTarget(dm, occupied);
    } else {
      chosen = choosePatrolTarget(dm, occupied);
    }
    if(wouldCollideWithHero(dm, chosen.x, chosen.z)){
      chosen = {x:G.hero.x,z:G.hero.z};
    }
    dm.facing = {x:Math.sign(chosen.x-dm.x), z:Math.sign(chosen.z-dm.z)};
    dm.x=chosen.x; dm.z=chosen.z;
    if(!sees && dm.lastKnownHero && dm.x===dm.lastKnownHero.x && dm.z===dm.lastKnownHero.z){
      dm.lastKnownHero=null;
      dm.searchTurns=0;
    }
    occupied.add(`${dm.x},${dm.z}`);
    tweenDaemon(dm,dm.x,dm.z);
    if(dm.x===G.hero.x&&dm.z===G.hero.z) catcher=dm;
  });
  if(catcher){
    log(isEnglish() ? '// Player intercepted - shifting to battle layer' : '// تم اعتراض اللاعب - نقل إلى بعد القتال','sys');
    triggerEncounter(catcher);
  }
}

function heroTakeDamage(dmg, opts={}){
  G.hero.hp=Math.max(0,G.hero.hp-dmg);
  updateHeroVitals();
  if(dmg>0) showHpFloat(-dmg);
  if(G.hero.hp<=0 && !opts.deferGameOver) setTimeout(gameOver,400);
}

function roomClear(){
  if(G.roomClearing) return;
  G.roomClearing=true;
  G.inputLocked=true;
  const completedRoom=G.layer;
  log(isEnglish() ? `// Room ${completedRoom} cleared` : `// تم إنهاء الغرفة ${completedRoom}`,'ok');
  if(isTutorialMode()){
    openTutorialExitMenu();
    return;
  }
  triggerStatusBeat(
    textFor('roomSecured'),
    completedRoom>=ROOM_COUNT ? textFor('layersBroken') : fillText('roomSafe',{room:completedRoom, note:getRoomDebrief(completedRoom)}),
    'clear',
    ROOM_CLEAR_BEAT_MS,
    ()=>{
      if(completedRoom>=ROOM_COUNT){
        triggerStatusBeat(
          textFor('throneWake'),
          getBossProfile().intro,
          'gold',
          620,
          ()=>startBossEncounter()
        );
        return;
      }
      G.layer++;
      document.getElementById('h-room').textContent=formatRoomCounter(G.layer);
      setupRoom({lockInput:true});
      beginRoomArrival(G.layer,{travel:true});
    }
  );
}

function setupRoom(options={}){
  clearMedkits();
  G.hero.x=0; G.hero.z=8; G.keyCollected=false; G.roomClearing=false; G.inputLocked=!!options.lockInput; G.extractionActive=false; G.tutorialPrompt=null;
  G.nodes=generateNodes(G.layer);
  applyRoomTheme(getRoomTheme(G.layer));
  buildGridVisuals(G.nodes);
  initDaemons(G.layer);
  placeMedkits(G.layer);
  const wp=gToW(0,8);
  heroGroup.position.set(wp.x,0,wp.z);
  updateNodeHighlight(); updateMinimap(); updateHud();
  updateTutorialChat();
  showPuzzlePanel();
  log(isEnglish() ? `// ${getRunnerName()}: ${currentTheme.label} // ${getRoomStoryBeat(G.layer)}` : `// ${getRunnerName()}: ${currentTheme.arabic} // ${getRoomStoryBeat(G.layer)}`,'sys');
}

function updateHud(){
  setText('h-room', formatRoomCounter(G.layer));
  setText('h-turns', String(G.turns));
  const keyPill=$('key-hud-pill');
  const keyVisible=!isTutorialMode() && !bossSceneState.active && !G.keyCollected;
  if(keyPill) keyPill.hidden=!keyVisible;
  setText('h-key', keyVisible ? textFor('keySeek') : '');
}

function updateMinimap(){
  const cv=document.getElementById('minimap'), ctx=cv.getContext('2d');
  if(!G?.nodes?.length) return;
  const rect=cv.getBoundingClientRect();
  const dpr=getRenderDpr();
  const cssSize=Math.max(96, Math.round(Math.min(rect.width || 140, rect.height || rect.width || 140)));
  const pxSize=Math.max(GS, Math.round(cssSize*dpr));
  if(cv.width!==pxSize) cv.width=pxSize;
  if(cv.height!==pxSize) cv.height=pxSize;
  const cs=pxSize/GS;
  ctx.fillStyle='#020609'; ctx.fillRect(0,0,cv.width,cv.height);
  G.nodes.forEach(n=>{
    let c='#0a2520';
    if(n.state===GOAL)c='#00e5ff';
    else if(n.state===START)c='#00ff88';
    else if(n.state===WALL)c='#3b4f60';
    ctx.fillStyle=c; ctx.fillRect(n.x*cs+1,n.z*cs+1,cs-2,cs-2);
    ctx.strokeStyle='rgba(0,229,255,0.08)'; ctx.strokeRect(n.x*cs,n.z*cs,cs,cs);
  });
  daemonGroups.forEach(d=>{
    ctx.fillStyle=d.type==='rook'?'#ff2255':'#00e5ff';
    ctx.fillRect(d.x*cs+6,d.z*cs+6,cs-12,cs-12);
    if(d.hasKey){
      const cx=d.x*cs+cs/2, cy=d.z*cs+cs/2;
      ctx.fillStyle='#ffc040';
      ctx.beginPath();
      ctx.moveTo(cx,cy-6); ctx.lineTo(cx+6,cy); ctx.lineTo(cx,cy+6); ctx.lineTo(cx-6,cy);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle='#fff7d6';
      ctx.lineWidth=1.5;
      ctx.stroke();
    }
  });
  if(bossSceneState.active){
    ctx.fillStyle='#ff4f7d';
    ctx.fillRect(4*cs+4,0*cs+4,cs-8,cs-8);
    ctx.strokeStyle='#ffc040';
    ctx.lineWidth=2;
    ctx.strokeRect(4*cs+5,0*cs+5,cs-10,cs-10);
  }
  (G.medkits || []).forEach(mk=>{
    const cx=mk.x*cs+cs/2, cy=mk.z*cs+cs/2;
    ctx.strokeStyle='#00ff88';
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.arc(cx,cy,cs*0.22,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle='#ffc040';
    ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(cx,cy-6); ctx.lineTo(cx,cy+6); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,cs*0.1,0,Math.PI*1.65); ctx.stroke();
  });
  if(isTutorialMode()){
    TUTORIAL_PRACTICE_STATIONS.forEach(station=>{
      const complete = !!G.practiceClears?.[station.id];
      ctx.fillStyle = complete ? 'rgba(0,255,136,0.32)' : 'rgba(255,192,64,0.24)';
      ctx.fillRect(station.x*cs+4,station.z*cs+4,cs-8,cs-8);
      ctx.strokeStyle = complete ? '#00ff88' : '#ffc040';
      ctx.lineWidth = 2;
      ctx.strokeRect(station.x*cs+5,station.z*cs+5,cs-10,cs-10);
    });
  }
  ctx.fillStyle='#ffffff'; ctx.fillRect(G.hero.x*cs+5,G.hero.z*cs+5,cs-10,cs-10);
  ctx.strokeStyle='rgba(0,229,255,0.25)'; ctx.strokeRect(0,0,cv.width,cv.height);
}

function gameOver(){
  resetBattleState();
  resetFlowState();
  resetSceneFx();
  hideDisplays(RESULT_SCREENS);
  setDisplay('hud','none');
  hideTutorialChat();
  setHtml('over-box', isTutorialMode()
    ? fillText('overTutorial',{runner:getRunnerName(), turns:G.turns})
    : fillText('overRun',{runner:getRunnerName(), room:G.layer, count:getActiveRoomCount(), turns:G.turns}));
  const overBtn=$('over-btn');
  overBtn.textContent = isTutorialMode() ? textFor('retryTraining') : textFor('retryRun');
  overBtn.onclick = isTutorialMode() ? startTutorial : startGame;
  setText('over-title', textFor('overTitle'));
  setDisplay('s-over','flex');
}

function winGame(){
  resetBattleState();
  resetFlowState();
  resetSceneFx();
  hideDisplays(RESULT_SCREENS);
  setDisplay('hud','none');
  hideTutorialChat();
  setText('win-title', isTutorialMode() ? textFor('winTutorialTitle') : textFor('winRunTitle'));
  setHtml('win-box', isTutorialMode()
    ? fillText('winTutorial',{runner:getRunnerName(), turns:G.turns})
    : fillText('winRun',{runner:getRunnerName(), boss:getBossProfile().name, turns:G.turns}));
  const winBtn=$('win-btn');
  winBtn.textContent = textFor('mainMenu');
  winBtn.onclick = returnToMainMenu;
  setDisplay('s-win','flex');
}

function startSession(mode=MODE_RUN){
  hideDisplays(SESSION_BOOT_SCREENS);
  resetBattleState();
  resetFlowState();
  resetSceneFx();
  ensureAudioContext();
  const hpFloat=$('hp-float');
  if(hpFloat){
    hpFloat.className='hp-float';
    hpFloat.textContent='';
  }
  currentTheme = mode===MODE_TUTORIAL ? TUTORIAL_THEME : ROOM_THEMES[0];
  if(!scene) initThree();
  else applyRoomTheme(currentTheme);
  if(G && G.medkits) clearMedkits();
  initG();
  G.mode = mode;
  if(heroGroup) scene.remove(heroGroup);
  heroGroup=buildHeroMesh(); scene.add(heroGroup);
  setDisplay('hud','flex');
  setText('h-room', formatRoomCounter(1));
  hideDisplays(['battle-screen','s-explain']);
  hideTutorialChat();
  updateHeroVitals();
  if(mode===MODE_RUN){
    setupRoom({lockInput:true});
    beginRoomArrival(1,{travel:false});
  } else {
    setupRoom();
  }
}

function startGame(){
  startSession(MODE_RUN);
}

function startTutorial(){
  startSession(MODE_TUTORIAL);
  triggerStatusBeat(
    textFor('tutorialStartTitle'),
    textFor('tutorialStartSub'),
    'clear',
    620
  );
}

function log(msg,type=''){
  const el=document.getElementById('log-strip');
  if(!el) return;
  const d=document.createElement('div'); d.className='ll '+type; d.textContent=msg;
  el.appendChild(d); while(el.children.length>6) el.removeChild(el.firstChild);
}

function updateMobileControlsVisibility(){
  const el=$('mobile-controls');
  if(!el) return;
  const show = VIEW.mobile && isFlexVisible('hud');
  el.classList.toggle('visible', show);
}

function handlePlayerAction(){
  if(!isFlexVisible('hud')) return false;
  if(roomBriefState.active){ continueRoomBrief(); return true; }
  if(isFlexVisible('s-explain')){ dismissExplanation(); return true; }
  if(isTutorialMode() && !G.inputLocked && !lerpHero.active && !battle.active){
    if(G.tutorialPrompt?.type==='station'){
      const station=getTutorialStationById(G.tutorialPrompt.stationId);
      if(station){ openPracticeStation(station); return true; }
    }
    if(G.tutorialPrompt?.type==='exit'){
      openTutorialExitMenu();
      return true;
    }
  }
  return false;
}

function handleMoveInput(dx,dz){
  if(!isFlexVisible('hud')) return false;
  if(G.inputLocked||lerpHero.active||battle.active||FX.travelActive||roomBriefState.active||pauseState.active) return false;
  tryMove(G.hero.x+dx,G.hero.z+dz);
  return true;
}

function handleDirectionalInput(dir){
  const moves = {
    up:{dx:0,dz:-1},
    down:{dx:0,dz:1},
    left:{dx:-1,dz:0},
    right:{dx:1,dz:0}
  };
  const move = moves[dir];
  if(!move) return false;
  return handleMoveInput(move.dx, move.dz);
}

function resetSwipeState(){
  UI.swipe = {active:false, pointerId:null, startX:0, startY:0, lastX:0, lastY:0};
}

function getSwipeDirection(dx, dy){
  const absX=Math.abs(dx), absY=Math.abs(dy);
  const threshold = VIEW.phone ? 22 : 28;
  if(Math.max(absX, absY) < threshold) return null;
  if(absX > absY * 1.15) return dx>0 ? 'right' : 'left';
  if(absY > absX * 1.15) return dy>0 ? 'down' : 'up';
  return absX>=absY ? (dx>0 ? 'right' : 'left') : (dy>0 ? 'down' : 'up');
}

function canUseSwipeMovement(){
  return VIEW.mobile &&
    isFlexVisible('hud') &&
    !pauseState.active &&
    !roomBriefState.active &&
    !isFlexVisible('s-explain') &&
    !isFlexVisible('s-tutorial-exit') &&
    !isTextEntryContext(document.activeElement);
}

function setupSwipeControls(){
  const surface=$('cv3');
  if(!surface) return;
  resetSwipeState();

  surface.addEventListener('pointerdown',e=>{
    if(e.pointerType && e.pointerType!=='touch' && e.pointerType!=='pen') return;
    if(!canUseSwipeMovement()) return;
    UI.swipe = {
      active:true,
      pointerId:e.pointerId,
      startX:e.clientX,
      startY:e.clientY,
      lastX:e.clientX,
      lastY:e.clientY
    };
  });

  surface.addEventListener('pointermove',e=>{
    if(!UI.swipe?.active || UI.swipe.pointerId!==e.pointerId) return;
    UI.swipe.lastX=e.clientX;
    UI.swipe.lastY=e.clientY;
  });

  const finishSwipe=e=>{
    if(!UI.swipe?.active) return;
    if(e.pointerId!==undefined && UI.swipe.pointerId!==e.pointerId) return;
    const dx=(e.clientX ?? UI.swipe.lastX) - UI.swipe.startX;
    const dy=(e.clientY ?? UI.swipe.lastY) - UI.swipe.startY;
    resetSwipeState();
    if(!canUseSwipeMovement()) return;
    const dir=getSwipeDirection(dx, dy);
    if(dir) handleDirectionalInput(dir);
  };

  surface.addEventListener('pointerup', finishSwipe);
  surface.addEventListener('pointercancel', ()=>resetSwipeState());
}

function setupMobileControls(){
  $('mobile-action')?.addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    handlePlayerAction();
  });
  $('mobile-pause')?.addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    togglePauseMenu();
  });
}

setupMobileControls();
setupSwipeControls();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.warn('SW registration failed:', err));
  });
}


document.addEventListener('keydown',e=>{
  if(!isFlexVisible('hud')) return;
  if(isTextEntryContext(e.target)) return;
  const key=e.key.toLowerCase();
  if(e.key==='Tab'){
    e.preventDefault();
    togglePauseMenu();
    return;
  }
  if(pauseState.active || isFlexVisible('s-tutorial-exit')) return;
  if(roomBriefState.active){
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      continueRoomBrief();
    }
    return;
  }
  if(FX.travelActive) return;
  if(key==='e' || e.key==='Enter' || e.key===' '){
    if(handlePlayerAction()){
      e.preventDefault();
      return;
    }
  }
  let dir=null;
  if(key==='w'||key==='arrowup') dir='up';
  else if(key==='s'||key==='arrowdown') dir='down';
  else if(key==='a'||key==='arrowleft') dir='left';
  else if(key==='d'||key==='arrowright') dir='right';
  if(!dir) return;
  e.preventDefault();
  handleDirectionalInput(dir);
});

const MATRIX_CHARS='01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&';
const matrixRainStates=[];

function initMatrixRain(canvasId, options={}){
  const cv=$(canvasId);
  if(!cv) return null;
  const ctx=cv.getContext('2d');
  const state={
    id:canvasId,
    canvas:cv,
    ctx,
    size:options.size || 14,
    fade:options.fade || 0.06,
    color:options.color || '#00e5ff',
    width:1,
    height:1,
    dpr:1,
    drops:[]
  };
  state.resize=()=>{
    const rect=cv.getBoundingClientRect();
    const width=Math.max(1, Math.round(rect.width || cv.clientWidth || window.innerWidth));
    const height=Math.max(1, Math.round(rect.height || cv.clientHeight || window.innerHeight));
    const dpr=Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    state.width=width;
    state.height=height;
    state.dpr=dpr;
    cv.width=Math.round(width*dpr);
    cv.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const cols=Math.max(1, Math.floor(width/state.size));
    state.drops=Array.from({length:cols},()=>1+Math.floor(Math.random()*Math.max(2, Math.floor(height/state.size))));
  };
  state.resize();
  matrixRainStates.push(state);
  return state;
}

function drawMatrixRain(state){
  if(!state) return;
  const {ctx,size,fade,color,width,height}=state;
  ctx.fillStyle=`rgba(2,6,9,${fade})`;
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle=color;
  ctx.font=`${Math.max(12,size-1)}px Share Tech Mono`;
  state.drops.forEach((drop,idx)=>{
    ctx.fillText(MATRIX_CHARS[~~(Math.random()*MATRIX_CHARS.length)], idx*size, drop*size);
    if(drop*size>height&&Math.random()>0.975) state.drops[idx]=0;
    state.drops[idx]++;
  });
}

function animateMatrixRain(){
  matrixRainStates.forEach(drawMatrixRain);
}

function refreshMatrixRain(){
  matrixRainStates.forEach(state=>state.resize());
}

window.addEventListener('resize',refreshMatrixRain);
window.visualViewport?.addEventListener('resize',refreshMatrixRain);
initMatrixRain('rain',{size:14,fade:0.05,color:'#00e5ff'});
initMatrixRain('travel-rain',{size:16,fade:0.08,color:'#00ff88'});
setInterval(animateMatrixRain,55);

setDisplay('s-title','flex');
hideDisplays(['hud','s-over','s-win','s-explain','s-room-brief','s-pause','s-tutorial-exit','engage-screen','status-beat','room-travel']);
applyLanguage();
refreshMatrixRain();
