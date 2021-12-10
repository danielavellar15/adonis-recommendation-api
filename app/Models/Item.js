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
    const item = await this.itemExist(
      this.recommendation_system_id,
      this.id_origin
    );
    if (!item) {
      return await this.save();
    } else {
      this.id = item.id;
      return false;
    }
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }

  //Validations
  async itemExist(recommendation_system_id, id_origin) {
    return await Database.from("items")
      .where({
        recommendation_system_id: recommendation_system_id,
        id_origin: id_origin,
      })
      .first();
  }
}

module.exports = Item;
