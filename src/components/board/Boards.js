import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { boardsClient } from '../../api/boardClient';

export const Boards = () => {
    const { userSession } = useContext(AppContext);
    const [items, setItems] = useState();

    const loadBoards = async () => {
        try {
            const response = await boardsClient.getBoards(userSession.userId);
            setItems(response.boards);
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    }

    useEffect(() => {
        if (!items)
            loadBoards();
    }, []);

    return (
        <div>
            <h2>Boards</h2>
            <ul>
                {items && items.map((item, idx) => (
                    <li key={idx}>{item.boardName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Boards;