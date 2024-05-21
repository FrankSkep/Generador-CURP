const mensajes = document.getElementById("mensajes");

// Recibe y verifica los datos ingresados
function validarDatos() {
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        apPate: document.getElementById("apPat").value.trim(),
        apMate: document.getElementById("apMat").value.trim(),
        diaNac: document.getElementById("diaNac").value,
        mesNac: document.getElementById("mesNac").value,
        anioNac: document.getElementById("anioNac").value.trim(),
        sexo: document.getElementById("sexo").value,
        estadoNac: document.getElementById("estadoNac").value,
    };

    if (!validarCampo(datos.nombre, "Ingrese un nombre.(*)")) return;
    if (!validarCampo(datos.apPate, "Ingrese un apellido.(*)")) return;
    if (!validarCampo(datos.diaNac, "Seleccione el día de nacimiento.(*)"))
        return;
    if (!validarCampo(datos.mesNac, "Seleccione el mes de nacimiento.(*)"))
        return;
    if (!validarCampo(datos.anioNac, "Seleccione el año de nacimiento.(*)"))
        return;
    if (!validarCampo(datos.sexo, "Seleccione el sexo.(*)")) return;
    if (
        !validarCampo(datos.estadoNac, "Seleccione el estado de nacimiento.(*)")
    )
        return;
    if (!validarFecha(datos.diaNac, datos.mesNac, datos.anioNac)) {
        mostrarMensaje("Ingrese una fecha valida.");
        return;
    }

    datos.nombre = validarCaracteres(datos.nombre);
    datos.apPate = validarCaracteres(datos.apPate);
    datos.apMate = validarCaracteres(datos.apMate);

    if (!esAlfabetico(datos.nombre)) {
        mostrarMensaje("Ingrese un nombre valido.");
        return;
    } else if (!esAlfabetico(datos.apPate) || !esAlfabetico(datos.apMate)) {
        mostrarMensaje("Ingrese un apellido valido.");
        return;
    }

    datos.nombre = validarNombre(datos.nombre);
    datos.apPate = elimPrep(datos.apPate);
    datos.apMate = elimPrep(datos.apMate);

    generarCurp(datos);
}

// Determina si un campo esta vacio
function validarCampo(valor, mensajeError) {
    if (!valor) {
        mostrarMensaje(mensajeError);
        return false;
    }
    return true;
}

// Recibe los datos validados y genera el CURP
function generarCurp(datos) {
    let CURP = [];

    CURP[0] =
        datos.apPate.length > 0 ? (datos.apPate[0] == "," ? "X" : datos.apPate[0]) : "X";
    CURP[1] = datos.apPate.length > 0 ? primVocalInter(datos.apPate) : "X";
    CURP[2] = datos.apMate.length > 0 ? datos.apMate[0] == ',' ? 'X' : datos.apMate[0] : 'X';
    CURP[3] = datos.nombre[0] != ',' ? datos.nombre[0] : 'X';
    CURP[4] = datos.anioNac[2];
    CURP[5] = datos.anioNac[3];
    CURP[6] = datos.mesNac[0];
    CURP[7] = datos.mesNac[1];
    CURP[8] = datos.diaNac[0];
    CURP[9] = datos.diaNac[1];
    CURP[10] = datos.sexo;
    CURP[11] = datos.estadoNac[0];
    CURP[12] = datos.estadoNac[1];
    CURP[13] = datos.apPate.length > 0 ? primConsonInter(datos.apPate) : "X";
    CURP[14] = datos.apMate.length > 0 ? primConsonInter(datos.apMate) : "X";
    CURP[15] = primConsonInter(datos.nombre);
    CURP[16] = homonimia(datos.anioNac);
    CURP[17] = genNumAleatorio(0, 9);

    const CURPString = altisonante(CURP).join(""); // Convertir a cadena

    mostrarMensaje("CURP : " + CURPString); // Desplegar CURP
}

// Recibe un cadena y lo muestra en zona mensajes
function mostrarMensaje(mensaje) {
    mensajes.innerText = mensaje;
}

// Valida las excepciones de nombres
function validarNombre(nombre) {
    const excepciones = /\b(?:maria|jose|ma|m|j)\b/gi;

    // Indice del primer espacio
    let indiceEspacio = nombre.indexOf(" ");

    let parte1, parte2;

    if (indiceEspacio !== -1) {
        // Dividir en dos, en base al primer espacio
        parte1 = nombre.slice(0, indiceEspacio);
        parte2 = nombre.slice(indiceEspacio + 1);

        // Si parte1 es alguna excepcion
        if (excepciones.test(parte1)) {
            return elimPrep(parte2);
        }
    }
    return elimPrep(nombre);
}

