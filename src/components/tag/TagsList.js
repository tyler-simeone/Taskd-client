import React, { useState, useEffect } from 'react';
// import { Spinner } from "../controls/spinner";
import { TagController } from './TagController';
import "./styles/TagsGrid.css";

export const TagsList = ({ 
    tags,
    handleAddTagToTask,
    isTaskView,
    isTaskDetailsView,
    isViewOnly // Board-level view of all Tasks and their Tags
}) => {
    return (
        <>
            <ul className="tags-list" style={ isTaskView ? {padding: 0, paddingTop: 6.5} : isTaskDetailsView && {padding: 0, paddingTop: 20}}>
                {tags && tags.map(tag => {
                    return (
                        <TagController 
                            tagModel={tag}
                            handleAddTagToTask={handleAddTagToTask}
                            isViewOnly={isViewOnly}
                            isTaskDetailsView={isTaskDetailsView}
                        />
                    );
                })}
            </ul>
        </>
    );
}