import React, { useState, useContext, useEffect } from "react";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { boardsClient } from "../../api/boardClient";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { handleError } from "../../util/handleError";
import "./Navigation.css"

export const Navigation = () => {
  const { isAuthenticated, logout, userSession, boardId, setError, setSelectedBoardId, handleRerender, rerender } = useContext(AppContext);

  const [boardOptions, setBoardOptions] = useState();
  const [defaultValue, setDefaultValue] = useState();

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

          if (boardId === null)
            setSelectedBoardId(options[0].value);
          
          const selectedBoardId = boardId !== null ? boardId : options[0].value;
          setDefaultValue(selectedBoardId);
          handleRerender();
        }
      })
      .catch(err => handleError(err, setError));
  }

  useEffect(() => {
    if ((boardOptions === undefined || rerender) && userSession !== undefined && userSession !== null)
      loadBoardOptions();
  }, [userSession, boardOptions, defaultValue, rerender])

  return (
    <div className="nav--container">
      <div className="nav">
        {isAuthenticated() && <ProjectBLogo isAuthenticated={isAuthenticated} />}

        {isAuthenticated() && (
          <div style={{display: "flex"}}>
            <NavigationSelect defaultValue={defaultValue} options={boardOptions} />
            <div className="logout-btn" onClick={logout}><span>Logout</span></div>
          </div>
        )}
      </div>
    </div>
  );
}