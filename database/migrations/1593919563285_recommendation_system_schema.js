'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecommendationSystemSchema extends Schema {
  up () {
    this.create('recommendation_systems', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('recommendation_systems')
  }
}

module.exports = RecommendationSystemSchema
