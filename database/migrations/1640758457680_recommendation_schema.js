"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RecommendationSchema extends Schema {
  up() {
    this.create("recommendations", (table) => {
      table.increments();
      table
        .integer("recommendation_system_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_systems")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("recommendation_methods_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_methods")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.string("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("recommendations");
  }
}

module.exports = RecommendationSchema;
