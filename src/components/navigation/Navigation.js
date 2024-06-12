import React, { useState, useContext, useEffect } from "react";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { boardsClient } from "../../api/boardClient";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { handleError } from "../../util/handleError";
import "./Navigation.css"

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

  const loadBoardOptions = () => {
    boardsClient.getBoards(userSession.userId)
      .then(resp => {
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
          if (boardId === null) {
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
      })
      .catch(err => handleError(err, setError));
  }

  useEffect(() => {
    if (boardId !== null)
      setSelectedValue(boardId);

    if ((boardOptions === undefined || rerender) && userSession !== undefined && userSession !== null)
      loadBoardOptions();
  }, [userSession, boardOptions, selectedValue, rerender, selectedBoardId])

  return (
    <div className="nav--container">
      <div className="nav">
        {isAuthenticated() && <ProjectBLogo isAuthenticated={isAuthenticated} />}

        {isAuthenticated() && (
          <div style={{display: "flex"}}>
            <NavigationSelect selectedValue={selectedValue} options={boardOptions} />
            <div className="logout-btn" onClick={logout}><span>Logout</span></div>
          </div>
        )}
      </div>
    </div>
  );
}