import "./styles/Tag.css"
import { XIcon } from "../../controls/icons/XIcon";

export const TagView = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask,
    isViewOnly // Board-level view of all Tasks and their Tags
}) => {

    return (
        <div className="tag--container" onClick={() => !isViewOnly && handleAddTagToTask(tagModel.tagId)}>
            <p className="tag-name">{tagModel.tagName}</p>
            
            {!isViewOnly && (
                <div className="delete-tag-btn">
                    <XIcon onClick={handleDeleteFromTask} />
                </div>
            )}
        </div>
    );
}