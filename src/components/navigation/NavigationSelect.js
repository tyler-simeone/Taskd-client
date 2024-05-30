import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import { Select } from "../controls/inputs/Select";
import "./NavigationSelect.css"

export const NavigationSelect = ({ defaultValue, options }) => {
    const { setBoardId, handleRerender, boardId } = useContext(AppContext);

    const handleSelectChange = (boardId) => {
        setBoardId(boardId);
        handleRerender();
    }

    useEffect(() => {
        // initial load
        setBoardId(defaultValue);
    }, [])

    return (
        <div className="nav-select">
            <Select
                label={""}
                index={0}
                options={options}
                name={"nav-select"}
                handleSelectChange={handleSelectChange}
                // selectedOption={options && boardId && options.find(o => o.id === boardId)}
            />
        </div>
    );
}