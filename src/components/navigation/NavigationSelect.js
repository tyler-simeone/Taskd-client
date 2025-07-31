import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import { Select } from "../../controls/inputs/Select";
import "./styles/NavigationSelect.css"

export const NavigationSelect = ({ selectedValue, options }) => {
    const { boardId, setSelectedBoardId, handleRerender, rerender } = useContext(AppContext);

    const handleSelectChange = (boardId) => {
        setSelectedBoardId(boardId);
        handleRerender();
    }

    useEffect(() => {
        // console.log("rerender from board selector: ", rerender);
        
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
                style={{border: "1.5px solid rgb(0 0 0 / 12%)", padding: 7.5}}
            />
        </div>
    );
}