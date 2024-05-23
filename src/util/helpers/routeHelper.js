import React from 'react';
import { useNavigate } from 'react-router-dom';

export const routeHelper = {
    getURL: () => {
        return window.location.href.split('/').filter(segment => segment);
    },
    parseEncodedUrl: () => {

    },
    appendQueryParam: () => {

    },
    extractQueryParams: () => {
        
    }
};