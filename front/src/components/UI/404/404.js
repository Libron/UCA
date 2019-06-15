import React from 'react';
import './404.css';

const FourZeroFour = (props) => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>6<span>6</span>6</h1>
                </div>
                <h2>{props.message}</h2>
            </div>
        </div>
    );
};

export default FourZeroFour;