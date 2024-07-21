import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (Camera) {
      const photo = await Cameram.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const analyzePhoto = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('http://localhost:8000/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data.analysis);
      if (response.data.healthiness > 50) {
        await axios.patch('http://localhost:8000/users/1', { points: user.points + 10 });
      }
    } catch (error) {
      console.error("Error analyzing the photo", error);
    }
  };

  return (
    <View>
      {hasPermission === null ? (
        <Text>Requesting camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <Camera style={{ flex: 1 }} ref={(ref) => { camera = ref; }}>
          <Button title="Take Picture" onPress={takePicture} />
          {photo && (
            <View>
              <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
              <Button title="Analyze Photo" onPress={analyzePhoto} />
            </View>
          )}
          {analysis && <Text>{analysis}</Text>}
        </Camera>
      )}
    </View>
  );
};

export default CameraScreen;
