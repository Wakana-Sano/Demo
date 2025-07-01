// 通信販売システム - 支払い選択用 payment.js

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toConfirm");

  // 年と月の選択肢を自動生成
  const monthSelect = document.getElementById("expiryMonth");
  const yearSelect = document.getElementById("expiryYear");

  // 月: 1〜12
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2, "0");
    option.textContent = `${i} 月`;
    monthSelect.appendChild(option);
  }

  // 年: 現在〜+10年
  const currentYear = new Date().getFullYear();
  for (let i = 0; i <= 10; i++) {
    const year = currentYear + i;
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year} 年`;
    yearSelect.appendChild(option);
  }

  // ボタン押下でバリデーション
  button.addEventListener("click", () => {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardName = document.getElementById("cardName").value.trim();
    const expMonth = monthSelect.value;
    const expYear = yearSelect.value;
    const securityCode = document.getElementById("securityCode").value.trim();

    if (!cardNumber || !cardName || !expMonth || !expYear || !securityCode) {
      alert("すべての項目を入力してください。");
      return;
    }

    // 入力内容を保存（確認画面用）
    const paymentInfo = {
      cardNumber,
      cardName,
      expMonth,
      expYear,
      securityCode
    };
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

    // 次のページへ
    window.location.href = "confirm.html";
  });
});
