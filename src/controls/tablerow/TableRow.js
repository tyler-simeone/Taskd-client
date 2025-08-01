import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import PropTypes from 'prop-types';
import { MoreIcon } from '../icons/MoreIcon';
import './TableRow.css';

export const TableRow = ({ id, name, createdDate, moreIconValues }) => {
    

    // useEffect(() => {

    // }, [state]);

    return (
        <div
            className="table-row"
            style={{ 
                width: "100%",
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                paddingLeft: 0,
                borderBottom: '1px solid #ccc' 
            }}
        >
            <div className="table-cell" style={{ flex: 1 }}>{name}</div>
            <div className="table-cell" style={{ flex: 1 }}>{createdDate}</div>
            <div className="table-cell" style={{ flex: 1 }}>
                <MoreIcon options={moreIconValues} />
            </div>
        </div>
    );
};

TableRow.propTypes = {
    name: PropTypes.string.isRequired,
    // createdDate: PropTypes.string.isRequired
};