import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';
import PropTypes from 'prop-types';
import { MoreIcon } from '../icons/MoreIcon';
import './TableRow.css';

export const TableRow = ({ name, createdDate, thirdColumn }) => {
    // const {} = useContext(AppContext);
    const [state, setState] = useState(false);

    const toggleState = () => {
        setState(!state);
    };

    useEffect(() => {

    }, [state]);

    return (
        <div
            className="table-row"
            style={{ width: "100%", display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}
            onClick={toggleState}
        >
            <div className="table-cell" style={{ flex: 1 }}>{name}</div>
            <div className="table-cell" style={{ flex: 1 }}>{createdDate}</div>
            <div className="table-cell" style={{ flex: 1 }}>
                <MoreIcon />
            </div>
        </div>
    );
};

TableRow.propTypes = {
    name: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired
};