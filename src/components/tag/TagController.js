import React from 'react';
import { TagView } from './TagView';
import modelMapper from '../../requestModelMapper';
import { handleError } from '../../handleError';

export const TagController = ({
    tag
}) => {
    const [isLoading, setIsLoading] = useState();

    const handleDeleteFromTask = (evt) => {
        setIsLoading(true);
    };

    return (
        <TagView 
            tagModel={tag}
            handleDeleteFromTask={handleDeleteFromTask}
        />
    );
}