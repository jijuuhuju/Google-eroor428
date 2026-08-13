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

const errorOverlay =
  document.getElementById("errorOverlay");

const errorText =
  document.getElementById("errorText");

const finalOverlay =
  document.getElementById("finalOverlay");

const typing428 =
  document.getElementById("typing428");

const final428 =
  document.getElementById("final428");

const redFigure =
  document.getElementById("redFigure");

const glitchLogoBack =
  document.querySelector(
    ".glitch-logo-back"
  );


// =========================================
// 検索
// =========================================

searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const query =
      searchInput.value.trim();

    if (!query) return;

    window.location.href =
      "results.html?q=" +
      encodeURIComponent(query);

  }
);


// =========================================
// クリア
// =========================================

clearButton.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    clearButton.style.display =
      "none";

    searchInput.focus();

  }
);


// =========================================
// 入力時にクリアボタン表示
// =========================================

searchInput.addEventListener(
  "input",
  () => {

    clearButton.style.display =
      searchInput.value
        ? "block"
        : "none";

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
// ロゴのノイズ
// =========================================

function logoNoise() {

  // ロゴが存在しなければ何もしない

  if (!glitchLogoBack) return;


  // 背面ロゴを表示

  glitchLogoBack.style.visibility =
    "visible";

  glitchLogoBack.style.opacity =
    "0.65";


  // ランダムな位置

  const x =
    Math.round(
      Math.random() * 12 - 6
    );

  const y =
    Math.round(
      Math.random() * 8 - 4
    );


  // ランダムな色

  const hue =
    Math.floor(
      Math.random() * 360
    );


  glitchLogoBack.style.transform =
    `translate(${x}px, ${y}px)`;


  glitchLogoBack.style.filter =
    `hue-rotate(${hue}deg)
     saturate(3)`;


  // 100ms後に完全に元へ戻す

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


// =========================================
// ノイズ発生スケジュール
// =========================================

function scheduleLogoNoise() {

  const delay =
    2000 +
    Math.random() * 3000;


  setTimeout(() => {

    logoNoise();

    scheduleLogoNoise();

  }, delay);

}


scheduleLogoNoise();
