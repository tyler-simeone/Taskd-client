import React, { useState, useEffect } from "react"
import './styles/Home.css';

export const Home = (props) => {
    return (
        <>
            <div className="homepage--container">
                <div className="homepage">
                    <h1 className="homepage-header">
                        The first to hear about the best jobs!
                    </h1>

                    <div className="homepage--section-1">
                        <p className="homepage-text">
                            Find your best pay options.
                        </p>
                        <p className="homepage-text">
                            Location! Location! Location! There’s a whole world out there.
                        </p>
                        <p className="homepage-text">
                            Don’t settle for the bottom of the barrel.
                        </p>
                    </div>

                    <div className="homepage--section-2">
                        <h2 className="homepage-section-2--header">Labor Driven</h2>
                        <p className="homepage-text row-4">
                            You decide what’s important to you and we will let you know where the work is - along with all the details.
                        </p>
                        <p className="homepage-text">
                            Easy and straight forward.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

