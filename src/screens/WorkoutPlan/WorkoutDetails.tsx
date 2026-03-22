import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import { styles } from './Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { WorkoutExerciseType } from './WorkoutPlan.type';
import Video, { VideoRef } from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
type RootStackParamList = {
    WorkoutDetails: { exercise: WorkoutExerciseType };
};

type WorkoutDetailsRouteProp = RouteProp<RootStackParamList, 'WorkoutDetails'>;

export default function WorkoutDetails() {
    const navigation = useNavigation();
    const route = useRoute<WorkoutDetailsRouteProp>();
    const { exercise: workoutExercise } = route.params;
    const { exercise } = workoutExercise;
    const videoRef = useRef<VideoRef>(null);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);

    return (
        <SafeAreaView style={styles.detailsContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: exercise.video }}
                        ref={videoRef}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                        onLoad={() => setLoading(false)}
                        paused={paused}
                        repeat={true}
                        onError={(e) => console.log('Video Playback Error:', e)}
                    />
                    
                    {loading && (
                        <View style={{ position: 'absolute', zIndex: 5 }}>
                            <ActivityIndicator size="large" color="#7B2FF7" />
                        </View>
                    )}

                    <TouchableOpacity 
                        style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back-ios" color="#FFF" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ 
                            position: 'absolute', 
                            bottom: 20, 
                            right: 20, 
                            backgroundColor: 'rgba(0,0,0,0.5)', 
                            borderRadius: 20, 
                            padding: 8,
                            zIndex: 10
                        }}
                        onPress={() => setPaused(!paused)}
                    >
                        <MaterialIcons 
                            name={paused ? "play-arrow" : "pause"} 
                            color="#FFF" 
                            size={24} 
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContent}>
                    <Text style={styles.detailsTitle}>{exercise.name}</Text>
                    
                    <View style={styles.tagContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{exercise.level}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Muscle ID: {exercise.muscle_id}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{exercise.gender}</Text>
                        </View>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{workoutExercise.sets}</Text>
                            <Text style={styles.statLabel}>Sets</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{workoutExercise.reps}</Text>
                            <Text style={styles.statLabel}>Reps</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{workoutExercise.calories_target}</Text>
                            <Text style={styles.statLabel}>Kcal</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionTitle}>Instructions</Text>
                    <Text style={styles.descriptionText}>
                        Perform {workoutExercise.sets} sets of {workoutExercise.reps} repetitions. 
                        Focus on proper form and controlled movements. 
                    </Text>

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
