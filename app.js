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
// 検索用の本来の文字
// =========================================

let realSearchValue = "";


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

    realSearchValue = "";

    searchInput.value = "";

    clearButton.style.display =
      "none";

    searchInput.focus();

  }
);


// =========================================
// 文字化け生成
// =========================================

function mojibake(text) {

  let result = "";

  for (const char of text) {

    const code =
      char.charCodeAt(0);

    // 日本語などをそれっぽい
    // 文字化け文字へ変換

    if (code > 127) {

      const a =
        0xE000 +
        ((code * 37) % 0x0FFF);

      const b =
        0x4E00 +
        ((code * 17) % 0x3000);

      result +=
        String.fromCharCode(a) +
        String.fromCharCode(b);

    } else {

      // 英数字は一部だけ変化

      if (Math.random() < 0.35) {

        result +=
          String.fromCharCode(
            0xE000 +
            Math.floor(
              Math.random() * 0x0FFF
            )
          );

      } else {

        result += char;

      }

    }

  }

  return result;
}


// =========================================
// 異変2
// 検索バーの文字化け
// =========================================

let mojibakeTimer = null;

searchInput.addEventListener(
  "input",
  () => {

    // 本来の入力内容を保存

    realSearchValue =
      searchInput.value;


    // クリアボタン

    clearButton.style.display =
      realSearchValue
        ? "block"
        : "none";


    // 前のタイマーを解除

    clearTimeout(
      mojibakeTimer
    );


    if (!realSearchValue) {

      searchInput.value = "";

      return;

    }


    /*
      入力を止めて0.3秒後に
      文字化けする
    */

    mojibakeTimer =
      setTimeout(() => {

        /*
          表示だけ文字化けさせる。
          realSearchValueは正常なまま。
        */

        searchInput.value =
          mojibake(
            realSearchValue
          );

      }, 300);

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
// ロゴのノイズ
// =========================================

function logoNoise() {

  if (!glitchLogoBack) return;


  // 背面ロゴを表示

  glitchLogoBack.style.visibility =
    "visible";

  glitchLogoBack.style.opacity =
    "0.65";


  // 少しズレる

  const x =
    Math.round(
      Math.random() * 12 - 6
    );

  const y =
    Math.round(
      Math.random() * 8 - 4
    );


  // 色を変える

  const hue =
    Math.floor(
      Math.random() * 360
    );


  glitchLogoBack.style.transform =
    `translate(${x}px, ${y}px)`;


  glitchLogoBack.style.filter =
    `hue-rotate(${hue}deg)
     saturate(3)`;


  // 100ms後に戻す

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
// ロゴノイズの発生間隔
// =========================================

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
