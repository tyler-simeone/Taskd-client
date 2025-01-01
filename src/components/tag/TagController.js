import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tag,
    handleAddTagToTask,
    handleDeleteFromTask
}) => {
    return (
        <TagView 
            tagModel={tag}
            handleAddTagToTask={handleAddTagToTask}
            handleDeleteFromTask={handleDeleteFromTask}
        />
    );
}