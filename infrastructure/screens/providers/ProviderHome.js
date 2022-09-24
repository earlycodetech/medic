import { useState, useEffect, useCallback } from 'react';
import { View,Text,StyleSheet, SafeAreaView, Platform, StatusBar,Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Questrial_400Regular } from '@expo-google-fonts/questrial';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../../components/Theme';

export function ProviderHome({navigation}){
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

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftContent}>
                        <Text style={styles.headerText}>Hello, Zohreh!</Text>
                        <Text style={styles.subHeadText}>Female, 23</Text>
                    </View>

                    <View style={styles.rightContent}>
                        <FontAwesomeIcon 
                        icon={faBell} 
                        size={30} 
                        color={Theme.colors.ui.nurseGray}
                        />
                    </View>
                </View>

                <Text style={styles.recentTitle}>Your recent orders</Text>
                <View style={styles.orderPill}>
                    <Image 
                    source={{uri:'https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg'}}
                    style={styles.orderThumbnail}
                    />
                    <View style={styles.orderDetails}>
                        <Text style={styles.ordertext}>MultiVitamin for Hair Growth</Text>
                        <View style={styles.orderHolder}>
                            <Text style={styles.orderInfotext}>N23,000</Text>
                            <Text style={styles.orderInfotext}>32 minutes ago</Text>
                        </View>
                        <View style={styles.orderHolder}>
                            <Text style={styles.customerInfotext}>Adeleke Juliana at Apo District, Abuja</Text>
                        </View>
                    </View>
                </View>
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
        padding:Theme.sizes[3]
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerText:{
        fontSize:24,
        fontWeight:'bold',
        color:Theme.colors.ui.nurseGray
    },
    subHeadText:{
        color:Theme.colors.text.secondary
    },
    rightContent:{
        width:48,
        height:48,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    recentTitle:{
        fontSize:Theme.fonts.fontSize.h5,
        marginTop:Theme.sizes[3],
        marginBottom:Theme.sizes[2],
    },
    orderPill:{
        flexDirection:'row',
        padding:Theme.sizes[2],
        backgroundColor:Theme.colors.ui.nurseGreen,
        borderRadius:8,
        marginBottom:Theme.sizes[2]
    },
    orderThumbnail:{
        height:80,
        width:100,
        borderRadius:8,
        marginRight:Theme.sizes[2]
    },
    orderDetails:{
        flex:1
    },
    ordertext:{
        fontWeight:'bold',
        margin:Theme.sizes[1]
    },
    orderHolder:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    orderInfotext:{

    },
    customerInfotext:{

    }
})