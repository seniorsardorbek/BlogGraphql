/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id');
        table.string('title').notNullable()
        table.string('content').notNullable()
        table.integer('user_id').references('id').inTable('users')
        table.boolean('is_verified').defaultTo(false)
        table.boolean('verifed').defaultTo(false)
        table.boolean('is_deleted' ).defaultTo(false)
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
