import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
// import dotenv from "dotenv";
// dotenv.config();
async function executeQuery(query, params, callback) {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [results] = await connection.query(query, params);
    if (callback) {
      callback(results);
    }
    return results;
  } catch (error) {
    callback({ error: error });
    console.log("Database error occurred", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

// Example usage
// executeQuery('SELECT 1', [], (err, results) => {
//   if (err) console.error("Query failed", err);
//   else console.log("Query succeeded", results);
// });

export default executeQuery;
