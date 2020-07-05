'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRecommendationSchema extends Schema {
  up () {
    this.create('user_recommendations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_recommendations')
  }
}

module.exports = UserRecommendationSchema
