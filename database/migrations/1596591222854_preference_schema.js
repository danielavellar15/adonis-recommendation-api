"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreferenceSchema extends Schema {
  up() {
    this.table("preferences", (table) => {
      table.float("value").notNullable().alter();
      table.string("name").notNullable();
    });
  }

  down() {
    this.table("preferences", (table) => {
      table.string("value").notNullable().unique().alter();
      table.dropColumn("name");
    });
  }
}

module.exports = PreferenceSchema;
