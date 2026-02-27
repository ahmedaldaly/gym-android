import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './Style';
import { ProfileResponseType } from '../../../auth/Auth.type';

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

/* ================= Circular Progress ================= */

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

  const dashCount = 20;
  const dashArrays = Array.from({ length: dashCount }, (_, i) => {
    return (i * 360) / dashCount;
  });

  return (
    <View style={styles.progressWrapper}>
      <Svg width={size} height={size}>
        {dashArrays.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = center + (radius - 5) * Math.cos(rad);
          const y1 = center + (radius - 5) * Math.sin(rad);
          const x2 = center + radius * Math.cos(rad);
          const y2 = center + radius * Math.sin(rad);

          return (
            <Path
              key={i}
              d={`M ${x1} ${y1} L ${x2} ${y2}`}
              stroke="#E5E7EB"
              strokeWidth={2}
            />
          );
        })}

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

      <Text style={styles.progressText}>{text}</Text>
    </View>
  );
};

/* ================= Progress Section ================= */

export default function ProgressSection({
  data,
}: ProgressSectionProps) {

  // 🛡️ حماية من الكراش
  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {/* Weight Card */}
      <View style={styles.weightCard}>
        <View style={styles.weightInfo}>
          <Text style={styles.weightLabel}>
            Current Weight
          </Text>

          <Text style={styles.weightValue}>
            {data?.weight ?? 0} kg
          </Text>

          <Text style={styles.goalLabel}>
            Goal: {data?.goal ?? '-'}
          </Text>
        </View>

        <CircularProgress
          size={100}
          strokeWidth={12}
          progress={75}
          color="#60A5FA"
          text={`${data?.weight ?? 0} KG`}
        />
      </View>

      {/* Bottom Row */}
      <View style={styles.row}>
        {/* Workouts */}
        <View style={styles.smallCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={20}
                color="#4ADE80"
              />
              <Text
                style={[styles.cardTitle, { color: '#4ADE80' }]}>
                Workouts
              </Text>
            </View>

            <Text style={styles.cardSubtitle}>
              This month
            </Text>
          </View>

          <CircularProgress
            size={120}
            strokeWidth={14}
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
                size={20}
                color="#F87171"
              />
              <Text
                style={[styles.cardTitle, { color: '#F87171' }]}>
                Calories
              </Text>
            </View>

            <Text style={styles.cardSubtitle}>
              This month
            </Text>
          </View>

          <CircularProgress
            size={120}
            strokeWidth={14}
            progress={70}
            color="#F87171"
            text="18 k"
          />
        </View>
      </View>
    </View>
  );
}