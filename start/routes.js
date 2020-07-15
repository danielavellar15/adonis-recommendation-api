"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.get("/", () => {
//   return { greeting: "Hello world in JSON Daniel" };
// });

/* Recommendation System Routes */
Route.resource("recommendationSystem", "RecommendationSystemController")
  .apiOnly()
  .middleware("auth");

Route.post(
  "recommendationSystem/:id/import",
  "RecommendationSystemController.import"
).middleware("auth");

/* User Routes */
Route.post("/users", "UserController.create");

/* Session Routes */
Route.post("/sessions", "SessionController.create");
