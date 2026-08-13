const resultsContainer =
  document.getElementById("results");

const resultsSearchForm =
  document.getElementById(
    "resultsSearchForm"
  );

const resultsSearchInput =
  document.getElementById(
    "resultsSearchInput"
  );


// =====================================================
// 文字化けデータ
// =====================================================

const mojibakePool = [
  "軥醳韣膄铩ꎯ賥꺶",
  "ꯥ邑诣膣ꛣ芋胤뮊",
  "駣膐ꛣ莼郣莼",
  "냥鮳臣膚ꏣ膨",
  "ꇦ隙賣膓賣肁",
  "獴牥散棣膧鳣膣鿣膮",
  "跣膌꟣膍诣芵",
  "ꓣ莈聳瑲敥捨⃤뮊",
  "駣膐该Ꞌ慁"
];


function randomMojibake() {

  return mojibakePool[
    Math.floor(
      Math.random() *
      mojibakePool.length
    )
  ];

}


// =====================================================
// 検索結果15件
// =====================================================

for (let i = 0; i < 15; i++) {

  const result =
    document.createElement("article");

  result.className =
    "search-result";

  result.innerHTML = `
    <a href="#" class="result-title">
      ${randomMojibake()}
    </a>

    <div class="result-url">
      ${randomMojibake()}.com
    </div>

    <p class="result-description">
      ${randomMojibake()}
      ${randomMojibake()}
      ${randomMojibake()}
    </p>
  `;


  const link =
    result.querySelector(
      ".result-title"
    );


  // 絶対に外部サイトへ行かない

  link.addEventListener(
    "click",
    event => {

      event.preventDefault();

    }
  );


  resultsContainer.appendChild(
    result
  );

}


// =====================================================
// URLの検索文字
// =====================================================

const params =
  new URLSearchParams(
    window.location.search
  );

const query =
  params.get("q");


if (query) {

  resultsSearchInput.value =
    query;

}


// =====================================================
// 再検索
// =====================================================

resultsSearchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const value =
      resultsSearchInput.value.trim();

    if (!value) return;

    window.location.href =
      "results.html?q=" +
      encodeURIComponent(value);

  }
);
