import React, { useState, useEffect, useContext } from "react"
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Task } from "../task/Task";
import { MoreIcon } from "../../controls/icons/MoreIcon";
import { columnsClient } from "../../api/columnsClient";
import { AddIcon } from "../../controls/icons/AddIcon";
import './styles/Column.css';

export const Column = ({ column, useCustomDrop, didMove, droppedColumnId, droppedTaskId, setDroppedColumnId, setDroppedTaskId, isLast, isOnly }) => {
    const { 
        openAddTaskModal,
        openEditColumnModal,
        handleRerender,
        setError,
        deleteConfirmed,
        openDeleteConfirmationModal,
        closeDeleteConfirmationModalOnDelete,
        rerender,
        taskTagsHaveChanged,
        boardId
    } = useContext(AppContext); 

    const [moreIconValues, setMoreIconValues] = useState([
        // {
        //     name: "sortAZ",
        //     value: "Sort A-Z",
        //     // callback: () => sortTas
        // },
        // {
        //     name: "sortCreateDate",
        //     value: "Sort by Recently Added",
        //     callback: () => sortTasksRecentlyAdded(tasks)
        // },
        {
            name: "editColumn",
            value: "Edit Column",
            callback: () => openEditColumnModal(column.columnId)
        },
        {
            name: "deleteColumn",
            value: "Delete Column",
            callback: () => openDeleteConfirmationModal({resourceName: column.columnName, resourceId: column.columnId, callback: () => deleteColumn(column.columnId)})
            // callback: () => openDeleteConfirmationModal(deleteConfirmationModalArgs(column.columnId, column.columnName, deleteColumn))
        },
    ]); 
    const [tasks, setTasks] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showColumnDescription, setShowColumnDescription] = useState(false);

    const [{ isHover, isOver, canDrop, didDrop, dropResult }, drop] = useCustomDrop(column.columnId);

    const toggleColumnDescription = () => setShowColumnDescription(!showColumnDescription);

    const deleteColumn = async columnId => {
        setError();
        setIsLoading(true);

        try {
            var resp = await columnsClient.deleteColumn(columnId, 1);
            if (resp)
                handleRerender();
        } catch (err) {
            handleError(err, setError);
        } finally {
            setIsLoading(false);
            handleRerender();
            closeDeleteConfirmationModalOnDelete();
        }
    }

    const loadTasks = async () => {
        setError();
        setIsLoading(true);

        try {
            var resp = await tasksClient.getTasks(boardId, column.columnId);
            // Kind of a hacky solution *for now* to get around this race condition
            // Refetch the column's tasks to get the latest task
            // if (column.columnId === droppedColumnId) {
            //     if (resp.tasks.filter(t => t.taskId === droppedTaskId).length === 0) {
            //         resp = await tasksClient.getTasks(boardId, column.columnId);
            //     }
            // } else {
            //     if (resp.tasks.filter(t => t.taskId === droppedTaskId).length > 0) {
            //         resp = await tasksClient.getTasks(boardId, column.columnId);
            //     }
            // }

            // console.log("### column.columnId: ", column.columnId);
            // console.log("### resp.tasks: ", resp.tasks);
            setTasks(resp.tasks);
            setDroppedTaskId();
        } catch (err) {
            handleError(err, setError);
        } finally {
            setDroppedColumnId();
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // console.log("useEffect tasks: ", tasks);
        // console.log("isOver: ", isOver);

        
        // if (!tasks || column.columnId === droppedColumnId || taskTagsHaveChanged) {
        if (!tasks || rerender || droppedTaskId || taskTagsHaveChanged) {
            // console.log("hiya")
            // console.log("droppedTaskId: ", droppedTaskId);
            // console.log("droppedColumnId: ", droppedColumnId);
            loadTasks();
        }

        // console.log("isHover, isOver, canDrop: ", isHover, isOver, canDrop);
        // console.log("didDrop, dropResult: ", didDrop, dropResult);

        // console.log("didMove: ", didMove);
        // console.log("rerender: ", rerender, column.columnName);
    }, [isOver, tasks, showColumnDescription, deleteConfirmed, rerender, droppedTaskId, taskTagsHaveChanged]);

    return (
        <div key={column.columnId} className={`column--container ${isOnly ? 'only' : isLast ? 'last' : ''}`}>
            <div className="column-header--container">
                <MoreIcon options={moreIconValues} idx={column.columnId} />

                <div style={{ width: "80%" }}>
                    <h3 className="column-header ph" onClick={toggleColumnDescription}>
                        <span>{column.columnName}</span> {column.taskCount > 0 && (<span>({column.taskCount})</span>)}
                    </h3>

                    {showColumnDescription && 
                        <p className="column-description">{column.columnDescription}</p>}
                </div>
                
                <div className="add-task-icon--container" onClick={() => openAddTaskModal(column.columnId)}>
                    <AddIcon />
                </div>
            </div>

            <div ref={drop} style={isHover && { backgroundColor: 'lightgray'}} className="column--body">
                {tasks && tasks.map((task, index) => 
                    <Task 
                        key={task.taskId} 
                        index={index}
                        id={task.taskId} 
                        task={task} 
                        sourceColumnId={column.columnId}
                        didMove={didMove}
                    />
                )}
            </div>
        </div>
    );
}

