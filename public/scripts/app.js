$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu_items"
  }).done((items) => {
    for(item of items) {
      $("<div>").text(item.name).appendTo($("body"));
    }
  });;
});