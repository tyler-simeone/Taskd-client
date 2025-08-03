import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { boardsClient } from '../../api/boardClient';
import { Table } from '../features/table/Table';

export const Boards = () => {
    const { 
        userSession,
        setError,
        setIsLoading,
        handleRerender,
        handleError,
        closeDeleteConfirmationModalOnDelete
    } = useContext(AppContext);

    const [boards, setBoards] = useState();

    const loadBoards = async () => {
        try {
            const response = await boardsClient.getBoards(userSession.userId);
            setBoards(response.boards);
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    }

    const deleteBoard = async boardId => {
        setError();

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

    const [moreIconProps, setMoreIconProps] = useState({
        name: "deleteBoard",
        value: "Delete Board",
        deleteCallback: id => deleteBoard(id)
    });

    useEffect(() => {
        if (!boards) {
            loadBoards();
        }
    }, []);

    return (
        <div style={{ width: '60%', margin: "0 auto", padding: '46px', boxSizing: 'border-box' }}>
            <h2>Boards</h2>
            
            <Table
                rowItems={boards}
                moreIconProps={moreIconProps}
            />
        </div>
    );
};

export default Boards;