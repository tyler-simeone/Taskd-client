import "./styles/Tag.css"
import { XIcon } from "../../controls/icons/XIcon";

export const TagView = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask,
    isTaskDetailsView,
    isViewOnly // Board-level view of all Tasks and their Tags
}) => {

    return (
        <div className={`tag--container ${isTaskDetailsView && "task-details"}`} onClick={() => handleAddTagToTask && handleAddTagToTask(tagModel.tagId)}>
            <p className="tag-name">{tagModel.tagName}</p>
            
            {isTaskDetailsView && (
                <div className="delete-tag-btn">
                    <span className="tag-delete-icon" onClick={() => handleDeleteFromTask(tagModel.tagId)}>&times;</span>
                </div>
            )}
        </div>
    );
}