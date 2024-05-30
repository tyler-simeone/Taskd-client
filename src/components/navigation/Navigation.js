import React, { useState, useContext, useEffect } from "react";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { boardsClient } from "../../api/boardClient";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { handleError } from "../../util/handleError";
import "./Navigation.css"

export const Navigation = () => {
  const { isAuthenticated, logout, userSession, setError, setBoardId } = useContext(AppContext);

  const [boardOptions, setBoardOptions] = useState();
  const [defaultValue, setDefaultValue] = useState();

  const loadBoards = () => {
    boardsClient.getBoards(userSession.userId)
      .then(resp => {
        console.log("boards resp: ", resp);
        const options = [];
        resp.boards.forEach(b => {
          var option = {
            id: b.boardId,
            label: b.boardName,
            value: b.boardId
          };
          options.push(option);
        });
        setBoardOptions(options);
        setDefaultValue(options[0].value);
        setBoardId(options[0].id);
      })
      .catch(err => handleError(err, setError));
  }

  useEffect(() => {
    if (boardOptions === undefined && userSession !== undefined && userSession !== null)
      loadBoards();
  }, [userSession, boardOptions, defaultValue])

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