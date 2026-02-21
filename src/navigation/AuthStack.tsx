import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterStack from "./RegisterStack";
import ForgetPasswordStack from "./ForgetPasswordStack";
const Stack = createNativeStackNavigator()
export default function () {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterStack} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordStack} />
        </Stack.Navigator>
    )
} 