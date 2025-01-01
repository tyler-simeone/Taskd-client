import "./styles/Tag.css"

export const TagView = ({
    tagModel,
    handleDeleteFromTask
}) => {

    return (
        <div className="tag--container">
            <p>{tagModel.tagName}</p>
        </div>
    );
}