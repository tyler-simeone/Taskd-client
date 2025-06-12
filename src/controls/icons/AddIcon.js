import React from "react";
// import AddIcon from '@mui/icons-material/Add';
import { Plus } from "lucide-react";
import "./styles/AddIcon.css"

export const AddIcon = ({ onClick, classname }) => {
    return (
        <Plus onClick={onClick} className={`add-icon ${classname}`} />
    );
}