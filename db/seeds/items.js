exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({ name: 'Poutine on the Ritz Burger', price: '5.95', descr: 'comes with poutine fries.'}),
        knex('items').insert({ name: 'Rest in Peas Burger', price: '5.95', descr: 'comes with peas' }),
        knex('items').insert({ name: 'The Silentil Night Burger ' , price: '5.95', descr: 'comes with lentils.' }),
        knex('items').insert({ name: 'Olive and Let Die Burger', price: '5.95', descr: 'comes with olives.' }),
        knex('items').insert({ name: 'Gourdon-Hamsey Burger', price: '5.95', descr: 'comes with squash & ham.' }),
        knex('items').insert({ name: 'Eggers Can"t Be Cheesers', price: '5.95', descr: 'comes with fried egg & cheese' }),
        knex('items').insert({ name: 'Coke', price: '2.50', descr: '355 ml' }),
        knex('items').insert({ name: 'Beer', price: '3.50', descr: '500 ml'})
      ]);
    });
};
