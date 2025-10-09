// API
const API_URL = 'https://mindicador.cl/api';

// DOM
const montoCLP = document.getElementById('montoCLP');
const monedaSelect = document.getElementById('monedaSelect');
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');
const errorContainer = document.getElementById('errorContainer');

// Tipos de monedas
const monedasDisponibles = ['dolar', 'euro', 'uf', 'utm'];

// Mostrar errores
function mostrarError(mensaje) {
    errorContainer.textContent = mensaje;
    errorContainer.style.display = 'block';
}

// Ocultar errores
function ocultarError() {
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
}

// Cargar tipos de moneda
async function cargarMonedas() {
    try {
        const res = await fetch(API_URL);
        
        if (!res.ok) {
            throw new Error('No se pudo conectar con la API');
        }
        
        const data = await res.json();
        
        // Llenar el select con las monedas disponibles
        monedasDisponibles.forEach(moneda => {
            if (data[moneda]) {
                const option = document.createElement('option');
                option.value = moneda;
                option.textContent = data[moneda].nombre;
                monedaSelect.appendChild(option);
            }
        });
        
        console.log('Monedas cargadas correctamente');
        
    } catch (error) {
        mostrarError('Error al cargar las monedas: ' + error.message);
        console.error('Error:', error);
    }
}

// Conversión de monedas
async function convertirMoneda() {
    ocultarError();
    resultado.style.display = 'none';
    resultado.textContent = '';
    
    // Validar monto
    const monto = parseFloat(montoCLP.value);
    if (!monto || monto <= 0) {
        mostrarError('Por favor ingrese un monto válido en CLP');
        return;
    }
    
    // Validar moneda
    const moneda = monedaSelect.value;
    if (!moneda) {
        mostrarError('Por favor seleccione una moneda');
        return;
    }
    
    try {
        // Valor de la moneda
        const res = await fetch(`${API_URL}/${moneda}`);
        
        if (!res.ok) {
            throw new Error('No se pudo obtener el valor de la moneda');
        }
        
        const data = await res.json();
        const valorMoneda = data.serie[0].valor;
        
        const montoConvertido = monto / valorMoneda;
        
        resultado.textContent = `Resultado: $${montoConvertido.toFixed(2)}`;
        resultado.style.display = 'flex';
        
        console.log(`Conversión exitosa: ${monto} CLP = ${montoConvertido.toFixed(2)} ${moneda.toUpperCase()}`);
        
    } catch (error) {
        mostrarError('Error al realizar la conversión: ' + error.message);
        console.error('Error en conversión:', error);
    }
}

//iniciar funciones
cargarMonedas();
btnBuscar.addEventListener('click', convertirMoneda);
montoCLP.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertirMoneda();
    }
});