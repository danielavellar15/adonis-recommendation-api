"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItensSchema extends Schema {
  up() {
    this.table("itens", (table) => {
      this.drop("itens");
    });
  }

  down() {
    this.table("itens", (table) => {
      // reverse alternations
    });
  }
}

module.exports = ItensSchema;
