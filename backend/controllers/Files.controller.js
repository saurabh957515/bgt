import sql from "../db/queryExecution.js";
export const getFileById = async (id) => {
  const query = "SELECT * FROM files WHERE id = ?";
  const rows = sql(query, [id]);
  if (rows) {
    return rows;
  } else {
    return null;
  }
};

export const saveFile = async (fileDetails) => {
  const query = `
    INSERT INTO files (file_name, file_path, mime_type)
    VALUES (?, ?, ?)
  `;
  const values = [fileDetails.fileName, fileDetails.filePath, fileDetails.mimeType];

  try {
    const result = await sql(query, values);
    return result.insertId;
  } catch (error) {
    console.error("Error saving file details to the database:", error);
    throw error;
  }
};

