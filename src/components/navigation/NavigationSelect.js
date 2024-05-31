import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import { Select } from "../controls/inputs/Select";
import "./NavigationSelect.css"

export const NavigationSelect = ({ defaultValue, options }) => {
    const { boardId, setSelectedBoardId, handleRerender } = useContext(AppContext);

    const handleSelectChange = (boardId) => {
        setSelectedBoardId(boardId);
        handleRerender();
    }

    useEffect(() => {
        console.log("NavigationSelect boardId: ", boardId);
        // initial load -- set the default as the first loaded board
        if (boardId === null)
            setSelectedBoardId(defaultValue);
    }, [])

    return (
        <div className="nav-select">
            <Select
                label={""}
                index={0}
                options={options}
                name={"nav-select"}
                handleSelectChange={handleSelectChange}
                value={boardId}
                placeholder={"No boards yet"}
                // selectedOption={options && boardId && options.find(o => o.id === boardId)}
            />
        </div>
    );
}