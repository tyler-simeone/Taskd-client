import React from 'react';
import { TagController } from './TagController';
import { AddIcon } from '../../controls/icons/AddIcon';
import "./styles/TagsGrid.css";
import "./styles/TagsList.css";

export const TagsList = ({ 
    tags,
    handleAddTagToTask,
    isTaskBoardView,
    isTaskDetailsView,
    isTaskEditView,
    isTagsGrid,
    handleTagDeleteFromTask,
    onClick,
    showTagSelector
}) => {
    return (
        <div className={`tags-list--container ${isTaskEditView && !isTagsGrid && 'edit-task'}`}>
            {isTaskEditView && !isTagsGrid && <h4 className="tags--lbl">Tags ({tags.length}):</h4>}

            <div className="edit-task-tags-list--container">
                <ul 
                    className="tags-list" 
                    style={ isTaskBoardView ? {padding: 0, paddingTop: 5} : isTaskDetailsView ? {padding: 0, paddingTop: 12} : isTagsGrid && {padding: 0}}
                >
                    {tags && tags.map(tag => {
                        return (
                            <TagController 
                                tagModel={tag}
                                handleAddTagToTask={handleAddTagToTask}
                                isTaskEditView={isTaskEditView}
                                isTagsGrid={isTagsGrid}
                                handleTagDeleteFromTask={handleTagDeleteFromTask}
                                key={tag.tagId}
                            />
                        );
                    })}
                </ul>

                {isTaskEditView && !isTagsGrid && !showTagSelector && <AddIcon onClick={onClick} classname={"task-tag"} />}
            </div>
        </div>
    );
}