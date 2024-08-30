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
    if (callback) callback({ error });
    console.log("Database error occurred", error?.message);
    return {error:error?.message};
  } finally {
    if (connection) connection.release();
  }
}

async function checkAndCreateUsersTable() {
  const checkQuery = `
    SELECT COUNT(*) AS count
    FROM information_schema.tables 
    WHERE table_schema = ? 
    AND table_name = 'users';
  `;
  try {
    const [rows] = await executeQuery(checkQuery, [process.env.DATABASE]);
    if (rows.count === 0) {
      const createTableQuery = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          full_name VARCHAR(255),
          username VARCHAR(255),
          password VARCHAR(255),
          profile_pic VARCHAR(255),
          email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await executeQuery(createTableQuery, [], (results) => {
        console.log("Users table created:", results);
      });
    } else {
      console.log("Users table already exists.");
    }
  } catch (error) {
    console.error("Error checking/creating users table:", error);
  }
}

checkAndCreateUsersTable();

export default executeQuery;