// Elimina preposiciones en un cadena
function elimPrep(cadena) {
    const prepos =
        /\b(?:da|das|de|del|der|di|die|dd|y|el|la|los|las|le|les|mac|mc|van|von)\b/gi;
    let resultado = cadena.replace(prepos, "");
    return noDoblesEspacios(resultado);
}

// Busca y reemplaza caracteres no validos en un cadena
function validarCaracteres(cadena) {
    const noValidos = "áÁäÄéÉëËíÍïÏóÓöÖúÚüÜñÑ'-./`¨";
    const reemplazos = "AAAAEEEEIIIIOOOOUUUUXX,,,,,,";
    let resultado = "";

    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] >= "a" && cadena[i] <= "z") {
            resultado += cadena[i].toUpperCase();
        } else {
            let indice = noValidos.indexOf(cadena[i]);

            if (indice !== -1) {
                resultado += reemplazos[indice];
            } else {
                resultado += cadena[i];
            }
        }
    }
    return resultado;
}

// Verifica si la cadena es alfabetica
function esAlfabetico(cadena) {
    return /^[a-zA-Z\s,]+$/.test(cadena);
}

// Elimina dobles espacios y espacios al inicio y fin
function noDoblesEspacios(cadena) {
    let resultado = cadena.replace(/\s{2,}/g, " ");
    return resultado.toUpperCase().trim();
}

// Devuelve primera vocal interna
function primVocalInter(cadena) {
    const vocales = ["A", "E", "I", "O", "U"];
    for (let i = 1; i < cadena.length; i++) {
        let char = cadena[i].toUpperCase();
        if (vocales.includes(char)) {
            if (cadena[i - 1] == ",") {
                return "X";
            } else {
                return char;
            }
        }
    }
    return "X";
}

// Devuelve primera consonante interna
function primConsonInter(cadena) {
    const vocales = ["A", "E", "I", "O", "U"];
    for (let i = 1; i < cadena.length; i++) { // Comenzar desde el índice 1 para evitar la primera letra
        let char = cadena[i].toUpperCase();
        if (!vocales.includes(char) && char.match(/[A-Z]/)) {
            return char;
        }
        if (char === ',') {
            return 'X';
        }
    }
    return "X"; // Si no se encuentra ninguna consonante interna
}

// Valida si la fecha existe
function validarFecha(dia, mes, anio) {
    let fechaAct = new Date();
    let diaAct = parseInt(fechaAct.getDate(), 10);
    let mesAct = parseInt(fechaAct.getMonth() + 1, 10);
    let anioAct = parseInt(fechaAct.getFullYear(), 10);

    dia = parseInt(dia, 10);
    mes = parseInt(mes, 10);
    anio = parseInt(anio, 10);

    // Validar año
    if (anio > anioAct || anio < 1900) {
        return false;
    }

    // Validar fecha futura
    if (anio == anioAct) {
        if (mes == mesAct) {
            if (dia > diaAct) {
                return false;
            }
        } else if (mes > mesAct) {
            return false;
        }
    }

    // Validar mes y dia
    if (mes == 4 || mes == 6 || mes == 9 || mes == 1) {
        if (dia > 30) {
            return false;
        }
    } else if (mes == 2) {
        if (esBisiesto(anio)) {
            if (dia > 29) {
                return false;
            }
        } else if (dia > 28) {
            return false;
        }
    }
    return true;
}

