document.addEventListener('DOMContentLoaded', function () {
    var cart = [
        { id: 1, name: "Heirloom Tomato Seedlings", desc: "Pack of 12 \u2022 Organic", price: 24.00, qty: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8CIqTCLc36yGW0CnUF-1uDZ9oO8sz03bf8xCN7fWhSuyqVTLMT2GiVt5nL8RJUA8v-hhvy9ECUl_0s6xH-up1pTcY4p1Tip_qkzDV9X7vfZBEfXrfw6xhK5xAIjyH2Vp6tkdMLjY4K2PsE55I7ih0VUo6V4NX23keDuHTs_SVDXHAta9p8J7IstDXojNqweylBTYWZioCUJwZigN4uBgWe4GlxZ2rPRVqYvf1wTOoThV4GDzIY7erm58tBHHlyow1MT7Ry7bHO4I" },
        { id: 2, name: "Premium Hand Trowel", desc: "Ergonomic Handle", price: 18.50, qty: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSF2vIqFGJR1LFfxdt2gXHTGmGYfOHirSTXT3gzPe8VKXt0Cohsg9P7-p0o_yiirdGQG-Frn6_JAcNhYXBkbC0golFqOTnVlg6DgRcYrlMvIBUhvNNVu3P5osz83xSNuBr6XJiTpUSDjQviHsaKK-G3N-86qXbicoNyZnW4fc7z2LTlu3EzjXDGOgcsCZaAZMixKf1PIRxWXYS7GpJC1YE9TJS6JZASaeEP7m5jJi7W9pny459OGdpQLer1IGgHa-rU0ala8pDlJg" }
    ];
    var nextId = 3;

    function renderCart() {
        var container = document.getElementById('cart-items');
        if (!container) return;
        if (!cart.length) {
            container.innerHTML = '<div class="text-center py-8 text-on-surface-variant"><span class="material-symbols-outlined text-4xl mb-2">remove_shopping_cart</span><p class="font-label-lg">Your cart is empty</p><p class="text-label-sm mt-1">Browse the shop and add items!</p></div>';
            updateTotals();
            return;
        }
        container.innerHTML = cart.map(function (item) {
            return '<div class="flex items-start gap-3 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30 cart-item" data-id="' + item.id + '">' +
                '<div class="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden border border-outline-variant/20">' +
                '<img class="w-full h-full object-cover" src="' + item.img + '" alt="' + item.name + '">' +
                '</div>' +
                '<div class="flex-1 min-w-0">' +
                '<div class="flex items-start justify-between gap-2">' +
                '<div>' +
                '<h4 class="font-label-lg text-on-surface truncate">' + item.name + '</h4>' +
                '<p class="text-label-sm text-on-surface-variant">' + item.desc + '</p>' +
                '<p class="font-bold text-secondary mt-1">$' + item.price.toFixed(2) + '</p>' +
                '</div>' +
                '<button class="text-on-surface-variant hover:text-error transition-colors p-1 -mr-1 -mt-1" onclick="window.removeCartItem(' + item.id + ')">' +
                '<span class="material-symbols-outlined">close</span>' +
                '</button>' +
                '</div>' +
                '<div class="flex items-center gap-2 mt-2">' +
                '<button class="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-outline-variant transition-all text-on-surface font-label-lg" onclick="window.changeCartQty(' + item.id + ', -1)">\u2212</button>' +
                '<span class="w-8 text-center font-label-lg text-on-surface">' + item.qty + '</span>' +
                '<button class="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-outline-variant transition-all text-on-surface font-label-lg" onclick="window.changeCartQty(' + item.id + ', 1)">+</button>' +
                '<span class="ml-auto font-bold text-secondary">$' + (item.price * item.qty).toFixed(2) + '</span>' +
                '</div>' +
                '</div>' +
                '</div>';
        }).join('');
        updateTotals();
    }

    window.changeCartQty = function (id, delta) {
        var item = cart.find(function (i) { return i.id === id; });
        if (!item) return;
        var newQty = item.qty + delta;
        if (newQty < 1) { window.removeCartItem(id); return; }
        item.qty = newQty;
        renderCart();
    };

    window.removeCartItem = function (id) {
        cart = cart.filter(function (i) { return i.id !== id; });
        renderCart();
    };

    window.addCartItem = function () {
        var name = prompt('Enter item name:');
        if (!name) return;
        var price = parseFloat(prompt('Enter price (e.g. 12.99):'));
        if (isNaN(price) || price < 0) return;
        cart.push({ id: nextId++, name: name, desc: 'Custom item', price: price, qty: 1, img: '' });
        renderCart();
    };

    function updateTotals() {
        var subtotal = cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
        var shipping = cart.length ? 5.00 : 0;
        var tax = subtotal * 0.08;
        var total = subtotal + shipping + tax;
        var st = document.getElementById('subtotal');
        var sh = document.getElementById('shipping');
        var tx = document.getElementById('taxes');
        var tt = document.getElementById('total');
        if (st) st.textContent = '$' + subtotal.toFixed(2);
        if (sh) sh.textContent = cart.length ? '$5.00' : '$0.00';
        if (tx) tx.textContent = '$' + tax.toFixed(2);
        if (tt) tt.textContent = '$' + total.toFixed(2);
    }

    renderCart();
});
