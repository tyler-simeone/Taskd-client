import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContextProvider";
import { useDrag } from 'react-dnd';
import { TagsList } from "../tag/TagsList";
import "./styles/Task.css"
import { tagsClient } from "../../api/tagsClient";
import { handleError } from "../../util/handleError";

export const Task = ({ task, sourceColumnId, index, didMove }) => {
    const { 
      openViewTaskModal, 
      taskTagsHaveChanged,
      taskTagsChangedTaskId,
      setTaskTagsHaveChanged,
      setError
    } = useContext(AppContext);

    const [tagsOnTask, setTagsOnTask] = useState();
    
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { task, sourceColumnId, index },
        end: (item, monitor) => {
            // console.log("didMove from drag... ", didMove);
            
            // Called when the drag operation ends
            // You can perform any cleanup or finalization here
            // For example, you might trigger an action based on whether the item was dropped or canceled
            const dropResult = monitor.getDropResult();

            // console.log("monitor.getDropResult(): ", monitor.getDropResult());
            // console.log("monitor.didDrop(): ", monitor.didDrop());
        
            if (dropResult) {
              // console.log('Item was dropped successfully');
              // Perform actions based on the drop result
            } else {
              // console.log('Item was dragged but not dropped');
              // Perform actions for when the item was dragged but not dropped
            }
          },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

      const loadTaskTags = async () => {
        try {
          var taskTags = await tagsClient.getTaskTags(task.boardId, task.taskId);
          setTagsOnTask(taskTags.data);
          setTaskTagsHaveChanged(false);
        } catch (error) {
          handleError(error, setError);
        }
      }

      useEffect(() => {
        console.log("Hello from Task useEffect...");
        if (taskTagsHaveChanged && taskTagsChangedTaskId === task.taskId) {
          loadTaskTags();
        }
        setTagsOnTask(task.taskTags);
      }, [tagsOnTask, taskTagsHaveChanged]);

    return (
        <div
            className="task--container"
            ref={drag}
            // style={{
            //     // opacity: isDragging ? 0.5 : 1,
            //     cursor: 'move',
            //     // border: '1px solid #ccc',
            //     // borderRadius: '5px',
            //     // padding: '10px',
            //     // marginBottom: '10px',
            //     // backgroundColor: 'white',
            // }}
            onClick={() => openViewTaskModal(task.taskId, task.taskName)}
        >
            <h4 className="task-title"><span style={{fontSize: 17}}>#{task.taskId} -</span> {task.taskName}</h4>

            {task.taskDescription && task.taskDescription.trim().length > 0 ? (
              <p className="task-description">{task.taskDescription}</p>
            ) : (
              <p className="task-description"><em className="description-not-provided--lbl">No description provided.</em></p>
            )}

            {tagsOnTask && tagsOnTask.length > 0 && <TagsList tags={tagsOnTask} isTaskBoardView={true} />}
        </div>
    );
}