"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserRecommendationSchema extends Schema {
  up() {
    this.table("user_recommendations", (table) => {
      table.integer("id_origin").notNullable();
    });
  }

  down() {
    this.table("user_recommendations", (table) => {
      table.dropColumn("id_origin");
    });
  }
}

module.exports = UserRecommendationSchema;
