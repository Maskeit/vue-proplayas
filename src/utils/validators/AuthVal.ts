export interface ValidationErrors {
    email?: string;
    password?: string;
}

export interface ValidationRegisterErrors extends ValidationErrors {
    confirmPassword?: string;
    name?: string;
}

export interface ValidationMemberRegisterErrors extends ValidationRegisterErrors {
    username?: string;
    expertise_area?: string;
    research_work?: string;
    about?: string;
    country?: string;
    city?: string;
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

export const validateMemberRegisterForm = ( formData: RegisterNodeMember ): ValidationMemberRegisterErrors => {
    const errors: ValidationMemberRegisterErrors = {};

    const { name, username, email, password, confirm_password, expertise_area, research_work, about, country, city } = formData;

    // Reutiliza validaciones existentes para email, password, confirm_password y name
    const commonErrors = validateRegisterForm(email, password, confirm_password, name);
    Object.assign(errors, commonErrors);

    // Validación de username
    if (!username.trim()) {
        errors.username = "El nombre de usuario es obligatorio.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = "El nombre de usuario solo puede contener letras, números y guiones bajos.";
    }

    // Validaciones de campos adicionales
    if (!expertise_area.trim()) {
        errors.expertise_area = "El área de trabajo es obligatoria.";
    }

    if (!research_work.trim()) {
        errors.research_work = "El trabajo de investigación es obligatorio.";
    }

    if (!about.trim()) {
        errors.about = "La descripción es obligatoria.";
    }

    if (!country.trim()) {
        errors.country = "El país es obligatorio.";
    }

    if (!city.trim()) {
        errors.city = "La ciudad es obligatoria.";
    }

    return errors;
};