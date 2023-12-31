import React, { useState } from 'react';
import Topic from './Topic';
import Followers from './Followers';
import FollowerStats from './FollowerStats';
import LikedPosts from './LikedPosts';
import InterestedTopics from './InterestedTopics';
import LikedComments from './LikedComments';

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

    // Liked comments statistics
    const [likedComments, setLikedComments] = useState([]);

    // Account signup statistics
    const [signupDate, setSignupDate] = useState(0);

    // Interested topic statistics
    const [interestedTopics, setInterestedTopics] = useState([]);

    // Your Comment Statistics
    const [comments, setComments] = useState([]);

    // Your DM stats
    
  
    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const filesArray = Array.from(fileList);

        setSelectedFiles(filesArray);
        /* 
        const file = filesArray.find((file) => file.name === 'following.json'); // following

        const file2 = filesArray.find((file2) => file2.name === 'followers_1.json'); // followers
        */
        const targetFiles = ['following.json','followers_1.json', 'liked_posts.json', 'liked_comments.json', 'signup_information.json', 'your_topics.json', 'post_comments_1.json'];
        const filesToRead = [];

        const filteredFilesArray = filesArray.filter((file) => {
            if (file.name === 'following.json' && file.webkitRelativePath === "instagram-data-updated/threads/following.json") {
              console.log('bad threads annoying POS');
              return false; // Exclude the file from the filtered array
            } else {
              return true; // Include the file in the filtered array
            }
          });

          targetFiles.forEach((targetFile) => {
            const file = filteredFilesArray.find((file) => file.name === targetFile);
            if (file) {
              filesToRead.push(file);
            }
          });

        console.log("FILES");
        console.log(filesToRead);

        filesToRead.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = e.target.result;
            const jsonData = JSON.parse(fileContent);

            if (file.name === 'following.json') {
                console.log("JSON DATA::::");
                console.log(jsonData);
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
                setLikedPosts((prevLikedPosts) => [...prevLikedPosts, item]);
              });
            //   console.log(likedPosts.length);
            } else if (file.name === 'liked_comments.json') {
              jsonData.likes_comment_likes.forEach((item) => {
                setLikedComments((prevLikedComments) => [...prevLikedComments, item]);
              });
            } else if (file.name === 'signup_information.json') {
                setSignupDate(jsonData.account_history_registration_info[0].string_map_data.Time.timestamp);
                console.log(`signupDate = ${signupDate}`);
            } else if (file.name === 'your_topics.json') {
                jsonData.topics_your_topics.forEach((topic) => {
                    setInterestedTopics((prevTopics) => [...prevTopics, topic.string_map_data.Name.value]);
                });
            } else if (file.name === 'post_comments_1.json') {
                jsonData.forEach((item) => {
                  setComments((prevComments) => [...prevComments, item.string_map_data.Comment.value]);
                });
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
        // console.log(notFollowingBack);

        props.incrCount();
    }
  
    return (
      <div>
        <input className="file-input w-full max-w-xs m-4" type="file" onChange={handleFileChange} multiple directory="" webkitdirectory="" />
        <button onClick={handleUpload} class="btn w-32 rounded-full m-4">Upload</button>

        {isUploaded ? <button id="GoBtn" className="btn btn-success m-4" onClick={handleGo}>Go</button> : <span></span>}
        {showFollowing ? <FollowerStats total={notFollowingBack.length} percentage={Math.round(notFollowingBack.length / following.length * 100)}></FollowerStats> : <span></span>}
        {   
            showFollowing && notFollowingBack.map((user) => {
                return (
                    <Followers name={user}></Followers>
                )
            })

        }
        {<LikedPosts data={likedPosts} signup={signupDate}></LikedPosts>}
        {<LikedComments data={likedComments} userComments={comments}></LikedComments>}
        {<InterestedTopics data={interestedTopics}></InterestedTopics>}
        {console.log(comments)}
      </div>
    );
  }
  
  export default FileUpload;