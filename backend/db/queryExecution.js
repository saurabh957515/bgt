import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "states",
  port: 3306,
});

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
