import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { styles } from './Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query';
import { getWorkoutPlan } from './WorkoutPlan.api';
import { WorkoutDayType, WorkoutExerciseType, WorkoutPlanResponseType } from './WorkoutPlan.type';
import Video from 'react-native-video';

export default function WorkoutPlan() {
    const navigation = useNavigation<any>();
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    const { data, isLoading, isError, error } = useQuery<WorkoutPlanResponseType>({
        queryKey: ['workoutPlan'],
        queryFn: getWorkoutPlan
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7B2FF7" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading plan: {(error as Error).message}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#000' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const workoutPlan = data?.workoutPlan;
    const workoutDays = workoutPlan?.workoutDays || [];
    const activeDay = workoutDays[activeDayIndex];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <View style={styles.heroContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.heroTitle}>{workoutPlan?.goal || 'Workout Plan'}</Text>
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
                                    style={{ width: '100%', height: '100%', borderRadius: 15 , overflow:'hidden' }}
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
                    <Text style={{ color: '#666', textAlign: 'center', marginTop: 50 }}>
                        No exercises for this day.
                    </Text>
                )}
            />
        </SafeAreaView>
    )
}