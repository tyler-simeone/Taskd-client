import React, { useState, useEffect } from "react"
import { Column } from "../column/Column";
import { TestData } from "../../TestData";
import './styles/Board.css';

export const Board = () => {
    return (
        <div className="board--container">
            <div className="board">
                <Column column={TestData.Columns[0]} />
                <Column column={TestData.Columns[1]} />
                <Column column={TestData.Columns[2]} />
                <Column column={TestData.Columns[3]} />
                <Column column={TestData.Columns[4]} />
            </div>
        </div>
    );
}

