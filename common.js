document.addEventListener('DOMContentLoaded', function () {
    // Squishy button press feedback
    document.querySelectorAll('.squishy-button').forEach(function (btn) {
        btn.addEventListener('mousedown', function () { btn.style.transform = 'scale(0.96)'; });
        btn.addEventListener('mouseup', function () { btn.style.transform = 'scale(1)'; });
        btn.addEventListener('mouseleave', function () { btn.style.transform = 'scale(1)'; });
    });

    // Radio card highlight (checkout)
    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', function (e) {
            document.querySelectorAll('input[type="radio"]').forEach(function (r) {
                var label = r.closest('label');
                if (label) {
                    label.classList.remove('border-secondary');
                    label.classList.add('border-outline-variant/30');
                }
            });
            if (e.target.checked) {
                var label = e.target.closest('label');
                if (label) {
                    label.classList.add('border-secondary');
                    label.classList.remove('border-outline-variant/30');
                }
            }
        });
    });

    // Shared mobile navigation drawer
    if (document.querySelector('.mobile-nav-toggle')) {
        return;
    }

    var header = document.querySelector('header');
    if (!header) {
        return;
    }

    var actionGroup = header.querySelector('div.flex.items-center.gap-4');
    if (!actionGroup) {
        return;
    }

    var toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'mobile-nav-toggle';
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-controls', 'mobile-nav-panel');
    toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
    toggleButton.innerHTML = '<span class="mobile-nav-icon" aria-hidden="true"><span></span><span></span><span></span></span>';

    var actionRow = actionGroup.querySelector('div.flex.gap-2');
    if (actionRow) {
        actionRow.insertBefore(toggleButton, actionRow.firstChild);
    } else {
        actionGroup.insertBefore(toggleButton, actionGroup.firstChild);
    }

    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    var drawer = document.createElement('nav');
    drawer.id = 'mobile-nav-panel';
    drawer.className = 'mobile-nav-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Mobile navigation');
    drawer.setAttribute('aria-hidden', 'true');

    var currentPath = (window.location.pathname.split('/').pop() || 'home.html').toLowerCase();
    var navItems = [
        { href: 'home.html', label: 'Home', icon: 'home' },
        { href: 'shop.html', label: 'Shop', icon: 'grid_view' },
        { href: 'product.html', label: 'Product', icon: 'inventory_2' },
        { href: 'about.html', label: 'About', icon: 'info' },
        { href: 'contact.html', label: 'Contact', icon: 'mail' },
        { href: 'prototype.html', label: 'Prototype', icon: 'description' },
        { href: 'checkout.html', label: 'Checkout', icon: 'shopping_cart' }
    ];

    var linksMarkup = navItems.map(function (item) {
        var isCurrent = currentPath === item.href.toLowerCase();
        return '<a href="' + item.href + '" class="mobile-nav-link' + (isCurrent ? ' is-current' : '') + '"><span class="mobile-nav-link-main"><span class="material-symbols-outlined">' + item.icon + '</span><span>' + item.label + '</span></span></a>';
    }).join('');

    drawer.innerHTML = '<div class="mobile-nav-panel-inner"><div class="mobile-nav-panel-top"><a class="mobile-nav-brand" href="home.html">FARMVY</a><button class="mobile-nav-close" type="button" aria-label="Close navigation menu"><span class="material-symbols-outlined">close</span></button></div><p class="mobile-nav-intro">Browse our farm store from anywhere.</p><div class="mobile-nav-list">' + linksMarkup + '</div></div>';
    document.body.appendChild(drawer);

    var isMenuOpen = false;

    function setMenuOpen(open, returnFocus) {
        isMenuOpen = open;
        toggleButton.setAttribute('aria-expanded', String(open));
        overlay.classList.toggle('is-open', open);
        drawer.classList.toggle('is-open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('mobile-nav-open', open);
        document.documentElement.classList.toggle('mobile-nav-open', open);

        if (open) {
            var firstControl = drawer.querySelector('a, button');
            if (firstControl) {
                firstControl.focus();
            }
        } else if (returnFocus !== false) {
            toggleButton.focus();
        }
    }

    toggleButton.addEventListener('click', function () {
        setMenuOpen(!isMenuOpen, false);
    });

    overlay.addEventListener('click', function () {
        setMenuOpen(false, false);
    });

    var closeButton = drawer.querySelector('.mobile-nav-close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            setMenuOpen(false, false);
        });
    }

    drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuOpen(false, false);
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isMenuOpen) {
            setMenuOpen(false, false);
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            setMenuOpen(false, false);
        }
    });

    window.addEventListener('orientationchange', function () {
        setMenuOpen(false, false);
    });
});
