import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './Style';
import { ProfileResponseType } from '../../../auth/Auth.type';
import { scale, moderateScale } from 'react-native-size-matters';

interface ProgressSectionProps {
  data?: ProfileResponseType['user'] | null;
}

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  text: string;
}

const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  color,
  text,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  const center = size / 2;

  return (
    <View style={styles.progressWrapper}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={moderateScale(2)}
          fill="transparent"
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>

      <Text numberOfLines={1} style={styles.progressText}>
        {text}
      </Text>
    </View>
  );
};

export default function ProgressSection({ data }: ProgressSectionProps) {
  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.weightCard}>
        <View style={styles.weightInfo}>
          <Text numberOfLines={1} style={styles.weightLabel}>
            Current Weight
          </Text>

          <Text numberOfLines={1} style={styles.weightValue}>
            {data?.weight ?? 0} kg
          </Text>

          <Text numberOfLines={1} style={styles.goalLabel}>
            Goal: {data?.goal ?? '-'}
          </Text>
        </View>

        <CircularProgress
          size={scale(90)}
          strokeWidth={moderateScale(10)}
          progress={75}
          color="#60A5FA"
          text={`${data?.weight ?? 0} KG`}
        />
      </View>

      {/* Bottom Row */}
      <View style={styles.row}>
        {/* Workouts */}
        <View style={[styles.smallCard, styles.cardMargin]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={moderateScale(18)}
                color="#4ADE80"
              />
              <Text numberOfLines={1} style={[styles.cardTitle, { color: '#4ADE80' }]}>
                Workouts
              </Text>
            </View>

            <Text numberOfLines={1} style={styles.cardSubtitle}>
              This month
            </Text>
          </View>

          <CircularProgress
            size={scale(100)}
            strokeWidth={moderateScale(12)}
            progress={80}
            color="#4ADE80"
            text="24 h"
          />
        </View>

        {/* Calories */}
        <View style={styles.smallCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons
                name="local-fire-department"
                size={moderateScale(18)}
                color="#F87171"
              />
              <Text numberOfLines={1} style={[styles.cardTitle, { color: '#F87171' }]}>
                Calories
              </Text>
            </View>

            <Text numberOfLines={1} style={styles.cardSubtitle}>
              This month
            </Text>
          </View>

          <CircularProgress
            size={scale(100)}
            strokeWidth={moderateScale(12)}
            progress={70}
            color="#F87171"
            text="18 k"
          />
        </View>
      </View>
    </View>
  );
}