"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Rating extends Model {
  itens() {
    return this.belongsTo("App/Models/Iten");
  }
  preferences() {
    return this.belongsTo("App/Models/Preference");
  }
  usersRecommendation() {
    return this.belongsTo("App/Models/UserRecommendation");
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
