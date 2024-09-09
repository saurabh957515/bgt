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
        SET name = ?, email = ?, contact_no = ?, alternate_no = ?, address = ?, date_of_birth = ?,course_detail = ?,current_city = ?, interested_country = ? ,telecaller_name = ? , visa_type = ? ,gender = ? ,progress_count = ?
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
        current_city,
        interested_country,
        telecaller_name,
        visa_type,
        gender,
        progress_count,
      } = newInquiry;
      const result = await sql(query, [
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        course_detail,
        current_city,
        interested_country,
        telecaller_name,
        visa_type,
        gender,
        progress_count,
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
  static async updateProgressCountByID(id, progress_count) {
    try {
      const query = `
        UPDATE inquiry 
        SET progress_count = ? 
        WHERE id = ?
      `;
      const result = await sql(query, [progress_count, id]);
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

      const [result] = await sql(query, [table, process.env.database, column]);

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
