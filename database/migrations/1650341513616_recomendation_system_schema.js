"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RecomendationSystemSchema extends Schema {
  up() {
    this.table("recommendation_systems", (table) => {
      table.string("token", 255).unique();
    });
  }

  down() {
    this.table("recommendation_systems", (table) => {
      table.dropColumn("token");
    });
  }
}

module.exports = RecomendationSystemSchema;
