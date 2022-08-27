import { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    ImageBackground, 
    TouchableOpacity,
    FlatList
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Questrial_400Regular } from '@expo-google-fonts/questrial';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../components/Theme';

// service component names
const services = [
    {id:1,serviceName:'Diagnosis',serviceIcon:faStethoscope},
    {id:2,serviceName:'Consultation',serviceIcon:faUserDoctor},
    {id:3,serviceName:'Clinic',serviceIcon:faHouseMedical},
    {id:4,serviceName:'Ambulance',serviceIcon:faTruckMedical},
    {id:5,serviceName:'Therapy',serviceIcon:faPerson},
    {id:6,serviceName:'Prescription',serviceIcon:faFileLines},
    {id:7,serviceName:'Medicine',serviceIcon:faPills},
    {id:8,serviceName:'Articles',serviceIcon:faNewspaper},
];

export function Home({navigation}){
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

               <View style={styles.searchContainer}>
                    <TextInput style={styles.search} placeholder='search health service' />
                    <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} size={20} />
               </View>

                <ImageBackground 
                source={require('../../assets/images/nurse.jpg')}
                resizeMode='cover'
                style={styles.headerBg}
                borderRadius={10}
                >
                   <View style={styles.headerBgLayer}>
                        <Text style={styles.brandMessage}>Skilled medical</Text>
                        <Text style={styles.brandMessage}>professionals</Text>
                        <Text style={styles.brandMessageSmall}>for all medical emergencies</Text>
                   </View>
                </ImageBackground>

                <Text style={styles.servicesheading}>What do you need?</Text>
                <View style={styles.serviceRow}>
                    {
                        Object.values(services).map(item => (
                            <TouchableOpacity style={styles.service}>
                                <FontAwesomeIcon 
                                icon={item.serviceIcon} 
                                size={38}
                                style={{marginBottom:6}} 
                                color='white'
                                />
                                <Text style={styles.serviceName}>
                                    {item.serviceName.length > 9 ? item.serviceName.slice(0,7) + '.' : item.serviceName}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    areaView:{
        flex:1,
    },
    container:{
        flex:1,
        padding:Theme.sizes[3],
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerText:{
        fontSize:Theme.fonts.fontSize.h5,
        fontWeight:'bold',
        color:Theme.colors.ui.nursePurple
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
    search:{
        borderWidth:1,
        borderRadius:50,
        borderColor:Theme.colors.bg.quartenary,
        padding:Theme.sizes[3],
        paddingLeft:46,
    },
    searchContainer:{
        marginVertical:Theme.sizes[2] //new
    },
    searchIcon:{
        position:'absolute',
        top:14,
        left:14
    },
    headerBg:{
        height:200
    },
    headerBgLayer:{
        flex:1,
        padding:Theme.sizes[3],
        backgroundColor:'rgba(189,242,213,0.4)',
        borderRadius:10
    },
    brandMessage:{
        fontSize:Theme.fonts.fontSize.h4,
        fontWeight:'bold',
        color:'white',
        shadowColor:'black',
        shadowOffset:{width:4,height:4},
        shadowRadius:4,
        shadowOpacity:0.8,
        elevation:5,
    },
    brandMessageSmall:{
        color:'white',
        fontSize:Theme.fonts.fontSize.title,
        fontWeight:'bold',
        marginTop:Theme.sizes[3],
        shadowColor:'black',
        shadowOffset:{width:2,height:4},
        shadowRadius:2,
        shadowOpacity:0.8,
        elevation:5,
    },
    servicesheading:{
        fontSize:Theme.fonts.fontSize.body,
        marginVertical:Theme.sizes[2]//new
    },
    serviceRow:{
        flexDirection:'row',
        justifyContent:'space-evenly',//new
        flexWrap:'wrap', //new
        backgroundColor:Theme.colors.ui.nurseGreen, //new
        paddingTop:Theme.sizes[3],//new
        borderRadius:10, //new
    },
    service:{
        height:80,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:Theme.sizes[3],//new
        backgroundColor:Theme.colors.ui.darkGreen,
        borderRadius:10
    },
    serviceName:{
        color:'white',
        fontWeight:'bold'
    }
})