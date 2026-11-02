# JavaScriptでスライドメニューを作ろう

## 完成イメージ

「Menu」ボタンをクリックするとナビゲーションがスライドして表示され、「Close」ボタンで閉じます。

---

## STEP 1｜CSSを追加する

`<head>` の中に `<style>` タグで直接CSSを追加します。  
既存の `style.css` の `.main-nav` を上書きして、スライド用のスタイルに切り替えます。

```html
<style>
    /* Menuボタン */
    .btn-menu {
        position: absolute;
        top: 12px;
        right: 12px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: rgb(7, 7, 7);
        padding: 0.5rem 1rem;
        z-index: 1;  /* ← メニューリストより前面に表示するために必要 */
    }

    /* ナビゲーション（初期状態：幅0で非表示） */
    .main-nav {
        width: 0;
        position: absolute;
        top: 25px;
        right: 0;
        overflow: hidden;
        transition: 0.5s;  /* ← スライドアニメーション */
        display: block;
    }
    .main-nav li {
        text-align: center;
        margin: 1.5rem 0;
    }
    .main-nav a {
        display: block;
    }

    /* ナビゲーション（開いた状態：幅200pxに広がる） */
    .main-nav.open-menu {
        width: 200px;
    }
</style>
```

> **ポイント：** `width: 0` と `overflow: hidden` の組み合わせでナビを隠し、`transition: 0.5s` でアニメーションさせます。`z-index: 1` をボタンに付けないと、メニューが開いたときにリストがボタンを覆い、Closeが押せなくなります。

---

## STEP 2｜HTMLを変更する

`<nav>` に `position: relative` を追加し、その中に `<button>` を加えます。

**変更前**
```html
<nav>
    <ul class="main-nav font-english">
        <li><a href="news.html">News</a></li>
        <li><a href="menu.html">Menu</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

**変更後**
```html
<nav style="position: relative;">               ← position: relative を追加
    <button class="btn-menu">Menu</button>      ← ボタンを追加
    <ul class="main-nav font-english">
        <li><a href="news.html">News</a></li>
        <li><a href="menu.html">Menu</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

> **ポイント：** ボタンは `position: absolute` なので、基準となる親要素に `position: relative` が必要です。

---

## STEP 3｜JavaScriptを追加する

`</body>` の直前にスクリプトを追加します。

```html
<script>
    const btn = document.querySelector(".btn-menu");
    const nav = document.querySelector(".main-nav");

    btn.addEventListener("click", () => {
        nav.classList.toggle("open-menu");
        if (btn.innerHTML === "Menu") {
            btn.innerHTML = "Close";
        } else {
            btn.innerHTML = "Menu";
        }
    });
</script>
```

**処理の流れ：**

1. `querySelector` でボタンとナビを取得
2. ボタンのクリックイベントを `addEventListener` で監視
3. クリックのたびに `classList.toggle("open-menu")` でクラスを付け外し
4. ボタンのテキストを `Menu` ↔ `Close` で切り替え

---

## まとめ

| 追加・変更箇所 | 内容 |
|---|---|
| `<head>` 内 `<style>` | `.btn-menu` と `.main-nav` のスライド用スタイル |
| `<nav>` タグ | `position: relative` を追加 |
| `<nav>` 内 | `<button class="btn-menu">Menu</button>` を追加 |
| `</body>` 直前 | クリックで `.open-menu` を切り替えるJS |

CSSの `width: 0 → 200px` の変化を `transition` でアニメーションさせるのがスライドメニューの核心です。
