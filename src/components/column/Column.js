import React, { useState, useEffect } from "react"
import './styles/Column.css';

export const Column = ({ column }) => {
    return (
        <div className="column--container">
            <div className="column--header">
                {column.columnName}
            </div>

            <div className="column--body">

            </div>
        </div>
    );
}

