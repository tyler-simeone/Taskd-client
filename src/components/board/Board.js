import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { ColumnAddTemplate } from "../column/ColumnAddTemplate";
import { columnsClient } from "../../api/columnsClient";
import './styles/Board.css';

export const Board = ({ didMove, setDidMove }) => {
    const { rerender, handleRerender, setError, isAuthenticated, jwtToken } = useContext(AppContext); 
    
    const navigate = useNavigate();

    const [columns, setColumns] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDrop = (newTask, destinationColumnId, sourceColumnId, position) => {
      const updatedColumns = [ ...columns ];

      const destinationColumn = updatedColumns.filter(col => col.columnId === destinationColumnId)[0];

      console.log("destinationColumn: ", destinationColumn);

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
          console.log("hi from hover...");
        },
        drop: (draggedItem, monitor) => {
          const { task, sourceColumnId } = draggedItem;
          console.log("draggedItem: ", draggedItem);

          // const draggedPosition = monitor.didDrop() ? monitor.getDropResult().index : columns.filter(col => col.columnId === sourceColumnId).length;
          
          handleDrop(task, destinationColumnId, sourceColumnId);
          
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

      columnsClient.getColumns(1, 1, jwtToken)
        .then(resp => {
          setColumns(resp.columns);
          handleRerender();
        })
        .catch(err => handleError(err, setError))
        .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (!isAuthenticated()) 
      navigate('/login');

    if (rerender === true) {
      setColumns();
      loadColumns();
    } else if (columns === undefined)
      loadColumns();
    }, [columns, rerender]);

    return (
        <div className="board--container">
            <div className="board">
              <div className="board-wrapper">
                {columns !== undefined && columns.map(column => (
                    <Column 
                      key={column.columnId} 
                      column={column} 
                      useCustomDrop={useCustomDrop} 
                      didMove={didMove} 
                      isLast={(columns.length > 1 && column.columnId === columns[columns.length-1].columnId)}
                      isOnly={columns.length === 1}
                    />
                ))}
              </div>
              <ColumnAddTemplate />
            </div>
        </div>
    );
}

