import { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    ImageBackground, 
    TouchableOpacity,
    FlatList,
    Image
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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../components/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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

const topProviders = [
    {id:1,proName:'Mayo Clinic',rating:[4,5,5,5,4,4,5],logo:'https://cdn-icons-png.flaticon.com/512/2869/2869818.png'},
    {id:2,proName:'Z Maternity',rating:[5,5,3,5,4,4,4],logo:'https://cdn-icons-png.flaticon.com/512/1048/1048611.png'},
    {id:3,proName:'Bio Pharm',rating:[4,5,4,5,4,4,3],logo:'https://cdn-icons-png.flaticon.com/512/8355/8355694.png'},
    {id:4,proName:'Heart Clinic',rating:[3,5,5,4,4,4,5],logo:'https://cdn-icons-png.flaticon.com/512/3901/3901586.png'},
    {id:5,proName:'Sky Clinic',rating:[3,5,5,5,2,4,3],logo:'https://cdn-icons-png.flaticon.com/512/8353/8353823.png'},
    {id:6,proName:'Synapse Lab',rating:[4,5,4,5,4,4,4],logo:'https://cdn-icons-png.flaticon.com/512/8351/8351887.png'},
];

const HomeScreen = () => {
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

                <View style={styles.topProvidersBlock}>
                    <Text style={styles.topProvidersHeading}>Most rated providers</Text>
                    <FlatList 
                    data={topProviders}
                    renderItem={({item}) => (
                        <View style={styles.providerItem}>
                            <Image source={{uri:item.logo}} style={styles.providerLogo} />
                            <View style={styles.providerDetails}>
                                <Text style={styles.providerName}>{item.proName}</Text>
                                <View style={styles.rating}>
                                    <FontAwesomeIcon icon={faStar} color='orange' size={Theme.sizes[4]} />
                                    <FontAwesomeIcon icon={faStar} color='orange' size={Theme.sizes[4]} />
                                    <FontAwesomeIcon icon={faStar} color='orange' size={Theme.sizes[4]} />
                                    <FontAwesomeIcon icon={faStar} color='orange' size={Theme.sizes[4]} />
                                    <FontAwesomeIcon icon={faStarHalf} color='orange' size={Theme.sizes[4]} />
                                </View>
                            </View>
                        </View>
                    )}
                    key={item => item.id}
                    horizontal={true}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

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
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
        </Tab.Navigator>
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
    },
    topProvidersBlock:{
        marginVertical:Theme.sizes[3]
    },
    topProvidersHeading:{
        color:Theme.colors.ui.darkGreen,
        fontSize:Theme.fonts.fontSize.body,
        fontWeight:'bold',
        marginBottom:Theme.sizes[1]
    },
    providerItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginRight:Theme.sizes[1],
        padding:Theme.sizes[4],
        backgroundColor:Theme.colors.ui.darkGreen,
    },
    providerLogo:{
        width:64,
        height:64,
        marginRight:Theme.sizes[1]
    },
    providerDetails:{

    },
    providerName:{
        color:'#fff',
        fontSize:Theme.fonts.fontSize.h5,
    },
    rating:{
        flexDirection:'row'
    }
})