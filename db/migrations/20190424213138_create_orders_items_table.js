exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders_items", function(table) {
    table.increments("id").unsigned().index();
    table.integer("item_id_FK").unsigned().index();
    table.integer("order_id_FK").unsigned().index();
    table.foreign("item_id_FK").references("items.id");
    table.foreign("order_id_FK").references("orders.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("orders_items");
};
