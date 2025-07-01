// 通信販売システム - 注文完了ページ処理

window.addEventListener("DOMContentLoaded", () => {
  const orderData = JSON.parse(sessionStorage.getItem("finalOrder") || "{}");

  // 注文IDと日時を表示
  const orderIdElem = document.getElementById("orderId");
  const orderDateElem = document.getElementById("orderDate");

  if (orderData.orderId && orderData.orderDate) {
    // 日時フォーマット変換（例：2025-07-01T10:40:00.000Z → 2025/07/01 19:40）
    const date = new Date(orderData.orderDate);
    const formattedDate = date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    orderIdElem.textContent = orderData.orderId;
    orderDateElem.textContent = formattedDate;
  } else {
    orderIdElem.textContent = "不明";
    orderDateElem.textContent = "不明";
  }
});
