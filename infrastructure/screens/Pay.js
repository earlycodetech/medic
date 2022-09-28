import { View,Alert } from 'react-native';
import WebView from 'react-native-webview';
import { Paystack } from 'react-native-paystack-webview';

export function Pay ({navigation}) {
    const amountValue = 50;

    return (
        <View style={{ flex: 1 }}>
        <Paystack  
            paystackKey=""
            amount={amountValue}
            billingEmail="info@earlycode.net"
            activityIndicatorColor="green"
            onCancel={(e) => {
                navigation.navigate('Intro');
            }}
            onSuccess={(res) => {
                Alert.alert(
                    'Payment Status',
                    `Your payment of ${amountValue} was successful`,
                    [{text:'Back to Intro',onPress:navigation.navigate('Intro')}]
                )
            }}
            autoStart={true}
        />
    </View>
    )
}