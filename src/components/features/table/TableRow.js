import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../AppContextProvider';
import PropTypes from 'prop-types';
import { MoreIcon } from '../../../controls/icons/MoreIcon';
import './Table.css';

export const TableRow = ({ id, name, createdDate, moreIconProps, className }) => {
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
        <div className={`table-row ${className}`}>
            <div className="table-data" style={{ flex: 1 }}>
                <p>{name}</p>
            </div>
            <div className="table-data" style={{ flex: 1 }}>{createdDate}</div>
            <div className="table-data" style={{ flex: 1 }}>
                <MoreIcon options={moreIconValues} />
            </div>
        </div>
    );
};

TableRow.propTypes = {
    name: PropTypes.string.isRequired,
    // createdDate: PropTypes.string.isRequired
};