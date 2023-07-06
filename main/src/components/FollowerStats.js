import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function FollowerStats(props) {
    return createPortal(
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Total not following you back</div>
                <div className="stat-value">{props.total}</div>
                <div className="stat-desc"></div>
            </div>
            <div className="stat">
                <div className="stat-title">Percentage not following you back</div>
                <div className="stat-value">{props.percentage}%</div>
                <div className="stat-desc"></div>
            </div>
        </div>

    , document.getElementById('followerContainer'));
}

export default FollowerStats;