"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RatingSchema extends Schema {
  up() {
    this.table("ratings", (table) => {
      table.dropColumn("iten_id");
      table
        .integer("item_id")
        .unsigned()
        .references("id")
        .inTable("items")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
  }

  down() {
    this.table("ratings", (table) => {
      table.dropColumn("item_id");
      table
        .integer("iten_id")
        .unsigned()
        .references("id")
        .inTable("itens")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
  }
}

module.exports = RatingSchema;
