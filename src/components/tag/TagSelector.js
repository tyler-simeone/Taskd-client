import React, { useState, useEffect } from 'react';
import { tagsClient } from '../../api/tagsClient';
import { handleError } from "../../util/handleError";
import { TagsGrid } from './TagsGrid';

export const TagSelector = () => {
    const { userSession, boardId } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState();

    const loadTags = async () => {
        setIsLoading(true);

        try {
            var tagsByBoard = await tagsClient.getTagsByBoardId(boardId, userSession.userId);
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
        <TagsGrid tags={tags} />
    );
}