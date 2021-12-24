$(document).ready(function () {
    showAllItems();
});

function showAllItems() {
    $('#cards-box').empty();
    $.ajax({
            type: "GET",
            url: "/wish",
            data: {},
            success: function (response) {
                let items = response['items'];
                for (let i = 0; i < items.length; i++) {
                    let image = items[i]['image'];
                    let name = items[i]['name'];
                    let price = items[i]['price'];
                    let desc = items[i]['desc'];
                    let memo = items[i]['memo'];
                    let tags = items[i]['tags'];
                    let url = items[i]['url'];
                    let date = items[i]['date'];

                    let temp_html = `<div class="card mb-3">
                                        <div class="row g-0">
                                            <div class="col-md-3">
                                                <img src="${image}"
                                                     class="img-fluid rounded-start card-image" alt="Wish item">
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <header class="card-header-wrap">
                                                        <h2 class="card-title">
                                                            <a href="${url}"
                                                               target="_blank">
                                                                ${name}</a>
                                                        </h2>
                                                        <strong class="card-price">${price}</strong>
                                                    </header>
                                                    <p class="card-desc">${desc}
                                                    </p>
                                                    <p class="card-memo">
                                                        <i class="fas fa-comment-dots"></i>
                                                        ${memo}
                                                    </p>
                                                    <footer class="card-footer-wrap">
                                                        <span class="card-date">${date}</span>
                                                        <button type="button" class="badge rounded-pill bg-dark card-tag">
                                                            <span>#</span>
                                                            <span class="text">${tags}</span>
                                                        </button>
                                                    </footer>
                                                    <button type="button" class="btn-close card-close" aria-label="Close"></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                    $('#cards-box').append(temp_html);
                }
            }
        }
    )
}

function showAllItemsWithSimpleView() {
    $('#cards-box').empty();
    $.ajax({
            type: "GET",
            url: "/wish",
            data: {},
            success: function (response) {
                let items = response['items'];
                for (let i = 0; i < items.length; i++) {
                    let image = items[i]['image'];
                    let name = items[i]['name'];
                    let price = items[i]['price'];
                    let tags = items[i]['tags'];
                    let url = items[i]['url'];

                    let wrapper_html = `<div id="simple-view" class="row row-cols-1 row-cols-md-3 g-4 cards-simple"></div>`
                    let temp_html = `<div class="col">
                                        <div class="card h-100">
                                            <img src="${image}" class="card-img-top"
                                                 alt="Wish item">
                                            <div class="card-body">
                                                <h2 class="card-title">
                                                    <a href="${url}"
                                                       target="_blank">
                                                        ${name}</a>
                                                </h2>
                                                <strong class="card-price">
                                                    <span class="price">${price}</span>
                                                    <span class="won">원</span>
                                                </strong>
                                                <button type="button" class="badge rounded-pill bg-dark card-tag">
                                                    <span>#</span>
                                                    <span class="text">${tags}</span>
                                                </button>
                                                <button type="button" class="btn-close card-close" aria-label="Close"></button>
                                            </div>
                                        </div>
                                    </div>`
                    $('#cards-box').append(wrapper_html);
                    $('#simple-view').append(temp_html);
                }
            }
        }
    )
}

function addItem() {
    let url = $('#form-url').val();
    let memo = $('#form-memo').val();
    let tag = $('#form-tag').val();
    let price = $('#form-price').val();

    $.ajax({
        type: 'POST',
        url: '/wish',
        data: {
            url_give: url,
            memo_give: memo,
            tags_give: tag,
            price_give: price,
        },
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    })
}

function showAllTags() {
    $('#cards-box').empty();
    $.ajax({
        type: "GET",
        url: "/wish",
        data: {},
        success: function (response) {
            const tagHeader = `<header class="tag-header">
                                    <h1 class="tag-text">All Tags</h1>
                               </header>`;
            const tagContainer = `<div id="tags-box" className="tag-container"></div>`;
            $('#cards-box').append(tagHeader);
            $('#cards-box').append(tagContainer);

            let items = response['items']
            for (let i = 0; i < items.length; i++) {
                let tag = items[i]['tags'];
                let temp_html = `<button type="button" class="btn rounded-pill btn-dark tag-button">
                                    <span class="button-hash">&sharp;</span>
                                    <span class="button-text">${tag}</span>
                                 </button>`;
                $('#tags-box').append(temp_html);
            }
        }

    })
}