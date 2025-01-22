import React, { useState, useContext, useEffect } from "react";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { boardsClient } from "../../api/boardClient";
import { TaskdLogo } from "../../controls/icons/TaskdLogo";
import { handleError } from "../../util/handleError";
import "./styles/Navigation.css"

export const Navigation = () => {
  const { 
    isAuthenticated,
    logout,
    userSession,
    boardId,
    setError,
    setSelectedBoardId,
    handleRerender,
    rerender,
    selectedBoardId 
  } = useContext(AppContext);

  const [boardOptions, setBoardOptions] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const loadBoardOptions = async () => {
    try {
        var resp = await boardsClient.getBoards(userSession.userId);

        const options = [];

        if (resp.boards.length > 0) {
            resp.boards.forEach(b => {
              var option = {
                id: b.boardId,
                label: b.boardName,
                value: b.boardId
              };
              options.push(option);
            });
            setBoardOptions(options);

            // if a board hasn't been loaded yet, set default
            if (!boardId) {
              setSelectedBoardId(options[0].value);
              setSelectedValue(options[0].value);
            }
            else {
              setSelectedBoardId(boardId);
              setSelectedValue(boardId);
            }
            handleRerender();
        }
        else {
          setBoardOptions([]);
          handleRerender();
        }
    } catch (err) {
        handleError(err, setError);
    }
  }

  useEffect(() => {
    if (boardId)
      setSelectedValue(boardId);

    if ((!boardOptions || rerender) && userSession)
      loadBoardOptions();
  }, [userSession, boardOptions, selectedValue, rerender, selectedBoardId])

  return (
    <div className="nav--container">
      <div className="nav">
        {isAuthenticated() && <TaskdLogo isAuthenticated={isAuthenticated} />}

        {isAuthenticated() && (
          <div style={{display: "flex"}}>
            <NavigationSelect 
                selectedValue={selectedValue} 
                options={boardOptions} 
            />

            <div className="logout-btn" onClick={logout}>
                <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}