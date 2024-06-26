import React from 'react';
import ReactQuill from 'react-quill';
import { CustomToolbar } from './CustomToolbar';

const Write = ({ value, onChange }) => {
    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };

    const editorStyle = {
        width: '100%',
        height: '600px',
        display: "flex",
        flexDirection: "column",
    };

    return (
        <div style={editorStyle}>
            <CustomToolbar />
            <ReactQuill
                style={{ flex: 1 }}
                modules={modules}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Write;