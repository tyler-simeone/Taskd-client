import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { tagsClient } from '../../api/tagsClient';
import { handleError } from "../../util/handleError";
import { TagsGrid } from './TagsGrid';

export const TagSelector = ({
    taskId,
    setTagId,
    handleTagsHaveChanged,
    tagsHaveChanged,
    setFormError,
    isTaskEditView
}) => {
    const { userSession, boardId } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState();

    const loadTags = async () => {
        setIsLoading(true);

        try {
            var response = null; 
            
            // When taskId has a value, we're loading tags just for a specific Task, to see what remaining tags are avaliable.
            // Otherwise, just load all tags for a board, as this is a new Task.
            if (taskId)
                response = await tagsClient.getAvailableTagsByTaskId(taskId, boardId);
            else 
                response = await tagsClient.getTagsByBoardId(boardId, userSession.userId);
            
            setTags(response.data);

            if (handleTagsHaveChanged)
                handleTagsHaveChanged();
        } catch (err) {
            handleError(err, setFormError);
        }
    };
    
    const handleAddTagToTask = async (tagId) => {
        setIsLoading(true);

        // Task edit workflow
        if (taskId) {
            var payload = {
                userId: userSession.userId,
                boardId: boardId,
                taskId: taskId,
                tagId: tagId
            }
    
            try {
                var resp = await tagsClient.addTagToTask(payload);

                if (resp) {
                    loadTags();
                }
            } catch (err) {
                handleError(err, setFormError);
            }
        } else {
            // Task add workflow
            setTagId(tagId);
        }
    };

    useEffect(() => {
        if (!tags || tagsHaveChanged) {
            loadTags();
        }
    }, [tags, tagsHaveChanged]);

    return (
        <TagsGrid 
            tags={tags} 
            handleAddTagToTask={handleAddTagToTask}
            isTaskEditView={isTaskEditView}
        />
    );
}