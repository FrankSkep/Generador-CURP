document.addEventListener("DOMContentLoaded", () => {
  const mensajes = document.getElementById("mensajes");
  const limpiarBtn = document.getElementById("limpiarBtn");
  const generarBtn = document.getElementById("generarBtn");

  const llenarDias = () => {
    const diaSelect = document.getElementById("diaNac");
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      diaSelect.appendChild(option);
    }
  };

  const llenarMeses = () => {
    const mesSelect = document.getElementById("mesNac");
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    meses.forEach((mes, index) => {
      const option = document.createElement("option");
      option.value = index + 1;
      option.text = mes;
      mesSelect.appendChild(option);
    });
  };

  const llenarEstados = () => {
    const estadoSelect = document.getElementById("estadoNac");
    const estados = [
      { clave: "AS", nombre: "Aguascalientes" },
      { clave: "BC", nombre: "Baja California" },
      { clave: "BS", nombre: "Baja California Sur" },
      { clave: "CC", nombre: "Campeche" },
      { clave: "CL", nombre: "Coahuila" },
      { clave: "CM", nombre: "Colima" },
      { clave: "CS", nombre: "Chiapas" },
      { clave: "CH", nombre: "Chihuahua" },
      { clave: "DF", nombre: "Ciudad de México" },
      { clave: "DG", nombre: "Durango" },
      { clave: "GT", nombre: "Guanajuato" },
      { clave: "GR", nombre: "Guerrero" },
      { clave: "HG", nombre: "Hidalgo" },
      { clave: "JC", nombre: "Jalisco" },
      { clave: "MC", nombre: "Estado de México" },
      { clave: "MN", nombre: "Michoacán" },
      { clave: "MS", nombre: "Morelos" },
      { clave: "NT", nombre: "Nayarit" },
      { clave: "NL", nombre: "Nuevo León" },
      { clave: "OC", nombre: "Oaxaca" },
      { clave: "PL", nombre: "Puebla" },
      { clave: "QT", nombre: "Querétaro" },
      { clave: "QR", nombre: "Quintana Roo" },
      { clave: "SP", nombre: "San Luis Potosí" },
      { clave: "SL", nombre: "Sinaloa" },
      { clave: "SR", nombre: "Sonora" },
      { clave: "TC", nombre: "Tabasco" },
      { clave: "TS", nombre: "Tamaulipas" },
      { clave: "TL", nombre: "Tlaxcala" },
      { clave: "VZ", nombre: "Veracruz" },
      { clave: "YN", nombre: "Yucatán" },
      { clave: "ZS", nombre: "Zacatecas" },
      { clave: "NE", nombre: "Nacido en el extranjero" }
    ];
    estados.forEach((estado) => {
      const option = document.createElement("option");
      option.value = estado.clave;
      option.text = estado.nombre;
      estadoSelect.appendChild(option);
    });
  };

  const validarCampo = (valor, mensajeError) => {
    if (!valor) {
      mostrarMensaje(mensajeError);
      return false;
    }
    return true;
  };

  const mostrarMensaje = (mensaje) => {
    mensajes.innerText = mensaje;
  };

  const validarNombre = (nombre) => {
    const excepciones = /\b(?:maria|jose|ma|m|j)\b/gi;
    let [parte1, ...resto] = nombre.split(" ");
    let parte2 = resto.join(" ");
    return excepciones.test(parte1) ? elimPrep(parte2) : elimPrep(nombre);
  };

  const elimPrep = (cadena) => {
    const prepos = /\b(?:da|das|de|del|der|di|die|dd|y|el|la|los|las|le|les|mac|mc|van|von)\b/gi;
    return noDoblesEspacios(cadena.replace(prepos, ""));
  };

  const validarCaracteres = (cadena) => {
    const noValidos = "áÁäÄéÉëËíÍïÏóÓöÖúÚüÜñÑ'-./`¨";
    const reemplazos = "AAAAEEEEIIIIOOOOUUUUXX,,,,,,";
    return cadena
      .split("")
      .map((char) => {
        let indice = noValidos.indexOf(char);
        return indice !== -1 ? reemplazos[indice] : char;
      })
      .join("")
      .toUpperCase();
  };

  const esAlfabetico = (cadena) => /^[a-zA-Z\s,]+$/.test(cadena);

  const noDoblesEspacios = (cadena) => cadena.replace(/\s{2,}/g, " ").trim();

  const primVocalInter = (cadena) => {
    const vocales = ["A", "E", "I", "O", "U"];
    return [...cadena.slice(1)].find((char) => vocales.includes(char)) || "X";
  };

  const primConsonInter = (cadena) => {
    const vocales = ["A", "E", "I", "O", "U"];
    return [...cadena.slice(1)].find((char) => !vocales.includes(char) && /[A-Z]/.test(char)) || "X";
  };

  const validarFecha = (dia, mes, anio) => {
    const fechaAct = new Date();
    const [diaAct, mesAct, anioAct] = [fechaAct.getDate(), fechaAct.getMonth() + 1, fechaAct.getFullYear()];

    if (anio < 1900 || anio > anioAct || (anio == anioAct && (mes > mesAct || (mes == mesAct && dia > diaAct)))) {
      return false;
    }

    if ([4, 6, 9, 11].includes(mes) && dia > 30) return false;
    if (mes == 2 && (esBisiesto(anio) ? dia > 29 : dia > 28)) return false;

    return true;
  };

  const esBisiesto = (anio) => (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0;

  const homonimia = (anio) => (anio >= 2000 ? "A" : "0");

  const formatearCurp = (nombre, apPat, apMat, dia, mes, anio, sexo, estado) => {
    let [primLetraPat, primVocalPat] = [apPat.charAt(0), primVocalInter(apPat)];
    let [primLetraMat, primLetraNom] = [apMat.charAt(0) || "X", nombre.charAt(0)];
    let anioStr = anio.toString().slice(2);
    let curp = `${primLetraPat}${primVocalPat}${primLetraMat}${primLetraNom}${anioStr}${mes.padStart(2, "0")}${dia.padStart(2, "0")}${sexo}${estado}${primConsonInter(apPat)}${primConsonInter(apMat)}${primConsonInter(nombre)}${homonimia(anio)}`;
    return curp;
  };

  const generarCURP = () => {
    let nombre = validarNombre(document.getElementById("nombre").value.trim());
    let apPat = validarNombre(document.getElementById("apPat").value.trim());
    let apMat = validarNombre(document.getElementById("apMat").value.trim());
    let dia = document.getElementById("diaNac").value;
    let mes = document.getElementById("mesNac").value;
    let anio = document.getElementById("anioNac").value;
    let sexo = document.getElementById("sexo").value;
    let estado = document.getElementById("estadoNac").value;

    if (![nombre, apPat, dia, mes, anio, sexo, estado].every((val) => validarCampo(val, "Todos los campos son obligatorios"))) return;
    if (![nombre, apPat, apMat].every(esAlfabetico)) return mostrarMensaje("El nombre y apellidos deben contener solo letras y espacios");

    if (!validarFecha(dia, mes, anio)) return mostrarMensaje("Fecha de nacimiento no válida");

    let curp = formatearCurp(
      validarCaracteres(nombre),
      validarCaracteres(apPat),
      validarCaracteres(apMat),
      dia,
      mes,
      anio,
      sexo,
      estado
    );

    mostrarMensaje(`CURP Generada: ${curp}`);
  };

  limpiarBtn.addEventListener("click", () => {
    document.getElementById("curpForm").reset();
    mostrarMensaje("");
  });

  generarBtn.addEventListener("click", generarCURP);

  llenarDias();
  llenarMeses();
  llenarEstados();
});
