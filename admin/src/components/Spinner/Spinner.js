import React from "react";
import "./Spinner.css";

const Spinner = () => (
    <div className="LoadingElements">
        <div className="container-loading">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
);

export default Spinner;
