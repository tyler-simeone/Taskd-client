import React, { useState, useEffect } from "react"
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Task } from "../task/Task";
import AddIcon from '@mui/icons-material/Add';
import { MoreIcon } from "../controls/icons/MoreIcon";
import './styles/Column.css';
import { columnsClient } from "../../api/columnsClient";

export const Column = ({ column, useCustomDrop, didMove, openAddTaskModal, openViewTaskModal, setError, handleRerender }) => {
    const [moreIconValues, setMoreIconValues] = useState([{
        name: "deleteColumn",
        value: "Delete Column",
        callback: () => deleteColumn()
    }]);
    const [tasks, setTasks] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [{ isHover, isOver, canDrop, didDrop, dropResult }, drop] = useCustomDrop(column.columnId);

    const loadTasks = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTasks(column.columnId)
            .then(resp => {
                setTasks(resp.tasks);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                handleError(err, setError);
            });
    }

    const deleteColumn = () => {
        setError();
        setIsLoading(true);
        columnsClient.deleteColumn(column.columnId, 1)
            .then(() =>  handleRerender())
            .catch(err => handleError(err, setError));
        setIsLoading(false);
    }

    useEffect(() => {
        if (tasks === undefined)
            loadTasks();

        // console.log("isHover, isOver, canDrop: ", isHover, isOver, canDrop);
        // console.log("didDrop, dropResult: ", didDrop, dropResult);
    }, [isOver, tasks]);

    return (
        <div key={column.columnId} className="column--container">
            <div className="column-header--container">
                {/* <div className="more-icon--container"><MoreHorizIcon className="more-icon" /></div> */}
                <MoreIcon options={moreIconValues} />
                <h3 className="column-header">{column.columnName}</h3>
                <div className="add-task-icon--container" onClick={() => openAddTaskModal(column.columnId)} ><AddIcon className="add-task-icon" /></div>
            </div>

            <div ref={drop} style={{ backgroundColor: isHover ? 'lightgray' : 'white'}} className="column--body">
                {tasks !== undefined ? 
                (tasks.map((task, index) => (
                    <Task 
                        key={task.taskId} 
                        index={index}
                        id={task.taskId} 
                        task={task} 
                        sourceColumnId={column.columnId}
                        didMove={didMove}
                        openViewTaskModal={openViewTaskModal}
                    />
                ))) : null}
            </div>
        </div>
    );
}

