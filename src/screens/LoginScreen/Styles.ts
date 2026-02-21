import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: 24,
    },
    logoContainer: {
        marginTop: 80,
        marginBottom: 80,
        alignItems: 'center',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    greeting: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F1F1F',
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 56,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Elevation for Android
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
        color: '#4B5563',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F1F1F',
    },
    rememberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 8,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#9CA3AF',
        marginRight: 8,
        backgroundColor: '#FAFAFA',
    },
    rememberText: {
        fontSize: 15,
        color: '#1F1F1F',
        fontWeight: '500',
    },
    forgotPasswordText: {
        fontSize: 15,
        color: '#2D4B8E',
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#E5E7EB',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F1F1F',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#2D2D2D',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    footer: {
        alignItems: 'center',
        marginTop: 10,
    },
    footerTextContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    footerText: {
        fontSize: 15,
        color: '#4B5563',
    },
    signUpLink: {
        fontSize: 15,
        color: '#2D4B8E',
        fontWeight: '700',
    },
    guestLink: {
        fontSize: 15,
        color: '#2D4B8E',
        fontWeight: '600',
    },
});