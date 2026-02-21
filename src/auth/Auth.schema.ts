import z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
})

export const sendCodeForgetPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
})
export const verifyCodeForgetPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    otp: z.string().min(1, 'OTP is required').min(6, 'OTP must be at least 6 characters long'),
    NewPassword: z.string().min(1, 'New Password is required').min(6, 'New Password must be at least 6 characters long'),
    NewPasswordConfirmation: z.string().min(1, 'Password confirmation is required'),
}).refine((data) => data.NewPassword === data.NewPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["NewPasswordConfirmation"],
});