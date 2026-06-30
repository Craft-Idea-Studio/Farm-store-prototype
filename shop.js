document.addEventListener('DOMContentLoaded', function () {
    var perPage = 3;
    var currentPage = 1;
    var stockOnly = false;

    var filterBtn = document.getElementById('apply-filters');
    var stockToggle = document.getElementById('stock-toggle');
    var stockTrack = document.getElementById('stock-track');
    var stockThumb = document.getElementById('stock-thumb');
    var stockLabel = document.getElementById('stock-label');
    var categoryChecks = document.querySelectorAll('.category-check');
    var products = Array.from(document.querySelectorAll('[data-category]'));
    var noResults = document.getElementById('no-results');
    var pagination = document.getElementById('pagination');

    if (stockToggle) {
        stockToggle.addEventListener('click', function () {
            stockOnly = !stockOnly;
            if (stockOnly) {
                stockTrack.classList.remove('bg-surface-container-high');
                stockTrack.classList.add('bg-secondary');
                stockThumb.classList.add('translate-x-5');
            } else {
                stockTrack.classList.remove('bg-secondary');
                stockTrack.classList.add('bg-surface-container-high');
                stockThumb.classList.remove('translate-x-5');
            }
            applyFilters();
        });
    }

    function getVisible() {
        var checkedCategories = Array.from(categoryChecks).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
        return products.filter(function (p) {
            var catMatch = checkedCategories.length === 0 || checkedCategories.indexOf(p.dataset.category) !== -1;
            var stockMatch = !stockOnly || p.dataset.stock === 'in';
            return catMatch && stockMatch;
        });
    }

    function renderPage(page) {
        var visible = getVisible();
        var totalPages = Math.max(1, Math.ceil(visible.length / perPage));
        currentPage = Math.min(page, totalPages);

        products.forEach(function (p) { p.classList.add('hidden'); });

        var start = (currentPage - 1) * perPage;
        var end = start + perPage;
        var pageItems = visible.slice(start, end);
        pageItems.forEach(function (p) { p.classList.remove('hidden'); });

        if (noResults) noResults.classList.toggle('hidden', visible.length > 0);

        if (!pagination) return;
        pagination.innerHTML = '';
        if (totalPages <= 1) return;

        var prev = document.createElement('button');
        prev.className = 'w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-primary-container/10 transition-colors' + (currentPage === 1 ? ' opacity-30 pointer-events-none' : '');
        prev.innerHTML = '<span class="material-symbols-outlined text-[18px]">chevron_left</span>';
        prev.addEventListener('click', function () { renderPage(currentPage - 1); });
        pagination.appendChild(prev);

        for (var i = 1; i <= totalPages; i++) {
            var btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'w-10 h-10 rounded-full flex items-center justify-center transition-all' + (i === currentPage ? ' bg-secondary text-white font-bold' : ' border border-outline-variant/30 text-on-surface-variant hover:bg-primary-container/10');
            btn.addEventListener('click', function (p) { return function () { renderPage(p); }; }(i));
            pagination.appendChild(btn);
        }

        var next = document.createElement('button');
        next.className = 'w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-primary-container/10 transition-colors' + (currentPage === totalPages ? ' opacity-30 pointer-events-none' : '');
        next.innerHTML = '<span class="material-symbols-outlined text-[18px]">chevron_right</span>';
        next.addEventListener('click', function () { renderPage(currentPage + 1); });
        pagination.appendChild(next);
    }

    function applyFilters() {
        currentPage = 1;
        renderPage(1);
    }

    if (filterBtn) filterBtn.addEventListener('click', applyFilters);
    categoryChecks.forEach(function (c) { c.addEventListener('change', applyFilters); });

    renderPage(1);
});
