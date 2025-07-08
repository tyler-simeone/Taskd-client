import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { FilterIcon } from "../../../controls/icons/FilterIcon";
import { Select } from "../../../controls/inputs/Select";
import { PopoutMenuSelectSearch } from "../popoutmenuselectsearch/PopoutMenuSelectSearch";
import "./BoardFilterPanel.css";

export const BoardFilterPanel = () => {
    const { boardId, setTagFilterCriteria } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false);
    const [popoutMenuValues, setPopoutMenuValues] = useState([
        {
            name: "editColumn",
            value: "Edit Column",
            // callback: () => openEditColumnModal(column.columnId)
        }
    ]); 

    const handleClick = () => {
        setShowFilters(!showFilters);
    }

    useEffect(() => {
        console.log("hi from board filter panel");
    }, [])

    return (
        <div className="board-filter-panel--container">
            {showFilters && (
                // <Select 
                //     placeholder={"Filter Tags"}
                //     style={{display: "flex"}}
                // />
                <PopoutMenuSelectSearch options={popoutMenuValues} />
            )}

            <FilterIcon onClick={handleClick} />
        </div>
    )
}