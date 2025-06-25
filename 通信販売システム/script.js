// 通信販売システム - 商品一覧表示用 script.js

const products = [
  { name: "書籍セット", price: 1800, image: "images/book_tate.png", category: "本" },
  { name: "ワンピース", price: 2900, image: "images/fashion_onepiece.png", category: "洋服" },
  { name: "カラーボックス", price: 2400, image: "images/kagu_colorbox.png", category: "家具" },
  { name: "ライオンセーター", price: 3200, image: "images/kodomofuku_boy.png", category: "洋服" },
  { name: "ワイヤレスイヤホン", price: 4500, image: "images/music_earphone_true_wireless_case.png", category: "スマホ関連" },
  { name: "ランドセル", price: 9800, image: "images/school_bag.png", category: "カバン" },
  { name: "スマホスタンド", price: 1100, image: "images/stand_smartphone.png", category: "スマホ関連" },
  { name: "マグカップ", price: 850, image: "images/syokki_mug_cup.png", category: "食器" },
  { name: "汁椀", price: 750, image: "images/syokki_owan.png", category: "食器" }
];

const productList = document.getElementById("products");

function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <strong>${product.name}</strong>
      <span>価格: ${product.price.toLocaleString()}円</span>
      <label>数量:
        <input type="number" value="1" min="1">
      </label>
      <button>カートに入れる</button>
    `;
    productList.appendChild(li);
  });
}

// 初期表示
renderProducts(products);

// 検索処理
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = searchInput.value.trim();
  const category = categorySelect.value;

  const filtered = products.filter(p =>
    (keyword === "" || p.name.includes(keyword)) &&
    (category === "" || p.category === category)
  );

  renderProducts(filtered);
});
