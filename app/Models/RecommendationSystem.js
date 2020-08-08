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

  constructor(description) {
    super();
    this.description = description;
  }

  //Commands
  store() {
    //save object
    this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = RecommendationSystem;
