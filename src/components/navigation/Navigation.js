import React, { useState, useContext, useEffect } from "react";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { boardsClient } from "../../api/boardClient";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { handleError } from "../../util/handleError";
import "./Navigation.css"

export const Navigation = () => {
  const { isAuthenticated, logout, userSession, boardId, setError, setSelectedBoardId, handleRerender, rerender, selectedBoardId } = useContext(AppContext);

  const [boardOptions, setBoardOptions] = useState();
  const [selectedValue, setSelectedValue] = useState();
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

          // if a board hasn't been loaded yet, set default
          if (boardId === null) {
            setSelectedBoardId(options[0].value);
            setSelectedValue(options[0].value);
          }
          else {
            setSelectedBoardId(boardId);
            setSelectedValue(boardId);
          }
          
          // const selectedBoardId = boardId !== null ? boardId : options[0].value;
          // setSelectedBoardId(selectedBoardId);
          // setDefaultValue(selectedBoardId);
          handleRerender();
        }
      })
      .catch(err => handleError(err, setError));
  }

  useEffect(() => {
    console.log("selectedBoardId: ", boardId);
    console.log("selectedValue: ", selectedValue);
    console.log("defaultValue: ", defaultValue);

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