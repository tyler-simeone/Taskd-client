import React, { useState } from "react";
import { PBSelect } from "../controls/inputs/PBSelect";
import { Constants } from "../../util/Constants";
import "./NavigationSelect.css"

export const NavigationSelect = () => {
    return (
        <div className="nav-select">
            <PBSelect
                label={""}
                index={0}
                options={Constants.NAV_MENU_OPTIONS_TEST_DATA}
                name={"nav-select"}
            />
        </div>
    );
}