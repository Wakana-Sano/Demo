// 通信販売システム - カート表示・削除対応（localStorage使用）

const products = {
  book: { id: "book", name: "漫画セット", price: 2400, image: "images/book_tate.png" },
  dress: { id: "dress", name: "ワンピース", price: 2900, image: "images/fashion_onepiece.png" },
  box: { id: "box", name: "カラーボックス", price: 2400, image: "images/kagu_colorbox.png" },
  kids: { id: "kids", name: "子供用洋服", price: 1300, image: "images/kodomofuku_boy.png" },
  earphone: { id: "earphone", name: "ワイヤレスイヤホン", price: 4500, image: "images/music_earphone_true_wireless_case.png" },
  bag: { id: "bag", name: "ランドセル", price: 38000, image: "images/school_bag.png" },
  stand: { id: "stand", name: "スマホスタンド", price: 1100, image: "images/stand_smartphone.png" },
  mug: { id: "mug", name: "マグカップ", price: 850, image: "images/syokki_mug_cup.png" },
  owan: { id: "owan", name: "お椀", price: 750, image: "images/syokki_owan.png" }
};

// 表示用関数
function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  cartContainer.innerHTML = "";

  // localStorage から取得
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>カートに商品がありません。</p>";
    summary.innerHTML = "";
    return;
  }

  let total = 0;
  cartItems.forEach((item, index) => {
    const product = products[item.id];
    const li = document.createElement("li");
    li.className = "cart-item";

    const left = document.createElement("div");
    left.className = "cart-image";
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    left.appendChild(img);

    const right = document.createElement("div");
    right.className = "cart-info";
    right.innerHTML = `
      <strong>${product.name}</strong><br>
      ${item.option ? `選択: ${item.option}<br>` : ""}
      数量: ${item.quantity}<br>
      小計: ${(product.price * item.quantity).toLocaleString()}円
    `;

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "cart-delete";
    del.addEventListener("click", () => {
    // 現在のカートからこの商品（idとoptionが一致）を除外
    const updatedCart = cartItems.filter(ci =>
        !(ci.id === item.id && ci.option === item.option)
    );

    // localStorageを更新
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 再描画
    renderCart();
    });
    
    li.appendChild(left);
    li.appendChild(right);
    li.appendChild(del);
    cartContainer.appendChild(li);

    total += product.price * item.quantity;
  });

  summary.innerHTML = `<p>合計金額: ${total.toLocaleString()}円</p><button id="checkoutButton">購入手続きへ</button>`;
}

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
