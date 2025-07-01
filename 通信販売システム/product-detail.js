// 商品データ
const products = {
  book: {
    id: "book",
    name: "漫画セット",
    price: 2400,
    image: "images/book_tate.png",
    category: "本",
    description: "「○○」の1巻から4巻のセットです！"
  },
  dress: {
    id: "dress",
    name: "ワンピース",
    price: 2900,
    image: "images/fashion_onepiece.png",
    category: "洋服",
    description: "女性用のワンピースです。",
    options: {
      label: "サイズ",
      values: ["S", "M", "L"]
    }
  },
  box: {
    id: "box",
    name: "カラーボックス",
    price: 2400,
    image: "images/kagu_colorbox.png",
    category: "家具",
    description: "収納に便利なカラーボックスです。",
    options: {
      label: "色",
      values: ["白", "ピンク", "茶"]
    }
  },
  kids: {
    id: "kids",
    name: "子供用洋服",
    price: 1300,
    image: "images/kodomofuku_boy.png",
    category: "洋服",
    description: "子供用のかわいい洋服です。",
    options: {
      label: "サイズ",
      values: ["100cm", "110cm", "120cm", "130cm", "140cm", "150cm", "160cm"]
    }
  },
  earphone: {
    id: "earphone",
    name: "ワイヤレスイヤホン",
    price: 4500,
    image: "images/music_earphone_true_wireless_case.png",
    category: "スマホ関連",
    description: "Bluetooth接続で使えるワイヤレスイヤホンです。"
  },
  bag: {
    id: "bag",
    name: "ランドセル",
    price: 38000,
    image: "images/school_bag.png",
    category: "カバン",
    description: "6年間しっかり使えるものになっています。",
    options: {
      label: "色",
      values: ["赤", "黒", "紺", "ピンク", "水色", "紫", "茶", "橙", "緑"]
    }
  },
  stand: {
    id: "stand",
    name: "スマホスタンド",
    price: 1100,
    image: "images/stand_smartphone.png",
    category: "スマホ関連",
    description: "スマホを立てかけて使える便利なスタンドです。"
  },
  mug: {
    id: "mug",
    name: "マグカップ",
    price: 850,
    image: "images/syokki_mug_cup.png",
    category: "食器",
    description: "耐熱性があるのでレンジに入れても大丈夫です。"
  },
  owan: {
    id: "owan",
    name: "お椀",
    price: 750,
    image: "images/syokki_owan.png",
    category: "食器",
    description: "お味噌汁やスープなどに使えます。"
  }
};

// DOM構築
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const product = products[id];
  const container = document.getElementById("product");

  if (!product) {
    container.innerHTML = "<p>商品が見つかりませんでした。</p>";
    return;
  }

  // 左側（画像）
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.className = "product-image";

  const left = document.createElement("div");
  left.className = "product-left";
  left.appendChild(image);

  // 右側（情報）
  const info = document.createElement("div");
  info.className = "product-info";

  const name = document.createElement("h2");
  name.textContent = product.name;
  info.appendChild(name);

  const desc = document.createElement("p");
  desc.className = "product-description";
  desc.textContent = product.description;
  info.appendChild(desc);

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = `${product.price.toLocaleString()}円`;
  info.appendChild(price);

  const purchase = document.createElement("div");
  purchase.className = "purchase-options";

  // オプション（色・サイズなど）
  let select = null;
  if (product.options) {
    const optionGroup = document.createElement("div");
    optionGroup.className = "option-group";

    const label = document.createElement("label");
    label.textContent = `${product.options.label}：`;

    select = document.createElement("select");
    product.options.values.forEach(val => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = val;
      select.appendChild(opt);
    });

    optionGroup.appendChild(label);
    optionGroup.appendChild(select);
    purchase.appendChild(optionGroup);
  }

  // 数量
  const qtyGroup = document.createElement("div");
  qtyGroup.className = "option-group";

  const qtyLabel = document.createElement("label");
  qtyLabel.textContent = "数量：";

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.value = "1";

  qtyGroup.appendChild(qtyLabel);
  qtyGroup.appendChild(qtyInput);
  purchase.appendChild(qtyGroup);

  // ボタン
  const button = document.createElement("button");
  button.textContent = "カートに入れる";
  purchase.appendChild(button);

  info.appendChild(purchase);

  // 全体に追加
  container.innerHTML = ""; // ← ここでリセットする
  container.appendChild(left);
  container.appendChild(info);

  // ボタンにクリックイベント追加
  button.addEventListener("click", () => {
    const selectedOption = select ? select.value : null;
    const quantity = parseInt(qtyInput.value) || 1;

    // localStorageから既存カート情報を取得
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 同じ商品＋同じオプションがすでにあるか調べる
    const existingItem = cart.find(item =>
      item.id === product.id &&
      item.option === selectedOption
    );

    if (existingItem) {
      // 既存にあれば数量を加算
      existingItem.quantity += quantity;
    } else {
      // なければ新しく追加
      cart.push({
        id: product.id,
        option: selectedOption,
        quantity: quantity
      });
    }

    // 保存
    localStorage.setItem("cart", JSON.stringify(cart));

    // 完了メッセージ
    alert("カートに追加しました！");
  });

});
