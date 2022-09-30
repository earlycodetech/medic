import { useState, useEffect, useCallback } from 'react';
import { View,Text,StyleSheet, SafeAreaView, Platform, StatusBar, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Questrial_400Regular } from '@expo-google-fonts/questrial';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck,faClock } from '@fortawesome/free-regular-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../components/Theme';

export function History({navigation}){
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({Questrial_400Regular});
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
        await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    const bookings = [
      {
        by:'ty',
        serviceuid:'008',
        title:'Run Like a Pro Without Missing a Step',
        serviceprice:450,
        status:'Pending',
        timecreated:18374646466
      },
      {
        by:'ty',
        serviceuid:'009',
        title:'Run Like an Athlete',
        serviceprice:470,
        status:'Pending',
        timecreated:18374646499
      },
      {
        by:'ay',
        serviceuid:'010',
        title:'Swim Like an Pro',
        serviceprice:430,
        status:'Pending',
        timecreated:18374611499
      },
    ];

    function TransHistory (transaction) {
        return (
            <View style={styles.transaction}>
                <View style={styles.transTitle}>
                    <View style={styles.title}>
                        <FontAwesomeIcon 
                        icon={faCircleCheck} 
                        size={16} 
                        color='green'/>
                        <Text style={styles.titleText}>{transaction.title.length > 30 ? transaction.title.slice(0,30) + '...' : transaction.title}</Text>
                    </View>
                    <Text>9 days ago</Text>
                </View>

                <View style={styles.status}>
                    <View style={styles.statusInfo}>
                        <FontAwesomeIcon 
                        icon={faWallet} 
                        size={14} 
                        color={Theme.colors.bg.quartenary}/>
                        <Text style={styles.statusText}>N{transaction.serviceprice}</Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <FontAwesomeIcon 
                        icon={faClock} 
                        size={14} 
                        color={Theme.colors.bg.quartenary}/>
                        <Text style={styles.statusText}>{transaction.status}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <Text style={styles.heading}>Your Order History</Text>

                <FlatList 
                data={bookings}
                renderItem={({item}) => TransHistory(item)}
                key={({item}) => item.serviceuid}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    areaView:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null
    },
    container:{
        flex:1,
        padding:Theme.sizes[3],
        justifyContent:'space-between'
    },
    heading:{
        fontSize:Theme.fonts.fontSizePoint.h4,
        marginBottom:Theme.sizes[4]
    },
    transaction:{
        paddingBottom:Theme.sizes[1],
        marginBottom:Theme.sizes[3],
        borderBottomWidth:1,
        borderBottomColor:Theme.colors.bg.tertiary
    },
    transTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:Theme.sizes[1]
    },
    title:{
        flexDirection:'row'
    },
    titleText:{
        marginLeft:4,
        fontSize:16
    },
    status:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    statusInfo:{
        flexDirection:'row'
    },
    statusText:{
        marginLeft:4,
        fontSize:14,
        color:Theme.colors.bg.quartenary
    }
})