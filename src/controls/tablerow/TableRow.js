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
                padding: '16px',
                paddingLeft: 0,
                borderBottom: '1px solid #dbdbdb' 
            }}
        >
            <div className="table-cell" style={{ flex: 1 }}>
                <p style={{
                    margin: 0,
                    fontSize: '15.5px',
                    fontWeight: 'bold',
                    color: '#282828',
                    cursor: 'pointer',
                    textDecoration: 'none'
                }}>{name}</p>
            </div>
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