import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tagModel,
    handleAddTagToTask,
    isTaskEditView,
    handleTagDeleteFromTask
}) => {
    return (
        <TagView 
            tagModel={tagModel}
            handleAddTagToTask={handleAddTagToTask}
            isTaskEditView={isTaskEditView}
            handleTagDeleteFromTask={handleTagDeleteFromTask}
        />
    );
}