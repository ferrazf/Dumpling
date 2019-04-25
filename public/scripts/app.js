$(() => {
  $.ajax({
    method: "GET",
    url: "/api/items"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
