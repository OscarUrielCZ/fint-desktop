import React from 'react';

import './LoadingExpenses.css';

function LoadingExpenses() {
    return (
        <div className="LoadingExpenses">
            <div className="item"></div>
            <div className="mask"></div>
            <div className="item"></div>
            <div className="mask"></div>
            <div className="item"></div>
            <div className="mask"></div>
            <div className="item"></div>
        </div>
    );
}

export default LoadingExpenses;