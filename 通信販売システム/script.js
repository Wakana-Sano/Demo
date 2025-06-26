// 通信販売システム - 商品一覧表示用 script.js

const products = [
  { id: "book", name: "漫画セット", price: 1800, image: "images/book_tate.png", category: "本" },
  { id: "dress", name: "ワンピース", price: 2900, image: "images/fashion_onepiece.png", category: "洋服" },
  { id: "box", name: "カラーボックス", price: 2400, image: "images/kagu_colorbox.png", category: "家具" },
  { id: "kids", name: "子供用洋服", price: 1300, image: "images/kodomofuku_boy.png", category: "洋服" },
  { id: "earphone", name: "ワイヤレスイヤホン", price: 4500, image: "images/music_earphone_true_wireless_case.png", category: "スマホ関連" },
  { id: "bag", name: "ランドセル", price: 38000, image: "images/school_bag.png", category: "カバン" },
  { id: "stand", name: "スマホスタンド", price: 1100, image: "images/stand_smartphone.png", category: "スマホ関連" },
  { id: "mug", name: "マグカップ", price: 850, image: "images/syokki_mug_cup.png", category: "食器" },
  { id: "owan", name: "お椀", price: 750, image: "images/syokki_owan.png", category: "食器" }
];

const productList = document.getElementById("products");

function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(product => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="product.html?id=${product.id}" class="product-link">
        <img src="${product.image}" alt="${product.name}">
        <strong>${product.name}</strong>
        <span>価格: ${product.price.toLocaleString()}円</span>
      </a>
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
