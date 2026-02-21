import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import AuthStack from "./AuthStack";
import Tabs from "./Tabs";
import OnboardingStack from './OnboardingStack'
import { RootStackParamList } from './types'
import { useAuthStore } from "../store/UseAuthStore";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function RootStack() {
    const { token, _hasHydrated } = useAuthStore();

    if (!_hasHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#1E3A8A" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {token ? (
                <Stack.Screen name="tabs" component={Tabs} />
            ) : (
                <>
                    <Stack.Screen name="onboarding" component={OnboardingStack} />
                    <Stack.Screen name="auth" component={AuthStack} />
                </>
            )}
        </Stack.Navigator>
    )
}