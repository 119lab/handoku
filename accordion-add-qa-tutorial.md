# 既存のアコーディオンQ&AにQ&Aを1つ追加しよう

## はじめに

すでに完成しているQ&Aページに、新しい質問と回答を1つ追加します。  
コードを追加する前に、**まず既存のコードを読む**のが大事なポイントです。

---

## STEP 1｜既存のHTMLを読む（画面回収）

まず `faq.html` を開いて、Q&Aのかたまりがどんなパターンで書かれているか確認します。

```html
<div class="accordion-item">
    <button class="accordion-question">
        <span class="label-q">Q.</span>予約はできますか？
    </button>
    <div class="accordion-answer">
        <p><span class="label-a">A.</span>回答文がここに入ります。</p>
    </div>
</div>
```

**構造のポイント：**

| タグ・クラス | 役割 |
|---|---|
| `<div class="accordion-item">` | Q&A 1セットを囲む外側のボックス |
| `<button class="accordion-question">` | クリックできる質問ボタン |
| `<span class="label-q">Q.</span>` | 「Q.」のラベル（水色） |
| `<div class="accordion-answer">` | 初期状態は非表示の回答エリア |
| `<span class="label-a">A.</span>` | 「A.」のラベル |

> このパターンが質問の数だけ繰り返されています。新しい質問を追加するときも、同じパターンをコピーして使います。

---

## STEP 2｜既存のJavaScriptを読む

次に `<script>` の中を確認します。

```js
const q0 = document.querySelectorAll(".accordion-question")[0];
const q1 = document.querySelectorAll(".accordion-question")[1];
const q2 = document.querySelectorAll(".accordion-question")[2];
const q3 = document.querySelectorAll(".accordion-question")[3];
const q4 = document.querySelectorAll(".accordion-question")[4];
const q5 = document.querySelectorAll(".accordion-question")[5];
```

`querySelectorAll` はページ内の `.accordion-question` を**すべて取得**して、配列のように番号（インデックス）で管理しています。

| 変数 | 対応する質問 |
|---|---|
| `q0` | 1つ目の質問（インデックス: 0） |
| `q1` | 2つ目の質問（インデックス: 1） |
| `q5` | 6つ目の質問（インデックス: 5） |

> **インデックスは0始まり**なので、6つ目が `[5]` になります。新しく7つ目を追加するなら `[6]` になります。

次にクリックの処理を確認します。

```js
q0.addEventListener("click", function() {
    q0.nextElementSibling.classList.toggle("is-open");
    q0.classList.toggle("is-open");
});
```

**処理のポイント：**

| コード | 意味 |
|---|---|
| `addEventListener("click", ...)` | クリックされたときに実行する処理を登録 |
| `q0.nextElementSibling` | `q0` のすぐ次の要素（= 回答の `<div>`）を取得 |
| `classList.toggle("is-open")` | `is-open` クラスを付けたり外したりする |

> `is-open` クラスがつくと CSS で `max-height` が広がり、回答がスライドして表示されます。

---

## STEP 3｜HTMLに新しいQ&Aを追加する

既存の最後のQ&Aブロックのすぐ下に、同じパターンで新しいブロックをコピーして追加します。

**追加する場所：** 最後の `</div>` の直後

```html
<!-- ↓ 新しいQ&Aを追加 ↓ -->
<div class="accordion-item">
    <button class="accordion-question">
        <span class="label-q">Q.</span>クレジットカードは使えますか？
    </button>
    <div class="accordion-answer">
        <p><span class="label-a">A.</span>はい、主要なクレジットカードおよび電子マネーに対応しております。</p>
    </div>
</div>
```

> HTMLを追加しただけでは、クリックしても開閉しません。次のSTEPでJavaScriptも追加します。

---

## STEP 4｜JavaScriptに新しい質問を追加する

既存のJSの末尾に、7つ目の質問（インデックス `[6]`）を追加します。

**変数の宣言を追加：**

```js
// 既存（変更しない）
const q5 = document.querySelectorAll(".accordion-question")[5];

// ↓ 新しく追加
const q6 = document.querySelectorAll(".accordion-question")[6];
```

**クリック処理を追加：**

```js
// 既存（変更しない）
q5.addEventListener("click", function() {
    q5.nextElementSibling.classList.toggle("is-open");
    q5.classList.toggle("is-open");
});

// ↓ 新しく追加
q6.addEventListener("click", function() {
    q6.nextElementSibling.classList.toggle("is-open");
    q6.classList.toggle("is-open");
});
```

> q5 と q6 の**番号だけ変えれば**OK。それ以外の書き方はまったく同じです。

---

## まとめ

| やること | 場所 |
|---|---|
| 既存の構造パターンを確認する | HTML の `accordion-item` ブロックを読む |
| インデックスの番号を確認する | JS の `[0]`〜`[5]` を数える |
| 新しいQ&AブロックをHTMLに追加 | 最後の `accordion-item` の直後 |
| JS に変数とクリック処理を追加 | `q5` の次に `q6` として追加 |

**既存のコードを追加するときのコツ：**  
まず「何個あるか」「番号がいくつまで使われているか」を確認してから、次の番号で追加するだけです。
