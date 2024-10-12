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
        SELECT * FROM admission
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
        SET first_name = ?,last_name = ?, email = ?, contact_no = ?, alternate_no = ?, address = ?, date_of_birth = ?,current_city = ?,telecaller_name = ?,visa_type = ?,date_of_admission =?,inquiry_id = ? ,gender = ?, zip_code = ? , current_state = ? ,
         current_nationality = ? , passport_number = ? , passport_expirydate = ? , photo_document = ? , adharcard_document = ? , certification_document = ? ,fee_status = ?   WHERE id = ?
      `;
      const {
        first_name,
        last_name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        current_city,
        telecaller_name,
        visa_type,
        date_of_admission,
        inquiry_id,
        gender,
        zip_code,
        current_state,
        current_nationality,
        passport_number,
        passport_expirydate,
        photo_document,
        adharcard_document,
        certification_document,
        fee_status,
      } = newAdmission;
      const result = await sql(query, [
        first_name,
        last_name,
        email,
        contact_no,
        alternate_no,
        address,
        date_of_birth,
        current_city,
        telecaller_name,
        visa_type,
        date_of_admission,
        inquiry_id,
        gender,
        zip_code,
        current_state,
        current_nationality,
        passport_number,
        passport_expirydate,
        photo_document,
        adharcard_document,
        certification_document,
        fee_status,
        id,
      ]);
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

  // static async getAllDetails(fields, sortDirection = "DESC") {
  //   try {
  //     const conditions = [];
  //     const values = [];
  //     const validSortDirections = ["ASC", "DESC"];
  //     const direction = validSortDirections.includes(
  //       sortDirection.toUpperCase()
  //     )
  //       ? sortDirection.toUpperCase()
  //       : "DESC";

  //     // Build the dynamic WHERE conditions based on fields
  //     if (fields) {
  //       if (Object?.keys(fields)) {
  //         for (const [field, value] of Object.entries(fields)) {
  //           if (value !== undefined && value !== null) {
  //             conditions.push(`admission.${field} LIKE ?`); // Scope field to 'admission'
  //             values.push(`%${value}%`);
  //           }
  //         }
  //       }
  //     }

  //     const query = `
  //       SELECT
  //         admission.id AS admission_id,
  //         admission.inquiry_id AS admission_inquiry_id,
  //         admission.first_name AS admission_first_name,
  //         admission.last_name AS admission_last_name,
  //         admission.email AS admission_email,
  //         admission.contact_no AS admission_contact_no,
  //         admission.alternate_no AS admission_alternate_no,
  //         admission.address AS admission_address,
  //         admission.date_of_birth AS admission_date_of_birth,
  //         admission.current_city AS admission_current_city,
  //         admission.telecaller_name AS admission_telecaller_name,
  //         admission.visa_type AS admission_visa_type,
  //         admission.created_at AS admission_created_at,
  //         admission.date_of_admission AS admission_date_of_admission,
  //         admission.zip_code AS admission_zip_code,
  //         admission.gender AS admission_gender,
  //         admission.current_state AS admission_current_state,
  //         admission.current_nationality AS admission_current_nationality,
  //         admission.passport_number AS admission_passport_number,
  //         admission.passport_expirydate AS admission_passport_expirydate,
  //         admission.photo_document AS admission_photo_document,
  //         admission.adharcard_document AS admission_adharcard_document,
  //         admission.certification_document AS admission_certification_document,

  //         education.id AS education_id,
  //         education.admission_id AS education_admission_id,
  //         education.city AS education_city,
  //         education.state AS education_state,
  //         education.inquiry_id AS education_inquiry_id,
  //         education.course_details AS education_course_details,
  //         education.passing_year AS education_passing_year,
  //         education.name_of_institute AS education_name_of_institute,
  //         education.percentage_cgpa AS education_percentage_cgpa,
  //         education.is_employed AS education_is_employed,
  //         education.current_company AS education_current_company,
  //         education.current_designation AS education_current_designation,
  //         education.current_monthly_salary AS education_current_monthly_salary,
  //         education.total_experience_years AS education_total_experience_years,
  //         education.ielts_score AS education_ielts_score,
  //         education.employed_type AS education_employed_type,
  //         education.business_name AS education_business_name,
  //         education.business_type AS education_business_type,
  //         education.business_start_date AS education_business_start_date,

  //         university.id AS university_id,
  //         university.institute_name AS university_institute_name,
  //         university.country AS university_country,
  //         university.course_detail AS university_course_detail,
  //         university.city AS university_city,
  //         university.stay_in_type AS university_stay_in_type,
  //         university.stay_in_address AS university_stay_in_address,
  //         university.inquiry_id AS university_inquiry_id,
  //         university.admission_id AS university_admission_id,
  //         university.created_at AS university_created_at,
  //         university.updated_at AS university_updated_at,

  //         fee_details.id AS fee_details_id,
  //         fee_details.admission_id AS fee_details_admission_id,
  //         fee_details.inquiry_id AS fee_details_inquiry_id,
  //         fee_details.bank_details_id AS fee_details_bank_details_id,
  //         fee_details.current_amount AS fee_details_current_amount,
  //         fee_details.remaining_amount AS fee_details_remaining_amount,
  //         fee_details.total_amount AS fee_details_total_amount,
  //         fee_details.updated_at AS fee_details_updated_at

  //       FROM admission
  //       LEFT JOIN education ON admission.id = education.admission_id
  //       LEFT JOIN university ON admission.id = university.admission_id
  //       LEFT JOIN fee_details ON admission.id = fee_details.admission_id
  //       ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
  //       ORDER BY admission.created_at ${direction}
  //     `;

  //     const result = await sql(query, values);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async getAllDetails(fields, sortDirection = "DESC") {
    try {
      const validSortDirections = ["ASC", "DESC"];
      const direction = validSortDirections.includes(
        sortDirection.toUpperCase()
      )
        ? sortDirection.toUpperCase()
        : "DESC";
      let query = `
        SELECT 
          admission.id AS admission_id,
          admission.first_name AS admission_first_name,
          admission.last_name AS admission_last_name,
          admission.email AS admission_email,
          admission.contact_no AS admission_contact_no,
          admission.alternate_no AS admission_alternate_no,
          admission.address AS admission_address,
          admission.date_of_birth AS admission_date_of_birth,
          admission.current_city AS admission_current_city,
          admission.telecaller_name AS admission_telecaller_name,
          admission.visa_type AS admission_visa_type,
          admission.created_at AS admission_created_at,
          admission.updated_at AS admission_updated_at,
          admission.date_of_admission AS admission_date_of_admission,
          admission.zip_code AS admission_zip_code,
          admission.gender AS admission_gender,
          admission.current_state AS admission_current_state,
          admission.current_nationality AS admission_current_nationality,
          admission.passport_number AS admission_passport_number,
          admission.passport_expirydate AS admission_passport_expirydate,
          admission.photo_document AS admission_photo_document,
          admission.adharcard_document AS admission_adharcard_document,
          admission.certification_document AS admission_certification_document,
  
          education.id AS education_id,
          education.admission_id AS education_admission_id,
          education.city AS education_city,
          education.state AS education_state,
          education.inquiry_id AS education_inquiry_id,
          education.course_details AS education_course_details,
          education.passing_year AS education_passing_year,
          education.name_of_institute AS education_name_of_institute,
          education.percentage_cgpa AS education_percentage_cgpa,
          education.is_employed AS education_is_employed,
          education.current_company AS education_current_company,
          education.current_designation AS education_current_designation,
          education.current_monthly_salary AS education_current_monthly_salary,
          education.total_experience_years AS education_total_experience_years,
          education.ielts_score AS education_ielts_score,
          education.employed_type AS education_employed_type,
          education.business_name AS education_business_name,
          education.business_type AS education_business_type,
          education.business_start_date AS education_business_start_date,
  
          university.id AS university_id,
          university.institute_name AS university_institute_name,
          university.country AS university_country,
          university.course_detail AS university_course_detail,
          university.city AS university_city,
          university.stay_in_type AS university_stay_in_type,
          university.stay_in_address AS university_stay_in_address,
          university.inquiry_id AS university_inquiry_id,
          university.admission_id AS university_admission_id,
          university.created_at AS university_created_at,
          university.updated_at AS university_updated_at,
  
          fee_details.id AS fee_details_id,
          fee_details.admission_id AS fee_details_admission_id,
          fee_details.inquiry_id AS fee_details_inquiry_id,
          fee_details.bank_details_id AS fee_details_bank_details_id,
          fee_details.current_amount AS fee_details_current_amount,
          fee_details.remaining_amount AS fee_details_remaining_amount,
          fee_details.total_amount AS fee_details_total_amount,
          fee_details.updated_at AS fee_details_updated_at
  
        FROM admission
        LEFT JOIN education ON admission.id = education.admission_id
        LEFT JOIN university ON admission.id = university.admission_id
        LEFT JOIN fee_details ON admission.id = fee_details.admission_id
        WHERE 1=1
      `;

      // Collect filter conditions and parameters
      const conditions = [];
      const params = [];

      if (fields.date) {
        conditions.push("admission.date_of_admission = ?");
        params.push(fields.date);
      }
      if (fields.first_name) {
        conditions.push("admission.first_name LIKE ?");
        params.push(`%${fields.first_name}%`); // Using LIKE for partial matches
      }
      if (fields.telecaller_name) {
        conditions.push("admission.telecaller_name LIKE ?");
        params.push(`%${fields.telecaller_name}%`);
      }
      // if (fields.order) {
      //   query += ` ORDER BY ${fields.order} ${direction}`; // Change created_at to fields.order
      // } else {
      // query += ` ORDER BY admission.created_at ${direction}`;
      // }

      // Append conditions to the query if any exist
      if (conditions.length > 0) {
        query += " AND " + conditions.join(" AND ");
      }

      // Execute the query with parameters
      const rows = await sql(query, params);
      const results = rows.map((row) => ({
        admission: {
          id: row.admission_id,
          first_name: row.admission_first_name,
          last_name: row.admission_last_name,
          email: row.admission_email,
          contact_no: row.admission_contact_no,
          alternate_no: row.admission_alternate_no,
          address: row.admission_address,
          date_of_birth: row.admission_date_of_birth,
          current_city: row.admission_current_city,
          telecaller_name: row.admission_telecaller_name,
          visa_type: row.admission_visa_type,
          created_at: row.admission_created_at,
          updated_at: row.admission_updated_at,
          date_of_admission: row.admission_date_of_admission,
          zip_code: row.admission_zip_code,
          gender: row.admission_gender,
          current_state: row.admission_current_state,
          current_nationality: row.admission_current_nationality,
          passport_number: row.admission_passport_number,
          passport_expirydate: row.admission_passport_expirydate,
          photo_document: row.admission_photo_document,
          adharcard_document: row.admission_adharcard_document,
          certification_document: row.admission_certification_document,
        },
        education: {
          id: row.education_id,
          admission_id: row.education_admission_id,
          inquiry_id: row.education_inquiry_id,
          highest_qualification: row.education_highest_qualification,
          passing_year: row.education_passing_year,
          name_of_institute: row.education_name_of_institute,
          percentage_cgpa: row.education_percentage_cgpa,
          is_employed: row.education_is_employed,
          current_company: row.education_current_company,
          current_designation: row.education_current_designation,
          current_monthly_salary: row.education_current_monthly_salary,
          total_experience_years: row.education_total_experience_years,
          past_rejection_country_name:
            row.education_past_rejection_country_name,
          ielts_score: row.education_ielts_score,
          employed_type: row.education_employed_type,
          business_name: row.education_business_name,
          business_type: row.education_business_type,
          business_start_date: row.education_business_start_date,
          place_of_birth: row.education_place_of_birth,
          gender: row.education_gender,
          current_nationality: row.education_current_nationality,
          course_details: row.education_course_details,
        },
        university: {
          id: row.university_id,
          institute_name: row.university_institute_name,
          country: row.university_country,
          course_detail: row.university_course_detail,
          city: row.university_city,
          stay_in_type: row.university_stay_in_type,
          stay_in_address: row.university_stay_in_address,
          inquiry_id: row.university_inquiry_id,
          admission_id: row.university_admission_id,
          created_at: row.university_created_at,
          updated_at: row.university_updated_at,
        },
        fee_details: {
          id: row.fee_details_id,
          admission_id: row.fee_details_admission_id,
          inquiry_id: row.fee_details_inquiry_id,
          bank_details_id: row.fee_details_bank_details_id,
          current_amount: row.fee_details_current_amount,
          remaining_amount: row.fee_details_remaining_amount,
          total_amount: row.fee_details_total_amount,
          updated_at: row.fee_details_updated_at,
        },
      }));

      return results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default Admission;
