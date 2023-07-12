import React, { useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function LikedComments(props) {
    const [countOfLikedCommenters, setCountOfLikedCommenters] = useState(new Map());
    
    const [topThreeCommentersLiked, setTopThreeCommentersLiked] = useState([]);

    const [isContainerReady, setIsContainerReady] = useState(false);

    // when updating a useState variable in a component using a props.var you must use 
    // useEffect to prevent too many renders
    useEffect(() => {
        const targetContainer = document.getElementById('commentsContainer');
        if (targetContainer) {
            setIsContainerReady(true);
        }
    }, []);

    useEffect(() => {
        const commenterCounts = new Map() // update this map then set to the useState one later
        let top3Commenters = []; // same logic here

        props.data.forEach((comment) => {
            const commenter = comment.title;
            if (commenterCounts.has(commenter)) {
                commenterCounts.set(commenter, commenterCounts.get(commenter) + 1);
            } else {
                commenterCounts.set(commenter, 1);
            }
        });
        setCountOfLikedCommenters(commenterCounts);
        top3Commenters = Array.from(commenterCounts.entries()).sort((a, b) => b[1] - a[1]);

        setTopThreeCommentersLiked(top3Commenters);
    }, [props.data]);

    if (!isContainerReady) {
        return null; // Render nothing if the container is not ready
    }

    return createPortal(
        <div id='likedComments'>
            <div className="flex justify-center">
                <div className='font-bold text-4xl grid grid-rows-3'>
                    {/* <p className='flex items-center justify-center'>AND</p> */}
                    {/* <p className='flex items-center justify-center text-6xl italic bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text p-1'>REALLY</p>
                     */}
                    <p className='flex items-center justify-center'>YOU</p>
                    <p className='flex items-center justify-center text-6xl italic bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text p-1'>LOVE</p>
                    <p className='flex items-center justify-center'>WHAT</p>
                </div>
                <div className="m-4 stats stats-vertical shadow">
                    {topThreeCommentersLiked.length > 0 ? (
                        <>
                        <div className="stat">
                            <a className="stat-title text-primary" href={'https://www.instagram.com/' + topThreeCommentersLiked[0][0]} target='_blank'>@{topThreeCommentersLiked[0][0]}</a>
                            <div className="stat-value">{topThreeCommentersLiked[0][1]}</div>
                            <div className="stat-desc">comments liked</div>
                        </div>

                        <div className="stat">
                            <a className="stat-title text-secondary" href={'https://www.instagram.com/' + topThreeCommentersLiked[1][0]} target='_blank'>@{topThreeCommentersLiked[1][0]}</a>
                            <div className="stat-value">{topThreeCommentersLiked[1][1]}</div>
                            <div className="stat-desc">comments liked</div>
                        </div>

                        <div className="stat">
                            <a className="stat-title text-accent" href={'https://www.instagram.com/' + topThreeCommentersLiked[1][0]} target='_blank'>@{topThreeCommentersLiked[2][0]}</a>
                            <div className="stat-value">{topThreeCommentersLiked[2][1]}</div>
                            <div className="stat-desc">comments liked</div>
                        </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className='mx-8 font-bold text-4xl grid grid-rows-3'>
                    
                    <p className='flex items-center justify-center'>HAVE</p>
                    <p className='flex items-center justify-center'>TO</p>
                    <p className='flex items-center justify-center'>SAY</p>

                </div>
            </div>
            <div className='bg-customColour rounded-xl p-2'>
                <p className='stat-desc text-xl'>You've written <span className='font-bold'>{props.userComments.length}</span> comments</p>
            </div>
        </div>
    , document.getElementById('commentsContainer'));
}

export default LikedComments;