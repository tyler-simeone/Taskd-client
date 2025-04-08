import React, { useEffect } from 'react';
import { TagsList } from './TagsList';
import "./styles/TagsGrid.css";

export const TagsGrid = ({ tags, handleAddTagToTask }) => {
    useEffect(() => {

    }, [tags]);

    return (
        <div className="tags-grid--container">
            <h4 className='tags--lbl'>Available Tags {tags && `(${tags.length})`}:</h4>

            {tags && tags.length > 0 && (
                <div className="tags-grid">
                    <TagsList tags={tags} handleAddTagToTask={handleAddTagToTask} />
                </div>
            )}
        </div>
    );
}