/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('password').notNullable();
      table.string('verification_token').nullable();
      table.boolean('is_archived').notNullable().defaultTo(false);
      table.boolean('is_verified').notNullable().defaultTo(false);
      table.timestamp('verification_token_expires_at').nullable();
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
