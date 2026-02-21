import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPasswordSendCodeScreen from "../screens/LoginScreen/ForgetPassword/ForgetPasswordSendCodeScreen";
import VerifayCode from "../screens/LoginScreen/ForgetPassword/VerfiyCode/VerifayCode";
const Stack = createNativeStackNavigator()
export default function ForgetPasswordStack() {
    return (
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="ForgetPasswordSendCodeScreen" component={ForgetPasswordSendCodeScreen} />
            <Stack.Screen name="VerifayCode" component={VerifayCode} />
        </Stack.Navigator>
    )
}
