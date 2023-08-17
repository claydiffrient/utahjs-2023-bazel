require("dotenv").config({ path: "../.env" });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};
