import React from 'react';
import { TagController } from './TagController';
import "./styles/TagsGrid.css";

export const TagsList = ({ 
    tags,
    handleAddTagToTask,
    isTaskView,
    isTaskDetailsView,
    isViewOnly, // Board-level view of all Tasks and their Tags,
    handleTagDeleteFromTask
}) => {
    return (
        <>
            <ul className="tags-list" style={ isTaskView ? {padding: 0, paddingTop: 6.5} : isTaskDetailsView && {padding: 0, paddingTop: 16}}>
                {tags && tags.map(tag => {
                    return (
                        <TagController 
                            tagModel={tag}
                            handleAddTagToTask={handleAddTagToTask}
                            isViewOnly={isViewOnly}
                            isTaskDetailsView={isTaskDetailsView}
                            handleTagDeleteFromTask={handleTagDeleteFromTask}
                        />
                    );
                })}
            </ul>
        </>
    );
}