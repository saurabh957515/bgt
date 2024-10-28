import Template from '../models/Template.model.js'; // Adjust the import as needed

// Create a new template
export const createTemplate = async (req, res) => {
   
  try {
    const { content } = req.body;
    console.log(content)
    const template = await Template.create({ content });
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error creating template', error });
  }
};

// Get all templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll(); // Fetch all templates from the database
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving templates', error });
  }
};

// Get a single template by ID
export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id); // Fetch a template by primary key (ID)
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving template', error });
  }
};

// Update a template
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const template = await Template.findByPk(id); // Find the template by ID
    if (!template) return res.status(404).json({ message: 'Template not found' });

    template.content = content; // Update content
    await template.save(); // Save the updated template

    res.status(200).json(template); // Return the updated template
  } catch (error) {
    res.status(500).json({ message: 'Error updating template', error });
  }
};

// Delete a template
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findByPk(id); // Find the template by ID
    if (!template) return res.status(404).json({ message: 'Template not found' });

    await template.destroy(); // Delete the template

    res.status(200).json({ message: 'Template deleted successfully' }); // Success response
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template', error });
  }
};
