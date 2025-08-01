import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { boardsClient } from '../../api/boardClient';
import { TableRow }  from "../../controls/tablerow/TableRow";

export const Boards = () => {
    const { 
        userSession,
        setError,
        setIsLoading,
        handleRerender,
        handleError,
        openDeleteConfirmationModal,
        closeDeleteConfirmationModalOnDelete
    } = useContext(AppContext);

    const [items, setItems] = useState();

    const loadBoards = async () => {
        try {
            const response = await boardsClient.getBoards(userSession.userId);
            setItems(response.boards);
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    }

    const [moreIconValues, setMoreIconValues] = useState([
        {
            name: "deleteBoard",
            value: "Delete Board",
            callback: () => console.log("Board deleted!")
            // callback: () => openDeleteConfirmationModal({resourceName: name, resourceId: id, callback: () => deleteBoard(column.columnId)})
        }
    ]);

    const deleteBoard = async boardId => {
        setError();
        setIsLoading(true);

        try {
            var resp = await boardsClient.deleteBoard(boardId, userSession.userId);
            if (resp)
                handleRerender();
        } catch (err) {
            handleError(err, setError);
        } finally {
            setIsLoading(false);
            handleRerender();
            closeDeleteConfirmationModalOnDelete();
        }
    }

    useEffect(() => {
        if (!items)
            loadBoards();
    }, []);

    return (
        <div style={{ width: '60%', margin: "0 auto", padding: '46px', boxSizing: 'border-box' }}>
            <h2>Boards</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items && items.map((item, idx) => (
                    <li key={idx}>
                        <TableRow
                            id={item.boardId}
                            name={item.boardName}
                            // createdDate={item.createdDate}
                            moreIconValues={moreIconValues}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Boards;