import React from "react";
import { Funnel } from 'lucide-react';
import "./styles/FilterIcon.css"

export const FilterIcon = ({ onClick, classname }) => {
    return (
        <Funnel onClick={onClick} className={`filter-icon ${classname}`} />
    );
}