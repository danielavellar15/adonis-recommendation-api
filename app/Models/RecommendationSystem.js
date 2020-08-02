"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class RecommendationSystem extends Model {
  items() {
    return this.hasMany("App/Models/Item");
  }

  usersRecommendation() {
    return this.hasMany("App/Models/UserRecommendation");
  }

  preferenceGroup() {
    return this.belongsTo("App/Models/PreferenceGroup");
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
