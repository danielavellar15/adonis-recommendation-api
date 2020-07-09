"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreferenceSchema extends Schema {
  up() {
    this.create("preferences", (table) => {
      table.increments();
      table
        .integer("recommendation_system_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_systems")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.string("value").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("preferences");
  }
}

module.exports = PreferenceSchema;
