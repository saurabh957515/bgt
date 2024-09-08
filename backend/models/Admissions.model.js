import sql from "../db/queryExecution.js";
class Admission {
  static async create(newAdmission) {
    try {
      const result = await sql("INSERT INTO admission SET ?", newAdmission);
      if (result?.error) {
        return { error: result?.error };
      } else {
        return { id: result.insertId };
      }
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const query = `
      SELECT 
        admission.id AS admissionDetails_id, 
        admission.*, 
        education.*, 
        education.id AS educationDetails_id
      FROM admission
      LEFT JOIN education ON admission.id = education.admission_id
    `;

      const result = await sql(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM admission WHERE id = ?`;

      const result = await sql(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateByID(newAdmission, id) {
    try {
      const query = `
        UPDATE admission 
        SET name = ?, email = ?, contact_no = ?, alternate_no = ?, address = ?, date_of_birth = ?,current_city = ?,telecaller_name = ?,visa_type = ?,inquiry_id =?
        WHERE id = ?
      `;
      const {
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        current_city,
        telecaller_name,
        visa_type,
        inquiry_id,
      } = newAdmission;
      const result = await sql(query, [
        name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        current_city,
        telecaller_name,
        visa_type,
        inquiry_id,
        id,
      ]);
  console.log(result,id)
      if (result?.error) {
        return { error: result?.error };
      } else {
        return result;
      }
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
        SELECT * FROM admission 
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

export default Admission;
