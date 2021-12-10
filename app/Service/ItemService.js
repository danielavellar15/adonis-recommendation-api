"use strict";

const Database = use("Database");

class ItemService {
  static async getItemById(id_origin, recommendation_system_id) {
    const item = await Database.from("items")
      .where({
        id_origin: id_origin,
        recommendation_system_id: recommendation_system_id,
      })
      .first();

    return item;
  }
}

module.exports = ItemService;
