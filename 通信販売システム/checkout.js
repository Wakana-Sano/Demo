// 通信販売システム - 情報入力用 checkout.js

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toPayment");
  if (!button) return;

  button.addEventListener("click", () => {
    const name = document.getElementById("name")?.value.trim();
    const postal = document.getElementById("postal")?.value.trim();
    const prefecture = document.getElementById("prefecture")?.value;
    const city = document.getElementById("city")?.value.trim();
    const building = document.getElementById("building")?.value.trim();
    const contact = document.getElementById("contact")?.value.trim();

    if (!name || !postal || !prefecture || !city || !contact) {
      alert("必須項目をすべて入力してください。");
      return;
    }

    const address = {
      postal,
      prefecture,
      city,
      building // 任意なので空でもOK
    };

    const userInfo = { name, address, contact };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // 支払い選択ページへ遷移
    window.location.href = "payment.html";
  });
});
