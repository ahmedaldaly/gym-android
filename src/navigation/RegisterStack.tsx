import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/LoginScreen/Register/RegisterScreen";
import SacandRegisterScreen from "../screens/LoginScreen/Register/SacandRegister/SacandRegisterScreen";
import MainRegisterScreen from "../screens/LoginScreen/Register/mainRegister/MainRegisterScreen";
const Stack = createNativeStackNavigator()
export default function RegisterStack() {
    return (
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="SacandRegisterScreen" component={SacandRegisterScreen} />
            <Stack.Screen name="MainRegisterScreen" component={MainRegisterScreen} />
        </Stack.Navigator>
    )
}
