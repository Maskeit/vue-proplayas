// for Login
export interface Login {
    email?: string;
    password?: string;
}

// for Register Leader Nodes
export interface RegisterNodeLeader {
    email?: string;
    password?: string;
    confirm_password?: string;
    name?: string;
    expertise_area?: string;
    research_work?: string;
    about_user?: string;
    country_user?: string;
    city_user?: string;
    about_node?: string;
    country_node?: string;
    city_node?: string;
    node_name?: string;
    node_type?: string;
}

// for Register Members
export interface RegisterNodeMember {
    email?: string;
    password?: string;
    confirm_password?: string;
    name?: string;
    expertise_area?: string;
    research_work?: string;
    about_user?: string;
    country_user?: string;
    city_user?: string;
}


// valida para el Login
export const validateAuthForm = (email: string, password: string): Login => {
    const errors: Login = {};

    // Validación de email usando validateEmail
    const emailErrors = validateEmail(email);
    if (emailErrors.email) {
        errors.email = emailErrors.email;
    }

    // Validación de contraseña usando validatePassword
    const passwordErrors = validatePassword(password);
    if (passwordErrors.password) {
        errors.password = passwordErrors.password;
    }

    return errors;
};

// valida el correo electrónico
export const validateEmail = (email: string): Login => {
    const errors: Login = {};

    // Validación de email
    if (!email.trim()) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Introduce un correo válido.";
    }
    return errors;
}
export const validatePassword = (password: string): Login => {
    const errors: Login = {};
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()?¡@|])[A-Za-z\d!"#$%&/()?¡@|]{8,}$/;

    if (!password.trim()) {
        errors.password = "La contraseña es obligatoria.";
    } else if (!passwordRegex.test(password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial (!\"#$%&/()?¡@|).";
    }

    return errors;
};

// valida el registro de los nodos y lider de nodo
export const validateRegisterLeader = (formData: RegisterNodeLeader): RegisterNodeLeader => {
    const errors: RegisterNodeLeader = {};

    const { name, email, password, confirm_password, node_name, country_node, city_node, country_user, city_user } = formData;

    // Validación de email
    const emailErrors = validateEmail(email);
    if (emailErrors.email) {
        errors.email = emailErrors.email;
    }
    // Validación de contraseña
    const passwordErrors = validatePassword(password);
    if (passwordErrors.password) {
        errors.password = passwordErrors.password;
    }
    // Validación de confirmación de contraseña
    if (confirm_password !== password) {
        errors.confirm_password = "Las contraseñas no coinciden.";
    }
    // Validación de nombre
    if (!name?.trim()) {
        errors.name = "Tu nombre es obligatorio.";
    }
    // Validación de nombre del nodo
    if (!node_name?.trim()) {
        errors.node_name = "El nombre del nodo es obligatorio.";
    }
    // validacion del país y ciudad del usuario
    if (!country_user?.trim()) {
        errors.country_user = "El país es obligatorio.";
    }
    if (!city_user?.trim()) {
        errors.city_user = "La ciudad es obligatoria.";
    }
    // validacion del país y ciudad del nodo
    if (!country_node?.trim()) {
        errors.country_node = "El país es obligatorio.";
    }
    if (!city_node?.trim()) {
        errors.city_node = "La ciudad es obligatoria.";
    }

    return errors;
};

export const validateMemberRegisterForm = (formData: RegisterNodeMember): RegisterNodeMember => {
    const errors: RegisterNodeMember = {};

    const { name, email, password, confirm_password, country_user, city_user } = formData;

    // Validación de email
    const emailErrors = validateEmail(email);
    if (emailErrors.email) {
        errors.email = emailErrors.email;
    }

    // Validación de contraseña
    const passwordErrors = validatePassword(password);
    if (passwordErrors.password) {
        errors.password = passwordErrors.password;
    }

    // Validación de confirmación de contraseña
    if (confirm_password !== password) {
        errors.confirm_password = "Las contraseñas no coinciden.";
    }

    // Validación de nombre
    if (!name?.trim()) {
        errors.name = "El nombre es obligatorio.";
    }

    if (!country_user?.trim()) {
        errors.country_user = "El país es obligatorio.";
    }

    if (!city_user?.trim()) {
        errors.city_user = "La ciudad es obligatoria.";
    }

    return errors;
};