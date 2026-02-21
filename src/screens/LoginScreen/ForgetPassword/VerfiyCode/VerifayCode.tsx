import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../Style'
import { useForm, Controller } from 'react-hook-form'
import { useVerifyCodeForgetPassword } from '../../../../auth/Auth.api'
import { verifyCodeForgetPasswordSchema } from '../../../../auth/Auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function VerifayCode() {
    const navigation = useNavigation()
    const route = useRoute()
    const { email } = (route.params as { email: string }) || { email: '' }
    const { mutate: verifyCode, isPending } = useVerifyCodeForgetPassword()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(verifyCodeForgetPasswordSchema),
        defaultValues: {
            email: email,
            otp: '',
            NewPassword: '',
            NewPasswordConfirmation: '',
        },
    })

    const onSubmit = (data: any) => {
        verifyCode(data, {
            onSuccess: () => {
                Alert.alert('Success', 'Password reset successfully!', [
                    { text: 'OK', onPress: () => (navigation as any).navigate('Login') }
                ])
            },
            onError: (error: any) => {
                Alert.alert('Error', error?.response?.data?.message || 'Failed to verify code. Please try again.')
            },
        })
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Verify Code</Text>
                <Text style={styles.description}>
                    We've sent a 6-digit code to {email}. Please enter it below along with your new password.
                </Text>
            </View>

            <View style={styles.formContainer}>
                {/* OTP Input */}
                <Controller
                    control={control}
                    name="otp"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[styles.inputWrapper, errors.otp && { borderColor: '#EF4444', borderWidth: 1 }]}>
                            <Icon name="key-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                placeholder="6-Digit OTP"
                                placeholderTextColor="#9CA3AF"
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="number-pad"
                                maxLength={6}
                                editable={!isPending}
                            />
                        </View>
                    )}
                />
                {errors.otp && <Text style={styles.errorText}>{errors.otp.message as string}</Text>}

                {/* New Password */}
                <Controller
                    control={control}
                    name="NewPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[styles.inputWrapper, errors.NewPassword && { borderColor: '#EF4444', borderWidth: 1 }]}>
                            <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor="#9CA3AF"
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showPassword}
                                editable={!isPending}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.NewPassword && <Text style={styles.errorText}>{errors.NewPassword.message as string}</Text>}

                {/* Confirm New Password */}
                <Controller
                    control={control}
                    name="NewPasswordConfirmation"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[styles.inputWrapper, errors.NewPasswordConfirmation && { borderColor: '#EF4444', borderWidth: 1 }]}>
                            <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Confirm New Password"
                                placeholderTextColor="#9CA3AF"
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showConfirmPassword}
                                editable={!isPending}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Icon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.NewPasswordConfirmation && <Text style={styles.errorText}>{errors.NewPasswordConfirmation.message as string}</Text>}

                <TouchableOpacity
                    style={[styles.button, isPending && { opacity: 0.7 }]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending}
                >
                    {isPending ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Verify & Reset</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    disabled={isPending}
                >
                    <Icon name="arrow-back-outline" size={20} color="#2D4B8E" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}