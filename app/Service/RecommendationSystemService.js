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

  static async getRecommendationSystemByToken(token) {
    console.log("aaaa");
    const recommendation_system = await Database.from("recommendation_systems")
      .where({
        token: token,
      })
      .first();

    return recommendation_system;
  }
}

module.exports = RecommendationSystemService;
