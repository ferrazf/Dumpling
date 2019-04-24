exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", function(table) {
    table
      .increments("id")
      .unsigned()
      .index();
    table.string("name");
    table.decimal("price", 4, 2);
    table.string("descr");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("items");
};
