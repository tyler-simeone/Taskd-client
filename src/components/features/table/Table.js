import React, { useState, useEffect, useContext } from 'react';
import { TableRow }  from "./TableRow";
import "./Table.css";

export const Table = ({ rowItems, moreIconProps }) => {
    
    useEffect(() => {

    }, []);

    return (
        <div className='table-container'>
            <ul style={{ listStyleType: 'none', margin: "0 auto", padding: 0 }}>
                {rowItems && rowItems.map((item, idx) => (
                    <li key={idx}>
                        <TableRow
                            id={item.boardId}
                            name={item.boardName}
                            // createdDate={item.createdDate}
                            moreIconProps={moreIconProps}
                            className={idx === rowItems.length - 1 ? "last" : ""}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Table;