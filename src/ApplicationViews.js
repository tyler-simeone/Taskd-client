import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Home from './home/Home';
// import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const ApplicationViews = () => {
    // const history = useHistory();
    // const [cookies, setCookie, removeCookie] = useCookies(['email', 'userType']);
    // const [authCookie, setAuthCookie] = useState();
    

    // const setLoginCookie = (email, userType) => {
    //     const expire = 60*60*24*365
    //     setCookie('email', email, { path: '/', maxAge: expire });
    //     setCookie('userType', userType, { path: '/', maxAge: expire });
    // }

    // const checkForAuthCookie = () => {
    //     if (authCookie === undefined) {
    //         let cookieObj = {};
    //         document.cookie.split(';').forEach((cookie) => {
    //             let cookieArray = cookie.split('=')
    //             cookieObj[cookieArray[0].trim()] = cookieArray[0].trim() === 'userType' ? parseInt(cookieArray[1]) : cookieArray[1];
    //         });
    //         setAuthCookie(cookieObj);
    //     }
    // }

    // useEffect(() => {
    //     checkForAuthCookie();
    // }, [cookies, authCookie])


    return (
        <>
            <Route exact path="/" render={props => {
                // will never be undefined after initial page load
                // if (authCookie !== undefined) {
                //     switch(authCookie.userType) {
                //         case 1:
                //             history.push(`/login/jobseeker`);
                //             break;
                //         case 2:
                //             history.push(`/login/contractor`);
                //             break;
                //         case 3:
                //             history.push(`/login/union`);
                //             break;
                //         default:
                //             return <Home 
                //                     closeErrorMessage={closeErrorMessage} 
                //                     openUserSelectionModal={openUserSelectionModal}
                //                     {...props} 
                //                 />     
                //     }
                // }
                    console.log("hi")
                return <Home 
                            {...props} 
                        />
            }} />

            {/* <Route exact path="/signup" render={props => {
                return <SignupContainer
                            userType={1}
                            setUserType={setUserType}
                            setSessionStorage={setSessionStorage}
                            updateSessionStorage={updateSessionStorage}
                            setUser={setUser}
                            setUserInfo={setUserInfo}
                            userInfo={userInfo}
                            closeErrorMessage={closeErrorMessage}
                            displayErrorMessage={displayErrorMessage}
                            displaySuccessMessage={displaySuccessMessage}
                            loadStripe={loadStripe}
                            setUserSessionOnLogin={setUserSessionOnLogin}
                            openAccountConfirmationModal={openAccountConfirmationModal}
                            {...props} 
                        />
            }} />

            <Route path="/login" render={props => {
                return <LoginContainer 
                            setUser={setUser} 
                            setUserInfo={setUserInfo} 
                            setUserType={setUserType}
                            setSessionStorage={setSessionStorage}
                            setUserSessionOnLogin={setUserSessionOnLogin}
                            displayErrorMessage={displayErrorMessage}
                            cookies={cookies}
                            setLoginCookie={setLoginCookie}
                            removeCookie={removeCookie}
                            closeErrorMessage={closeErrorMessage}
                            userType={1}
                            openConfirmationModal={openConfirmationModal}
                            closeConfirmationModal={closeConfirmationModal}
                            openAccountConfirmationModal={openAccountConfirmationModal}
                            openUserSelectionModal={openUserSelectionModal}
                            openStripeSubscriptionModal={openStripeSubscriptionModal}
                            closeStripeSubscriptionModal={closeStripeSubscriptionModal}
                            loadStripe={loadStripe}
                            {...props} 
                        />
            }} />
            <Route path="/resetPassword" render={props => {
                return <ResetPasswordContainer 
                            setUser={setUser} 
                            setUserInfo={setUserInfo} 
                            setUserType={setUserType}
                            setSessionStorage={setSessionStorage} 
                            displayErrorMessage={displayErrorMessage}
                            closeErrorMessage={closeErrorMessage}
                            openConfirmationModal={openConfirmationModal}
                            closeConfirmationModal={closeConfirmationModal}
                            {...props} 
                        />
            }} /> */}
            

            {/* 
                Exact path wasn't working on its own, need to use this Switch component in combination with exact path for it to work. 
                Stack Overflow article: https://stackoverflow.com/questions/63414037/react-router-exact-property-is-not-working
            */}
            {/* <Switch>
                <Route exact path="/jobs/:jobId/trades" render={props => {
                    if (hasUser && userInfo !== undefined && userType !== undefined 
                        && (userType === 2 || userType === 3)) {
                        return <JobListController 
                                    userInfo={userInfo} 
                                    userType={userType} 
                                    displayErrorMessage={displayErrorMessage}
                                    openConfirmationModal={openConfirmationModal}
                                    closeConfirmationModal={closeConfirmationModal}
                                    openContractorJobDetailsModal={openContractorJobDetailsModal}
                                    closeContractorJobDetailsModal={closeContractorJobDetailsModal}
                                    {...props} 
                                />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />    

                <Route exact path="/jobs/:jobId/trades/:tradeId" render={props => {
                    if (hasUser && userInfo !== undefined && userType !== undefined 
                        && (userType === 2 || userType === 3)) {
                        return <JobDetailsContractorUnionController
                                    userInfo={userInfo} 
                                    userType={userType}
                                    displayErrorMessage={displayErrorMessage}
                                    closeErrorMessage={closeErrorMessage}
                                    displaySuccessMessage={displaySuccessMessage}
                                    closeSuccessMessage={closeSuccessMessage}
                                    openConfirmationModal={openConfirmationModal}
                                    closeConfirmationModal={closeConfirmationModal}
                                    {...props} 
                                />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

                <Route exact path="/jobs/:jobId/trades/:tradeId/update" render={props => {
                    if (hasUser && userInfo !== undefined && userType !== undefined 
                        && (userType === 2 || userType === 3)) {
                        return <JobEditFormController
                                    userInfo={userInfo} 
                                    userType={userType} 
                                    displayErrorMessage={displayErrorMessage}
                                    closeErrorMessage={closeErrorMessage}
                                    displaySuccessMessage={displaySuccessMessage}
                                    closeSuccessMessage={closeSuccessMessage}
                                    history={props.history}
                                    props={props}
                                />
                    } else {
                        return <Redirect to="/" />
                    }
                }} /> 
            </Switch> */}

            {/* <Route exact path="/profile" render={props => {
                if (hasUser && userInfo !== undefined) {
                    return <UserProfile 
                                userType={userType} 
                                setSessionStorage={setSessionStorage} 
                                updateSessionStorage={updateSessionStorage} 
                                displayErrorMessage={displayErrorMessage}
                                closeErrorMessage={closeErrorMessage}
                                displaySuccessMessage={displaySuccessMessage}
                                closeSuccessMessage={closeSuccessMessage}
                                userInfo={userInfo} 
                                {...props} 
                            />
                } else {
                    return <Redirect to="/" />
                }
            }} />

            {/* SEO hidden page */}
            {/* <Route exact path="/urlkljasdfiehdakjaei" render={props => {
                return <UrlFormatter {...props} />
            }} /> */}
        </>
    )
}

export default ApplicationViews;
