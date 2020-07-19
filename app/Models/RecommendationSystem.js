"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class RecommendationSystem extends Model {
  items() {
    return this.hasMany("App/Models/Item");
  }
  preferences() {
    return this.hasMany("App/Models/Preference");
  }
  usersRecommendation() {
    return this.hasMany("App/Models/UserRecommendation");
  }

  //Commands
  store() {
    //save object
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = RecommendationSystem;
