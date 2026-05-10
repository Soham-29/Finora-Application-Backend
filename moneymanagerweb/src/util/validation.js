export const validateEmail = (email) => {
    if (email.trim()) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    return false;
}

export const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.trim().length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password.trim())) return "Password must include at least one uppercase letter"
    if (!/[a-z]/.test(password.trim())) return "Password must include at least one lowercase letter"
    if (!/[0-9]/.test(password.trim())) return "Password must include at least one number"
    return null;

}