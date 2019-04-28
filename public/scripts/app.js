$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu_items"
  }).done(items => {
    let $newItems = [];

    for (item of items) {
      $newItems.push(
        `<div class="col-md-6"><div class="menu-item-container"><div class="item-name">${item.name}</div><div class="item-descr-container">"${item.descr}"
        </div><div class="item-price-container"><div class="item-price"><i class="fas fa-dollar-sign" /></i> ${item.price}</div><div class="spacer" />
        <div class="add-button"> <button class="btn btn-primary sc-add-to-cart" data-name="${item.name}" data-price="${item.price}" data-id="${item.id}"
        type="submit">ADD</button></div></div></div></div>`
      );
    }
    $(".panel-body .row").append($newItems);
  });
});


$(document).ready(function () {
});

// REMINDER
//-Jquery version used by cart plugin is very old
//-Change px to rem where suitable
