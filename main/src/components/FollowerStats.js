import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function FollowerStats(props) {
    return createPortal(
        <div className="stats shadow flex">
            <div className="stat">
                <div className="stat-title">You have</div>
                <div className="stat-value text-primary">{props.total}</div>
                <div className="stat-desc">people not following you back</div>
            </div>
            <div className="stat">
                <div className="stat-title">Thats equal to</div>
                <div className="stat-value text-accent">{props.percentage}%</div>
                <div className="stat-desc">of your total following count</div>
            </div>
        </div>

    , document.getElementById('followerStats'));
}

export default FollowerStats;