import React, { useState } from 'react';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
      
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);
            
          console.log(typeof(jsonData));
        //   console.log(jsonData.topics_your_topics);

          jsonData.topics_your_topics.forEach((item) => {
            console.log(item.string_map_data.Name.value); // Access a specific property in each object
            // Perform other operations with the data
          });
          
        };
        reader.readAsText(file);
      };
  
    const handleUpload = () => {
      // Perform upload logic here using selectedFile
      console.log(selectedFile);
      
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  }
  
  export default FileUpload;