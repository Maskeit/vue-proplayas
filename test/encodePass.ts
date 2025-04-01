const args = process.argv.slice(2); // Elimina los primeros dos valores (ruta de node y script)

// Verifica si hay un argumento
if (args.length === 0) {
    console.log("No se proporcionó ningún argumento.");
    process.exit(1);
}

const input = args[0]; // Obtiene el primer argumento

function procesarTexto(plainPassword: string) {
    const password = btoa(plainPassword);
    return `${password}`;
}

console.log(procesarTexto(input));