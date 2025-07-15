import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { FilterIcon } from "../../../controls/icons/FilterIcon";
import { PopoutMenuSearch } from "../popoutmenusearch/PopoutMenuSearch";
import { tagsClient } from "../../../api/tagsClient";
import { handleError } from "../../../util/handleError";
import "./BoardFilterPanel.css";

export const BoardFilterPanel = () => {
    const { boardId,
            boardIdHasChanged,
            userSession,
            setError,
            setBoardHasChanged,
            handleRerender } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false);
    const [popoutMenuValues, setPopoutMenuValues] = useState();
    const [filterCriteria, setFilterCriteria] = useState();
    const [tagFilterPlaceholder, setTagFilterPlaceholder] = useState();

    const handleClick = () => {
        setShowFilters(!showFilters);
    }

    const buildTagFilterPlaceholder = () => {
        const tagFilterName = filterCriteria.sort((a, b) => a.tagName.localeCompare(b.tagName))[0]?.tagName;
        const additionalTagFilterCount = filterCriteria.length-1;
        if (additionalTagFilterCount !== 0)
            return `${tagFilterName} (+${additionalTagFilterCount})`
        return `${tagFilterName}`
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
        setBoardHasChanged(true);
        handleRerender();
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

    const loadFilters = () => {
        if (boardIdHasChanged) {
            sessionStorage.removeItem("filterCriteria");
            setFilterCriteria();
            setTagFilterPlaceholder();
        } else {
            if (!filterCriteria) {
                const sessionFilterCriteria = JSON.parse(sessionStorage.getItem("filterCriteria"));
                if (sessionFilterCriteria)
                    setFilterCriteria(sessionFilterCriteria);
            }
            else
                setTagFilterPlaceholder(buildTagFilterPlaceholder());
        }
    }

    useEffect(() => {
        loadFilters();

        if (boardId && (!popoutMenuValues || popoutMenuValues.length === 0)) {
            loadTags();
        }
    }, [popoutMenuValues, filterCriteria, boardIdHasChanged])

    return (
        <div className="board-filter-panel--container">
            {(showFilters || filterCriteria) &&
                <PopoutMenuSearch 
                    options={popoutMenuValues} 
                    placeholder={filterCriteria && tagFilterPlaceholder &&
                        tagFilterPlaceholder
                    } 
                />
            }

            <FilterIcon onClick={handleClick} />
        </div>
    )
}