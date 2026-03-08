import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { styles } from './Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query';
import { getWorkoutPlan, useGetPersonalizedPlan, useGenerateWorkoutPlan } from './WorkoutPlan.api';
import { useGetSubscriptionByUser } from '../Subscription/Subscription.api';
import { WorkoutDayType, WorkoutExerciseType, WorkoutPlanResponseType } from './WorkoutPlan.type';
import Video from 'react-native-video';

export default function WorkoutPlan() {
    const navigation = useNavigation<any>();
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    // Context & Status
    const { data: userSubResponse, isLoading: loadingSub } = useGetSubscriptionByUser();
    const isActiveSub = userSubResponse?.subscription?.is_active || false;

    // Plans
    const { data: freePlanData, isLoading: loadingFreePlan } = useQuery<WorkoutPlanResponseType>({
        queryKey: ['workoutPlan_free'],
        queryFn: getWorkoutPlan,
        enabled: !isActiveSub // Only fetch free plan if not subscribed
    });

    const { data: personalizedPlanData, isLoading: loadingPersonalPlan, error: personalPlanError, refetch: refetchPersonalPlan } = useGetPersonalizedPlan();
    const { mutate: generatePlan, isPending: generatingPlan } = useGenerateWorkoutPlan();

    const hasTriggeredGeneration = useRef(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // AI Generation Logic
    useEffect(() => {
        if (!isActiveSub || loadingSub || loadingPersonalPlan || generatingPlan) return;

        const needsPlan = personalPlanError || (personalizedPlanData && !personalizedPlanData.workoutPlan);

        if (needsPlan && !hasTriggeredGeneration.current) {
            hasTriggeredGeneration.current = true;
            setIsGenerating(true);

            generatePlan(undefined, {
                onSuccess: () => {
                    refetchPersonalPlan().finally(() => setIsGenerating(false));
                },
                onError: () => {
                    setIsGenerating(false);
                }
            });
        }
    }, [isActiveSub, personalPlanError, personalizedPlanData, loadingSub, loadingPersonalPlan, generatingPlan]);

    const activeWorkoutData = isActiveSub ? personalizedPlanData : freePlanData;
    const isMainLoading = loadingSub || (isActiveSub && loadingPersonalPlan && !isGenerating) || (!isActiveSub && loadingFreePlan);

    if (isMainLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7B2FF7" />
                <Text style={{ marginTop: 10, color: '#666' }}>Loading plan...</Text>
            </View>
        );
    }

    if (isActiveSub && (isGenerating || generatingPlan)) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4cd964" />
                <Text style={localStyles.loadingTitle}>Generating AI Workout Plan...</Text>
                <Text style={localStyles.loadingSub}>Please wait, tailoring exercises for you...</Text>
            </View>
        );
    }

    const workoutPlan = activeWorkoutData?.workoutPlan;
    const workoutDays = workoutPlan?.workoutDays || [];
    const activeDay = workoutDays[activeDayIndex];

    if (!workoutPlan) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Could not load a workout plan.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#000' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <View style={styles.heroContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" color="#000" size={24} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.heroTitle}>
                        {workoutPlan?.goal || 'Workout Plan'}
                    </Text>
                    {!isActiveSub && (
                        <View style={localStyles.freeBadge}>
                            <Text style={localStyles.freeBadgeText}>Free Plan</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="info-outline" color="#000" size={24} />
                </TouchableOpacity>
            </View>

            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.daySelector}
                >
                    {workoutDays.map((day, index) => (
                        <TouchableOpacity
                            key={day.id}
                            style={[
                                styles.dayTab,
                                activeDayIndex === index && styles.activeDayTab
                            ]}
                            onPress={() => setActiveDayIndex(index)}
                        >
                            <Text style={[
                                styles.dayTabText,
                                activeDayIndex === index && styles.activeDayTabText
                            ]}>
                                Day {day.day_index}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={activeDay?.exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.exerciseCard}>
                            <View style={styles.exerciseImage}>
                                <Video
                                    source={{ uri: item.exercise.video }}
                                    style={{ width: '100%', height: '100%', borderRadius: 15, overflow: 'hidden' }}
                                    paused={true}
                                    resizeMode="cover"
                                    muted={true}
                                />
                            </View>
                            <View style={styles.exerciseInfo}>
                                <Text style={styles.exerciseName}>{item.exercise.name}</Text>
                                <View style={styles.exerciseDetails}>
                                    <View style={styles.detailItem}>
                                        <MaterialIcons name="repeat" size={16} color="#7B2FF7" />
                                        <Text style={styles.detailText}>{item.sets} Sets</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <MaterialIcons name="fitness-center" size={16} color="#7B2FF7" />
                                        <Text style={styles.detailText}>{item.reps} Reps</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetails' as never, { exercise: item } as never)}>
                                <MaterialIcons name="play-circle-outline" size={32} color="#7B2FF7" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponent={() => (
                    <Text style={styles.sectionTitle}>{activeDay?.title || 'Exercises'}</Text>
                )}
                ListEmptyComponent={() => (
                    <View style={localStyles.emptyContainer}>
                        <MaterialIcons name="airline-seat-flat" size={60} color="#ccc" />
                        <Text style={localStyles.emptyText}>Rest Day</Text>
                        <Text style={localStyles.emptySub}>Take a break to recover your muscles.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    loadingTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    loadingSub: {
        marginTop: 8,
        fontSize: 14,
        opacity: 0.6,
        textAlign: 'center',
        color: '#000',
        paddingHorizontal: 20,
    },
    freeBadge: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginTop: 4,
    },
    freeBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    emptySub: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    }
});