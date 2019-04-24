exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", function(table) {
    table
      .increments("id")
      .unsigned()
      .index();
    table.boolean("received");
    table.boolean("active");
    table.specificType("etaminutes", "smallint");
    table.string("phonenumber");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("orders");
};
