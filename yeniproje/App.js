

import React, {useState} from 'react';

import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';


import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const App = () => {

  const [filePath, setFilePath] = useState({});
  const [detectedLabels, setDetectedLabels] = useState("");
  const [detectedObjectCount, setDetectedObjectCount] = useState(0);
  const [instances, setInstances] = useState([]);

  const [top, setTop] = useState(1);
  const [left, setLeft] = useState(1);
  const [width, seWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imageWidth = 1;
  const imageHeight = 1;

  let base64File = null;

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64 : true
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {


        if (response.didCancel) {
          alert('Kullanıcı işlemi iptal etti');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Kamera aygıtta kullanılamaz');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Izin verilmedi');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }



        setFilePath(response);
        this.base64File = response.base64;
        this.imageWidth = response.width;
        this.imageHeight = response.height;
        setInstances([]);
        setDetectedLabels("");
        setDetectedObjectCount(0);
      });
    }

  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
      includeBase64 : true
    };
    launchImageLibrary(options, (response) => {


      if (response.didCancel) {
        alert('Kullanıcı işlemi iptal etti');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Kamera aygıtta kullanılamaz');
        return;
      } else if (response.errorCode == 'permission') {
        alert('İzin verilmedi');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }


      setFilePath(response);
      this.base64File = response.base64;
      this.imageWidth = response.width;
      this.imageHeight = response.height;
      setInstances([]);
      setDetectedLabels("");
      setDetectedObjectCount(0);
    });
  };

  const recognizeImage = () => {

    if (!this.base64File)
    {
          alert('Önce resim seç');
          return;
        }

    let model = {
        name:"test.jpg",
        image:this.base64File
    };


    fetch('https://fbqzq55a90.execute-api.us-east-2.amazonaws.com/projectStage/allproject', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then((response) => response.json())
      .then((json)=> {
        let mm = json.Labels.filter(x=>x.Instances.length > 0).map((x)=>{ return {Name:x.Name,Instances:x.Instances};});
        let labels = mm.map((x)=> { return x.Name; }).join();
        let dObj = mm.map((x)=> { return x.Instances; });
        if(dObj.length>0){
            dObj = dObj.reduce((a,b)=>{return a.concat(b);})
        }
        setDetectedObjectCount(dObj.length);
        setDetectedLabels(labels);
        console.log(dObj);
        setInstances(dObj);


      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Nesne Tanıma Uygulaması
      </Text>
      <View style={styles.container}>



        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />

         {instances.map((prop,key) => {
                                           return (
                                             <View key={key} style={[ styles.rectangle,
                                                                          {
                                                                            top:  25+(200*(imageHeight * prop.BoundingBox.Top)/imageHeight),
                                                                            left: ((windowWidth-300)/2)+(300*(imageWidth * prop.BoundingBox.Left)/imageWidth),
                                                                            width:(prop.BoundingBox.Width*300),
                                                                            height:(prop.BoundingBox.Height*200)
                                                                          }
                                                                        ]}></View>
                                           );
                                        })}

                <Text  style={styles.textStyle}>{detectedLabels}</Text>
        <Text  style={styles.textStyle}>Toplam Obje Sayısı: {detectedObjectCount}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Kameradan Fotoğraf Çek
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Galeriden Fotoğraf Seç</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => recognizeImage()}>
          <Text style={styles.textStyle}>Recognize</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#9B59B6',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#5B3256',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#5B3256',
    padding: 5,
    marginVertical: 10,
    width: 300,
  },
  imageStyle: {
    width: 300,
    height: 200,
    margin: 5,
    resizeMode: 'stretch',
  },
   rectangle: {
      borderWidth: 4,
      position: 'absolute',
      zIndex: 99,
      borderColor: "#ff0000",
      borderRadius: 6,
    },
});