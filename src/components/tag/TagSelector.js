import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { tagsClient } from '../../api/tagsClient';
import { handleError } from "../../util/handleError";
import { TagsGrid } from './TagsGrid';

export const TagSelector = ({
    taskId
}) => {
    const { userSession, boardId } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState();

    const loadTags = async () => {
        setIsLoading(true);

        try {
            var tagsByBoard = await tagsClient.getTagsByBoardId(boardId, userSession.userId);
            setTags(tagsByBoard.data);
        } catch (err) {
            handleError(err);
        }
    };
    
    const handleAddTagToTask = async (tagId) => {
        setIsLoading(true);

        var payload = {
            userId: userSession.userId,
            boardId: boardId,
            taskId: taskId,
            tagId: tagId
        }
        console.log("payload: ", payload);

        try {
            var tagsByBoard = await tagsClient.addTagToTask(payload);
            setTags(tagsByBoard);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        if (!tags)
            loadTags();
    }, [tags]);

    return (
        tags && tags.length > 0 &&
        <TagsGrid tags={tags} handleAddTagToTask={handleAddTagToTask} />
    );
}