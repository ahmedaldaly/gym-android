import { View, Text } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './Style';
import { UserPlan } from '../Home.type';

interface SubsicriptionProps {
    data?: UserPlan;
}

export default function Subsicription({ data }: SubsicriptionProps) {
    const subscription = data?.subscription;
    const pkg = subscription?.package;
    const user = subscription?.user;

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Current Plan</Text>

                    <View style={[styles.activeBadge, { backgroundColor: subscription?.is_active ? '#D1FAE5' : '#FEE2E2' }]}>
                        <Text style={[styles.activeText, { color: subscription?.is_active ? '#059669' : '#DC2626' }]}>
                            {subscription?.is_active ? 'Active' : 'Inactive'}
                        </Text>
                    </View>
                </View>

                {/* Premium */}
                <View style={styles.row}>
                    <Feather name="award" size={20} color="#7B2FF7" />
                    <Text style={styles.mainText}>{pkg?.name || 'No Active Plan'}</Text>
                </View>

                {/* Fitness Goal */}
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                        name="target"
                        size={20}
                        color="#7B2FF7"
                    />
                    <View>
                        <Text style={styles.label}>Fitness goal</Text>
                        <Text style={styles.value}>{user?.goal || 'N/A'}</Text>
                    </View>
                </View>

                {/* Level */}
                <View style={styles.infoRow}>
                    <Feather
                        name="trending-up"
                        size={20}
                        color="#7B2FF7"
                    />
                    <View>
                        <Text style={styles.label}>Level</Text>
                        <Text style={styles.value}>{user?.level || 'N/A'}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}
