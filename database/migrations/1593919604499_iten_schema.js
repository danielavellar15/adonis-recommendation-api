"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemSchema extends Schema {
  up() {
    this.create("items", (table) => {
      table.increments();
      table
        .integer("recommendation_system_id")
        .unsigned()
        .references("id")
        .inTable("recommendation_systems")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.string("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("items");
  }
}

module.exports = ItemSchema;
