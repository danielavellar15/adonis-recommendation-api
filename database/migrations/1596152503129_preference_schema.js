"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreferenceSchema extends Schema {
  up() {
    this.table("preferences", (table) => {
      table.dropColumn("recommendation_system_id");
      table
        .integer("preference_group_id")
        .unsigned()
        .references("id")
        .inTable("preference_groups")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
  }

  down() {
    this.table("preferences", (table) => {
      table
        .integer("recommendation_system_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_systems")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.dropColumn("preference_group_id");
    });
  }
}

module.exports = PreferenceSchema;
