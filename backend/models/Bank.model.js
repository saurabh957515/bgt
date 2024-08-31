import sql from "../db/queryExecution.js";
class Bank {
  static async create(newBank) {

    try {
      const result = await sql("INSERT INTO bank_details SET ?", newBank);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const query = `SELECT * FROM bank_details`;
      const result = await sql(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM bank_details WHERE id = ?`;
      const result = await sql(query, [id]);
      return result?.afectedRows !== 0;
    } catch (error) {
      throw error;
    }
  }
  static async updateByID(newBank, id) {
    try {
      const query = `
        UPDATE bank_details 
        SET account_holder_name = ?, account_number = ?, bank_name = ?, branch_name = ?, ifsc_code = ?, account_type = ?,branch_address = ?
        WHERE id = ?
      `;
      const {
        account_holder_name,
        account_number,
        bank_name,
        branch_name,
        ifsc_code,
        account_type,
        branch_address,
      } = newBank;
      const result = await sql(query, [
        account_holder_name,
        account_number,
        bank_name,
        branch_name,
        ifsc_code,
        account_type,
        branch_address,
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
        SELECT * FROM bank_details 
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

export default Bank;
