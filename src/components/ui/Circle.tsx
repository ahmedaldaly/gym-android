// ProgressCircle.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressCircleProps {
    radius?: number;
    strokeWidth?: number;
    segments: number; // عدد القطع الكاملة
    currentIndex: number; // عدد القطع المفعلة
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    radius = 40,
    strokeWidth = 4,
    segments,
    currentIndex,
}) => {
    const circumference = 2 * Math.PI * radius;
    const gap = 8; // المسافة بين القطع
    const segmentLength = (circumference - segments * gap) / segments;

    // إنشاء مصفوفة الداش ليكون التلوين على قد القطع المفعلة بس
    const dashArray = [];
    for (let i = 0; i < currentIndex; i++) {
        dashArray.push(segmentLength);
        dashArray.push(gap);
    }
    dashArray.push(0);
    dashArray.push(circumference);

    return (
        <View>
            <Svg
                width={radius * 2 + strokeWidth * 2}
                height={radius * 2 + strokeWidth * 2}
                style={{ transform: [{ rotate: '120deg' }] }}
            >
                {/* الخلفية الرمادية لكل القطع */}
                <Circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    stroke="#D5D1D1"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={`${segmentLength} ${gap}`}
                />

                {/* القطع المفعلة باللون الأزرق */}
                <Circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    stroke="#1E3A8A"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={dashArray.join(' ')}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                />
            </Svg>
        </View>
    );
};

export default ProgressCircle;
