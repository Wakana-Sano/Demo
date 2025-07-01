// 通信販売システム - ハンバーガーメニュー制御

window.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const menuBadge = document.getElementById("menu-badge");         // 三本線横
  const menuCartBadge = document.getElementById("menu-cart-badge");// メニュー内
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // 初期表示
  function updateBadge() {
    if (cart.length > 0) {
      // メニュー閉じてるときは三本線横だけ表示
      if (!menu.classList.contains("show")) {
        menuBadge.style.display = "inline-block";
        menuCartBadge.style.display = "none";
      } else {
        menuBadge.style.display = "none";
        menuCartBadge.style.display = "inline-block";
      }
    } else {
      menuBadge.style.display = "none";
      menuCartBadge.style.display = "none";
    }
  }

  // 三本線クリックでメニュー開閉＆バッジ切り替え
  hamburger?.addEventListener("click", () => {
    menu.classList.toggle("show");
    hamburger.classList.toggle("open");
    updateBadge();
  });

  updateBadge();
});
