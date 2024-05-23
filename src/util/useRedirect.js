import React from "react"
import { useNavigate } from 'react-router-dom';

export const useRedirect = (route) => {
    const navigate = useNavigate();
    navigate(route);
}