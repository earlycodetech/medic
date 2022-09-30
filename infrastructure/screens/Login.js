import { useState} from 'react';
import { View,Text,StyleSheet,SafeAreaView,ScrollView,Platform,StatusBar,FlatList } from 'react-native';
import { Theme } from '../components/Theme';
import { TextInput,Button } from 'react-native-paper';
import { authentication } from '../../services/firebase';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

export function Login({navigation}){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function LoginAuth(){
        signInWithEmailAndPassword(authentication,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            onAuthStateChanged(authentication,(currentUser) => {
                navigation.navigate('Home',{
                    userUID:currentUser.uid,
                })
            })
        })
    }

    //global scope
    //useContext

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <Text style={styles.headText}>Login to your account</Text>

                <TextInput label='email address' 
                mode='outlined'
                outlineColor={Theme.colors.bg.tertiary} 
                activeOutlineColor={Theme.colors.bg.quartenary}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                />

                <TextInput label='Password' 
                mode='outlined'
                outlineColor={Theme.colors.bg.tertiary} 
                activeOutlineColor={Theme.colors.bg.quartenary}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                />
                <Button mode='contained' 
                color={Theme.colors.ui.nurseGray} 
                style={{
                    paddingVertical:Theme.sizes[3],
                    marginTop:Theme.sizes[2],
                }}
                onPress={LoginAuth}
                >Login</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    areaView:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : null
    },
    container:{
        flex:1,
        paddingHorizontal:Theme.sizes[3],
        paddingBottom:Theme.sizes[3],
    },
    headText:{
        marginTop:Theme.sizes[3],
        fontWeight:'bold',
        color:Theme.colors.ui.nurseGray
    }
})