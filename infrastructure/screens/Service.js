import { useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,Image,TouchableOpacity, ScrollView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { Theme } from '../components/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleUp, faLocationDot, faNoteSticky,faWallet } from '@fortawesome/free-solid-svg-icons';

export function Service () {
    const [tap,setTap] = useState(false);

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.serviceHeaders}>
                        <Image 
                        source={require('../../assets/images/services/diagnosis-service.jpg')} 
                        style={styles.serviceImg}
                        />
                        <View style={styles.headersInfo}>
                            <Text style={styles.title}>Diagnosis for Need of Bone Calcium</Text>
                            <View style={styles.subHeadersInfo}>
                                <TouchableOpacity>
                                    <Text style={styles.subHeadersText}>Diagnosis</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.subHeadersText}>Z Medicals</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addressInfo}>
                                <FontAwesomeIcon icon={faLocationDot} 
                                size={Theme.sizes[3]} 
                                color={Theme.colors.brand.brandGreen} 
                                style={{marginRight:4}}/>
                                <Text style={styles.address}>78 Aminu Kano Crescent, Wuse 2, Abuja, Nigeria</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.serviceDesc}>
                        <View style={styles.descHeaders}>
                            <View style={styles.description}>
                                <FontAwesomeIcon icon={faNoteSticky} 
                                size={Theme.sizes[3]} 
                                color={Theme.colors.brand.brandGreen} 
                                style={{marginRight:4}}/>
                                <Text style={styles.descInfo}>Description</Text>
                            </View>
                            <View style={styles.price}>
                                <FontAwesomeIcon icon={faWallet} 
                                size={Theme.sizes[3]} 
                                color={Theme.colors.brand.brandGreen} 
                                style={{marginRight:4}}/>
                                <Text style={styles.priceInfo}>NGN23,500</Text>
                            </View>
                        </View>
                        <Text>
                            Z Medicals Laboratory is a state of the art laboratory in the city of Abuja, 
                            which offers a fully automated laboratory services in various sub-specialties. 
                            With the innovative use of new technologies.
                        </Text>
                    </View>
                    <View style={styles.serviceActions}>
                        <TouchableOpacity 
                        style={styles.bookingBlock}
                        onPress={() => {
                            if(!tap){
                                setTap(true)
                            }else if (tap){
                                setTap(false)
                            }
                        }}
                        >
                            <View style={styles.actionRow}>
                                <Text style={styles.actionText}>BOOK THIS SERVICE</Text>
                                <FontAwesomeIcon icon={tap ? faAngleDown : faAngleUp} />
                            </View>
                            <View style={[styles.bookNow,
                                {display:tap ? 'none' : null}]}>
                                <TextInput placeholder='search your location'
                                style={{marginBottom:Theme.sizes[3]}}
                                outlineColor={Theme.colors.ui.nursePurple}
                                activeOutlineColor={Theme.colors.bg.tertiary}
                                mode='outlined'
                                ></TextInput>
                                <Button 
                                mode='contained'
                                contentStyle={{paddingVertical:Theme.sizes[2]}}
                                color={Theme.colors.ui.nursePurple}
                                >BOOK NOW</Button>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    areaView:{
        flex:1
    },
    container:{
        flex:1,
        padding:Theme.sizes[3],
    },
    serviceHeaders:{
        flex:1,
        flexDirection:'row',
        padding:Theme.sizes[2],
        marginBottom:Theme.sizes[3],
        backgroundColor:Theme.colors.bg.secondary,
        borderWidth:1,
        borderColor:Theme.colors.bg.tertiary,
        borderRadius:8
    },
    serviceImg:{
        width:120,
        height:'100%',
        marginRight:Theme.sizes[2],
        borderRadius:8
    },
    headersInfo:{
        flex:1
    },
    title:{
        fontSize:Theme.fonts.fontSize.h5,
        color:Theme.colors.brand.brandDark,
        fontWeight:'bold'
    },
    subHeadersInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:Theme.sizes[2]
    },
    subHeadersText:{
        fontWeight:'bold',
        color:Theme.colors.ui.nurseGray
    },
    addressInfo:{
        flexDirection:'row'
    },
    serviceDesc:{
        flex:1,
        padding:Theme.sizes[2],
        marginBottom:Theme.sizes[3],
        backgroundColor:Theme.colors.bg.secondary,
        borderWidth:1,
        borderColor:Theme.colors.bg.tertiary,
        borderRadius:8
    },
    descHeaders:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:Theme.colors.ui.nurseDullGreen,
        paddingBottom:Theme.sizes[3],
        marginBottom:Theme.sizes[3],
    },
    description:{
        flexDirection:'row',
        alignItems:'center'
    },
    price:{
        flexDirection:'row',
        alignItems:'center'
    },
    descInfo:{
        fontWeight:'bold'
    },
    priceInfo:{
        fontWeight:'bold'
    },
    serviceActions:{
        paddingHorizontal:Theme.sizes[2],
        paddingVertical:Theme.sizes[4],
        backgroundColor:Theme.colors.bg.secondary,
        borderWidth:1,
        borderColor:Theme.colors.bg.tertiary,
        borderRadius:8
    },
    actionRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    actionText:{
        fontWeight:'bold'
    }
});