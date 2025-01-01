import "./styles/Tag.css"
import { XIcon } from "../../controls/icons/XIcon";

export const TagView = ({
    tagModel,
    handleAddTagToTask,
    handleDeleteFromTask
}) => {

    return (
        <div className="tag--container" onClick={handleAddTagToTask}>
            <p className="tag-name">{tagModel.tagName}</p>
            
            <div className="delete-tag-btn">
                <XIcon onClick={handleDeleteFromTask} />
            </div>
        </div>
    );
}