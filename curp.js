function generarCurp() {
    // Obtener los valores de los campos del formulario
    let nombre = document.getElementById("nombr").value;
    let primerApellido = document.getElementById("apPat").value;
    let segundoApellido = document.getElementById("apMat").value;
    let diaNac = document.getElementById("diaNac").value;
    let mesNac = document.getElementById("mesNac").value;
    let anioNac = document.getElementById("anioNac").value;
    let sexo = document.getElementById("sexo").value;
    let estadoNac = document.getElementById("estadoNac").value;

    if (!nombre || !primerApellido || !diaNac || !mesNac || !anioNac || !sexo || !estadoNac) {
        document.getElementById("curpGenerada").innerText = "Por favor llene todos los campos.";
        return;
    }

    if(!existeFecha(diaNac, mesNac, anioNac)) {
        document.getElementById("curpGenerada").innerText = "Por favor ingrese una fecha valida.";
        return;
    }

    let nombreValido = validarNombre(nombre);
    let ap1Valido = elimPrep(primerApellido);
    let ap2Valido = elimPrep(segundoApellido);

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

    CURP = altisonante(CURP); // Guardar arreglo modificado

    CURP = CURP.join(''); // Convertir a string

    // Desplegar CURP
    document.getElementById("curpGenerada").innerText = "CURP : " + CURP;
}

function existeFecha(dia, mes, anio) {
    let fechaAct = new Date();
    let diaAct = parseInt(fechaAct.getDate(), 10);
    let mesAct = parseInt(fechaAct.getMonth(), 10);
    let anioAct = parseInt(fechaAct.getFullYear(), 10);

    dia = parseInt(dia, 10);
    mes = parseInt(mes, 10);
    anio = parseInt(anio, 10);

    if(anio > anioAct || anio < 1900) {
        return false;
    }

    if(anio == anioAct) {
        if(mes == mesAct && dia > diaAct) {
            return false;
        }
    }

    return true;
}

function borrarFormulario() {

    let nombre = document.getElementById("nombr");
    let primerApellido = document.getElementById("apPat");
    let segundoApellido = document.getElementById("apMat");
    let diaNac = document.getElementById("diaNac");
    let mesNac = document.getElementById("mesNac");
    let anioNac = document.getElementById("anioNac");
    let sexo = document.getElementById("sexo");
    let estadoNac = document.getElementById("estadoNac");
    let curp = document.getElementById("curpGenerada");

    elementos = [nombre, primerApellido, segundoApellido, diaNac, mesNac, anioNac, sexo, estadoNac];

    for(let i = 0; i < elementos.length; i++) {
        elementos[i].value = "";
    }
    curp.innerText = 'CURP : ';
}

function validarNombre(nombre) {

    const excepciones = /\b(?:maria|jose|ma|m|j)\b/gi;

    // Buscar el índice del primer espacio
    let indiceEspacio = nombre.indexOf(' ');

    let parte1, parte2;
    
    // Si hay al menos un espacio en la cadena
    if (indiceEspacio !== -1) {
        // Dividir la cadena en dos, en base al primer espacio
        parte1 = nombre.slice(0, indiceEspacio);
        parte2 = nombre.slice(indiceEspacio + 1);

        // Si parte1 coincide con las excepciones
        if (excepciones.test(parte1)) {
            return elimPrep(parte2);
        } else {
            return elimPrep(nombre);
        }
    } //else {
        //return elimPrep(nombre);
    //}
    return elimPrep(nombre)
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

function elimPrep(string) {
    const preposiciones = /\b(?:da|das|de|del|der|di|die|dd|y|el|la|los|las|le|les|mac|mc|van|von)\b/gi;
    let resultado = string.replace(preposiciones, "");
    return validarCadena(resultado);
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
    // Convertir a string y tomar primeros 4 caracteres
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

function validarCadena(string) {
    let doblesEspacios = string.replace(/\s{2,}/g, ' ');
    let espaciosIni_Fin = doblesEspacios.trim();;
    return espaciosIni_Fin.toUpperCase();
}

function genNumAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// let cad = [];

// cad[0] = 'F';
// cad[1] = 'A';
// cad[2] = 'L';
// cad[3] = 'O';
// cad[4] = 'S';
// cad[5] = 'C';

// cad = altisonante(cad);
// console.log(cad);