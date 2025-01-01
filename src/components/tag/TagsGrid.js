import React, { useState, useEffect } from 'react';
// import { Spinner } from "../controls/spinner";
import { TagController } from './TagController';
import "./styles/TagsGrid.css";

export const TagsGrid = ({ tags, handleAddTagToTask }) => {
    return (
        <div className="tags-grid">
            <ul className="tags-list">
                {tags && tags.map(tag => {
                    return (
                        <TagController 
                            tagModel={tag}
                            handleAddTagToTask={handleAddTagToTask}
                        />
                    );
                })}
            </ul>
        </div>
    );
}