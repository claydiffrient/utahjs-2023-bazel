/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chores", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.integer("frequency").notNullable();
    table.date("last_completed").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("chores");
};
