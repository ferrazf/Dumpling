exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({ name: 'Pineapple Pizza', price: '10.00', descr: 'Large Hawaiian pineapple pizza.'}),
        knex('items').insert({ name: 'Tomato Slice', price: '2.50', descr: 'A surprise leftover that resembles tomato.' }),
        knex('items').insert({ name: 'Large Caesar Salad', price: '2.50', descr: 'This is my favourite dish.' }),
        knex('items').insert({ name: 'Corn Fried Rice', price: '2.50', descr: 'Deliciously seasoned rice soaked in a thick layer of grease.' }),
        knex('items').insert({ name: 'Vegetarian Bacon', price: '2.50', descr: 'A slice of proudly Canadian green eco-friendly bacon.' }),
        knex('items').insert({ name: 'Sweet Corn Soup', price: '2.50', descr: 'Wait, no. <b>This</b> is my favourite dish.' }),
        knex('items').insert({ name: 'Burrito Taco a la Tortilla', price: '2.50', descr: 'A delicious tomato slice.' }),
        knex('items').insert({ name: 'Apple Pie', price: '5.25', descr: 'Fresh out of the oven 2 weeks ago. Minimal bacterial growth.'})
      ]);
    });
};