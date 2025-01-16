import React from 'react';
import { TagController } from './TagController';
import "./styles/TagsGrid.css";

export const TagsList = ({ 
    tags,
    handleAddTagToTask,
    isTaskBoardView, // Board-level view of all Tasks and their Tags,
    isTaskDetailsView,
    isTaskEditView,
    handleTagDeleteFromTask
}) => {
    return (
        <>
            <ul 
                className="tags-list" 
                style={ isTaskBoardView ? {padding: 0, paddingTop: 6.5} : isTaskDetailsView ? {padding: 0, paddingTop: 16} : isTaskEditView && {padding: 0}}
            >
                {tags && tags.map(tag => {
                    return (
                        <TagController 
                            tagModel={tag}
                            handleAddTagToTask={handleAddTagToTask}
                            isTaskEditView={isTaskEditView}
                            handleTagDeleteFromTask={handleTagDeleteFromTask}
                            key={tag.tagId}
                        />
                    );
                })}
            </ul>
        </>
    );
}