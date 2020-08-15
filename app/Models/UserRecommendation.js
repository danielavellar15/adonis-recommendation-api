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
    const user = await this.userRecommendationExist(
      this.recommendation_system_id,
      this.id_origin
    );
    if (!user) {
      return await this.save();
    } else {
      this.id = user.id;
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
  async userRecommendationExist(recommendation_system_id, id_origin) {
    return await Database.from("user_recommendations")
      .where({
        recommendation_system_id: recommendation_system_id,
        id_origin: id_origin,
      })
      .first();
  }
}

module.exports = UserRecommendation;
