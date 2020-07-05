'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItenSchema extends Schema {
  up () {
    this.create('itens', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('itens')
  }
}

module.exports = ItenSchema
