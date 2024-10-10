import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSessionNote } from '../redux/slices/sessionNoteSlice';

const SessionNotes = () => {
    const [content, setContent] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.sessionNote);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (content.trim().length < 5) {
            alert('Content must be at least 5 characters long');
            return;
        }
        
        const formData = new FormData();
        formData.append('content', content);
        if (attachment) {
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(attachment.type) || attachment.size > 2 * 1024 * 1024) {
                alert('Please upload a valid file (JPEG, PNG, PDF) under 2MB.');
                return;
            }
            formData.append('attachment', attachment);
        }

        dispatch(createSessionNote(formData))
            .then(() => {
                setSuccessMessage('Session note saved successfully!');
                setContent('');
                setAttachment(null);
            })
            .catch(() => {
                setSuccessMessage('Failed to save session note.');
            });
    };

    return (
        <div className="container mt-4">
            <h2>Add Session Notes</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="attachment">Attachment</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setAttachment(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Note'}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </form>
        </div>
    );
};

export default SessionNotes;
