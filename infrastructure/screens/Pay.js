import { View,Alert } from 'react-native';
import WebView from 'react-native-webview';
import { Paystack } from 'react-native-paystack-webview';
import { paystackpubkey } from '../../services/secret/paystackpubkey.key';
import { addDoc,collection } from 'firebase/firestore';

export function Pay ({navigation,route}) {
    const {userUID,userEmail,serviceUID,serviceTitle,price} = route.params;

    //timestamp generator
    const getNewTimestamp = () => {
        const now = new Date();
        return now.getTime();
    }

    return (
        <View style={{ flex: 1 }}>
        <Paystack  
            paystackKey={paystackpubkey}
            amount={price}
            billingEmail={userEmail}
            activityIndicatorColor="green"
            onCancel={(e) => {
                navigation.navigate('Services');
            }}
            onSuccess={() => {
                // insert booking records into firestore
                addDoc(collection(db,'bookings'),{
                    by:userUID,
                    serviceuid:serviceUID,
                    title:serviceTitle,
                    servicprice:price,
                    status:'Pending',
                    timecreated:getNewTimestamp()
                })
                .then(()=> Alert.alert(
                    'Payment Status',
                    `Your payment of ${price} was successful`,
                    [{text:'Home',onPress:navigation.navigate('Home')}]
                ))
                .catch(() =>  Alert.alert('Error Message',
                'There was a problem interracting with database'))
            }}
            autoStart={true}
        />
    </View>
    )
}