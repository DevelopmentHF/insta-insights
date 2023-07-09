import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function LikedPosts(props) {
    const [dates, setDates] = useState([]);

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const [daysSinceAccountCreation, setDaysSinceAccountCreation] = useState();

    const [avg, setAvg] = useState();

    const [countOfLikedUsers, setCountOfLikedUsers] = useState(new Map());

    const [topThreeUsersLiked, setTopThreeUsersLiked] = useState([]);

    // when updating a useState variable in a component using a props.var you must use 
    // useEffect to prevent too many renders
    useEffect(() => {
        setDaysSinceAccountCreation(
          Math.floor(
            (currentDate.getTime() - new Date(props.signup * 1000).getTime()) / (1000 * 60 * 60 * 24)
          )
        );
      }, [currentDate, props.signup]);
    
    const [isContainerReady, setIsContainerReady] = useState(false);
    let dateCount = 0, maxDateCount = 0, maxDate;
    
    // when updating a useState variable in a component using a props.var you must use 
    // useEffect to prevent too many renders
    useEffect(() => {
        const targetContainer = document.getElementById('likesContainer');
        if (targetContainer) {
            setIsContainerReady(true);
        }
    }, []);

    // avg calculations
    useEffect(() => {
        setAvg((props.data.length / daysSinceAccountCreation).toFixed(2));
    }, [props.data, daysSinceAccountCreation]);

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

    // Top 3 users liked posts calculations
    useEffect(() => {
        const userCounts = new Map() // update this map then set to the useState one later
        let top3Users = []; // same logic here

        props.data.forEach((post) => {
            const user = post.title;
            if (userCounts.has(user)) {
                userCounts.set(user, userCounts.get(user) + 1);
            } else {
                userCounts.set(user, 1);
            }
        })

        setCountOfLikedUsers(userCounts);
        top3Users = Array.from(userCounts.entries()).sort((a, b) => b[1] - a[1]);
        console.log("top 3");
        console.log(top3Users);
        setTopThreeUsersLiked(top3Users);

    }, [props.data]);

    console.log("COUNT OF LIKED USERS ::::");
    console.log(countOfLikedUsers);

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
    console.log(`days since acc creation = ${daysSinceAccountCreation}`);
    console.log(`avg = ${avg}`);
    console.log(props.data);

    return createPortal(
        <div id="likedStats">
            <div className="stats shadow m-8">
                
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
                    <div className="stat-figure text-accent">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        {...props}
                        >
                        <path d="M20 22H4a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 012 2v16a2 2 0 01-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z" />
                    </svg>
                    </div>
                    <div className="stat-title">Meaning you liked</div>
                    <div className="stat-value text-accent">{avg}</div>
                    <div className="stat-desc">per day since {convertUnixTimestamp(props.signup)}</div>
                </div>
                
            </div>
            <div className="m-8 flex justify-center">
                <div className='mx-8 font-bold text-4xl grid grid-rows-5'>
                    <p className='flex items-center justify-center'>YOU</p>
                    <p className='flex items-center justify-center text-6xl italic bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text p-1'>REALLY</p>
                    <p className='flex items-center justify-center'>LIKE</p>
                    <p className='flex items-center justify-center'>POSTS</p>
                    <p className='flex items-center justify-center'>FROM</p>
                </div>
                <div className="stats stats-vertical shadow">
  
                    <div className="stat">
                        <div className="stat-title">@{topThreeUsersLiked[0][0]}</div>
                        <div className="stat-value">{topThreeUsersLiked[0][1]}</div>
                        <div className="stat-desc">posts liked</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-title">@{topThreeUsersLiked[1][0]}</div>
                        <div className="stat-value">{topThreeUsersLiked[1][1]}</div>
                        <div className="stat-desc">posts liked</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-title">@{topThreeUsersLiked[2][0]}</div>
                        <div className="stat-value">{topThreeUsersLiked[2][1]}</div>
                        <div className="stat-desc">posts liked</div>
                    </div>
                    
                </div>
            </div>
        </div>
    , document.getElementById('likesContainer'))
}

export default LikedPosts;