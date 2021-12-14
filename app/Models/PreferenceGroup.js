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

  constructor(recommendation_system_id, value) {
    super();
    this.recommendation_system_id = recommendation_system_id;
    this.value = value;
  }

  async store() {
    //TODO: validation (apenas um sistema de recomendacao)
    return await this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

//Commands

module.exports = PreferenceGroup;
