$(window).on('load', function() {
  $('#loading').addClass('fadeout');
  setTimeout(function() {
    $('#loading').hide();
  }, 1100); 
});

$(function () {
    //slideshowクラスを持った要素ごとに処理を実行
    $('.slideshow').each(function () {

        var $slides = $(this).find('img'),  //全てのスライド
            slideCount = $slides.length,    //スライドの点数
            currentIndex = 0;               //現在のスライドを示すインデックス

        //１番目のスライドをフェードインで表示
        $slides.eq(currentIndex).fadeIn();

        //7.5秒ごとに shoeNextSlide 関数を実行
        setInterval(showNextSlide, 7500);

        function showNextSlide() {

            //次に表示するスライドのインデックス
            //（もし最後のスライドなら最初に戻る
            var nextIndex = (currentIndex + 1) % slideCount;

            //現在のスライドをフェードアウト
            $slides.eq(currentIndex).fadeOut();

            //次のスライドをフェードイン
            $slides.eq(nextIndex).fadeIn();

            //現在のスライドのインデックスを更新
            currentIndex = nextIndex;
        }
  
    })
})

// 検索アイコンを押すと検索バーがトグル表示される
$('.fa-search').on('click', function () {
    $('.search-bar').slideToggle();
});


//クリックしたら画像を切り替え   
    $(document).ready(function () {
        $('.thumb').click(function () {
            // クリックした画像の src を取得
            const newSrc = $(this).attr('src');

            // そのsrcをメイン画像にセット
            $('#main-img').attr('src', newSrc);
        });
    });



//カートに入れるがクリックされたら数字を増やす


// ------------------------------------
//  カートの数を読み込んで初期設定
// ------------------------------------
let savedCount = localStorage.getItem('cartCount'); // ← 保存された "cartCount" を読み込む
let cartCount = savedCount ? parseInt(savedCount) : 0; // ← 数字に変換（なければ0）

// カートのバッジを更新（0より大きければ表示）
if (cartCount > 0) {
    $('.cart-badge').text(cartCount).show(); // ← バッジを表示
} else {
    $('.cart-badge').hide(); // ← 0なら非表示
}





// ------------------------------------
// 「カートに入れる」ボタンを押したとき
// ------------------------------------
$('.add-to-cart').on('click', function () {

    // --- 商品データを用意する ---
    // detail.html の中に書いてある情報を取得します
    const name = $('h2').text(); // 商品名
    const price = $('strong').text(); // 値段（例：¥3,500）
    const img = $('#main-img').attr('src'); // メイン画像のURL
    const size = $('#select-size').val(); // 選択されたサイズ
    const qty = parseInt($('#select-quantity').val()); // 個数

    // 入力チェック（選択してなかったら警告）
    if (!size || !qty) {
        alert('サイズと個数を選択してください。');
        return;
    }

    // ---- consoleに出して確認する（デバッグ用）----
    console.log('【カートに追加】');
    console.log('商品名:', name);
    console.log('価格:', price);
    console.log('サイズ:', size);
    console.log('個数:', qty);

    // --- すでに localStorage に保存されているカートを読み出す ---
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // --- 新しい商品データを追加する ---
    cart.push({
        name: name,
        price: price,
        img: img,
        size: size,
        qty: qty
    });

    // --- 追加したデータを保存しなおす ---
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // --- カートの個数バッジも更新する ---
    let newCount = cart.reduce((sum, item) => sum + item.qty, 0);
    localStorage.setItem('cartCount', newCount);
    $('.cart-badge').text(newCount).show();

    alert('商品をカートに追加しました！');
});


//--------------------------------------------
// カートページの表示切り替え
//--------------------------------------------

// ページ全体が読み込まれたら実行（安全のため）
$(document).ready(function () {

    // localStorage から保存されている cartCount を取り出す
    let cartCount = localStorage.getItem('cartCount');

    // 文字として取り出されるので、数値に変換
    cartCount = parseInt(cartCount);

    // カートページ（cart.html）にいるか確認する
    // （他のページではこの処理を無視したいから）
    if ($('.cart-page').length > 0) {

        // cartCount が 0 または存在しない場合（＝カート空）
        if (!cartCount || cartCount === 0) {

            // 「カートが空です」メッセージを表示
            $('.cart-empty').show();

            // 表（table）と合計金額部分は非表示にする
            $('.cart-table').hide();
            $('.cart-total').hide();

        } else {
            // カートに1つ以上入っている場合

            // 表と合計を表示
            $('.cart-table').show();
            $('.cart-total').show();

            // 空メッセージは非表示
            $('.cart-empty').hide();
        }
    }
});

