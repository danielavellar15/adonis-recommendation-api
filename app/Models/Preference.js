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

  constructor(value, preferenceGroup) {
    super();
    this.value = value;
    this.preferenceGroup = preferenceGroup;
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
