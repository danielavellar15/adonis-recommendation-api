"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RatingSchema extends Schema {
  up() {
    this.create("ratings", (table) => {
      table.increments();
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
      table.timestamps();
    });
  }

  down() {
    this.drop("ratings");
  }
}

module.exports = RatingSchema;
