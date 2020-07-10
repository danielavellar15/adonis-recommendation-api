"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RecommendationSystemsSchema extends Schema {
  up() {
    this.table("recommendation_systems", (table) => {
      table.string("description").notNullable();
    });
  }

  down() {
    this.table("recommendation_systems", (table) => {
      table.dropColumn("description");
    });
  }
}

module.exports = RecommendationSystemsSchema;
