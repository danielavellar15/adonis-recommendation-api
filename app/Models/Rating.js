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

  constructor(user_recommendation_id, preference_id, iten_id) {
    super();
    this.user_recommendation_id = user_recommendation_id;
    this.preference_id = preference_id;
    this.iten_id = iten_id;
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
