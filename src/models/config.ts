import pg from "pg";

const { Pool } = pg;
const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, PG_HOST } = process.env;

const db = new Pool({
    user: POSTGRES_USER,
    host: PG_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432, // Default port for PostgreSQL
});

export { db };
