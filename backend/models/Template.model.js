import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import sql from "../db/queryExecution.js";

const db = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
  logging: false, // Set to console.log to see SQL queries
});



const Template = db.define('Template', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
export const syncTemplate = async () => {
  try {
    await Template.sync();
    console.log('Template table synced successfully');
  } catch (error) {
    console.error('Error syncing Template table:', error);
  }
};
 syncTemplate;
export default Template;
