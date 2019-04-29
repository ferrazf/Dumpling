"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select(
        "orders.id",
        "items.name",
        "orders_items.quantity",
        "orders.phonenumber",
        "orders.active"
      )
      .from("orders_items")
      .innerJoin("items", "orders_items.item_id_FK", "items.id")
      .innerJoin("orders", "orders_items.order_id_FK", "orders.id")
      .then(results => {
        res.json(results);
      });
  });

  return router;
};
