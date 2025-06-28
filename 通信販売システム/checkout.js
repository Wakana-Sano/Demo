// 通信販売システム - 情報入力用 checkout.js

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toPayment");

  if (!button) return; // 安全対策

  button.addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const contactInput = document.getElementById("contact");

    if (!nameInput || !addressInput || !contactInput) {
      alert("入力フィールドが見つかりません。");
      return;
    }

    const name = nameInput.value.trim();
    const address = addressInput.value.trim();
    const contact = contactInput.value.trim();

    if (!name || !address || !contact) {
      alert("すべての項目を入力してください。");
      return;
    }

    const userInfo = { name, address, contact };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // 支払い選択ページへ遷移
    window.location.href = "payment.html";
  });
});
