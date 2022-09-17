import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from '../screens/Home';
import { Intro } from '../screens/Intro';
import { Signup } from '../screens/Signup';
import { Login } from '../screens/Login';
import { Profile } from "../screens/Profile";
import { Notifications } from "../screens/Notifications";
import { History } from "../screens/History";
import {Services} from "../screens/Services";
import { AddService } from "../screens/providers/AddService";

const Stack = createNativeStackNavigator();

export function StackNavigation () {
    return(
        <Stack.Navigator initialRouteName="Intro" >
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:true}} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Services" component={Services} options={{headerShown:false}} />
            <Stack.Screen name="AddService" component={AddService} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}