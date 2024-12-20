```javascript
// bugSolution.js
export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        setCameraError('Camera permission error');
        console.error('Camera permission error:', error);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (cameraError) {
    return <Text>Camera Error: {cameraError}</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onError={(err) => {
        setCameraError('Camera initialization failed');
        console.error('Camera initialization failed:', err);
      }}>
        {/* ... rest of your code ... */}
      </Camera>
    </View>
  );
}
```