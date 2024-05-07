import React, { useState, useEffect } from "react"
import { Column } from "../column/Column";
import { TestData } from "../../TestData";
import './styles/Board.css';

export const Board = () => {
    const [columns, setColumns] = useState(TestData.Columns);
    
      const handleDrop = (cardId, columnId) => {
        const updatedColumns = columns.map(column => {
          if (column.id === columnId) {
            return {
              ...column,
              cards: [...column.cards, { id: cardId, text: `Task ${cardId}` }]
            };
          } else {
            return column;
          }
        });
    
        setColumns(updatedColumns);
      };

    return (
        <div className="board--container">
            <div className="board">
                {columns.map(column => (
                    <Column key={column.columnId} column={column} onDrop={handleDrop} />
                ))}
            </div>
        </div>
    );
}

