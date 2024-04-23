function generarCurp() {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombr").value;
    const primerApellido = document.getElementById("apPat").value;
    const segundoApellido = document.getElementById("apMat").value;
    const diaNac = document.getElementById("diaNac").value;
    const mesNac = document.getElementById("mesNac").value;
    const anioNac = document.getElementById("anioNac").value;
    const sexo = document.getElementById("sexo").value;
    const estadoNac = document.getElementById("estadoNac").value;
    const mensaje = document.getElementById("mensajes");

    if (!nombre || !primerApellido || !diaNac || !mesNac || !anioNac || !sexo || !estadoNac) {
        mensaje.innerText = "Llene los campos obligatorios (*).";
        return;
    }

    if(!existeFecha(diaNac, mesNac, anioNac)) {
        mensaje.innerText = "Ingrese una fecha valida.";
        return;
    }

    const nombreValido = validarNombre(nombre);
    const ap1Valido = elimPrep(primerApellido);
    const ap2Valido = elimPrep(segundoApellido);

    let CURP = []; // Arreglo vacio para almacenar caracteres CURP

    CURP[0] = ap1Valido.length > 0 ? ap1Valido[0] : 'X';
    CURP[1] = ap1Valido.length > 0 ? primVocalInter(ap1Valido) : 'X';
    CURP[2] = ap2Valido.length > 0 ? ap2Valido[0] : 'X';
    CURP[3] = nombreValido[0];
    CURP[4] = anioNac[2];
    CURP[5] = anioNac[3];
    CURP[6] = mesNac[0];
    CURP[7] = mesNac[1];
    CURP[8] = diaNac[0];
    CURP[9] = diaNac[1];
    CURP[10] = sexo;
    CURP[11] = estadoNac[0];
    CURP[12] = estadoNac[1];
    CURP[13] = ap1Valido.length > 0 ? primConsonInter(ap1Valido) : 'X';
    CURP[14] = ap2Valido.length > 0 ? primConsonInter(ap2Valido) : 'X';
    CURP[15] = primConsonInter(nombreValido);
    CURP[16] = homonimia(anioNac);
    CURP[17] = genNumAleatorio(0, 9);

    const CURPString = altisonante(CURP).join(''); // Convertir a string

    // Desplegar CURP
    mensaje.innerText = "CURP : " + CURPString;
}

function elimPrep(string) {
    const preposiciones = /\b(?:da|das|de|del|der|di|die|dd|y|el|la|los|las|le|les|mac|mc|van|von)\b/gi;
    let resultado = string.replace(preposiciones, "");
    return validarCadena(resultado);
}

function validarNombre(nombre) {

    const excepciones = /\b(?:maria|jose|ma|m|j)\b/gi;

    // Buscar el índice del primer espacio
    let indiceEspacio = nombre.indexOf(' ');

    let parte1, parte2; // Almacenar partes del nombre
    
    // Si hay al menos un espacio en la cadena
    if (indiceEspacio !== -1) {
        // Dividir la cadena en dos, en base al primer espacio
        parte1 = nombre.slice(0, indiceEspacio);
        parte2 = nombre.slice(indiceEspacio + 1);

        // Si parte1 coincide con las alguna excepcion
        if (excepciones.test(parte1)) {
            return elimPrep(parte2);
        } 
    }
    return elimPrep(nombre)
}

function validarCadena(string) {
    let doblesEspacios = string.replace(/\s{2,}/g, ' ');
    let espaciosIni_Fin = doblesEspacios.trim();;
    return espaciosIni_Fin.toUpperCase();
}

function primVocalInter(string) {
    let str = string.toUpperCase();
    for(let i = 0; i < string.length; i++) {
        if(i > 0) {
            if(str[i] == 'A' || str[i] == 'E' || str[i] == 'I' || str[i] == 'O' || str[i] == 'U')
            return str[i];
        }
    }
    return 'X';
}

function primConsonInter(string) {
    let str = string.toUpperCase();
    for(let i = 0; i < string.length; i++) {
        if(i > 0) {
            if(str[i] != 'A' && str[i] != 'E' && str[i] != 'I' && str[i] != 'O' && str[i] != 'U')
            return str[i];
        }
    }
    return 'X';
}

function existeFecha(dia, mes, anio) {
    let fechaAct = new Date();
    let diaAct = parseInt(fechaAct.getDate(), 10);
    let mesAct = parseInt(fechaAct.getMonth() + 1, 10);
    let anioAct = parseInt(fechaAct.getFullYear(), 10);

    dia = parseInt(dia, 10);
    mes = parseInt(mes, 10);
    anio = parseInt(anio, 10);

    // Validar año futuro
    if(anio > anioAct || anio < 1900) {
        return false;
    }
    
    // Validar fecha futura
    if(anio == anioAct) {
        if(mes == mesAct) {
            if(dia > diaAct) {
                return false;
            }
        } else if(mes > mesAct) {
            return false;
        }
    }

    // Validar mes y dia
    if(mes == 4 || mes == 6 || mes == 9 || mes == 1) {
        if(dia > 30) {
            return false;
        }
    } else if(mes == 2) {
        if(esBisiesto(anio)) {
            if(dia > 29) {
                return false;
            }
        } else if(dia > 28) {
            return false;
        }
    }
    return true; // Todo es valido
}

function esBisiesto(anio) {
    return (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);
}

function homonimia(anio) {
    const anioNum = parseInt(anio, 10); // Convertir anio entero
    if(anioNum < 2000) {
        return '0';
    } else if(anioNum >= 2000 && anioNum <= 2009) {
        return 'A';
    } else if(anioNum >= 2010 && anioNum <= 2019) {
        return 'B';
    } else {
        return 'C';
    }
}

function altisonante(curp) {
    // Tomar primeros 4 caracteres para comparar
    let substr = curp.join('').substring(0, 4);

    const palabras = [
        "BACA", "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO", "COGE", "COGI", "COJA", "COJE",
        "COJI", "COJO", "COLA", "CULO", "FALO", "FETO", "GETA", "GUEI", "GUEY", "JETA", "JOTO", "KACA", "KACO", "KAGA",
        "KAGO", "KAKA", "KAKO", "KOGE", "KOGI", "KOJA", "KOJE", "KOJI", "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO",
        "LOKA", "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR", "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA",
        "NACO", "PEDA", "PEDO", "PENE", "PIPI", "PITO", "POPO", "PUTA", "PUTO", "QULO", "RATA", "ROBA", "ROBE", "ROBO",
        "RUIN", "SENO", "TETA", "VACA", "VAGA", "VAGO", "VAKA", "VUEI", "VUEY", "WUEI", "WUEY"
    ]

    if(palabras.includes(substr)) {
        curp[1] = 'X';
        return curp;
    }
    return curp;
}

function genNumAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}