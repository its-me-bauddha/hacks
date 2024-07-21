import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const CameraView = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [usingFrontCamera, setUsingFrontCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [responseText, setResponseText] = useState('');
    const [numbers, setNumbers] = useState(0);
  useEffect(() => {
    startCamera();
  }, [usingFrontCamera]);

  useEffect(() => {
    if (imageData) {
      callApi();
    }
  }, [imageData]);

  
  useEffect(() => {

     
    const extractNumbers = (responseText) => {
        // Regular expression to match numeric values
        const regex = /\d+/g;
        
        // Find all numeric values
        const matches = responseText.match(regex);
        
        // Convert matches to numbers
        return matches ? matches.map(Number) : [];
      };
    
      const numbers = setNumbers(extractNumbers(responseText));
      
      console.log(numbers);
  }, [responseText]);



  const startCamera = () => {
    const constraints = {
      video: {
        facingMode: usingFrontCamera ? 'user' : 'environment'
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const image = canvasRef.current.toDataURL('image/png');
    setImageData(image);
  };

  const callApi = async () => {
    if (imageData) {
      try {
        const response = await axios.post('https://health-go-backend.onrender.com/upload', { image: imageData });
        setResponseText(response.data.message);
      } catch (error) {
        console.error('Error describing image:', error);
      }
      setIsAnalyzing(false);
    } else {
      console.log('No image data available');
    }
  };

  const switchCamera = () => {
    setUsingFrontCamera(prevState => !prevState);
  };

  const handleButtonClick = async (event) => {
    if (event.type === 'mousedown') {
      setIsAnalyzing(true);
      captureImage();
    }
  };

  return (
    <>
{
  !responseText &&  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
  <h1 className="text-2xl font-bold mb-4">Camera View</h1>
  <video ref={videoRef} autoPlay className="w-full max-w-xs border rounded mb-4"></video>
  <div className="flex space-x-4">
    <button 
      onMouseDown={handleButtonClick} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Capture Image
    </button>
    <button 
      onClick={switchCamera} 
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
    >
      Switch Camera
    </button>
  </div>
  <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
  {imageData && (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Captured Image:</h2>
      <img src={imageData} alt="Captured" className="w-full max-w-xs border rounded" />
    </div>
  )}
  {isAnalyzing && (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Analyzing...</h2>
    </div>
  )}
  {responseText && (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Response:</h2>
      <p className="text-black">{responseText  } </p>
    </div>
    
  )}
  
  
</div> 
}

{
    numbers && <Dashboard/>  
}

    </>
  );
};

export default CameraView;