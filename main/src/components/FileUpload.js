import React, { useState } from 'react';
import Topic from './Topic';
import Followers from './Followers';
import FollowerStats from './FollowerStats';
import LikedPosts from './LikedPosts';

function FileUpload(props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    // Follower statics
    const [following, setFollowing] = useState([]);
    const [showFollowing, setShowFollowing] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const [followers, setFollowers] = useState([]);
    const [showFollowers, setShowFollowers] = useState([]);

    const [notFollowingBack, setNotFollowingBack] = useState([]);

    // Liked posts statistics
    const [likedPosts, setLikedPosts] = useState([]);
  
    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const filesArray = Array.from(fileList);

        setSelectedFiles(filesArray);
        /* 
        const file = filesArray.find((file) => file.name === 'following.json'); // following

        const file2 = filesArray.find((file2) => file2.name === 'followers_1.json'); // followers
        */
        const targetFiles = ['following.json', 'followers_1.json', 'liked_posts.json'];
        const filesToRead = [];
        targetFiles.forEach((targetFile) => {
          const file = filesArray.find((file) => file.name === targetFile);
          if (file) {
            filesToRead.push(file);
          }
        });

        filesToRead.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = e.target.result;
            const jsonData = JSON.parse(fileContent);

            if (file.name === 'following.json') {
              jsonData.relationships_following.forEach((item) => {
                setFollowing((prevFollowing) => [...prevFollowing, item.string_list_data[0].value]);
                // console.log("I FOLLOW:");
                // console.log(item.string_list_data[0].value);
              });
            } else if (file.name === 'followers_1.json') {
              jsonData.forEach((item) => {
                setFollowers((prevFollowers) => [...prevFollowers, item.string_list_data[0].value]);
                // console.log("FOLLOWS ME:");
                // console.log(item.string_list_data[0].value);
              });
            } else if (file.name === 'liked_posts.json') {
              jsonData.likes_media_likes.forEach((item) => {
                setLikedPosts((prevLikedPosts) => [...prevLikedPosts, item])
              });
              console.log(likedPosts.length);
            }

          }
          reader.readAsText(file);
        });

        
      };
  
    const handleUpload = () => {
      // Perform upload logic here using selectedFile
      // console.log(following);
      // console.log(followers);
      setIsUploaded(true);
    };

    const handleGo = () => {
        console.log("Go");
        setShowFollowing(true);
        const og = document.getElementById('titleAndUploader');
        og.classList.add('hidden');

        const header = document.getElementById('header');
        header.classList.remove('hidden');

        document.getElementById('followerContainer').classList.remove('hidden');
        document.getElementById('carousel').classList.remove('hidden');
        document.getElementById('overview').classList.remove('hidden');
        document.getElementById('next').classList.remove('hidden');
        document.getElementById('prev').classList.remove('hidden');

        setNotFollowingBack(following.filter((element) => !followers.includes(element)));
        console.log(notFollowingBack);

        props.incrCount();
    }
  
    return (
      <div>
        <input className="file-input w-full max-w-xs m-4" type="file" onChange={handleFileChange} multiple directory="" webkitdirectory="" />
        <button onClick={handleUpload} class="btn w-32 rounded-full m-4">Upload</button>

        {isUploaded ? <button id="GoBtn" className="btn btn-success m-4" onClick={handleGo}>Go</button> : <span></span>}
        {showFollowing ? <FollowerStats total={notFollowingBack.length} percentage={Math.round(notFollowingBack.length / following.length * 100)}></FollowerStats> : <span></span>}
        {   
            /*
            showTopics && topics.slice(0,3).map((topic) => {
                return (
                    <>
                    <Topic value={topic}></Topic>
                    </>
                )
            })
            */

            // showFollowing ? <Followers></Followers> : <span></span>
            showFollowing && notFollowingBack.map((user) => {
                return (
                    <Followers name={user}></Followers>
                )
            })

        }
        {<LikedPosts data={likedPosts}></LikedPosts>}
      </div>
    );
  }
  
  export default FileUpload;