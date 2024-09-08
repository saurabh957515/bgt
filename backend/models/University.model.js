import sql from "../db/queryExecution.js";
class University {
  static async create(newUniversity) {
    try {
      const result = await sql("INSERT INTO university SET ?", newUniversity);
 
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const query = `SELECT * FROM university`;
      const result = await sql(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM university WHERE id = ?`;
      const result = await sql(query, [id]);
      return result?.afectedRows !== 0;
    } catch (error) {
      throw error;
    }
  }

  static async updateByID(newInquiry, id) {
    try {
      const query = `
        UPDATE university 
        SET institute_name = ?, country = ?, course_detail = ?, city = ?, stay_in_type = ?, stay_in_address = ?
        WHERE id = ?
      `;
      const {
        institute_name,
        country,
        course_detail,
        city,
        stay_in_type,
        stay_in_address,
      } = newInquiry;
      const result = await sql(query, [
        institute_name,
        country,
        course_detail,
        city,
        stay_in_type,
        stay_in_address,
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

      if (fields) {
        if (Object?.keys(fields)) {
          for (const [field, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null) {
              conditions.push(`${field} LIKE ?`);
              values.push(`%${value}%`);
            }
          }
        }
      }

      const query = `
        SELECT * FROM university 
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
export default University;
