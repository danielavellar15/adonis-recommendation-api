"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Rating extends Model {
  items() {
    return this.belongsTo("App/Models/Item");
  }
  preferences() {
    return this.belongsTo("App/Models/Preference");
  }
  usersRecommendation() {
    return this.belongsTo("App/Models/UserRecommendation");
  }

  constructor(usersRecommendation, preferences, items) {
    super();
    this.usersRecommendation = usersRecommendation;
    this.preferences = preferences;
    this.items = items;
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

module.exports = Rating;
