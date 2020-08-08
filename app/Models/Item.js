"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class Item extends Model {
  recommendationSystem() {
    return this.belongsTo("App/Models/RecommendationSystem");
  }
  ratings() {
    return this.hasMany("App/Models/Rating");
  }

  constructor(id_origin, recommendation_system_id, description) {
    super();
    this.recommendation_system_id = recommendation_system_id;
    this.description = description;
    this.id_origin = id_origin;
  }

  //Commands
  async store() {
    //save object
    //TODO: validation
    this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = Item;
