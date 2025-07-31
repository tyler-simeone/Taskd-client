import React, { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { boardsClient } from "../../api/boardClient";
import { tagsClient } from "../../api/tagsClient";
import { handleError } from "../../util/handleError";
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { ColumnAddTemplate } from "../column/ColumnAddTemplate";
import { BoardAddTemplate } from "./BoardAddTemplate";
import { BoardFilterPanel } from "../features/boardfilterpanel/BoardFilterPanel";
import './styles/Board.css';

export const Board = ({ didMove, setDidMove }) => {
    const { 
      rerender,
      handleRerender,
      setError,
      isAuthenticated,
      userSession,
      boardId,
      columnAdded,
      handleColumnAdded,
      taskTags,
      setTaskTags,
      boardHasChanged,
      boardIdHasChanged,
      setBoardHasChanged,
      setBoardIdHasChanged,
      setBoardName,
      taskTagsHaveChanged,
      setTaskTagsHaveChanged,
      openViewTaskModal,
      openEditTaskModal
    } = useContext(AppContext); 
    
    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const [columns, setColumns] = useState();
    const [droppedColumnId, setDroppedColumnId] = useState();
    const [droppedTaskId, setDroppedTaskId] = useState();
    // const [sourceColumnId, setSourceColumnId] = useState();
    const [board, setBoard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDrop = (newTask, destinationColumnId, sourceColumnId, position) => {
      const updatedColumns = [ ...columns ];

      const destinationColumn = updatedColumns.filter(col => col.columnId === destinationColumnId)[0];

      // console.log("destinationColumn: ", destinationColumn);

      var payload = {
        userId: userSession.userId,
        taskId: newTask.taskId,
        columnId: destinationColumn.columnId
      };
      tasksClient.dropTask(payload)
        .then(() => {
          // console.log("task dropped!");
          setDroppedColumnId(destinationColumnId);
          setDroppedTaskId(newTask.taskId);
          handleRerender();
        })
        .catch(err => handleError(err, setError));
    };

    const useCustomDrop = (destinationColumnId) => {
      return useDrop({
        accept: 'CARD',
        hover: (item, monitor) => {
          // Called when a draggable item is hovered over the drop target
          // Perform any hover-related actions here
          setDidMove(true);
          // console.log("hi from hover...");
        },
        drop: (draggedItem, monitor) => {
          const { task, sourceColumnId } = draggedItem;
          // console.log("draggedItem: ", draggedItem);

          // const draggedPosition = monitor.didDrop() ? monitor.getDropResult().index : columns.filter(col => col.columnId === sourceColumnId).length;
          
          handleDrop(task, destinationColumnId, sourceColumnId);
          
          // console.log("monitor.didDrop(): ", monitor.didDrop());
          // console.log("monitor.getDropResult(): ", monitor.getDropResult());  
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
          didDrop: monitor.didDrop(),
          dropResult: monitor.getDropResult(),
        }),
      });
    };

    const loadBoard = async (boardId) => {
      setError();
      setIsLoading(true);

      try {
          var board = await boardsClient.getBoard(boardId, userSession.userId);
          if (board && board.columns) {
            setBoard(board);
            setBoardName(board.boardName);
            setColumns(board.columns);
            if (columnAdded)
              handleColumnAdded();
            setBoardIdHasChanged(false);

            const taskId = query.get("taskId");
            const view = query.get("view");
            if (taskId && !view) {
              openViewTaskModal(taskId);
            } else if (taskId && view === "edit") {
              openEditTaskModal(taskId);
            }
          } 
      } catch (err) {
          handleError(err, setError);
      } finally {
          setIsLoading(false);
      }
    }
    
    const loadBoardTags = async (boardId) => {
      setError();
      setIsLoading(true);

      try {
          var taskTags = await tagsClient.getTaskTagsByBoardId(boardId, userSession.userId);
          if (taskTags && taskTags.data) {
            setTaskTags(taskTags.data);
            setTaskTagsHaveChanged(false);
          }
      } catch (err) {
          handleError(err, setError)
      } finally {
          setIsLoading(false)
      }
    }

  useEffect(() => {
    // console.log("rerender: ", rerender);
    // console.log("boardHasChanged: ", boardHasChanged);

    if (!isAuthenticated()) 
      navigate('/oauth/login');
    
    if (boardId && (!board || boardHasChanged || boardIdHasChanged || taskTagsHaveChanged)) {
      loadBoard(boardId);
    }

    if (boardHasChanged)
      setBoardHasChanged(false);
  }, [boardHasChanged, boardIdHasChanged, rerender, board, boardId, droppedColumnId, columnAdded, taskTags]);

  useEffect(() => {
    if (boardId && board && (!taskTags || taskTagsHaveChanged || boardIdHasChanged)) {
      loadBoardTags(boardId);
    }
  }, [board, boardIdHasChanged, taskTagsHaveChanged]);

    return (
        <div className="board--container">
          <BoardFilterPanel />

          <div className="board">
              {columns && columns.map(column => (
                  <Column 
                    key={column.columnId} 
                    column={column} 
                    useCustomDrop={useCustomDrop} 
                    didMove={didMove}
                    droppedColumnId={droppedColumnId}
                    droppedTaskId={droppedTaskId}
                    setDroppedColumnId={setDroppedColumnId}
                    setDroppedTaskId={setDroppedTaskId}
                    isLast={(columns.length > 1 && column.columnId === columns[columns.length-1].columnId)}
                    isOnly={columns.length === 1}
                  />
              ))}

            {/* {isLoading ? null : boardId && columns ? <ColumnAddTemplate /> : <BoardAddTemplate />} */}
            {boardId && columns ? 
              <ColumnAddTemplate /> : <BoardAddTemplate />}
          </div>
        </div>
    );
}

