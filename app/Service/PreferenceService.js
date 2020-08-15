"use strict";

const Database = use("Database");

const Preference = use("App/Models/Preference");
const PreferenceGroup = use("App/Models/PreferenceGroup");

class PreferenceService {
  static async getPreferencesByPreferenceGroup(preference_group_id) {
    const preferences = await Database.from("preferences").where({
      preference_group_id: preference_group_id,
    });

    return preferences;
  }
}

module.exports = PreferenceService;
