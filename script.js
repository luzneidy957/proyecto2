// version 1.0.0

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

// ------------------- VARIABLES INICIALES (Rúbrica) ----------------------
let username = "";
let palabraSecreta = "";
let intentosRestantes = 3;
let letrasAdivinadas = [];
let bonoPuntos = 50;

const listaPalabras = [
    "abrazaderas", "abstracto", "abundancia", "acelerar", "acentuado", 
  "aceptacion", "acercamiento", "acertijo", "aclamacion", "aclaracion",
  "acompañante", "acondicionar", "aconsejar", "acostumbrar", "actualidad",
  "adecuadamente", "adelantar", "adivinanza", "administrar", "admiracion",
  "adquisicion", "advertencia", "aeropuerto", "afectuoso", "afirmacion",
  "agricultura", "agradecer", "aislamiento", "ajustable", "alambicado",
  "alcanzable", "alegremente", "alejamiento", "alfabetico", "alimentacion",
  "almacenamiento", "alternativa", "alucinante", "amanecer", "ambiental",
  "ambicion", "ambulancia", "amortiguar", "ampliacion", "analitico",
  "anaranjado", "anecdotico", "aniversario", "antecedente", "antiguedad",
  "apariencia", "aplastante", "aplicacion", "aprendizaje", "aprovechar",
  "argumento", "artificial", "ascendente", "aseguradora", "asistencia",
  "asociacion", "astronomia", "atmosfera", "atractivo", "atribucion",
  "autentico", "automatico", "autoridad", "aventurero", "averiguar",
  "bachillerato", "balanceado", "barbaridad", "beneficio", "biblioteca",
  "bienvenida", "biografia", "bizantino", "bombardeo", "brillante",
  "caballero", "calamidad", "calendario", "caligrafia", "caminante",
  "campamento", "cancelacion", "capacidad", "caracteristica", "castellano",
  "celebracion", "centigrado", "certificado", "cientifico", "circunstancia",
  "clasificacion", "colaborar", "coleccion", "combinacion", "comentario",
  "comestible", "comunicacion", "concentrar", "concluyente", "condicion",
  "conferencia", "confianza", "confirmar", "congelador", "conocimiento"
];

// ------------------- FUNCIONES (Rúbrica) ----------------------

function iniciarPartida(nombreJugador) {
    console.log("¡Bienvenido/a " + nombreJugador + "! Tienes " + intentosRestantes + " intentos iniciales.");
}

function verificarLetra(letraIngresada, palabraOriginal) {
    if (palabraOriginal.includes(letraIngresada)) {
        return true;
    } else {
        return false;
    }
}

function calcularPuntaje(intentosFinales, bono) {
    return intentosFinales * bono;
}

// ------------------- LÓGICA PRINCIPAL ----------------------

async function startGame() {
    // 1. Pedir nombre (El await ahora está DENTRO de la función async)
    username = await getUserInput("ingresa tu nombre");
    iniciarPartida(username);

    // 2. Configurar palabra
    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    
    for (let i = 0; i < palabraSecreta.length; i = i + 1) {
        letrasAdivinadas.push("_");
    }

    // 3. Bucle de juego
    while (intentosRestantes > 0 && letrasAdivinadas.includes("_")) {
        console.log("\nPalabra: " + letrasAdivinadas.join(" "));
        console.log("VIDAS: " + intentosRestantes);

        let letra = await getUserInput("inserta una letra:");
        let letraMinuscula = letra.toLowerCase();

        if (letraMinuscula.length === 1) {
            if (verificarLetra(letraMinuscula, palabraSecreta)) {
                console.log("¡Correcto!");
                for (let j = 0; j < palabraSecreta.length; j++) {
                    if (palabraSecreta[j] === letraMinuscula) {
                        letrasAdivinadas[j] = letraMinuscula;
                    }
                }
            } else {
                intentosRestantes = intentosRestantes - 1;
                console.log("Letra incorrecta.");
                
                // Validación especial (Rúbrica)
                if (intentosRestantes === 1) {
                    console.log("¡Cuidado! Te queda un solo intento.");
                }
            }
        }
    }

    // 4. Fin del juego
    if (!letrasAdivinadas.includes("_")) {
        let puntos = calcularPuntaje(intentosRestantes, bonoPuntos);
        console.log("\n¡GANASTE " + username + "! Tu puntaje es: " + puntos);
    } else {
        console.log("\nPerdiste. La palabra era: " + palabraSecreta);
    }

    return rl.close();
}

// Invocación única
startGame();

