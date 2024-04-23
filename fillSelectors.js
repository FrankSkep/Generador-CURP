function llenarSelectores() {

    // Selector dias
    const selectDia = document.getElementById("diaNac");

    const dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12',
                  '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                  '25', '25', '26', '27', '28', '29', '30', '31'];

    for (let i = 0; i < dias.length; i++) {
        const option = document.createElement("option");
        option.text = dias[i];
        option.value = dias[i];
        selectDia.appendChild(option);
    }

    // Selector Meses
    const mesHTML = document.getElementById("mesNac");
    const meses = [
        { nombre: 'Enero', valor: '01' },
        { nombre: 'Febrero', valor: '02' },
        { nombre: 'Marzo', valor: '03' },
        { nombre: 'Abril', valor: '04' },
        { nombre: 'Mayo', valor: '05' },
        { nombre: 'Junio', valor: '06' },
        { nombre: 'Julio', valor: '07' },
        { nombre: 'Agosto', valor: '08' },
        { nombre: 'Septiembre', valor: '09' },
        { nombre: 'Octubre', valor: '10' },
        { nombre: 'Noviembre', valor: '11' },
        { nombre: 'Diciembre', valor: '12' }
    ];

    meses.forEach(mes => {
        const option = document.createElement("option");
        option.text = mes.nombre;
        option.value = mes.valor;
        mesHTML.appendChild(option);
    });

    // Selector Estados
    const estados = {
        "AGUASCALIENTES": "AS",
        "BAJA CALIFORNIA": "BC",
        "BAJA CALIFORNIA SUR": "BS",
        "CAMPECHE": "CC",
        "COAHUILA": "CL",
        "COLIMA": "CM",
        "CHIAPAS": "CS",
        "CHIHUAHUA": "CH",
        "DISTRITO FEDERAL": "DF",
        "DURANGO": "DG",
        "GUANAJUATO": "GT",
        "GUERRERO": "GR",
        "HIDALGO": "HG",
        "JALISCO": "JC",
        "MEXICO": "MC",
        "MICHOACAN": "MN",
        "MORELOS": "MS",
        "NAYARIT": "NT",
        "NUEVO LEON": "NL",
        "OAXACA": "OC",
        "PUEBLA": "PL",
        "QUERETARO": "QT",
        "QUINTANA ROO": "QR",
        "SAN LUIS POTOSI": "SP",
        "SINALOA": "SL",
        "SONORA": "SR",
        "TABASCO": "TC",
        "TAMAULIPAS": "TS",
        "TLAXCALA": "TL",
        "VERACRUZ": "VZ",
        "YUCATAN": "YN",
        "ZACATECAS": "ZS",
        "EXTRANJERO": "NE"
    };

    const estadosHTML = document.getElementById("estadoNac");
    for (const estado in estados) {
        const option = document.createElement("option");
        option.text = estado;
        option.value = estados[estado];
        estadosHTML.appendChild(option);
    }
}

llenarSelectores();