const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const luckyButton = document.getElementById("luckyButton");

const errorOverlay = document.getElementById("errorOverlay");
const errorText = document.getElementById("errorText");

const finalOverlay = document.getElementById("finalOverlay");
const typing428 = document.getElementById("typing428");
const final428 = document.getElementById("final428");

const logoBack = document.querySelector(".glitch-logo-back");


// =====================================================
// 体験時間
// =====================================================

const EXPERIENCE_TIME = 120000; // 2分

const experienceStart = Date.now();

function elapsed() {
  return Date.now() - experienceStart;
}


// =====================================================
// 文字化け
// =====================================================

const mojibakeChars = [
  "", "軥", "醳", "", "韣", "膄",
  "铩", "ꎯ", "賥", "꺶", "ꯥ", "邑",
  "诣", "膣", "ꛣ", "芋", "胤", "뮊",
  "駣", "膐", "ꛣ", "莼", "郣", "莼",
  "", "냥", "鮳", "臣", "膚", "ꏣ",
  "膨", "ꇦ", "隙", "賣", "膓", "賣",
  "肁", "獴", "牥", "散", "棣", "膧",
  "鳣", "鿣", "膮", "跣", "膌", "꟣",
  "膍", "诣", "芵", "ꓣ", "莈",
  "聳", "瑲", "敥", "捨", "慁"
];

function mojibake(text) {

  let result = "";

  for (const char of text) {

    if (char === " ") {
      result += " ";
      continue;
    }

    result +=
      mojibakeChars[
        Math.floor(
          Math.random() *
          mojibakeChars.length
        )
      ];
  }

  return result;
}


// =====================================================
// 検索欄
// =====================================================

let converting = false;

searchInput.addEventListener("input", () => {

  if (converting) return;

  converting = true;

  const value = searchInput.value;

  if (value.length > 0) {
    searchInput.value = mojibake(value);
  }

  clearButton.style.display =
    searchInput.value.length > 0
      ? "block"
      : "none";

  converting = false;
});


// =====================================================
// クリア
// =====================================================

clearButton.addEventListener("click", () => {

  searchInput.value = "";

  clearButton.style.display = "none";

  searchInput.focus();

});


// =====================================================
// 自作検索
// =====================================================

function goToResults() {

  const query =
    searchInput.value.trim();

  if (!query) {

    searchInput.focus();

    return;
  }

  // 絶対にGoogleへ行かない
  window.location.href =
    "results.html?q=" +
    encodeURIComponent(query);
}


searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    goToResults();

  }
);


luckyButton.addEventListener(
  "click",
  () => {

    goToResults();

  }
);


// =====================================================
// ロゴのノイズ
// =====================================================

function logoGlitch() {

  if (!logoBack) return;

  if (elapsed() >= 115000) return;

  const x =
    Math.random() * 8 - 4;

  const y =
    Math.random() * 8 - 4;

  const hue =
    Math.random() * 360;

  logoBack.style.transform =
    `translate(${x}px, ${y}px)`;

  logoBack.style.filter =
    `hue-rotate(${hue}deg)
     saturate(${1.5 + Math.random() * 3})`;

  setTimeout(() => {

    logoBack.style.transform =
      "translate(2px, -1px)";

    logoBack.style.filter =
      "hue-rotate(120deg) saturate(2)";

  }, 100);

}


const logoInterval =
  setInterval(() => {

    if (elapsed() < 115000) {

      logoGlitch();

    } else {

      clearInterval(logoInterval);

    }

  }, 3000);


// =====================================================
// 428勝手入力
// =====================================================

function type428() {

  if (elapsed() >= 115000) return;

  searchInput.focus();

  searchInput.value += "428";

  clearButton.style.display = "block";
}


function schedule428() {

  const delay =
    10000 +
    Math.random() * 5000;

  setTimeout(() => {

    if (elapsed() < 115000) {

      type428();

      schedule428();

    }

  }, delay);
}

schedule428();


// =====================================================
// ダークモード
// =====================================================

function darkFlash() {

  if (elapsed() >= 115000) return;

  document.body.classList.add(
    "temporary-dark"
  );

  setTimeout(() => {

    document.body.classList.remove(
      "temporary-dark"
    );

  }, 200);

}


