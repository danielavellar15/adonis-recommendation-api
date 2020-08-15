"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Preference extends Model {
  preferenceGroup() {
    return this.belongsTo("App/Models/PreferenceGroup");
  }
  ratings() {
    return this.hasMany("App/Models/Rating");
  }

  constructor(preference_group_id, name, value) {
    super();
    this.preference_group_id = preference_group_id;
    this.name = name;
    this.value = value;
  }

  //Commands
  async store() {
    //save object
    await this.save();
  }

  update() {
    //update object
  }

  remove() {
    // remove object
  }
}

module.exports = Preference;
