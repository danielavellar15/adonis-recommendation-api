"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemSchema extends Schema {
  up() {
    this.table("items", (table) => {
      table.integer("id_origin").notNullable();
    });
  }

  down() {
    this.table("items", (table) => {
      table.dropColumn("id_origin");
    });
  }
}

module.exports = ItemSchema;
