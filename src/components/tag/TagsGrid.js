import React from 'react';
import { TagsList } from './TagsList';
import "./styles/TagsGrid.css";

export const TagsGrid = ({ tags, handleAddTagToTask }) => {
    return (
        <div className="tags-grid--container">
            <h4 className='tags--lbl'>Available tags ({tags && tags.length}):</h4>

            {tags && tags.length > 0 && (
                <div className="tags-grid">
                    <TagsList tags={tags} handleAddTagToTask={handleAddTagToTask} />
                </div>
            )}
        </div>
    );
}