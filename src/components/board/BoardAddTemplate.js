import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { PbAddIcon } from "../../controls/icons/AddIcon";
import '../column/styles/ColumnAddTemplate.css';

export const BoardAddTemplate = () => {
    const { openAddBoardModal } = useContext(AppContext); 
    
    return (
        <div key={-1} className="add-column-template--container" onClick={openAddBoardModal}>
            <div className="add-column-template--body">
                <h2 style={{fontSize: "21.5px", color: "#4c4d53"}}>Add new board</h2>
                <div className="add-column-template-icon--container" ><PbAddIcon /></div>
            </div>
        </div>
    );
}

