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
    const { min, max, intentos } = definirNivel(dificultadElegida);

    // Generar número secreto aleatorio
    const numeroSecreto = Math.floor(Math.random() * (max - min + 1)) + min;

    // Mensaje inicial de bienvenida
    alert(`¡Bienvenido al juego Adivina el número mágico! Tu objetivo es adivinar el número secreto que he pensado en un rango de ${min} a ${max}. Tienes ${intentos} intentos para lograrlo.`);

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
        alert(mensaje);

        // Salir del ciclo si se adivina el número
        if (resultado === 0) {
            return;
        }
    }

    // Si se agotan los intentos sin adivinar el número
    alert(`¡Te quedaste sin intentos! El número secreto era: ${numeroSecreto}`);
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

function generarPistaDigitos(numeroSecreto) {
    let cantidadDigitos = numeroSecreto.toString().length;
    return `El número secreto tiene ${cantidadDigitos} dígitos.`;
}

function generarPistaParImpar(numeroSecreto) {
    if (numeroSecreto % 2 === 0) {
        return "El número secreto es par.";
    } else {
        return "El número secreto es impar.";
    }
}

function procesarResultado(resultado, numeroSecreto, intentosRestantes, min, max) {
    let mensaje = "";
    switch (resultado) {
        case -1:
            mensaje = "Tu intento es menor que el número secreto.";
            // Incluir pista de dígitos solo en niveles medio y difícil
            if (intentosRestantes > 1 && (min <= 10 && max >= 100)) {
                if (confirm("¿Deseas una pista? (Sí/No)")) {
                    mensaje += ` ${generarPistaDigitos(numeroSecreto)}`;
                }
            }
            break;
        case 0:
            mensaje = "¡Felicidades! Adivinaste el número secreto.";
            console.log(`¡Felicidades! El usuario adivinó el número secreto: ${numeroSecreto}.`); // Registro en la consola
            break;
        case 1:
            mensaje = "Tu intento es mayor que el número secreto.";
            // Incluir pista de par/impar solo en niveles medio y difícil
            if (intentosRestantes > 1 && (min <= 10 && max >= 100)) {
                if (confirm("¿Deseas una pista? (Sí/No)")) {
                    mensaje += ` ${generarPistaParImpar(numeroSecreto)}`;
                }
            }
            break;
    }
    return mensaje;
}

// Ejecución del juego
juegoAdivinaNumero();
