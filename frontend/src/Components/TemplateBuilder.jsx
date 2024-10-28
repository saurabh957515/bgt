// TemplateBuilder.js
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TemplateBuilder = ({ onSaveTemplate }) => {
  const [templateContent, setTemplateContent] = useState('');

  const handleSaveTemplate = () => {
    if (templateContent) {
      onSaveTemplate(templateContent);
      setTemplateContent(''); // Clear the editor after saving
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h3 className="text-lg font-semibold">Create Message Template</h3>
      <CKEditor
        editor={ClassicEditor}
        data={templateContent}
        onChange={(event, editor) => {
          const data = editor.getData();
          setTemplateContent(data);
        }}
      />
      <button
        onClick={handleSaveTemplate}
        className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg"
      >
        Save Template
      </button>
    </div>
  );
};

export default TemplateBuilder;
