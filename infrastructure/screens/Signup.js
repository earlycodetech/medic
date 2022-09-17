import { useState, useEffect, useCallback } from 'react';
import { View,Text,StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Questrial_400Regular } from '@expo-google-fonts/questrial';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { Button,TextInput } from 'react-native-paper';
import { Theme } from '../components/Theme';
import {authentication,db} from '../../services/firebase';
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';

export function Signup({navigation}){
    const [appIsReady, setAppIsReady] = useState(false);
    const [accountType,setAccountType] = useState('individual');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [desc,setDesc] = useState('');

    //timestamp generator
    const getNewTimestamp = () => {
        const now = new Date();
        return now.getTime();
    }

    const providerRecordTemplate = {
        accountType:accountType,
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phone,
        ratings:[4,5,2,3,5],
        geoPoint:{Latitude:9.776353535,Longitude:3.5454455454},
        specialization:'Community Pharmacy',
        specialties:['Therapy','Community Pharmacy','Clinical Pharmacy'],
        description:'Haven worked in the public sector for more than 15 years, I have gathered lots of experiences',
        timestamp:getNewTimestamp()
    }

    const customerRecordTemplate = {
        accountType:accountType,
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phone,
        geoPoint:{Latitude:9.776353535,Longitude:3.5454455454},
        timestamp:getNewTimestamp()
    }

    //create an authenticated user
    function CreateUserAuth () {
        createUserWithEmailAndPassword(authentication,email,password)
        .then(() => onAuthStateChanged(authentication,(user)=>{
            const userUID = user.uid;
            let userRecords;

            if(accountType==='provider'){
                userRecords = providerRecordTemplate;
            }else if(accountType === 'individual'){
                userRecords = customerRecordTemplate;
            }

            //insert other records to firestore
            setDoc(doc(db,'users',userUID),userRecords)
            .then(()=> navigation.navigate('Home',{userUID:userUID}))
            .catch(() => Alert.alert(
                'Status',
                'Failed while interracting with database',
                [{text:'Back to Intro',onPress:navigation.navigate('Login')}]
            ))
        }))
        .catch(() => Alert.alert(
            'Status',
            'Failed while interracting with database',
            [{text:'Back to Intro',onPress:navigation.navigate('Intro')}]
        ))
    }

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
                <ScrollView>
                    <View style={styles.brandBlock}>
                        <FontAwesomeIcon icon={faCross} 
                        size={Theme.sizes[4]}  
                        color={Theme.colors.brand.brandRed} />
                        <Text style={styles.brandName}>medic</Text>
                    </View>

                    <Text style={styles.headText}>Get Started</Text>

                    <View style={styles.btnGroup}>
                        <Button mode='contained' 
                        color={Theme.colors.ui.nursePurple} 
                        style={{paddingVertical:Theme.sizes[3],marginRight:Theme.sizes[2]}}
                        onPress={() => {
                            setAccountType('individual')
                        }}
                        >Individual</Button>

                        <Button mode='contained' 
                        color={Theme.colors.ui.nurseGray} 
                        style={{paddingVertical:Theme.sizes[3]}}
                        onPress={() => {
                            setAccountType('provider')
                        }}
                        >Service provider</Button>
                    </View>

                    <Text style={styles.subHeading}>
                        {accountType == 'individual' ? 'Create an individual account' : 'Create a provider account'} 
                    </Text>

                    <TextInput label='First name' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput label='Last name' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    onChangeText={(text) => setLastName(text)}
                    />
                    <TextInput label='Phone number' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    keyboardType='phone-pad'
                    onChangeText={(text) => setPhone(text)}
                    />
                    <TextInput label='email address' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    keyboardType='email-address'
                    onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput label='Create password' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput label='Confirm password' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    secureTextEntry={true}
                    />

                    {/* only show input if accountType is provider */}
                    { 
                    accountType == 'provider' ?
                    <TextInput label='Describe your work' 
                    mode='outlined'
                    outlineColor={Theme.colors.bg.tertiary} 
                    activeOutlineColor={Theme.colors.bg.quartenary}
                    multiline={true}
                    />
                    :
                    null
                    }

                    <Button mode='contained' 
                    color={accountType == 'provider' ? Theme.colors.ui.nurseGray : Theme.colors.ui.nursePurple} 
                    style={{
                        paddingVertical:Theme.sizes[3],
                        marginTop:Theme.sizes[2],
                    }}
                    onPress={CreateUserAuth}
                    >Create account</Button>

                    {/* navigating to login screen */}
                    <View style={styles.textInline}>
                        <Text style={styles.ctaText}>Already have an account? </Text>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={[
                                styles.ctaText,
                                {color:Theme.colors.ui.nursePurple}
                            ]}>Go to login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    brandBlock:{
        flexDirection:'row',
        alignItems:'center'
    },
    brandName:{
        fontSize:34,
        fontFamily:'Questrial_400Regular',
    },
    headText:{
        fontSize:45,
        marginVertical:Theme.sizes[4],
    },
    btnGroup:{
        flexDirection:'row',
    },
    subHeading:{
        fontSize:24,
        marginVertical:Theme.sizes[3],
    },
    textInline:{
        flexDirection:'row',
        marginVertical:Theme.sizes[2],
    },
    ctaText:{
        fontSize:16
    }
})