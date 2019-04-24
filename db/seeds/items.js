exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({ id: 1, name: 'Pineapple Pizza', price: '10.00', descr: 'Large Hawaiian pineapple pizza'}),
        knex('items').insert({ id: 2, name: 'Tomato Slice', price: '89.00', descr: 'A delicious tomato slice'}),
        knex('items').insert({ id: 3, name: 'Apple Pie', price: '0.25', descr: 'Fresh out of the over 2 weeks ago. Minimal bacterial growth'})
      ]);
    });
};