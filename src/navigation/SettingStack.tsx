import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingPage from "../screens/Setting/SettingPage";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import InviteScreen from "../screens/Invite/InviteScreen";
import SubscriptionScreen from "../screens/Subscription/SubscriptionScreen";

const Stack = createNativeStackNavigator();

export default function SettingStack() {
    return (
        <Stack.Navigator
            screenOptions={
                { headerShown: false }
            }
        >
            <Stack.Screen name="SettingPage" component={SettingPage} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="InviteScreen" component={InviteScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        </Stack.Navigator>
    );
}