// Verifica si un año es bisiesto
function esBisiesto(anio) {
    return (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0;
}

// Asigna caracter de homonimia
function homonimia(anio) {
    const anioNum = parseInt(anio, 10); // Convertir anio entero
    if (anioNum < 2000) {
        return "0";
    } else if (anioNum >= 2000 && anioNum <= 2009) {
        return "A";
    } else if (anioNum >= 2010 && anioNum <= 2019) {
        return "B";
    } else {
        return "C";
    }
}

// Verifica que primeros 4 caracteres no formen una palabra altisonante
function altisonante(curp) {
    let substr = curp.slice(0, 4).join("");

    const palabras = new Set([
        "BACA",
        "BAKA",
        "BUEI",
        "BUEY",
        "CACA",
        "CACO",
        "CAGA",
        "CAGO",
        "CAKA",
        "CAKO",
        "COGE",
        "COGI",
        "COJA",
        "COJE",
        "COJI",
        "COJO",
        "COLA",
        "CULO",
        "FALO",
        "FETO",
        "GETA",
        "GUEI",
        "GUEY",
        "JETA",
        "JOTO",
        "KACA",
        "KACO",
        "KAGA",
        "KAGO",
        "KAKA",
        "KAKO",
        "KOGE",
        "KOGI",
        "KOJA",
        "KOJE",
        "KOJI",
        "KOJO",
        "KOLA",
        "KULO",
        "LILO",
        "LOCA",
        "LOCO",
        "LOKA",
        "LOKO",
        "MAME",
        "MAMO",
        "MEAR",
        "MEAS",
        "MEON",
        "MIAR",
        "MION",
        "MOCO",
        "MOKO",
        "MULA",
        "MULO",
        "NACA",
        "NACO",
        "PEDA",
        "PEDO",
        "PENE",
        "PIPI",
        "PITO",
        "POPO",
        "PUTA",
        "PUTO",
        "QULO",
        "RATA",
        "ROBA",
        "ROBE",
        "ROBO",
        "RUIN",
        "SENO",
        "TETA",
        "VACA",
        "VAGA",
        "VAGO",
        "VAKA",
        "VUEI",
        "VUEY",
        "WUEI",
        "WUEY",
    ]);

    if (palabras.has(substr)) {
        curp[1] = "X";
    }
    return curp;
}

// Genera un numero aleatorio en un rango dado
function genNumAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function crearOpcion(valor, texto) {
    const option = document.createElement("option");
    option.text = texto;
    option.value = valor;
    return option;
}

// Llena los selectores de dia, mes y estado
function llenarSelectores() {
    const dias = Array.from({ length: 31 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
    );
    const meses = [
        { nombre: "Enero", valor: "01" },
        { nombre: "Febrero", valor: "02" },
        { nombre: "Marzo", valor: "03" },
        { nombre: "Abril", valor: "04" },
        { nombre: "Mayo", valor: "05" },
        { nombre: "Junio", valor: "06" },
        { nombre: "Julio", valor: "07" },
        { nombre: "Agosto", valor: "08" },
        { nombre: "Septiembre", valor: "09" },
        { nombre: "Octubre", valor: "10" },
        { nombre: "Noviembre", valor: "11" },
        { nombre: "Diciembre", valor: "12" },
    ];
    const estados = {
        AGUASCALIENTES: "AS",
        "BAJA CALIFORNIA": "BC",
        "BAJA CALIFORNIA SUR": "BS",
        CAMPECHE: "CC",
        COAHUILA: "CL",
        COLIMA: "CM",
        CHIAPAS: "CS",
        CHIHUAHUA: "CH",
        "DISTRITO FEDERAL": "DF",
        DURANGO: "DG",
        GUANAJUATO: "GT",
        GUERRERO: "GR",
        HIDALGO: "HG",
        JALISCO: "JC",
        MEXICO: "MC",
        MICHOACAN: "MN",
        MORELOS: "MS",
        NAYARIT: "NT",
        "NUEVO LEON": "NL",
        OAXACA: "OC",
        PUEBLA: "PL",
        QUERETARO: "QT",
        "QUINTANA ROO": "QR",
        "SAN LUIS POTOSI": "SP",
        SINALOA: "SL",
        SONORA: "SR",
        TABASCO: "TC",
        TAMAULIPAS: "TS",
        TLAXCALA: "TL",
        VERACRUZ: "VZ",
        YUCATAN: "YN",
        ZACATECAS: "ZS",
        EXTRANJERO: "NE",
    };

    const selectorDia = document.getElementById("diaNac");
    dias.forEach((dia) => selectorDia.appendChild(crearOpcion(dia, dia)));

    const selectorMes = document.getElementById("mesNac");
    meses.forEach((mes) =>
        selectorMes.appendChild(crearOpcion(mes.valor, mes.nombre))
    );

    const selectorEstado = document.getElementById("estadoNac");
    for (const estado in estados) {
        selectorEstado.appendChild(crearOpcion(estados[estado], estado));
    }
}

function limpiarForm() {
    document.getElementById("mensajes").innerText = "";
}

llenarSelectores();
