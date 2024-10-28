import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TemplateBuilder from '../../Components/TemplateBuilder';
import PrimaryContainer from '../../Components/PrimaryContainer';

const TemplatePage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of templates from the server
    const fetchTemplates = async () => {
        try {
            const response = await axios.get('/api/template'); // Adjust the endpoint as necessary
            setTemplates(response.data);
        } catch (error) {
            setError('Error fetching templates');
        } finally {
            setLoading(false);
        }
    };

    // Call fetchTemplates when the component mounts
    useEffect(() => {
        fetchTemplates();
    }, []);

    // Handle saving a new template
    const handleSaveTemplate = async (content) => {
        try {
            await axios.post('/api/template', { content }); // Adjust the endpoint as necessary
            fetchTemplates(); // Refresh the list of templates
        } catch (error) {
            setError('Error saving template');
        }
    };

    // Render the loading state or error message
    if (loading) return <p>Loading templates...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PrimaryContainer>
                <div className="p-4">
            <h2 className="text-2xl font-bold">Templates</h2>
            <TemplateBuilder onSaveTemplate={handleSaveTemplate} />
            <h3 className="mt-4 text-lg font-semibold">Available Templates</h3>
            {templates.length === 0 ? (
                <p>No templates available.</p>
            ) : (
                <ul className="mt-2">
                    {templates?.map((template) => (
            <li key={template.id} className="p-2 border-b border-gray-200">
              <div dangerouslySetInnerHTML={{ __html: template.content }} />
            </li>
          ))}
                </ul>
            )}
        </div>
        </PrimaryContainer>
    
    );
};

export default TemplatePage;
