/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.boolean('is_archived').notNullable().defaultTo(false);
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('password').notNullable();
      table.boolean('verified').notNullable().defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('posts', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('posts').dropTable('users');
}
