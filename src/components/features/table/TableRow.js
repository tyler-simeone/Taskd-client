import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../AppContextProvider';
import PropTypes from 'prop-types';
import { MoreIcon } from '../../../controls/icons/MoreIcon';
import './TableRow.css';

export const TableRow = ({ id, name, createdDate, moreIconProps }) => {
    const {
        openDeleteConfirmationModal,
        deleteConfirmed
    } = useContext(AppContext);

    const [moreIconValues, setMoreIconValues] = useState([
        // Delete option
        {
            name: moreIconProps.name,
            value: moreIconProps.value,
            callback: () => openDeleteConfirmationModal({
                resourceName: name, 
                resourceId: id, 
                callback: () => moreIconProps.deleteCallback(id)
            })
        }
    ]);

    useEffect(() => {
        if (deleteConfirmed) {
            moreIconProps.deleteCallback(id);
        }
    }, [deleteConfirmed]);

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
                    fontSize: '16px',
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