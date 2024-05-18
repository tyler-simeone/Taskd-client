import React, { useState, useEffect } from "react"
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { ColumnAddTemplate } from "../column/ColumnAddTemplate";
import { TestData } from "../../TestData";
import './styles/Board.css';
import { columnsClient } from "../../api/columnsClient";

export const Board = ({ didMove, setDidMove, openAddTaskModal, openViewTaskModal, openAddColumnModal, openEditColumnModal, setError, rerender, handleRerender }) => {
    // const [columns, setColumns] = useState(TestData.Columns);
    const [columns, setColumns] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDrop = (newTask, destinationColumnId, sourceColumnId, position) => {
      const updatedColumns = [ ...columns ];

      const destinationColumn = updatedColumns.filter(col => col.columnId === destinationColumnId)[0];

      console.log("position: ", position);

      var updateTaskRequest = {
        userId: 1,
        taskId: newTask.taskId,
        columnId: destinationColumn.columnId,
        taskName: newTask.taskName,
        taskDescription: newTask.taskDescription
      };
      tasksClient.updateTask(updateTaskRequest)
        .then(() => handleRerender())
        .catch(err => handleError(err, setError));
    };

    const useCustomDrop = (destinationColumnId) => {
      return useDrop({
        accept: 'CARD',
        hover: (item, monitor) => {
          // Called when a draggable item is hovered over the drop target
          // Perform any hover-related actions here
          setDidMove(true);
        },
        drop: (draggedItem, monitor) => {
          const { task, sourceColumnId } = draggedItem;
          console.log("draggedItem: ", draggedItem);

          // const draggedPosition = monitor.didDrop() ? monitor.getDropResult().index : columns.filter(col => col.columnId === sourceColumnId).length;
          handleDrop(task, destinationColumnId, sourceColumnId);
          
          // columns.forEach(c => console.log("from within drop hook... ", c.tasks.length));
          console.log("monitor.didDrop(): ", monitor.didDrop());
          console.log("monitor.getDropResult(): ", monitor.getDropResult());  
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
          didDrop: monitor.didDrop(),
          dropResult: monitor.getDropResult(),
        }),
      });
    };

    const loadColumns = () => {
      setError();
      setIsLoading(true);

      columnsClient.getColumns(1, 1)
        .then(resp => {
          setColumns(resp.columns);
          setIsLoading(false);
          handleRerender();
        })
        .catch(err => {
            setIsLoading(false);
            handleError(err, setError);
        });
  }

  useEffect(() => {
    console.log("rerender value: ", rerender);

    if (rerender === true) {
      setColumns();
      loadColumns();
    }
    else if (columns === undefined)
      loadColumns();
    }, [columns, rerender]);

    return (
        <div className="board--container">
            <div className="board">
                {columns !== undefined && columns.map(column => (
                    <Column 
                      key={column.columnId} 
                      column={column} 
                      useCustomDrop={useCustomDrop} 
                      didMove={didMove}
                      openAddTaskModal={openAddTaskModal}
                      openViewTaskModal={openViewTaskModal}
                      openEditColumnModal={openEditColumnModal}
                      setError={setError}
                      handleRerender={handleRerender}
                    />
                ))}
                <ColumnAddTemplate 
                  openAddColumnModal={openAddColumnModal}
                />
            </div>
        </div>
    );
}

