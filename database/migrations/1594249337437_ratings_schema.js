"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RatingsSchema extends Schema {
  up() {
    this.table("ratings", (table) => {
      table
        .integer("user_recommendation_id")
        .unsigned()
        .references("id")
        .inTable("user_recommendations")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("preference_id")
        .unsigned()
        .references("id")
        .inTable("preferences")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("iten_id")
        .unsigned()
        .references("id")
        .inTable("itens")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
  }

  down() {
    this.table("ratings", (table) => {
      // reverse alternations
    });
  }
}

module.exports = RatingsSchema;
