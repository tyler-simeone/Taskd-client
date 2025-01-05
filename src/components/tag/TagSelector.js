import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { tagsClient } from '../../api/tagsClient';
import { handleError } from "../../util/handleError";
import { TagsGrid } from './TagsGrid';

export const TagSelector = ({
    taskId,
    setTagId,
    setFormError
}) => {
    const { userSession, boardId } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState();

    const loadTags = async () => {
        setIsLoading(true);

        try {
            var response = null; 
            
            // When taskId has a value, we're loading tags just for a specific task, to see what remaining tags are avaliable.
            // Otherwise, just load all tags for a board.
            if (taskId)
                response = await tagsClient.getTagsByTaskId(taskId, boardId);
            else 
                response = await tagsClient.getTagsByBoardId(boardId, userSession.userId);

            setTags(response.data);
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
                await tagsClient.addTagToTask(payload);
            } catch (err) {
                handleError(err, setFormError);
            }
        } else {
            // Task add workflow
            setTagId(tagId);
        }
    };

    useEffect(() => {
        if (!tags)
            loadTags();
    }, [tags]);

    return (
        <>
            {tags && tags.length > 0 &&
                <TagsGrid tags={tags} handleAddTagToTask={handleAddTagToTask} />}
        </>
    );
}