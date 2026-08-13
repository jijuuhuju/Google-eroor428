const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const luckyButton = document.getElementById("luckyButton");

// 検索欄の入力状態を更新
function updateClearButton() {
  if (searchInput.value.trim() !== "") {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
}

searchInput.addEventListener("input", updateClearButton);

// クリアボタン
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  updateClearButton();
  searchInput.focus();
});

// 通常検索
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === "") {
    searchInput.focus();
    return;
  }

  const searchURL =
    "https://www.google.com/search?q=" +
    encodeURIComponent(query);

  window.location.href = searchURL;
});

// I'm Feeling Lucky
luckyButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    searchInput.focus();
    return;
  }

  const luckyURL =
    "https://www.google.com/search?btnI=1&q=" +
    encodeURIComponent(query);

  window.location.href = luckyURL;
});

// ページ読み込み時
updateClearButton();
