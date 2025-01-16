import "./styles/Tag.css"
import { XIcon } from "../../controls/icons/XIcon";

export const TagView = ({
    tagModel,
    handleAddTagToTask,
    isTaskEditView,
    handleTagDeleteFromTask
}) => {

    return (
        <div 
            className={`tag--container ${isTaskEditView ? "task-details" : ""}`}
            onClick={() => handleAddTagToTask && handleAddTagToTask(tagModel.tagId)}
        >
            <p className="tag-name">{tagModel.tagName}</p>
            
            {isTaskEditView && (
                <div className="delete-tag-btn--container">
                    <span 
                        className="tag-delete-icon" 
                        onClick={() => handleTagDeleteFromTask && handleTagDeleteFromTask(tagModel.taskTagId)}
                    >
                        &times;
                    </span>
                </div>
            )}
        </div>
    );
}