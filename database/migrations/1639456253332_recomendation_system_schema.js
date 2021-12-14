"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RecomendationSystemSchema extends Schema {
  up() {
    this.table("recommendation_systems", (table) => {
      table.dropColumn("descricao");
    });
  }

  down() {
    this.table("recommendation_systems", (table) => {
      table.string("descricao").notNullable();
    });
  }
}

module.exports = RecomendationSystemSchema;
