import React from 'react';
import { SomeView } from '../view/SomeView';
import modelMapper from '../../requestModelMapper';
import jobsClient from '../../../api/jobsClient';
import usersClient from '../../../api/usersClient';
import { handleError } from '../../handleError';

export const TagController = ({
    userType,
    displayErrorMessage,
    displaySuccessMessage
}) => {
    const [formData, setFormData] = useState({});
    const [someValues, setSomeValues] = useState();
    const [isLoading, setIsLoading] = useState();
    const [someData, setSomeData] = useState();

    const handleFieldChange = (evt) => {
        // let stateToChange = {...formData};
        // stateToChange[evt.target.name] = evt.target.value;
        // setFormData(stateToChange);
    }

    const handleClick = () => {

    };

    const handleSubmit = () => {

    };
    
    const loadData = (values) => {
        /* 
            Can jump into modules from here and add new methods quickly
        */ 
        
        // setIsLoading(true);
        
        // var someRequestModel = modelMapper.common.contactUsMessage(values);

        // jobsClient.individual.getJobs(someRequestModel)
        //     .then(resp => {
        //         setSomeData(resp);
        //         setIsLoading(false);
        //     }).catch(err => handleError(err, displayErrorMessage, setIsLoading))
    }

    useEffect(() => {
        // if (someData === undefined)
        //     loadData(someValues);
    }, []);

    return (
        <SomeView 
            handleFieldChange={handleFieldChange}
            isLoading={isLoading}
            someData={someData}
        />
    );
}