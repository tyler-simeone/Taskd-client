import React, { useState, useEffect } from 'react';
// import { Spinner } from "../controls/spinner";
import { TagController } from './TagController';

export const TagsGrid = (tags) => {
    return (
        tags && tags.map(tag => {
            return (
                <TagController 
                    tagModel={tag}
                    handleAddTagToTask={handleAddTagToTask}
                />
            );
        })
    );
}