"use strict";

const _ = use("underscore");
const csv = use("csvtojson");
const Database = use("Database");
const PreferenceGroup = use("App/Models/PreferenceGroup");
const { validate } = use("Validator");

const UserRecommendation = use("App/Models/UserRecommendation");
const Preference = use("App/Models/Preference");
const Rating = use("App/Models/Rating");
const Item = use("App/Models/Item");
const User = use("App/Models/User");
const PreferenceService = use("App/Service/PreferenceService");
const PreferenceGroupService = use("App/Service/PreferenceGroupService");
const ItemService = use("App/Service/ItemService");
const RecommendationSystemService = use(
  "App/Service/RecommendationSystemService"
);

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
  async index({ request, response, view }) {
    console.log(`request`, request);
    return true;
  }

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
    const data = request.only([
      "description",
      "email",
      "password",
      "preference",
    ]);

    const email = data.email;
    const password = data.password;

    const user = await User.create({
      username: email,
      email: email,
      password: password,
    });

    if (!user) return null;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbS5iciIsInBhc3N3b3JkIjoiMTIzNDU2IiwicmVjb21tZW5kYXRpb25TeXN0ZW0iOiJSdXJhbEZsaXgifQ.M03m0-5KUltXepkyWpZVk6CqUFcovU6d5I3Gigw00sM";

    const recommendation_system_data = {
      description: data.description,
      token: token,
    };
    const recommendation_system = await RecommendationSystem.create(
      recommendation_system_data
    );

    const value = data.preference;
    const recommendation_system_id = recommendation_system.id;

    const preferenceGroup = await PreferenceGroup.create({
      recommendation_system_id: recommendation_system_id,
      value: value,
    });

    const preferences = value == "star" ? [1, 2, 3, 4, 5] : [1, 2];
    for (const value of preferences) {
      const preference_data = {
        preference_group_id: preferenceGroup.id,
        name: value.toString(),
        value: value,
      };

      const preference = await Preference.create(preference_data);
    }

    return { recommendation_system, userAdmin: user.email };
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
  async show({ params, request, response, view }) {
    const recommendation_system = await RecommendationSystem.findOrFail(
      params.id
    );

    return recommendation_system;
  }

  /**
   * Update recommendationsystem details.
   * PUT or PATCH recommendationsystems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const recommendation_system = await RecommendationSystem.findOrFail(
      params.id
    );

    const data = request.only(["description"]);

    recommendation_system.merge(data);

    await recommendation_system.save();

    return recommendation_system;
  }

  /**
   * Delete a recommendationsystem with id.
   * DELETE recommendationsystems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const recommendation_system = await RecommendationSystem.findOrFail(
      params.id
    );

    // validar se o usuario logado pertence ao sistema de recomendacao
    // if (recommendation_system.user_id !== auth.user.id) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    //deletetar tudo
    return await recommendation_system.delete();
  }

  /**
   * import data in recommendationsystem.
   * POST recommendationsystems/import
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async import({ request, response }) {
    //console.log(`resquest`, resquest);
    const rules = {
      recommendation_system_id: "required",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }

    const recommendation_system = await RecommendationSystem.findOrFail(
      request.body.recommendation_system_id,
      request.files.file
    );

    if (!recommendation_system)
      return response
        .status(404)
        .send({ error: "Recommendation System Not Found" });

    const csv_url = request._files.file.tmpPath;

    const json_array = await await csv().fromFile(csv_url);

    var users_ids = [];
    var items_ids = [];

    //insert users
    const users = _.uniq(
      json_array.map((x) => {
        return x["userId"];
      })
    );

    for (const user_id of users) {
      const user = new UserRecommendation(user_id, recommendation_system.id);
      const result = await user.store();
      users_ids[user_id] = user.id;
      if (!result) {
        console.log("result :>> ", result);
      }
    }

    //insert items
    const items = _.uniq(
      json_array.map((x) => {
        return x["movieId"];
      })
    );

    for (const item_id of items) {
      const item = new Item(item_id, recommendation_system.id, "");
      const result = await item.store();
      items_ids[item_id] = item.id;
      if (!result) {
        console.log("result :>> ", result);
      }
    }

    const preference_group =
      await PreferenceGroupService.getPreferenceGroupByRecommendationSystem(
        recommendation_system.id
      );

    const preferences = await PreferenceService.getPreferencesByPreferenceGroup(
      preference_group.id
    );

    let preference_hash = [];
    for (const preference of preferences) {
      preference_hash[preference.value.toString()] = preference.id;
    }

    for (const item_rating of json_array) {
      const user_recommendation_id = users_ids[item_rating["userId"]];
      const preference_id = preference_hash[parseInt(item_rating["rating"])];
      const item_id = items_ids[item_rating["movieId"]];

      const rating = new Rating(user_recommendation_id, preference_id, item_id);
      const result = await rating.store();
    }

    return json_array.length;
  }

  async getRecommendationsItem({ request, response }) {
    const rules = {
      recommendation_system_id: "required",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }

    const { item_id, recommendation_system_id } = request.body;

    if (item_id) {
      const item = await ItemService.getItemById(
        item_id,
        recommendation_system_id
      );

      if (item) {
        const items_recommended =
          await RecommendationSystemService.getRecommendationItem(
            recommendation_system_id
          );
        return items_recommended;
      }
    } else {
      const items_recommended =
        await RecommendationSystemService.getRecommendationItem(
          recommendation_system_id
        );
      return items_recommended;
    }

    return null;
  }
}

module.exports = RecommendationSystemController;
