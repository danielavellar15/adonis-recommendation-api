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
    const recommendation_system = await Database.from("recommendation_systems")
      .where({
        token: token,
      })
      .first();

    return recommendation_system;
  }

  static async getRecommendationRandom(recommendation_system_id, limit) {
    const items = await Database.from("items").where({
      recommendation_system_id: recommendation_system_id,
    });

    let listItensRecommendation = [];
    for (let i = 0; i < limit; i++) {
      const randomNumber = this.getRandomInt(0, items.length);
      listItensRecommendation.push(items[randomNumber]);
    }

    return listItensRecommendation;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = RecommendationSystemService;
