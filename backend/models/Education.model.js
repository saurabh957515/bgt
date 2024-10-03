import sql from "../db/queryExecution.js";
class Education {
  static async create(newEducation) {
    try {
      const result = await sql("INSERT INTO education SET ?", newEducation);
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
      const query = `SELECT * FROM education`;
      const result = await sql(query);

      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM education WHERE id = ?`;
      const result = await sql(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateByID(newEducation, id) {
    try {
      const query = `
            UPDATE education 
            SET total_experience_years = ?, 
                admission_id = ?, 
                inquiry_id = ?, 
                course_details = ?,
                city = ?,
                state = ?,
                passing_year = ?, 
                name_of_institute = ?, 
                percentage_cgpa = ?, 
                is_employed = ?, 
                current_designation = ?, 
                current_company = ?, 
                current_monthly_salary = ?, 
                ielts_score = ?,
                business_name = ? ,
                business_type = ? ,
                business_start_date = ? ,
                employed_type = ? 
            WHERE id = ?
        `;
      const {
        total_experience_years,
        admission_id,
        inquiry_id,
        course_details,
        city,
        state,
        passing_year,
        name_of_institute,
        percentage_cgpa,
        is_employed,
        current_designation,
        current_company,
        current_monthly_salary,
        ielts_score,
        business_name,
        business_type,
        business_start_date,
        employed_type,
      } = newEducation;

      const result = await sql(query, [
        total_experience_years,
        admission_id,
        inquiry_id,
        course_details,
        city,
        state,
        passing_year,
        name_of_institute,
        percentage_cgpa,
        is_employed,
        current_designation,
        current_company,
        current_monthly_salary,
        ielts_score,
        business_name,
        business_type,
        business_start_date,
        employed_type,
        id,
      ]);
      if (result?.error) {
        return { error: result?.error };
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
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
        SELECT * FROM education 
        ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
        ORDER BY created_at ${direction}
      `;
      const result = await sql(query, values);
      if (result?.error) {
        return { error: result?.error };
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default Education;
