import { useState, useEffect, useCallback } from 'react';
import { View,Text,StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Questrial_400Regular } from '@expo-google-fonts/questrial';
import { Theme } from '../components/Theme';

export function History({navigation}){
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({Questrial_400Regular});
                await new Promise(resolve => setTimeout(resolve, 1000));
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
        title:'Run Like a Pro',
        servicprice:450,
        status:'Pending',
        timecreated:18374646466
      },
      {
        by:'ty',
        serviceuid:'009',
        title:'Run Like an Athlete',
        servicprice:470,
        status:'Pending',
        timecreated:18374646499
      },
      {
        by:'ay',
        serviceuid:'010',
        title:'Swim Like an Pro',
        servicprice:430,
        status:'Pending',
        timecreated:18374611499
      },
    ]

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
         
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
})