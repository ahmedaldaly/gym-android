import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileFieldProps = {
    label: string;
    children: React.ReactNode;
};

const ProfileField = ({ label, children }: ProfileFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1E1E2D',
        marginBottom: 8,
    },
});

export default ProfileField;
