import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Link } from "react-router-dom";
import { Input } from "../inputs/Input";
import { boardsClient } from "../../api/boardClient";
import { handleError } from "../../util/handleError";

export const TaskdLogo = ({ isAuthenticated, boardName, isLink, style }) => {
    const { userSession, boardId, handleRerender, setError } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [updatedBoardName, setUpdatedBoardName] = useState(boardName);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEdit = () => setIsEdit(!isEdit);

    const handleChange = (evt) => {
        setError();
        let stateToChange = {...updatedBoardName};
        stateToChange = evt.target.value;
        setUpdatedBoardName(stateToChange);
    }

    const formIsValid = () => {
        if (!updatedBoardName.trim()) {
            setError("Board name is required.");
            return false;
        }
        return true;
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!formIsValid())
            return;

        setIsSubmitting(true);

        const editBoardNameRequestModel = {
            userId: userSession.userId,
            boardId: boardId,
            boardName: updatedBoardName
        };
        boardsClient.updateBoardName(editBoardNameRequestModel)
            .then(() => {
                handleEdit();
                handleRerender();
                setIsSubmitting(false);
            })
            .catch(err => handleError(err, setError));
    }

    useEffect(() => {
        console.log("isEdit: ", isEdit);
        setUpdatedBoardName(boardName);
    }, [isEdit])

    return (
        <div style={style} className="pb-logo">
            {isLink ? (
                <Link to={isAuthenticated ? "/board" : "/login"}>Task'd</Link>
            ) : (
                <div style={{display: "flex"}}>
                    <p>Task'd</p> 
                    
                    {/* Editable Board Name */}
                    {boardName && (
                        <div style={{display: "flex", marginTop: 8, marginLeft: 2, fontSize: 17.5, color: "#949494"}}>
                            <p style={{margin: "0px 8px"}}>/</p>
                            {!isEdit ? (
                                <p onClick={handleEdit}>{boardName}</p>
                            ) : (
                                // <form onSubmit={handleSubmit}>
                                <form onSubmit={handleSubmit} onMouseOut={handleEdit}>
                                    <Input 
                                        id={"board-name"}
                                        value={updatedBoardName}
                                        handleChange={handleChange}
                                        style={{height: 34, marginTop: "-3.5px"}}
                                    />
                                </form>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}