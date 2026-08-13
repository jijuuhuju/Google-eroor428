// =========================================
// 要素取得
// =========================================

const searchForm =
  document.getElementById("searchForm");

const searchInput =
  document.getElementById("searchInput");

const clearButton =
  document.getElementById("clearButton");

const luckyButton =
  document.getElementById("luckyButton");

const glitchLogoBack =
  document.querySelector(".glitch-logo-back");


// =========================================
// 本来の検索文字
// =========================================

let realSearchValue = "";

let mojibakeTimer = null;

let isMojibakeDisplay = false;


// =========================================
// 文字化け文字
// =========================================

const mojibakeCharacters = [
  "","軥","醳","","韣","膄",
  "铩","ꎯ","賥","꺶","ꯥ","邑",
  "诣","膣","ꛣ","芋","胤","뮊",
  "駣","膐","莼","郣","","냥",
  "鮳","臣","膚","ꏣ","膨"
];


// =========================================
// 文字化け生成
// =========================================

function createMojibake(text) {

  let result = "";

  for (const char of text) {

    const count =
      2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {

      result +=
        mojibakeCharacters[
          Math.floor(
            Math.random() *
            mojibakeCharacters.length
          )
        ];

    }

  }

  return result;
}


// =========================================
// 検索
// =========================================

searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const query =
      realSearchValue.trim();

    if (!query) return;

    // 外部Googleには絶対移動しない

    window.location.href =
      "results.html?q=" +
      encodeURIComponent(query);

  }
);


// =========================================
// 入力
// =========================================

searchInput.addEventListener(
  "input",
  () => {

    if (!isMojibakeDisplay) {

      realSearchValue =
        searchInput.value;

    }

    clearButton.style.display =
      realSearchValue
        ? "block"
        : "none";

    clearTimeout(
      mojibakeTimer
    );

    if (!realSearchValue) {

      isMojibakeDisplay = false;

      searchInput.value = "";

      return;

    }

    mojibakeTimer =
      setTimeout(() => {

        isMojibakeDisplay = true;

        searchInput.value =
          createMojibake(
            realSearchValue
          );

      }, 300);

  }
);


// =========================================
// クリア
// =========================================

clearButton.addEventListener(
  "click",
  () => {

    clearTimeout(
      mojibakeTimer
    );

    realSearchValue = "";

    isMojibakeDisplay = false;

    searchInput.value = "";

    clearButton.style.display =
      "none";

    searchInput.focus();

  }
);


// =========================================
// I'm Feeling Lucky
// =========================================

luckyButton.addEventListener(
  "click",
  () => {

    searchForm.requestSubmit();

  }
);


// =========================================
// 異変1
// ロゴノイズ
// =========================================

function logoNoise() {

  if (!glitchLogoBack) return;

  glitchLogoBack.style.visibility =
    "visible";

  glitchLogoBack.style.opacity =
    "0.65";

  const x =
    Math.round(
      Math.random() * 12 - 6
    );

  const y =
    Math.round(
      Math.random() * 8 - 4
    );

  const hue =
    Math.floor(
      Math.random() * 360
    );

  glitchLogoBack.style.transform =
    `translate(${x}px, ${y}px)`;

  glitchLogoBack.style.filter =
    `hue-rotate(${hue}deg) saturate(3)`;

  setTimeout(() => {

    glitchLogoBack.style.opacity =
      "0";

    glitchLogoBack.style.visibility =
      "hidden";

    glitchLogoBack.style.transform =
      "translate(0, 0)";

    glitchLogoBack.style.filter =
      "none";

  }, 100);

}


function scheduleLogoNoise() {

  const delay =
    500 +
    Math.random() * 1000;

  setTimeout(() => {

    logoNoise();

    scheduleLogoNoise();

  }, delay);

}

scheduleLogoNoise();


// =========================================
// 異変3
// 勝手に428が入力される
// =========================================

function type428() {

  if (
    document.activeElement ===
    searchInput
  ) {

    isMojibakeDisplay = false;

    realSearchValue = "";

    searchInput.value = "";

  }

  const text = "428";

  let index = 0;

  const timer =
    setInterval(() => {

      if (index >= text.length) {

        clearInterval(timer);

        return;

      }

      realSearchValue +=
        text[index];

      searchInput.value =
        realSearchValue;

      clearButton.style.display =
        "block";

      index++;

    }, 90);

}


// =========================================
// 428異変のランダム発生
// =========================================

function schedule428() {

  const delay =
    7000 +
    Math.random() * 10000;

  setTimeout(() => {

    type428();

    schedule428();

  }, delay);

}

schedule428();


// =========================================
// 異変4
// 一瞬だけダークモード
// =========================================

function temporaryDarkMode() {

  document.body.classList.add(
    "temporary-dark"
  );

  setTimeout(() => {

    document.body.classList.remove(
      "temporary-dark"
    );

  }, 250);

}


function scheduleDarkMode() {

  const delay =
    10000 +
    Math.random() * 15000;

  setTimeout(() => {

    temporaryDarkMode();

    scheduleDarkMode();

  }, delay);

}

scheduleDarkMode();


// =========================================
// 異変5
// Error428画面
// =========================================

function createErrorScreen() {

  const overlay =
    document.createElement("div");

  overlay.style.position =
    "fixed";

  overlay.style.inset = "0";

  overlay.style.zIndex =
    "99999";

  overlay.style.background =
    "#000";

  overlay.style.color =
    "#f00";

  overlay.style.fontFamily =
    "monospace";

  overlay.style.fontWeight =
    "bold";

  overlay.style.fontSize =
    "32px";

  overlay.style.lineHeight =
    "1.05";

  overlay.style.padding =
    "10px";

  overlay.style.whiteSpace =
    "pre-wrap";

  overlay.style.overflow =
    "hidden";

  let text = "";

  for (let i = 0; i < 18; i++) {

    text +=
      "Error".repeat(20) +
      "\n";

    text +=
      "428".repeat(35) +
      "\n";

  }

  overlay.textContent = text;

  document.body.appendChild(
    overlay
  );

  // 短時間だけ表示

  setTimeout(() => {

    overlay.remove();

  }, 900);

}


// =========================================
// Error428のランダム発生
// =========================================

function scheduleError() {

  const delay =
    18000 +
    Math.random() * 20000;

  setTimeout(() => {

    createErrorScreen();

    scheduleError();

  }, delay);

}

scheduleError();
