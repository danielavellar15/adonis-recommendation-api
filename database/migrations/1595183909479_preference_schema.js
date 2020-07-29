"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreferenceSchema extends Schema {
  up() {
    this.table("preferences", (table) => {
      table.string("value").notNullable().unique().alter();
    });
  }

  down() {
    this.table("preferences", (table) => {
      table.string("value").notNullable().alter();
    });
  }
}

module.exports = PreferenceSchema;
