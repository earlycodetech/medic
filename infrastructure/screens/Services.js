import { View,Text,StyleSheet,SafeAreaView,ScrollView,Platform,StatusBar,FlatList } from 'react-native';
import { Card,Title,Button } from 'react-native-paper';
import { Theme } from '../components/Theme';

const services = [
    {
        id:'yeettethhh',
        price:98000,
        by:'Apex Medical Emergencies',
        category:'Ambulance',
        title:'15 Mins. Helicopter Ambulance',
        imageUrl:'https://images.pexels.com/photos/1486842/pexels-photo-1486842.jpeg',
        description:'This helicopter service is available for all medical emergencies within a 80 km radius'
    },
    {
        id:'e545ettethha',
        price:42500,
        by:'Red Cells BioMedicals',
        category:'Suppliment',
        title:'Blood Bank (All Groups)',
        imageUrl:'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
        description:'Available for all blood groups. The supplies are stored at the recommended temperatures within the WHO prescribed best practices'
    },
    {
        id:'jj673gefebdgdyu',
        price:32000,
        by:'Bone Fix House',
        category:'Therapy',
        title:'Bone Therapy for Athletes',
        imageUrl:'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
        description:'This therapy is designed for professional athletes who want to peak their performance in every game'
    },
];

export function Services({navigation}){
    return(
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <View style={styles.servicesList}>
                    <FlatList 
                    data={services}
                    renderItem={({item}) => {
                        return(
                            <Card style={{marginBottom:Theme.sizes[2]}}>
                                <Card.Cover source={{ uri: item.imageUrl }} />
                                <Card.Title title={item.title} subtitle={item.by}/>
                                <Card.Content>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.priceRowText}>NGN{item.price}</Text>
                                        <Text style={styles.priceRowText}>{item.category}</Text>
                                    </View>
                                </Card.Content>
                                <Card.Actions>
                                    <Button 
                                    mode='contained' 
                                    color={Theme.colors.ui.nursePurple}
                                    contentStyle={{paddingHorizontal:8}}
                                    >Order</Button>
                                </Card.Actions>
                            </Card>
                        )
                    }}
                    key={({item}) => item.id}
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