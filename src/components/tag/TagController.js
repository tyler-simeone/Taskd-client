import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask
}) => {
    return (
        <TagView 
            tagModel={tagModel}
            handleAddTagToTask={handleAddTagToTask}
            handleDeleteFromTask={handleDeleteFromTask}
        />
    );
}