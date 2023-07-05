import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';

function Home() {
    return (<div className='flex-col'>

                <h1 className="m-16 font-bold text-7xl">Insta Insights<span className='text-indigo-500'>.</span></h1>

                <div className="bg-gray-700 rounded-lg drop-shadow-2xl hover:drop-shadow-md transition ease-in-out delay-100">
                <FileUpload></FileUpload>
                </div>

                 <div id="topicContainer" className='flex'></div>

            </div>);
}

export default Home;