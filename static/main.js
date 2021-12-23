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