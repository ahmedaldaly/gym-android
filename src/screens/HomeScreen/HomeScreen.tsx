import React from 'react'
import { View, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../hooks/useThemeColors';
import Header from './components/Header/Header';
import Subsicription from './Subsicription/Subsicription';
import ProgressSection from './Progress/Progress';
import { Dimensions } from 'react-native';
import { useAuthStore } from '../../store/UseAuthStore';
import Actions from './Actions/Actions';
import { useGetUserPlan } from './Home.api';
const HomeScreen = () => {
    const colors = useThemeColors();
    const windowWidth = Dimensions.get('window').width;
    const { user, loading: authLoading, _hasHydrated } = useAuthStore();
    const { data: planData, isLoading: planLoading } = useGetUserPlan();

    // لو لسه بنحمل البيانات أو الاستور لسه مكملش الهيدريشن، نعرض لودينج
    if (!_hasHydrated || ((authLoading || planLoading) && !user)) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color="#F472B6" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F472B6' }} edges={['top']}>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#f6f1f1ff' }}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#F472B6'}
                />

                <Header name={user?.firstName || 'User'} />
                <Subsicription data={planData} />
                <Actions />
                <ProgressSection />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen