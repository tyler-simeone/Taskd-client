import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import { Select } from "../controls/inputs/Select";
import "./NavigationSelect.css"

export const NavigationSelect = ({ selectedValue, options }) => {
    const { boardId, setSelectedBoardId, handleRerender } = useContext(AppContext);

    const handleSelectChange = (boardId) => {
        setSelectedBoardId(boardId);
        handleRerender();
    }

    useEffect(() => {        
        // initial load -- set the default as the first loaded board
        if (!boardId)
            setSelectedBoardId(selectedValue);
    }, [selectedValue])

    return (
        <div className="nav-select">
            <Select
                label={""}
                index={0}
                options={options}
                name={"nav-select"}
                handleSelectChange={handleSelectChange}
                value={selectedValue}
                placeholder={"No boards yet"}
                // selectedOption={options && boardId && options.find(o => o.id === boardId)}
            />
        </div>
    );
}