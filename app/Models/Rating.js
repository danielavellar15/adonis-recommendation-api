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

  constructor(user_recommendation_id, preference_id, item_id) {
    super();
    this.user_recommendation_id = user_recommendation_id;
    this.preference_id = preference_id;
    this.item_id = item_id;
  }

  //Commands
  async store() {
    //save object
    return await this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = Rating;
