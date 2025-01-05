import React, { useState, useEffect } from 'react';
// import { Spinner } from "../controls/spinner";
import { TagController } from './TagController';
import "./styles/TagsGrid.css";

export const TagsList = ({ 
    tags,
    handleAddTagToTask,
    isViewOnly // Board-level view of all Tasks and their Tags
}) => {
    return (
        <>
            <ul className="tags-list" style={ isViewOnly && {padding: 0, paddingTop: 4}}>
                {tags && tags.map(tag => {
                    return (
                        <TagController 
                            tagModel={tag}
                            handleAddTagToTask={handleAddTagToTask}
                            isViewOnly={isViewOnly}
                        />
                    );
                })}
            </ul>
        </>
    );
}