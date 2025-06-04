import React from 'react';
import { TagView } from './TagView';

export const TagController = ({
    tagModel,
    handleAddTagToTask,
    isTaskEditView,
    isTagsGrid,
    handleTagDeleteFromTask
}) => {
    return (
        <TagView 
            tagModel={tagModel}
            handleAddTagToTask={handleAddTagToTask}
            isTaskEditView={isTaskEditView}
            isTagsGrid={isTagsGrid}
            handleTagDeleteFromTask={handleTagDeleteFromTask}
        />
    );
}