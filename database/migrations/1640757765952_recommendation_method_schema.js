"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RecommendationMethodSchema extends Schema {
  up() {
    this.create("recommendation_methods", (table) => {
      table.increments();
      table.string("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("recommendation_methods");
  }
}

module.exports = RecommendationMethodSchema;
