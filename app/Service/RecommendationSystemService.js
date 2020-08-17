"use strict";

const Database = use("Database");

class RecommendationSystemService {
  static async getRecommendationItem(recommendation_system_id) {
    const items = await Database.from("items")
      .where({
        recommendation_system_id: recommendation_system_id,
      })
      .limit(5);

    return items;
  }
}

module.exports = RecommendationSystemService;
