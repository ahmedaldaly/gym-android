import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ProfileDropdownProps = {
    value: string | number;
    onPress: () => void;
};

const ProfileDropdown = ({ value, onPress }: ProfileDropdownProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.value}>{value}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#D1D5DB" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F8FF',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    value: {
        fontSize: 14,
        color: '#1E1E2D',
    },
});

export default ProfileDropdown;
