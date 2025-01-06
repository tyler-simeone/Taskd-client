import React, { useState, useEffect } from 'react';
// import { Spinner } from "../controls/spinner";
import { TagController } from './TagController';
import { TagsList } from './TagsList';
import "./styles/TagsGrid.css";

export const TagsGrid = ({ tags, handleAddTagToTask }) => {
    return (
        <div className="tags-grid--container">
            <h4 className='tags--lbl'>Tags:</h4>

            <div className="tags-grid">
                <TagsList tags={tags} handleAddTagToTask={handleAddTagToTask} />
            </div>
        </div>
    );
}