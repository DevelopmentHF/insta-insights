import React, { useState } from 'react';
import Topic from './Topic';

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [topics, setTopics] = useState([]);
    const [showTopics, setShowTopics] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
  
    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const filesArray = Array.from(fileList);

        setSelectedFiles(filesArray);
        const file = filesArray.find((file) => file.name === 'your_topics.json');
      
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);
            
          console.log(typeof(jsonData));
        //   console.log(jsonData.topics_your_topics);

          jsonData.topics_your_topics.forEach((item) => {
            // console.log(item.string_map_data.Name.value); // Access a specific property in each object
            // Perform other operations with the data
            // <Topic value={item.string_map_data.Name.value}></Topic>
            setTopics((prevTopics) => [...prevTopics, item.string_map_data.Name.value]);
          });
          
        };
        reader.readAsText(file);
      };
  
    const handleUpload = () => {
      // Perform upload logic here using selectedFile
      console.log(selectedFiles);
      setIsUploaded(true);
    };

    const handleGo = () => {
        console.log("Go");
        setShowTopics(true);
        const og = document.getElementById('titleAndUploader');
        og.classList.add('hidden');

        const header = document.getElementById('header');
        header.classList.remove('hidden');

        document.getElementById('topicContainer').classList.remove('hidden');
    }
  
    return (
      <div>
        <input className="file-input w-full max-w-xs m-4" type="file" onChange={handleFileChange} multiple directory="" webkitdirectory="" />
        <button onClick={handleUpload} class="btn w-32 rounded-full m-4">Upload</button>

        {isUploaded ? <button id="GoBtn" className="btn btn-success m-4" onClick={handleGo}>Go</button> : <span></span>}

        {   
            
            showTopics && topics.slice(0,3).map((topic) => {
                return (
                    <>
                    <Topic value={topic}></Topic>
                    </>
                )
            })
        }
        
        
        {console.log(topics)}
      </div>
    );
  }
  
  export default FileUpload;