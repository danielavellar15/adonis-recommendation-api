"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Preference extends Model {
  recommendationSystem() {
    return this.belongsTo("App/Models/RecommendationSystem");
  }
  ratings() {
    return this.hasMany("App/Models/Rating");
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

module.exports = Preference;
