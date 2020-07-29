"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class UserRecommendation extends Model {
  recommendationSystem() {
    return this.belongsTo("App/Models/RecommendationSystem");
  }
  ratings() {
    return this.hasMany("App/Models/Rating");
  }

  constructor(id_origin, recommendation_system_id) {
    super();
    this.id_origin = id_origin;
    this.recommendation_system_id = recommendation_system_id;
  }

  //Commands
  async store() {
    // this._setCreatedAt(this.$attributes);
    // return await Database.table("user_recommendations")
    //   .insert(this.$attributes)
    //   .returning("id");
    return this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = UserRecommendation;
