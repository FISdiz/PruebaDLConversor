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
    }
}

//iniciar funcion
cargarMonedas();