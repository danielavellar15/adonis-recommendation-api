"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PreferenceGroup extends Model {
  recommendationSystem() {
    return this.belongsTo("App/Models/RecommendationSystem");
  }

  preferences() {
    return this.hasMany("App/Models/Preference");
  }
}

module.exports = PreferenceGroup;
