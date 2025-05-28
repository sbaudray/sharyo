import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export { sql };
