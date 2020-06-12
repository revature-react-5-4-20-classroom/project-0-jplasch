import { Pool } from "pg";


// We can store/retrieve any value we want with a name and a value:
// in Git BASH: export NAME=value
// in node: process.env['NAME'] will return value

// For MY credentials:
// export PG_HOST=database-1.cbjl3d8fbz4e.us-west-1.rds.amazonaws.com
// export PG_USER=postgres
// export PG_PASSWORD=(standard password)
// export PG_DATABASE=postgres
export const connectionPool : Pool = new Pool({
    host: process.env['PG_HOST'],
    user: process.env['PG_USER'],
    password: process.env['PG_PASSWORD'],
    database: process.env['PG_DATABASE'],
    port: 5432,
    max: 5,
});