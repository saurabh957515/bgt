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
        SET name = ?, email = ?, contact_no = ?, alternate_no = ?, address = ?, date_of_birth = ?
        WHERE id = ?
      `;
      const { name, email, contact_no, alternate_no, address, date_of_birth } =
        newInquiry;
      const result = await sql(query, [
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
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
      for (const [field, value] of Object.entries(fields)) {
        if (value !== undefined && value !== null) {
          conditions.push(`${field} = ?`);
          values.push(value);
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
}

export default Inquiry;
