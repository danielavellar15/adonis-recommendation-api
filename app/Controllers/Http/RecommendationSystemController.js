"use strict";

const Drive = use("Drive");
const file = require("file-system");
const csv = require("csvtojson");
const _ = require("underscore");
const UserRecommendation = require("../../Models/UserRecommendation");
const Rating = require("../../Models/Rating");
const Item = require("../../Models/Item");

const RecommendationSystem = use("App/Models/RecommendationSystem");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with recommendationsystems
 */
class RecommendationSystemController {
  /**
   * Show a list of all recommendationsystems.
   * GET recommendationsystems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new recommendationsystem.
   * POST recommendationsystems
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["description"]);

    const recommendation_system = await RecommendationSystem.create({
      ...data,
    });

    return recommendation_system;
  }

  /**
   * Display a single recommendationsystem.
   * GET recommendationsystems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update recommendationsystem details.
   * PUT or PATCH recommendationsystems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a recommendationsystem with id.
   * DELETE recommendationsystems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  /**
   * import data in recommendationsystem.
   * POST recommendationsystems/import
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async import({ params, request, response }) {
    var csv_list = [];

    const recommendation_system = await RecommendationSystem.findOrFail(
      params.id
    );

    const csv_url = `C:\\Users\\danie\\Downloads\\ml-latest-small\\ratings.csv`;

    const jsonArray = await (await csv().fromFile(csv_url)).slice(0, 10);

    //insert users
    const users = _.uniq(
      jsonArray.map((x) => {
        return x["userId"];
      })
    );

    for (const userId of users) {
      const user = new UserRecommendation(userId, recommendation_system.id);
      const result = await user.store();

      if (!result) {
        console.log("result :>> ", result);
      }
    }

    //insert items
    const items = _.uniq(
      jsonArray.map((x) => {
        return x["movieId"];
      })
    );

    for (const itemId of items) {
      const item = new Item(itemId, recommendation_system.id, "");
      const result = await item.store();

      if (!result) {
        console.log("result :>> ", result);
      }
    }

    for (const recommendation of jsonArray) {
      const
    }

    return items.length;
  }
}

module.exports = RecommendationSystemController;
