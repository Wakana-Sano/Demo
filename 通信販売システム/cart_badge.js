// 通信販売システム - カートバッジ表示処理

window.addEventListener("DOMContentLoaded", () => {
  const badge = document.getElementById("cart-badge");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (badge) {
    badge.textContent = ""; // 中身を空にする
    badge.style.display = cart.length > 0 ? "block" : "none";
  }
});
