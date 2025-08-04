import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../AppContextProvider";
import { useNavigate } from "react-router-dom";
import { Input } from "../inputs/Input";
import { boardsClient } from "../../api/boardClient";
import { handleError } from "../../util/handleError";

export const TaskdLogo = ({ isAuthenticated, boardName, isLink, style }) => {
    const { userSession, boardId, handleRerender, setError } = useContext(AppContext);

    const inputRef = useRef(null);

    const navigate = useNavigate();

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

    const navigateToBoard = () => {
        if (isAuthenticated) {
            navigate("/board");
        } else {
            navigate("/login");
        }
    }

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsEdit(false);
        }
    };

    useEffect(() => {
        setUpdatedBoardName(boardName);

        if (isEdit) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
        };
    }, [isEdit])

    return (
        <div style={style} className="pb-logo">
            <div style={{display: "flex"}}>
                <p onClick={() => isLink && navigateToBoard()}>Task'd</p> 
                
                {/* Editable Board Name */}
                {boardName && (
                    // <div style={{display: "flex", marginTop: 8.5, marginLeft: 2, fontSize: 18, lineHeight: "22px", color: "#a7a7a7"}}>
                    <div style={{display: "flex", marginTop: 8.5, marginLeft: 2, fontSize: 18, lineHeight: "22px", color: "#a6a7a8"}}>
                        <p style={{margin: "0px 8px", marginBottom: 0}}>/</p>
                        {!isEdit ? (
                            <p style={{marginBottom: 0}} onClick={handleEdit}>{boardName}</p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <Input 
                                    id={"board-name"}
                                    value={updatedBoardName}
                                    handleChange={handleChange}
                                    style={{height: 30, marginTop: -2, marginBottom: 0}}
                                    ref={inputRef}
                                />
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}