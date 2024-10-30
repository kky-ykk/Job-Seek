// Validation.js
const Validation = (input) => {
    const errors = {};

    // Fullname validation
    if (!input.fullname.trim()) {
        errors.fullname = "Full name is required";
    } else if (!/^[A-Za-z\s]{3,}$/.test(input.fullname)) {
        errors.fullname = "Full name must contain only letters and be at least 3 characters";
    }

    // Email validation
    if (!input.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "Email address is invalid";
    }

    // Phone number validation
    if (!input.phoneNumber.trim()) {
        errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(input.phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits";
    }

    // Password validation
    if (!input.password.trim()) {
        errors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{5,}$/.test(input.password)) {
        errors.password = "Password must be at least 5 characters includes these character A-Z, a-z, digits, special symbol(@$,!,% )";
    }

    // Role validation
    if (!input.role) {
        errors.role = "Role selection is required";
    }

    // File validation
    if (!input.file) {
        errors.file = "Profile picture is required";
    }

    return errors;
};

export default Validation;
