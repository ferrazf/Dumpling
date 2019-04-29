exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({ name: 'Poutine on the Ritz Burger', price: '9.99', descr: 'Medium-sized cheeseburger accompanied by a large bowl of poutine and fries.'}),
        knex('items').insert({ name: 'Rest in Peas Burger', price: '4.99', descr: 'No-frills quarter-pounder with peas.' }),
        knex('items').insert({ name: 'The Silentil Night Burger ' , price: '6.85', descr: 'Lentil soup burger - A House specialty.' }),
        knex('items').insert({ name: 'Olive and Let Die Burger', price: '3.25', descr: 'Small burger with olives. Ready in under 5 minutes.' }),
        knex('items').insert({ name: 'Gourdon-Hamsey Burger', price: '7.99', descr: 'Large BLT filled with well-seasoned squash & ham.' }),
        knex('items').insert({ name: 'Eggers Can"t Be Cheesers', price: '3.50', descr: 'Our morning specialty. Small bagel with fried egg & cheese.' }),
        knex('items').insert({ name: 'Coke', price: '2.99', descr: '355 ml' }),
        knex('items').insert({ name: 'Beer', price: '3.99', descr: '500 ml'})
      ]);
    });
};
