"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserRecommendationSchema extends Schema {
  up() {
    this.create("user_recommendations", (table) => {
      table.increments();
      table
        .integer("recommendation_system_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_systems")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_recommendations");
  }
}

module.exports = UserRecommendationSchema;
