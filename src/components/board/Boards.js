import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import { boardsClient } from '../../api/boardClient';
import { TableRow }  from "../../controls/tablerow/TableRow";

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
        <div style={{ width: '60%', margin: "0 auto", padding: '46px', boxSizing: 'border-box' }}>
            <h2>Boards</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items && items.map((item, idx) => (
                    <li key={idx}>
                        <TableRow
                            name={item.boardName}
                            // createdDate={item.createdDate}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Boards;