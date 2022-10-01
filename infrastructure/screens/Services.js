import { useState,useEffect } from 'react';
import { View,Text,StyleSheet,SafeAreaView,Platform,StatusBar,FlatList,Alert } from 'react-native';
import { Card,Button } from 'react-native-paper';
import { Theme } from '../components/Theme';
import { db } from '../../services/firebase';
import { onSnapshot, collection, getDoc, doc } from 'firebase/firestore';

export function Services({navigation}){
    const [services,setServices] = useState([]);
    const [providerName,setProviderName] = useState(''); //for holding provider name

    useEffect(() => {
        const allServices = [];

        onSnapshot(collection(db,'services'),(onSnap) => {
            onSnap.forEach(item => {
                const itemData = item.data();
                itemData.docId = item.id;
                allServices.push(itemData);
                setServices(allServices);
            })
        })
    },[]);

    // function ProviderName(docId = 'SYWgIcSEy2QCNu5Wh0RlZPpZj6w1'){
    //      //query tp get provider name
    //      const fullName = getDoc(doc(db,'users',docId))
    //      .then((document) => {
    //          const docData = document.data();
    //          return docData.firstName + ' ' + docData.lastName;
    //      })
    //      .catch(error => {
    //          Alert.alert('Error Response',error,[{text:'Okay'}])
    //      })

    //      return fullName;
    // }

    function ServiceCard(service){
        //display provider with the rest of the data
        return(
            <Card style={{marginBottom:Theme.sizes[2]}}>
                <Card.Cover source={{ uri: service.imageUrl }} />
                <Card.Title title={service.title} subtitle={'name'}/>
                <Card.Content>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceRowText}>NGN{service.price}</Text>
                        <Text style={styles.priceRowText}>{service.category}</Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button 
                    mode='contained' 
                    color={Theme.colors.ui.nursePurple}
                    contentStyle={{paddingHorizontal:8}}
                    onPress={() => navigation.navigate('Service',{serviceUID:service.docId})}
                    >View Details</Button>
                </Card.Actions>
            </Card>
        )
       
    }

    return(
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <View style={styles.servicesList}>
                    <FlatList 
                    data={services}
                    renderItem={({item}) => {
                        return ServiceCard(item)
                    }}
                    key={({item}) => item.docId}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
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
    priceRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    priceRowText:{
        color:'gray'
    }
})