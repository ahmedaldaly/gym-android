import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DaitPlan from "../screens/DaitPlan/DaitPlan";
import WorkoutPlan from "../screens/WorkoutPlan/WorkoutPlan";
import WorkoutDetails from "../screens/WorkoutPlan/WorkoutDetails";

const Stack = createNativeStackNavigator()

export default function HomeStack  (){
    return (
        <Stack.Navigator  screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DaitPlan" component={DaitPlan} />
            <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} />
            <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
        </Stack.Navigator>
    )
}