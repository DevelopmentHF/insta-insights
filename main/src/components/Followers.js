import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Followers(props) {
    return createPortal(
        <div className="h-96 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full">
                <h2>hi</h2>
            </div> 
            <div className="carousel-item h-full">
                <h2>bye</h2>
            </div>
        </div>
    , document.getElementById('followerContainer'));
}

export default Followers;