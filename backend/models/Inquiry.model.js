import sql from "../db/queryExecution.js";
class Inquiry {
  static async create(newInquiry) {
    try {
      const result = await sql("INSERT INTO inquiry SET ?", newInquiry);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const query = `SELECT * FROM inquiry`;
      const result = await sql(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM inquiry WHERE id = ?`;
      const result = await sql(query, [id]);
      return result?.afectedRows !== 0;
    } catch (error) {
      throw error;
    }
  }
  static async updateByID(newInquiry, id) {
    try {
      const query = `
        UPDATE inquiry 
        SET name = ?, email = ?, contact_no = ?, alternate_no = ?, address = ?, date_of_birth = ?,course_detail = ?,city = ?, interested_country = ? ,telecaller_name = ? , visa_type = ? ,gender = ? 
        WHERE id = ?
      `;
      const {
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        course_detail,
        city,
        interested_country,
        telecaller_name,
        visa_type,
        gender,
      } = newInquiry;
      const result = await sql(query, [
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        course_detail,
        city,
        interested_country,
        telecaller_name,
        visa_type,
        gender,
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByFields(fields, sortDirection = "DESC") {
    try {
      const conditions = [];
      const values = [];
      const validSortDirections = ["ASC", "DESC"];
      const direction = validSortDirections.includes(
        sortDirection.toUpperCase()
      )
        ? sortDirection.toUpperCase()
        : "DESC";

      // Iterate through fields to build SQL query with LIKE
      if (fields) {
        if (Object?.keys(fields)) {
          for (const [field, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null) {
              // Use LIKE for partial matches and add wildcard characters
              conditions.push(`${field} LIKE ?`);
              values.push(`%${value}%`);
            }
          }
        }
      }

      const query = `
        SELECT * FROM inquiry 
        ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
        ORDER BY created_at ${direction}
      `;
      const result = await sql(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getEnum(table, column) {
    try {
      const query = `
        SELECT COLUMN_TYPE 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = ? 
        AND TABLE_SCHEMA = ? 
        AND COLUMN_NAME = ?`;

      const [result] = await sql(query, [table, "states", column]);

      if (!result.COLUMN_TYPE) {
        throw new Error("Column not found or it is not of ENUM type");
      }

      // Extract ENUM values from the result
      const enumValues = result["COLUMN_TYPE"]
        .match(/enum\((.*)\)/)[1]
        .split(",")
        .map((value) => value.replace(/'/g, ""));

      return enumValues;
    } catch (error) {
      throw error;
    }
  }
}
export default Inquiry;
