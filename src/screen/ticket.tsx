import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ViewShot from 'react-native-view-shot';
import {captureRef} from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

const Ticket = () => {
  const img1 = require('../../asset/flight.png');
  const img2 = require('../../asset/globe.png');
  const img3 = require('../../asset/pngegg.png');
  const viewShotRef = useRef<View>(null);
  const [isGenerating, setIsGenerating] = useState(false);

const handleDownload = async () => {
  if (isGenerating || !viewShotRef.current) return;
  setIsGenerating(true);

  try {
    
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download the PDF.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        setIsGenerating(false);
        return;
      }
    }

   const uri = await captureRef(viewShotRef, {
      format: 'png',
      quality: 1.0,
    });

     if (!uri || typeof uri !== 'string') {
      throw new Error('Failed to capture view');
    }


    // Generate PDF in temporary location first
  const tempPdf = await RNHTMLtoPDF.convert({
  html: `
    <html>
      <head>
        <style>
          body {
            background-color: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            
          }
        </style>
      </head>
      <body>
        <img src="${uri!}" style="width:100%" />
      </body>
    </html>
  `,
  fileName: 'boarding_pass_temp',
  base64: false,
});
 if (!tempPdf.filePath || typeof tempPdf.filePath !== 'string') {
      throw new Error('Failed to generate PDF file');
    }

    
    const downloadPath = Platform.OS === 'android' 
      ? `${RNFS.DownloadDirectoryPath}/boarding_pass_${Date.now()}.pdf`
      : `${RNFS.DocumentDirectoryPath}/boarding_pass_${Date.now()}.pdf`;

    
    await RNFS.moveFile(tempPdf.filePath, downloadPath);

    Alert.alert('Success', `PDF downloaded to Downloads folder`);
    
  } catch (error) {
    console.error('Error generating PDF: ', error);
    Alert.alert('Error', 'Failed to generate PDF');
  } finally {
    setIsGenerating(false);
  }
};
  
  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.ticket}>
            <View style={styles.ticketHeader}>
              <Image source={img1} style={styles.img1} />
              <View>
                <Text
                  style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  BoardingPass
                </Text>
                <Text style={{color: 'white', fontSize: 10, fontWeight: '300'}}>
                  lorem lipsium Airline
                </Text>
              </View>
              <Image source={img2} style={styles.img2} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                marginLeft: 5,
              }}>
              <View>
                <Text style={styles.passdetails}>PASSENGERNAME</Text>
                <Text style={styles.passdetails}>FROM</Text>
                <Text style={styles.passdetails}>TO</Text>
                <Text style={styles.passdetails}>GATE</Text>
                <Text style={{fontWeight: 'bold'}}>B25</Text>
              </View>

              <View style={{paddingHorizontal:4}}>
                <Text style={styles.passfulldetails}>NAME SURNAME</Text>
                <Text style={styles.passfulldetails}>NEWYORK</Text>
                <Text style={styles.passfulldetails}>HAWAI</Text>
                <Text style={{color: 'gray', fontSize: 11}}>BOARDING TIME</Text>
                <Text style={{fontWeight: 'bold'}}>17:05</Text>
              </View>
              <View style={{marginTop: 18}}>
                <Text style={styles.flight}>FLIGHT</Text>
                <Text style={styles.flight}>DATE</Text>
                <Text style={styles.flight}>SEAT</Text>
                <Text style={{fontWeight: 'bold',marginTop:2}}>20A</Text>
              </View>
              <View>
                <Image source={img3} style={styles.img3} />
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 3}}>
              <Text style={{fontSize: 10}}>Boarding gate closes</Text>
              <Text style={{color: 'red', fontSize: 10}}>10 minutes </Text>
              <Text style={{fontSize: 10}}>prior to departure time</Text>
            </View>
          </View>

          <View style={styles.altrTicket}>
            <View style={styles.altrHeadre}>
              <View>
                <Text
                  style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                  BoardingPass
                </Text>
                <Text style={{color: 'white', fontSize: 10, fontWeight: '300'}}>
                  lorem lipsium Airline
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 4,
                marginTop: 5,
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.alterText}>NAME</Text>
                <Text style={styles.alterText}>FROM</Text>
                <Text style={styles.alterText}>TO</Text>
                <Text style={styles.alterText}>GATE</Text>
                <Text style={styles.alterText}>DATE</Text>
              </View>
              <View>
                <Text style={styles.altertextalter}>NAME SURNAME</Text>
                <Text style={styles.altertextalter}>NEWYORK</Text>
                <Text style={styles.altertextalter}>HAWAI</Text>
                <Text style={styles.altertextalter}>AA204</Text>
                <Text style={styles.altertextalter}>14JUN</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <Text style={styles.alterthirdtext}>GATE</Text>
              <Text style={styles.alterthirdtext}>BOARDING TIME</Text>
              <Text style={styles.alterthirdtext}>DATE</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
                marginTop: 6,
              }}>
              <Text style={styles.alterlast}>B25</Text>
              <Text style={styles.alterlast}>17:05</Text>
              <Text style={styles.alterlast}>20A</Text>
            </View>
          </View>
        </View>
      </ViewShot>
      <TouchableOpacity
        style={styles.downloadbutton}
        onPress={handleDownload}
        disabled={isGenerating}>
        <Text style={{color: 'white'}}>
          {isGenerating ? 'GENERATING...' : 'DOWNLOAD'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ticket;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A2B9A7',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:1
  },
  ticket: {
    height: '90%',
    width: '65%',
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
  },
  ticketHeader: {
    height: '30%',
    width: '100%',
    backgroundColor: '#6A80B9',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  altrTicket: {
    height: '90%',
    width: '35%',
    backgroundColor: '#F7F7F7',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  altrHeadre: {
    height: '30%',
    width: '100%',
    backgroundColor: '#6A80B9',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  img1: {
    height: '50%',
    width: '35%',
  },
  img2: {height: '49%', width: '12%'},
  passdetails: {
    color: 'gary',
    fontSize: 11,
    fontWeight: '300',
    marginTop:2
  },
  img3: {
    height: 100,
    width: 50,
  },
  img4: {
    height: 100,
    width: 2,
  },
  passfulldetails: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    marginTop:2
  },
  flight: {
    fontSize: 9,
    color: 'gray',
    fontWeight: 'bold',
    lineHeight: 14,
    marginTop:2
  },
  alterText: {
    color: 'gray',
    fontSize: 11,
  },
  altertextalter: {
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  alterthirdtext: {
    fontSize: 8,
    fontWeight: '800',
    color: 'gray',
  },
  alterlast: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  downloadbutton: {
    height: '8%',
    width: '40%',
    backgroundColor: '#3674B5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
  },
});