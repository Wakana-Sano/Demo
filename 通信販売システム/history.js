// 通信販売システム - 履歴表示用 history.js

window.addEventListener("DOMContentLoaded", () => {
  const userId = sessionStorage.getItem("userId");
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "{}");
  const history = (userId && orderHistory[userId]) ? orderHistory[userId] : [];
  const products = {
    book: { name: "漫画セット", price: 2400, image: "images/book_tate.png" },
    dress: { name: "ワンピース", price: 2900, image: "images/fashion_onepiece.png" },
    box: { name: "カラーボックス", price: 2400, image: "images/kagu_colorbox.png" },
    kids: { name: "子供用洋服", price: 1300, image: "images/kodomofuku_boy.png" },
    earphone: { name: "ワイヤレスイヤホン", price: 4500, image: "images/music_earphone_true_wireless_case.png" },
    bag: { name: "ランドセル", price: 38000, image: "images/school_bag.png" },
    stand: { name: "スマホスタンド", price: 1100, image: "images/stand_smartphone.png" },
    mug: { name: "マグカップ", price: 850, image: "images/syokki_mug_cup.png" },
    owan: { name: "お椀", price: 750, image: "images/syokki_owan.png" }
  };

  // container方式で
  const container = document.getElementById("orderHistoryContainer") || document.getElementById("orderHistoryList");
  const noMsg = document.getElementById("noHistoryMsg");

  if (!history.length) {
    noMsg.style.display = "block";
    return;
  }

  history.slice().reverse().forEach(order => {
    let total = 0;
    // 商品リスト生成
    const itemsHtml = order.cart.map(item => {
      const prod = products[item.id];
      if (!prod) return "";
      const subtotal = prod.price * item.quantity;
      total += subtotal;
      return `
        <li class="history-item">
          <img src="${prod.image}" alt="${prod.name}" class="history-item-img">
          <div class="history-item-info">
            <strong>${prod.name}</strong>
            <span>${item.option ? `（${item.option}）` : "（オプションなし）"}</span><br>
            数量: ${item.quantity}<br>
            単価: ${prod.price.toLocaleString()}円<br>
            小計: ${subtotal.toLocaleString()}円
          </div>
        </li>
      `;
    }).join("");

    total += 660; // 送料

    // 注文ブロック生成
    const block = document.createElement("div");
    block.className = "history-block";
    block.innerHTML = `
      <div class="order-info">
        <strong>注文番号:</strong> ${order.orderId}<br>
        <strong>注文日時:</strong> ${new Date(order.orderDate).toLocaleString()}
      </div>
      <div class="order-status">
        <span class="badge badge-paid">支払済み</span>
        <span class="badge badge-shipping">発送準備中</span>
      </div>
      <ul class="history-items">
        ${itemsHtml}
      </ul>
      <div class="order-total">合計金額（送料込）: ${total.toLocaleString()}円</div>
    `;
    container.appendChild(block);
  });
});