const darkInterval =
  setInterval(() => {

    if (elapsed() >= 115000) {

      clearInterval(darkInterval);

      return;
    }

    if (Math.random() < 0.7) {

      darkFlash();

    }

  }, 7000);


// =====================================================
// ノイズ音
// =====================================================

let audioContext = null;

function playNoise() {

  try {

    if (!audioContext) {

      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

    }

    if (
      audioContext.state === "suspended"
    ) {

      audioContext.resume();

    }

    const duration = 0.18;

    const buffer =
      audioContext.createBuffer(
        1,
        audioContext.sampleRate * duration,
        audioContext.sampleRate
      );

    const data =
      buffer.getChannelData(0);

    for (
      let i = 0;
      i < data.length;
      i++
    ) {

      data[i] =
        (Math.random() * 2 - 1) *
        0.35;

    }

    const source =
      audioContext.createBufferSource();

    const gain =
      audioContext.createGain();

    source.buffer = buffer;

    gain.gain.setValueAtTime(
      0.08,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime +
      duration
    );

    source.connect(gain);

    gain.connect(
      audioContext.destination
    );

    source.start();

  } catch (error) {

    // 音声が使えなくても続行

  }
}


// =====================================================
// Error 428
// =====================================================

function createErrorText() {

  let text = "";

  for (let i = 0; i < 24; i++) {

    text +=
      "Error".repeat(10) +
      "<br>" +
      "428".repeat(24) +
      "<br>";

  }

  return text;
}


function showErrorEvent() {

  if (elapsed() >= 115000) return;

  playNoise();

  errorText.innerHTML =
    createErrorText();

  errorOverlay.classList.add(
    "active"
  );

  setTimeout(() => {

    errorOverlay.classList.remove(
      "active"
    );

  }, 1000);

}


// 20秒
setTimeout(showErrorEvent, 20000);

// 50秒
setTimeout(showErrorEvent, 50000);

// 80秒
setTimeout(showErrorEvent, 80000);


// =====================================================
// 最終イベント
// 1分40秒から
// =====================================================

let finalStarted = false;

function startFinalEvent() {

  if (finalStarted) return;

  finalStarted = true;

  errorOverlay.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "temporary-dark"
  );

  playNoise();

  finalOverlay.classList.add(
    "active"
  );


  // -----------------------------------------------
  // 0.2秒ごとに白黒
  // -----------------------------------------------

  let dark = false;

  const modeInterval =
    setInterval(() => {

      dark = !dark;

      finalOverlay.classList.toggle(
        "dark-phase",
        dark
      );

    }, 200);


  // -----------------------------------------------
  // 赤い428を上からタイピング
  // -----------------------------------------------

  let lines = 0;

  const typingInterval =
    setInterval(() => {

      typing428.textContent +=
        "428\n";

      lines++;

      if (lines >= 45) {

        clearInterval(
          typingInterval
        );

        clearInterval(
          modeInterval
        );


        // 少しだけ間を置く

        setTimeout(() => {

          typing428.style.display =
            "none";

          finalOverlay.classList.remove(
            "dark-phase"
          );

          finalOverlay.classList.add(
            "blackout"
          );


          // ---------------------------------------
          // 巨大な428
          // ---------------------------------------

          setTimeout(() => {

            final428.classList.add(
              "show"
            );

          }, 500);

        }, 300);

      }

    }, 65);

}


// 1分40秒
setTimeout(() => {

  if (!document.hidden) {

    startFinalEvent();

  }

}, 100000);


// =====================================================
// 2分で終了
// =====================================================

setTimeout(() => {

  // 通常イベント停止

  clearInterval(
    logoInterval
  );

  clearInterval(
    darkInterval
  );


  // 画面を最終状態にする

  document.body.classList.remove(
    "temporary-dark"
  );

  errorOverlay.classList.remove(
    "active"
  );

  finalOverlay.classList.add(
    "active"
  );

  finalOverlay.classList.add(
    "blackout"
  );

  typing428.style.display =
    "none";

  final428.classList.add(
    "show"
  );

}, EXPERIENCE_TIME);
