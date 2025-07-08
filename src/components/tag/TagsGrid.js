import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { TagsList } from './TagsList';
import { AddTaskTag } from './AddTaskTag';
import "./styles/TagsGrid.css";

export const TagsGrid = ({ 
    tags, 
    handleAddTagToTask, 
    isTaskEditView 
}) => {
    const { openAddTagModal, setIsAddTagFromEditTask } = useContext(AppContext);

    const handleAddNewTag = () => {
        setIsAddTagFromEditTask(true);
        openAddTagModal();
    }

    return (
        <div className="tags-grid--container">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4 className="tags--lbl">Available Tags {tags && `(${tags.length})`}:</h4>
                <AddTaskTag isAddNewTag={true} onClick={handleAddNewTag} />
            </div>

            {tags && tags.length > 0 && (
                <div className="tags-grid">
                    <TagsList 
                        tags={tags} 
                        handleAddTagToTask={handleAddTagToTask}
                        isTaskEditView={isTaskEditView}
                        isTagsGrid={true}
                    />
                </div>
            )}
        </div>
    );
}