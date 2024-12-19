import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { PbAddIcon } from "../../controls/icons/AddIcon";

import './styles/ColumnAddTemplate.css';

export const ColumnAddTemplate = () => {
    const { openAddColumnModal } = useContext(AppContext); 
    
    return (
        <div key={-1} className="add-column-template--container" onClick={openAddColumnModal}>
            <div className="add-column-template--body">
                <h2 style={{fontSize: "21.5px", color: "#4c4d53"}}>Add new column</h2>
                <div className="add-column-template-icon--container" ><PbAddIcon /></div>
            </div>
        </div>
    );
}

