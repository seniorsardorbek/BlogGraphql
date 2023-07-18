/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('email').unique().notNullable()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.enum('role' , ['super_admin' , 'admin'  ,'user']).defaultTo("user")
        table.boolean('is_deleted' ).defaultTo(false)
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
