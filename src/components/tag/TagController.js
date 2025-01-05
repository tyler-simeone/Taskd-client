import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask,
    isViewOnly // Board-level view of all Tasks and their Tags
}) => {
    return (
        <TagView 
            tagModel={tagModel}
            handleAddTagToTask={handleAddTagToTask}
            handleDeleteFromTask={handleDeleteFromTask}
            isViewOnly={isViewOnly}
        />
    );
}