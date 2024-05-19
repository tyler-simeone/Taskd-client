import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import AddIcon from '@mui/icons-material/Add';
import './styles/ColumnAddTemplate.css';

export const ColumnAddTemplate = () => {
    const { openAddColumnModal } = useContext(AppContext); 
    
    return (
        <div key={-1} className="add-column-template--container" onClick={openAddColumnModal}>
            <div className="add-column-template--body">
                <h2 style={{fontSize: "21.5px", color: "#57595f"}}>Add new column</h2>
                <div className="add-column-template-icon--container" ><AddIcon className="add-column-icon" /></div>
            </div>
        </div>
    );
}