//

//----------------------------------------------
    // 🛒 カートの中身をページに表示する
    //----------------------------------------------
    $(document).ready(function () {

        // localStorage からカートの中身を読み取る
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // カートが空なら「現在カートに商品がありません」を表示して、表を隠す
    if (cart.length === 0) {
        $('.cart-empty').show();
    $('.cart-table').hide();
    $('.cart-total').hide();
    return;
    }

    // カートが空じゃないなら、「空です」メッセージを隠す
    $('.cart-empty').hide();
    $('.cart-table').show();
    $('.cart-total').show();

    // tbody の中身を空にしておく
    $('.cart-table tbody').empty();

    let total = 0; // 合計金額を入れる変数

    // 商品ごとに1行ずつテーブルに追加
    cart.forEach(item => {

        // 値段の「¥」を取り除いて数値に変換
        let priceNum = parseInt(item.price.replace(/[¥,]/g, ''));
    let subTotal = priceNum * item.qty;
    total += subTotal;

    // 1行分のHTMLを作成
    let row = `
    <tr>
        <td><img src="${item.img}" alt="商品" class="cart-item-img"></td>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td>¥${subTotal.toLocaleString()}</td>
        <td><button class="remove-btn">削除</button></td>
    </tr>
    `;

    // 表の中に追加
    $('.cart-table tbody').append(row);
    });

    // 合計金額を更新
    $('.cart-total strong').text(`¥${total.toLocaleString()}`);
});


//----------------------------------------------
// 削除ボタンが押されたら
//----------------------------------------------
$(document).on('click', '.remove-btn', function () {
    // 押されたボタンの行(tr)を取得
    const row = $(this).closest('tr');

    // 行から商品名とサイズを取得（ユニークな識別に使う）
    const name = row.find('td').eq(1).text(); // 商品名
    const size = row.find('td').eq(2).text(); // サイズ

    // localStorage からカートを取得
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 対象の商品を除外して新しい配列を作る
    cart = cart.filter(item => !(item.name === name && item.size === size));

    // localStorage に保存
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // カートバッジも更新
    const newCount = cart.reduce((sum, item) => sum + item.qty, 0);
    localStorage.setItem('cartCount', newCount);
    if (newCount > 0) {
        $('.cart-badge').text(newCount).show();
    } else {
        $('.cart-badge').hide();
    }

    // 行を削除
    row.remove();

    // 合計金額を再計算
    let total = 0;
    cart.forEach(item => {
        const priceNum = parseInt(item.price.replace(/[¥,]/g, ''));
        total += priceNum * item.qty;
    });
    $('.cart-total strong').text(`¥${total.toLocaleString()}`);

    // カートが空になったらメッセージ表示
    if (cart.length === 0) {
        $('.cart-empty').show();
        $('.cart-table').hide();
        $('.cart-total').hide();
    }
});


$('#reset-cart').on('click', function () {
    localStorage.clear(); // 全データ削除
    alert('カートをリセットしました！');
    location.reload(); // ページを再読み込み
});



//----------------------------------------------
// 商品名検索
//----------------------------------------------
// 全角を半角に変換する関数
function toHalfWidth(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

$(function () {
    // 検索ボタンが押されたとき
    $('.search-bar button').on('click', function () {
        // キーワードを半角にして小文字化
        const keyword = toHalfWidth($('.search-bar input').val().toLowerCase());

        $('.item').each(function () {
            // 商品名も半角にして小文字化
            const productName = toHalfWidth($(this).find('p').text().toLowerCase());

            if (productName.includes(keyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Enterキーでも検索
    $('.search-bar input').on('keypress', function (e) {
        if (e.which === 13) {
            $('.search-bar button').click();
        }
    });
});

