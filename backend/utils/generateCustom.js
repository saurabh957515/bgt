function generateCustomId() {
    const prefix = 'CUSTOM_ID_'; // A custom prefix or any pattern you want to use
    const uniquePart = Date.now().toString(36) + Math.random().toString(36).substr(2, 23); // Generate a unique string
    return (prefix + uniquePart).substring(0, 36); // Ensure it fits within 36 characters
  }
  export default generateCustomId;