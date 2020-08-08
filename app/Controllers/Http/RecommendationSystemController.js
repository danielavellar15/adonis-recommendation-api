"use strict";

const _ = use("underscore");
const csv = use("csvtojson");
const Database = use("Database");
const Drive = use("Drive");
const PreferenceGroup = use("App/Models/PreferenceGroup");

const UserRecommendation = use("App/Models/UserRecommendation");
const Preference = use("App/Models/Preference");
const Rating = use("App/Models/Rating");
const Item = use("App/Models/Item");

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
    const { description } = data;

    const recommendation_system = new RecommendationSystem(description);
    recommendation_system.store();

    const preferenceGroupType = "star";
    const preferenceGroup = new PreferenceGroup(
      recommendation_system.id,
      preferenceGroupType
    );
    preferenceGroup.store();

    const preferences = [1, 2, 3, 4, 5];
    for (const value of preferences) {
      const preference = new Preference(
        preferenceGroup.Id,
        value.toString(),
        value
      );
      preference.save();
    }

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

    const jsonArray = await (await csv().fromFile(csv_url)).slice(0, 5);

    var usersIds = [];
    var itemsIds = [];

    //insert users
    const users = _.uniq(
      jsonArray.map((x) => {
        return x["userId"];
      })
    );

    for (const userId of users) {
      const user = new UserRecommendation(userId, recommendation_system.id);
      const result = await user.store();
      usersIds[userId] = user.id;
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
      itemsIds[itemId] = item.id;
      if (!result) {
        console.log("result :>> ", result);
      }
    }

    return jsonArray.length;
  }
}

module.exports = RecommendationSystemController;
