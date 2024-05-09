import React, { useState, useEffect } from "react"
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { TestData } from "../../TestData";
import './styles/Board.css';

export const Board = () => {
    const [columns, setColumns] = useState(TestData.Columns);
    
    const handleDrop = (newTask, columnName, sourceColumnId) => {
      const updatedColumns = [ ...columns ];

      // always take first result bc never duplicate column names
      const targetColumn = updatedColumns.filter(col => col.columnName === columnName)[0];

      targetColumn.tasks.push(newTask)
      updatedColumns[updatedColumns.findIndex(col => col.columnId === targetColumn.columnId)] = targetColumn;
      
      var sourceColumnIdx = updatedColumns.findIndex(col => col.columnId === sourceColumnId);
      var sourceColumn = updatedColumns[sourceColumnIdx];

      var sourceTaskIdx = sourceColumn.tasks.findIndex(col => col.taskId === newTask.taskId);
      sourceColumn.tasks.splice(sourceTaskIdx, 1);
      updatedColumns[sourceColumnIdx] = sourceColumn;

      setColumns(updatedColumns);
    };

    const useCustomDrop = (columnName) => {
      return useDrop({
        accept: 'CARD',
        drop: (droppedItem) => handleDrop(droppedItem.task, columnName, droppedItem.sourceColumnId),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      });
    };

    useEffect(() => {
      console.log("useEffect!");
    }, [columns]);

    return (
        <div className="board--container">
            <div className="board">
                {columns.map(column => (
                    <Column 
                      key={column.columnId} 
                      column={column} 
                      useCustomDrop={useCustomDrop} 
                    />
                ))}
            </div>
        </div>
    );
}

