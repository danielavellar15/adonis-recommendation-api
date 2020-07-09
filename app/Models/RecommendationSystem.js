"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class RecommendationSystem extends Model {
  itens() {
    return this.hasMany("App/Models/Iten");
  }
  preferences() {
    return this.hasMany("App/Models/Preference");
  }
  usersRecommendation() {
    return this.hasMany("App/Models/UserRecommendation");
  }
}

module.exports = RecommendationSystem;
