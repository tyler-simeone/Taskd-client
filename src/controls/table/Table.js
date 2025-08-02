import React, { useState, useEffect, useContext } from 'react';
import { TableRow }  from "../../controls/table/TableRow";

export const Table = ({ rowItems, moreIconProps }) => {
    
    useEffect(() => {

    }, []);

    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {rowItems && rowItems.map((item, idx) => (
                <li key={idx}>
                    <TableRow
                        id={item.boardId}
                        name={item.boardName}
                        // createdDate={item.createdDate}
                        moreIconProps={moreIconProps}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Table;