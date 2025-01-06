import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask,
    isTaskDetailsView,
    isViewOnly, // Board-level view of all Tasks and their Tags
    handleTagDeleteFromTask
}) => {
    return (
        <TagView 
            tagModel={tagModel}
            handleAddTagToTask={handleAddTagToTask}
            handleDeleteFromTask={handleDeleteFromTask}
            isViewOnly={isViewOnly}
            isTaskDetailsView={isTaskDetailsView}
            handleTagDeleteFromTask={handleTagDeleteFromTask}
        />
    );
}