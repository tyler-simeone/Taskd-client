import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { FilterIcon } from "../../../controls/icons/FilterIcon";
import { Select } from "../../../controls/inputs/Select";
import { PopoutMenuSearch } from "../popoutmenusearch/PopoutMenuSearch";
import { tagsClient } from "../../../api/tagsClient";
import { handleError } from "../../../util/handleError";
import "./BoardFilterPanel.css";

export const BoardFilterPanel = () => {
    const { boardId, userSession, setTagFilterCriteria } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false);
    const [popoutMenuValues, setPopoutMenuValues] = useState([]); 

    const handleClick = () => {
        setShowFilters(!showFilters);
    }

    const loadTags = () => {
        tagsClient.getTagsByBoardId(boardId, userSession.userId)
            .then(resp => {
                const popoutValues = [];
                resp.data.forEach(r => popoutValues.push({
                    value: r.tagName
                }));
                popoutValues.sort((a, b) => a.value.localeCompare(b.value));
                setPopoutMenuValues(popoutValues);
            })
            .catch(err => handleError(err))
    }

    useEffect(() => {
        if (popoutMenuValues.length === 0)
            loadTags();
    }, [])

    return (
        <div className="board-filter-panel--container">
            {showFilters && (
                // <Select 
                //     placeholder={"Filter Tags"}
                //     style={{display: "flex"}}
                // />
                <PopoutMenuSearch options={popoutMenuValues} />
            )}

            <FilterIcon onClick={handleClick} />
        </div>
    )
}