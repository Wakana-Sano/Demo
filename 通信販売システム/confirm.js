// 通信販売システム - 内容確認 confirm.js

window.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // ユーザー情報
  document.getElementById("confirmName").innerText = `氏名：${userInfo.name || "未入力"}`;
  document.getElementById("confirmZip").innerText = `郵便番号：${userInfo.address?.postal || "未入力"}`;

  const addressPrefCity = [userInfo.address?.prefecture, userInfo.address?.city].filter(Boolean).join(" ");
  const addressBuilding = userInfo.address?.building;

  document.getElementById("confirmAddress").innerText =
    addressPrefCity ? `住所：${addressPrefCity}` : "住所：未入力";

  if (addressBuilding) {
    const p = document.createElement("p");
    p.textContent = `　　　　${addressBuilding}`;
    document.getElementById("confirmAddress").after(p);
  }

  document.getElementById("confirmContact").innerText = `連絡先：${userInfo.contact || "未入力"}`;

  // カード情報
  const cardNumber = paymentInfo.cardNumber || "";
  const maskedCard = cardNumber ? "**** **** **** " + cardNumber.slice(-4) : "**** **** **** ****";
  document.getElementById("confirmCardName").innerText = `名義人：${paymentInfo.cardName || "未入力"}`;
  document.getElementById("confirmCardNumber").innerText = `カード番号：${maskedCard}`;
  document.getElementById("confirmExpiry").innerText = `有効期限：${paymentInfo.expMonth || "--"}/${paymentInfo.expYear || "--"}`;

  // 商品情報
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

  const itemList = document.getElementById("confirmItems");
  const shippingFee = 660;
  let total = 0;

  cart.forEach(item => {
    const product = products[item.id];
    const li = document.createElement("li");
    li.className = "confirm-item";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "confirm-item-img";

    const info = document.createElement("div");
    info.className = "confirm-item-info";

    const option = item.option ? `（${item.option}）` : "（オプションなし）";
    const subtotal = product.price * item.quantity;
    info.innerHTML = `
      <strong>${product.name}</strong> ${option}<br>
      数量: ${item.quantity}<br>
      小計: ${subtotal.toLocaleString()}円
    `;

    li.appendChild(img);
    li.appendChild(info);
    itemList.appendChild(li);

    total += subtotal;
  });

  total += shippingFee;
  document.getElementById("confirmTotal").innerText = `合計金額（送料込み）：${total.toLocaleString()}円`;

  // 注文確定ボタン処理
  document.getElementById("confirmOrder").addEventListener("click", () => {
    alert("ご注文ありがとうございます！");

    // ユーザーIDをセッションから取得（なければ生成）
    let userId = sessionStorage.getItem("userId");
    if (!userId) {
      userId = "user-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      sessionStorage.setItem("userId", userId);
    }

    // 注文データ作成
    const orderId = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const orderDate = new Date().toISOString();

    const finalOrder = {
      orderId,
      orderDate,
      userInfo,
      paymentInfo,
      cart
    };

    // ▼ 過去の履歴を読み込んで追加
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "{}");

    if (!orderHistory[userId]) {
      orderHistory[userId] = [];
    }
    orderHistory[userId].push(finalOrder);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    // ▼ 最後の注文を sessionStorage に保存（完了ページで表示用）
    sessionStorage.setItem("finalOrder", JSON.stringify(finalOrder));

    // ▼ 個人情報など一部だけ削除（必要に応じて調整）
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("paymentInfo");

    // 完了ページへ
    window.location.href = "complete.html";
  });

});
