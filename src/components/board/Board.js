import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { boardsClient } from "../../api/boardClient";
import { tagsClient } from "../../api/tagsClient";
import { handleError } from "../../util/handleError";
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { ColumnAddTemplate } from "../column/ColumnAddTemplate";
import { BoardAddTemplate } from "./BoardAddTemplate";
import { PbAddIcon } from "../../controls/icons/AddIcon";
import './styles/Board.css';

export const Board = ({ didMove, setDidMove }) => {
    const { 
      rerender,
      handleRerender,
      setError,
      isAuthenticated,
      userSession,
      boardId,
      openAddBoardModal,
      openAddTagModal,
      columnAdded,
      handleColumnAdded,
      taskTags,
      setTaskTags,
      boardIdHasChanged,
      setBoardIdHasChanged,
      taskTagsHaveChanged,
      setTaskTagsHaveChanged
    } = useContext(AppContext); 
    
    const navigate = useNavigate();

    const [columns, setColumns] = useState();
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
            setColumns(board.columns);
            if (columnAdded)
              handleColumnAdded();
            setBoardIdHasChanged(false);
          }
      } catch (err) {
          handleError(err, setError)
      } finally {
          setIsLoading(false)
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
    if (!isAuthenticated()) 
      navigate('/oauth/login');

    if (boardId && (!board || boardIdHasChanged || taskTagsHaveChanged)) {
      loadBoard(boardId);
    }
  }, [boardIdHasChanged, rerender, board, boardId, columnAdded, taskTags]);

  useEffect(() => {
    if (boardId && board && (!taskTags || taskTagsHaveChanged || boardIdHasChanged)) {
      loadBoardTags(boardId);
    }
  }, [board, boardIdHasChanged, taskTagsHaveChanged]);

    return (
        <div className="board--container">
          <div className="board-name--container">
            <div style={{ display: "flex" }}>
              <h2 className="board-name">
                {board && board.boardName}
              </h2>

              <div className="board-action-btns--container">
                <div className="add-new-board--btn" onClick={openAddBoardModal}>
                  <span className="add-new-board--lbl">Add new board</span>
                  <PbAddIcon classname={"board"} />
                </div>
                <div className="add-new-board--btn" onClick={openAddTagModal}>
                  <span className="add-new-board--lbl">Add new tag</span>
                  <PbAddIcon classname={"board"} />
                </div>
              </div>
            </div>
          </div>

          <div className="board">
              {columns && columns.map(column => (
                  <Column 
                    key={column.columnId} 
                    column={column} 
                    useCustomDrop={useCustomDrop} 
                    didMove={didMove} 
                    isLast={(columns.length > 1 && column.columnId === columns[columns.length-1].columnId)}
                    isOnly={columns.length === 1}
                  />
              ))}

            {isLoading || board ? null : boardId && columns && columns.length > 0 ? <ColumnAddTemplate /> : <BoardAddTemplate />}
          </div>
        </div>
    );
}

