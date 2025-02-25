
export interface ValidationErrors {
    email?: string;
    password?: string;
}

export interface ValidationRegisterErrors extends ValidationErrors {
    confirmPassword?: string;
    name?: string;
}

export const validateAuthForm = (email: string, password: string): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Validación de email
    if (!email.trim()) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Introduce un correo válido.";
    }

    // Validación de contraseña
    if (!password.trim()) {
        errors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    return errors;
};

export const validateRegisterForm = (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
): ValidationRegisterErrors => {
    const errors: ValidationRegisterErrors = {};

    // Validación de email
    const emailErrors = validateAuthForm(email, password);
    if (emailErrors.email) {
        errors.email = emailErrors.email;
    }

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()?¡@|])[A-Za-z\d!"#$%&/()?¡@|]{8,}$/;

    // Validación de contraseña
    if (!password.trim()) {
        errors.password = "La contraseña es obligatoria.";
    } else if (!passwordRegex.test(password)) {
        errors.password =
            "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial (!\"#$%&/()?¡@|).";
    }

    // Validación de confirmación de contraseña
    if (confirmPassword !== password) {
        errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    // Validación de nombre
    if (!name.trim()) {
        errors.name = "El nombre es obligatorio.";
    }

    return errors;
};