import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type GenderSelectorProps = {
    selectedGender: 'MALE' | 'FEMALE';
    onSelect: (gender: 'MALE' | 'FEMALE') => void;
};

const GenderSelector = ({ selectedGender, onSelect }: GenderSelectorProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.option}
                onPress={() => onSelect('FEMALE')}
            >
                <View style={styles.radioOuter}>
                    {selectedGender === 'FEMALE' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.text}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.option}
                onPress={() => onSelect('MALE')}
            >
                <View style={styles.radioOuter}>
                    {selectedGender === 'MALE' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.text}>Male</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF4081', // Matches the pinkish/magenta dot in image
    },
    text: {
        fontSize: 14,
        color: '#1E1E2D',
    },
});

export default GenderSelector;
