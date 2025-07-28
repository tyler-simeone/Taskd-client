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
                        <div style={{display: "flex", marginTop: 8.5, marginLeft: 2, fontSize: 18, lineHeight: "22px", color: "#a7a7a7"}}>
                            <p style={{margin: "0px 8px", marginBottom: 0}}>/</p>
                            {!isEdit ? (
                                <p style={{marginBottom: 0}} onClick={handleEdit}>{boardName}</p>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <Input 
                                        id={"board-name"}
                                        value={updatedBoardName}
                                        handleChange={handleChange}
                                        style={{height: 34, marginTop: "-3.5px", marginBottom: 0}}
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