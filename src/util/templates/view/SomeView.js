import "App.css"
import { Spinner } from "../../../components/controls/features/Spinner";

export const SomeView = ({
    handleFieldChange,
    someData,
    isLoading
}) => {

    return (
        <div className="ld-page">
            <div className="ld-header-container">
                <h1 className="ld-header">

                </h1>
                <h2 className="ld-subheader">

                </h2>
            </div>

            <div className="ld-body">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="ld-body-content">

                    </div>
                )}
            </div>
            
            <div className="ld-footer">

            </div>
        </div>
    );
}