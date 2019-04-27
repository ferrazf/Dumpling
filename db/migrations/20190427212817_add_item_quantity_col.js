
exports.up = function(knex, Promise) {
    return knex.schema.table("orders_items", function (table) {
        table.integer('quantity').notNull().defaultTo(1);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("orders_items", function (table) {
        table.dropColumn('quantity');
    });

};
