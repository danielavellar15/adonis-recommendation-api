"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItenSchema extends Schema {
  up() {
    this.table("itens", (table) => {
      table.integer("id_origin").notNullable();
    });
  }

  down() {
    this.table("itens", (table) => {
      table.dropColumn("id_origin");
    });
  }
}

module.exports = ItenSchema;
