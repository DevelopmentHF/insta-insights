import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function LikedPosts(props) {
    const [dates, setDates] = useState([]);
    
    const [isContainerReady, setIsContainerReady] = useState(false);
    let dateCount = 0, maxDateCount = 0, maxDate;
    
    useEffect(() => {
        const targetContainer = document.getElementById('likesContainer');
        if (targetContainer) {
        setIsContainerReady(true);
        }
    }, []);

    const convertUnixTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const humanDate = date.toLocaleDateString();

        return humanDate;
    }

    useEffect(() => {
        const convertedDates = props.data.map((obj) => 
            convertUnixTimestamp(obj.string_list_data[0].timestamp)
        );
        setDates(convertedDates)
    }, [props.data]);

    console.log(dates);

    if (!isContainerReady) {
        return null; // Render nothing if the container is not ready
    }

    for(let i=0; i < dates.length; i++) {
        if (i >= 1) {
            if (dates[i] === dates[i-1]) {
                dateCount++;
            } else {
                if (dateCount > maxDateCount) {
                    maxDateCount = dateCount;
                    maxDate = dates[i-1];
                }
                dateCount = 0;
            }
        }
    }

    console.log(`maxDate=${maxDate}`);
    console.log(`maxCount=${maxDateCount}`);

    return createPortal(
        <div className="stats shadow">
            
            <div className="stat">
                <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">You have liked</div>
                <div className="stat-value text-primary">{props.data.length}</div>
                <div className="stat-desc">posts</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title">You liked</div>
                <div className="stat-value text-secondary">{maxDateCount}</div>
                <div className="stat-desc">posts on {maxDate} - the most of any day!</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                </div>
                <div className="stat-value">number</div>
                <div className="stat-title">desc</div>
                <div className="stat-desc text-secondary">detail</div>
            </div>
            
        </div>
    , document.getElementById('likesContainer'))
}

export default LikedPosts;