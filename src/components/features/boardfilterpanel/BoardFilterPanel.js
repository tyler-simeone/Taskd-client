import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { FilterIcon } from "../../../controls/icons/FilterIcon";
import { PopoutMenuSearch } from "../popoutmenusearch/PopoutMenuSearch";
import { tagsClient } from "../../../api/tagsClient";
import { handleError } from "../../../util/handleError";
import { stringHelper } from "../../../util/helpers/stringHelper";
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
    const [sessionFilterCriteria, setSessionFilterCriteria] = useState();

    const handleClick = () => {
        setShowFilters(!showFilters);
    }

    const buildTagFilterPlaceholder = () => {
        if (!filterCriteria)
            return;
        const tagFilterName = filterCriteria.sort((a, b) => a.tagName.localeCompare(b.tagName))[0]?.tagName;
        const additionalTagFilterCount = filterCriteria.length-1;
        
        if (tagFilterName) {
            if (additionalTagFilterCount !== 0)
                setTagFilterPlaceholder(`${tagFilterName} (+${additionalTagFilterCount})`);
            else
                setTagFilterPlaceholder(`${tagFilterName}`);
        } else {
            setTagFilterPlaceholder("No tags found");
        }
    }
    
    const handleToggleTagInFilterCriteria = (tagId, tagName) => {
        let persistedFilterCriteria = JSON.parse(sessionStorage.getItem("filterCriteria"));
        if (!persistedFilterCriteria || !Array.isArray(persistedFilterCriteria))
            persistedFilterCriteria = [];

        const updatedFilterCriteria = [...persistedFilterCriteria];
        //add
        if (!updatedFilterCriteria.find(c => c.tagId === tagId)) {
            const criteria = {
                tagId: tagId,
                tagName: tagName
            };
            updatedFilterCriteria.push(criteria);
        } else {
            //remove
            const existingTagIdx = updatedFilterCriteria.indexOf(updatedFilterCriteria.find(c => c.tagId === tagId));
            updatedFilterCriteria.splice(existingTagIdx, 1);
        }
        
        if (updatedFilterCriteria.length !== 0) {
            sessionStorage.setItem("filterCriteria", JSON.stringify(updatedFilterCriteria));
            setSessionFilterCriteria(updatedFilterCriteria);
            setFilterCriteria(updatedFilterCriteria);
            setBoardHasChanged(true);
            handleRerender();
        } else {
            sessionStorage.removeItem("filterCriteria");
            setSessionFilterCriteria();
            setFilterCriteria();
            setBoardHasChanged(true);
            handleRerender();
        }
    };

    const loadTags = () => {
        tagsClient.getTaskTagsByBoardId(boardId, userSession.userId)
            .then(resp => {
                const popoutValues = [];
                resp.data.forEach(r => popoutValues.push({
                    id: r.tagId,
                    value: r.tagName,
                    name: r.tagName,
                    onClick: () => handleToggleTagInFilterCriteria(r.tagId, r.tagName)
                }));
                stringHelper.sortStringList(popoutValues);
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
            // tags are selected
            if (!filterCriteria) {
                if (sessionFilterCriteria) {
                    if (sessionFilterCriteria.length === 0) {
                        setFilterCriteria();
                    } else {
                        setFilterCriteria(sessionFilterCriteria);
                    }
                }
            }
            else
                buildTagFilterPlaceholder();
        }
    }

    const clearFilters = () => {
        sessionStorage.removeItem("filterCriteria");
        setSessionFilterCriteria();
        setFilterCriteria();
        setBoardHasChanged(true);
        handleRerender();
    }

    useEffect(() => {
        if (!sessionFilterCriteria) {
            const storageCriteria = JSON.parse(sessionStorage.getItem("filterCriteria"));
            if (storageCriteria) {
                if (storageCriteria.length > 0) {
                    setSessionFilterCriteria(storageCriteria);
                } else {
                    sessionStorage.removeItem("filterCriteria");
                    setSessionFilterCriteria();
                }
            }
        }

        loadFilters();

        if (boardId && (boardIdHasChanged || (!popoutMenuValues || popoutMenuValues.length === 0))) {
            loadTags();
        }
    }, [popoutMenuValues, filterCriteria, boardIdHasChanged, sessionFilterCriteria])

    return (
        <div className="board-filter-panel--container">
            {(showFilters || filterCriteria) &&
                <PopoutMenuSearch 
                    label={"Filter Tags"}
                    options={popoutMenuValues} 
                    placeholder={filterCriteria && tagFilterPlaceholder && tagFilterPlaceholder}
                    selectedIds={filterCriteria && filterCriteria.map(c => c.tagId)}
                    showXIcon={filterCriteria}
                    handleClearFilters={clearFilters}
                />
            }

            <FilterIcon onClick={handleClick} />
        </div>
    )
}