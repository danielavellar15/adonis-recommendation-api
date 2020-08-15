"use strict";

const Database = use("Database");

const PreferenceGroup = use("App/Models/PreferenceGroup");

class PreferenceGroupService {
  static async getPreferenceGroupByRecommendationSystem(
    recommendation_system_id
  ) {
    const preferenceGroup = await Database.from("preference_groups")
      .where("recommendation_system_id", recommendation_system_id)
      .first();

    return preferenceGroup;
  }
}

module.exports = PreferenceGroupService;
