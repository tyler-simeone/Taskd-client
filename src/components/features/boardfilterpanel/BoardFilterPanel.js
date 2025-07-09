import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { FilterIcon } from "../../../controls/icons/FilterIcon";
import { Select } from "../../../controls/inputs/Select";
import { PopoutMenuSearch } from "../popoutmenusearch/PopoutMenuSearch";
import { tagsClient } from "../../../api/tagsClient";
import { handleError } from "../../../util/handleError";
import "./BoardFilterPanel.css";

export const BoardFilterPanel = () => {
    const { boardId, userSession, tagFilterCriteria, setTagFilterCriteria, setError } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false);
    const [popoutMenuValues, setPopoutMenuValues] = useState();
    const [filterCriteria, setFilterCriteria] = useState();

    const handleClick = () => {
        setShowFilters(!showFilters);
    }
    
    const handleAddToTagFilterCriteria = (tagId, tagName) => {
        let persistedFilterCriteria = JSON.parse(sessionStorage.getItem("filterCriteria"));
        if (!persistedFilterCriteria || !Array.isArray(persistedFilterCriteria))
            persistedFilterCriteria = [];

        const updatedFilterCriteria = [...persistedFilterCriteria];
        if (!updatedFilterCriteria.find(c => c.tagId === tagId)) {
            const criteria = {
                tagId: tagId,
                tagName: tagName
            };
            updatedFilterCriteria.push(criteria)
        }

        // console.log("updatedFilterCriteria: ", updatedFilterCriteria);
        sessionStorage.setItem("filterCriteria", JSON.stringify(updatedFilterCriteria));
        setFilterCriteria(updatedFilterCriteria);
    };

    const loadTags = () => {
        tagsClient.getTagsByBoardId(boardId, userSession.userId)
            .then(resp => {
                const popoutValues = [];
                resp.data.forEach(r => popoutValues.push({
                    value: r.tagName,
                    name: r.tagName,
                    onClick: () => handleAddToTagFilterCriteria(r.tagId, r.tagName)
                }));
                popoutValues.sort((a, b) => a.value.localeCompare(b.value));
                setPopoutMenuValues(popoutValues);
            })
            .catch(err => handleError(err, setError))
    }

    useEffect(() => {
        if (!filterCriteria)
            setFilterCriteria(JSON.parse(sessionStorage.getItem("filterCriteria")));

        if (!popoutMenuValues || popoutMenuValues.length === 0)
            loadTags();
    }, [filterCriteria])

    return (
        <div className="board-filter-panel--container">
            {showFilters &&
                <PopoutMenuSearch 
                    options={popoutMenuValues} 
                    placeholder={filterCriteria && 
                        `${filterCriteria.sort((a, b) => a.tagName.localeCompare(b.tagName))[0]?.tagName} (+${[filterCriteria.length-1]})`} 
                />}

            <FilterIcon onClick={handleClick} />
        </div>
    )
}