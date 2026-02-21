import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from './Styles'
import { useAuthStore } from '../../store/UseAuthStore'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../auth/Auth.schema"
import { useNavigation } from "@react-navigation/native"
import ErrorPopup from '../../components/ui/ErrorBobup'
export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuthStore()
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await login(data);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
      setVisible(true)
    }
  }

  const onValidationError = (errors: any) => {
    console.log("Form Validation Errors:", errors);
  }

  return (
    <View style={Styles.container}>
      {/* Logo */}
      <View style={Styles.logoContainer}>
        <Text style={Styles.logo}>logo</Text>
      </View>

      <Text style={Styles.greeting}>Nice to see you again</Text>

      {/* Form */}
      <View style={Styles.formContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Styles.inputWrapper, errors.email && { borderColor: '#EF4444', borderWidth: 1 }]}>
              <Icon name="person-outline" size={20} style={Styles.inputIcon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                style={Styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>
          )}
        />
        {errors.email && <Text style={{ color: '#EF4444', marginBottom: 10, marginTop: -12, marginLeft: 4 }}>{errors.email.message as string}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[Styles.inputWrapper, errors.password && { borderColor: '#EF4444', borderWidth: 1 }]}>
              <Icon name="lock-closed-outline" size={20} style={Styles.inputIcon} />
              <TextInput
                placeholder="Entre your Password"
                placeholderTextColor="#9CA3AF"
                style={Styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#4B5563"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && <Text style={{ color: '#EF4444', marginBottom: 10, marginTop: -12, marginLeft: 4 }}>{errors.password.message as string}</Text>}

        {/* Remember me & Forgot Password */}
        <View style={Styles.rememberRow}>
          <TouchableOpacity style={Styles.rememberMeContainer} activeOpacity={0.7} disabled={loading}>
            <View style={Styles.checkbox} />
            <Text style={Styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword' as never)}
            disabled={loading}>
            <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[Styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleSubmit(onSubmit, onValidationError)}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#1F1F1F" />
          ) : (
            <Text style={Styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Google Sign In */}
        <TouchableOpacity style={Styles.googleButton} activeOpacity={0.8} disabled={loading}>
          <Icon name="logo-google" size={20} color="#FFFFFF" style={Styles.googleIcon} />
          <Text style={Styles.googleButtonText}>Or sign in with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={Styles.footer}>
          <View style={Styles.footerTextContainer}>
            <Text style={Styles.footerText}>Dont have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register' as never)}
              disabled={loading}>
              <Text style={Styles.signUpLink}>Sign up now</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('tabs' as never)}
            disabled={loading}>
            <Text style={Styles.guestLink}>Continue as a guest</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ErrorPopup visible={visible} message={error} onClose={() => setVisible(false)} />
    </View>
  )
}