import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { styles } from './Style'
import { useForm, Controller } from 'react-hook-form'
import { useSendCodeForgetPassword } from '../../../auth/Auth.api'
import { sendCodeForgetPasswordSchema } from '../../../auth/Auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function ForgetPasswordSendCodeScreen() {
  const navigation = useNavigation()
  const { mutate: sendCode, isPending } = useSendCodeForgetPassword()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendCodeForgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: { email: string }) => {
    sendCode(data, {
      onSuccess: () => {
        (navigation as any).navigate('VerifayCode', { email: data.email })
      },
      onError: (error: any) => {
        Alert.alert('Error', error?.response?.data?.message || 'Failed to send code. Please try again.')
      },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.description}>
          Enter your email address and we will send you a code to reset your password.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.inputWrapper, errors.email && { borderColor: '#EF4444', borderWidth: 1 }]}>
              <Icon name="mail-outline" size={20} style={styles.inputIcon} />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isPending}
              />
            </View>
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message as string}</Text>}

        <TouchableOpacity
          style={[styles.button, isPending && { opacity: 0.7 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Send Code</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isPending}
        >
          <Icon name="arrow-back-outline" size={20} color="#2D4B8E" />
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}