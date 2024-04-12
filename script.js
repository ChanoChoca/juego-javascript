// Funciones principales

function definirNivel(nivel) {
    switch (nivel) {
        case "fácil":
            return { min: 1, max: 50, intentos: 15 };
        case "medio":
            return { min: 1, max: 100, intentos: 10 };
        case "difícil":
            return { min: 1, max: 200, intentos: 5 };
        default:
            return { min: 1, max: 100, intentos: 10 }; // Nivel por defecto (medio)
    }
}
/*
function seleccionarModoJuego() {
    let modoJuego = prompt("Elige un modo de juego (individual, cooperativo): ").toLowerCase();

    if (modoJuego === "individual") {
        return "individual";
    } else if (modoJuego === "cooperativo") {
        return "cooperativo";
    } else {
        alert("Modo de juego no válido. Se jugará en modo individual por defecto.");
        return "individual";
    }
}
*/
function juegoAdivinaNumero() {
    // Solicitar al usuario que elija la dificultad
    let dificultadElegida = prompt("Elige una dificultad (fácil, medio, difícil): ").toLowerCase();

    // Validar la entrada del usuario
    while (!["fácil", "medio", "difícil"].includes(dificultadElegida)) {
        dificultadElegida = prompt("Dificultad no válida. Elige una dificultad (fácil, medio, difícil): ").toLowerCase();
    }

    // Obtener los parámetros del juego según la dificultad elegida
    let { min, max, intentos } = definirNivel(dificultadElegida);

    // Generar número secreto aleatorio
    let numeroSecreto = Math.floor(Math.random() * (max - min + 1)) + min;

    // Ciclo principal del juego
    for (let i = 0; i < intentos; i++) {
        // Obtener intento del usuario
        let intentoUsuario = parseInt(prompt(`Intento ${i + 1} de ${intentos}: Ingresa un número entre ${min} y ${max}: `));

        // Validar entrada del usuario
        if (isNaN(intentoUsuario)) {
            alert("Error: Debes ingresar un número válido.");
            continue;
        }

        // Comparar intento con número secreto
        let resultado = compararNumeros(intentoUsuario, numeroSecreto);

        // Mostrar mensaje según el resultado
        let mensaje = procesarResultado(resultado, numeroSecreto, intentos - i - 1, min, max);
        console.log(mensaje);

        // Salir del ciclo si se adivina el número
        if (resultado === 0) {
            return;
        }
    }

    // Si se agotan los intentos sin adivinar el número
    console.log("Te quedaste sin intentos. El número secreto era:", numeroSecreto);
}

function compararNumeros(intento, numeroSecreto) {
    if (intento < numeroSecreto) {
        return -1;
    } else if (intento > numeroSecreto) {
        return 1;
    } else {
        return 0;
    }
}

function procesarResultado(resultado, numeroSecreto, intentosRestantes, min, max) {
    let mensaje = "";
    switch (resultado) {
        case -1:
            mensaje = "Tu intento es menor que el número secreto.";
            // Incluir pista de dígitos solo en niveles medio y difícil
            if (intentosRestantes > 1 && (min <= 10 && max >= 100)) {
                mensaje += ` Pista: El número secreto tiene ${numeroSecreto.toString().length} dígitos.`;
            }
            break;
        case 0:
            mensaje = "¡Felicidades! Adivinaste el número secreto.";
            break;
        case 1:
            mensaje = "Tu intento es mayor que el número secreto.";
            // Incluir pista de par/impar solo en niveles medio y difícil
            if (intentosRestantes > 1 && (min <= 10 && max >= 100)) {
                mensaje += ` Pista: El número secreto es ${numeroSecreto % 2 === 0 ? "par" : "impar"}.`;
            }
            break;
    }
    return mensaje;
}

// Ejecución del juego
juegoAdivinaNumero();
