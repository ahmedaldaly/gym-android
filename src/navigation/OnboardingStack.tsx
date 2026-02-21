import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import OnboardingThirdScreen from "../screens/OnboardingScreen/screen/OnboardingThirdScreen/OnboardingThirdScreen";
import OnboardingSecondScreen from "../screens/OnboardingScreen/screen/OnboardingSecondScreen/OnboardingSecondScreen";

const stack = createNativeStackNavigator()

export default function OnboardingStack () {
    return (
        <stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <stack.Screen name="main" component={OnboardingScreen}/>
            <stack.Screen name="second" component={OnboardingSecondScreen}/>
            <stack.Screen name="third" component={OnboardingThirdScreen}/>
        </stack.Navigator>
    )
}