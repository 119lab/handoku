# Luminous Lightbox で画像を拡大表示しよう

## 完成イメージ

メニュー画像をクリックすると、画面全体に拡大して表示されるようになります。

---

## STEP 1｜CSSを読み込む

`<head>` の中に Luminous の CSS を追加します。

```html
<!-- オリジナルCSS -->
<link rel="stylesheet" href="css/style.css">

<!-- Luminous Lightbox CSS ← 追加 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/luminous-lightbox/2.3.2/luminous-basic.min.css">
```

---

## STEP 2｜画像をリンクで囲む

各 `<img>` を `<a>` タグで囲みます。  
`class="grid-gallery"` と `href="画像のパス"` がポイントです。

**変更前**
```html
<div class="item">
    <img src="images/menu1.webp" alt="">
    <p>アボカドトースト</p>
</div>
```

**変更後**
```html
<div class="item">
    <a class="grid-gallery" href="images/menu1.webp">  ← 追加
        <img src="images/menu1.webp" alt="">
    </a>                                               ← 追加
    <p>アボカドトースト</p>
</div>
```

> `href` には拡大表示したい画像のパスを指定します。`src` と同じパスでOKです。

---

## STEP 3｜JSを読み込んで初期化する

`</body>` の直前に Luminous の JS と初期化コードを追加します。

```html
    <!-- Luminous Lightbox JS ← 追加 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/luminous-lightbox/2.3.2/luminous.min.js"></script>
    <script>
        new LuminousGallery(document.querySelectorAll(".grid-gallery"));
    </script>
</body>
```

`LuminousGallery()` に `.grid-gallery` クラスの要素をすべて渡すことで、複数の画像をギャラリーとしてまとめて登録できます。

---

## まとめ

| 追加箇所 | 内容 |
|---|---|
| `<head>` | Luminous の CSS |
| `<img>` の外側 | `<a class="grid-gallery" href="画像パス">` |
| `</body>` 直前 | Luminous の JS ＋ `new LuminousGallery(...)` |

たったこれだけで、クリックで拡大できるギャラリー機能が完成します。
