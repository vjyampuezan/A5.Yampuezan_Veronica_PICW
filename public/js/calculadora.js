// Se definió el componente calculadora-web
class CalculadoraWeb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Se activó el Shadow DOM
  // Se insertó estructura y estilos
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/public/lib/bootstrap/css/bootstrap.min.css" />

      <div class="card border-info p-4">
        <h5 class="text-center text-info mb-3">Calculadora Interactiva</h5>

        <!-- Se organizó horizontalmente -->
        <div class="row g-2 align-items-center justify-content-center">
          <div class="col-md-3">
            <input id="valor1" type="number" class="form-control" placeholder="Número 1">
          </div>
          <div class="col-md-3">
            <input id="valor2" type="number" class="form-control" placeholder="Número 2">
          </div>
          <div class="col-md-3">
            <select id="operador" class="form-select">
              <option value="sumar">Sumar</option>
              <option value="restar">Restar</option>
              <option value="multiplicar">Multiplicar</option>
              <option value="dividir">Dividir</option>
            </select>
          </div>
          <div class="col-md-2">
            <button id="resolver" class="btn btn-outline-info w-100">Ejecutar</button>
          </div>
        </div>

        <div id="salida" class="alert alert-secondary mt-3">Esperando operación...</div>
<!-- Se incluyó historial -->
        <div class="mt-3">
          <h6>Historial:</h6>
          <ul id="registro" class="list-group small"></ul>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const boton = this.shadowRoot.querySelector('#resolver');
    boton.addEventListener('click', () => this.calcularResultado());
  }

  calcularResultado() {
    // Se capturaron datos
    const n1 = parseFloat(this.shadowRoot.querySelector('#valor1').value);
    const n2 = parseFloat(this.shadowRoot.querySelector('#valor2').value);
    const tipo = this.shadowRoot.querySelector('#operador').value;
    const salida = this.shadowRoot.querySelector('#salida');
    const historial = this.shadowRoot.querySelector('#registro');
// Se validaron números
    if (isNaN(n1) || isNaN(n2)) {
      salida.textContent = 'Error: Ingrese dos números válidos.';
      salida.className = 'alert alert-danger mt-3';
      return;
    }

    let resultado, signo;

    switch (tipo) {
      case 'sumar':
        resultado = n1 + n2; signo = '+'; break;
      case 'restar':
        resultado = n1 - n2; signo = '-'; break;
      case 'multiplicar':
        resultado = n1 * n2; signo = '×'; break;
      case 'dividir':
        if (n2 === 0) {
          salida.textContent = 'Error: No se puede dividir entre cero.';
          salida.className = 'alert alert-danger mt-3';
          return;
        }
        resultado = n1 / n2; signo = '÷'; break;
    }

    // Se mostró resultado
    salida.textContent = Resultado: ${resultado};
    salida.className = 'alert alert-success mt-3';

    // Se agregó al historial
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = ${n1} ${signo} ${n2} = ${resultado};
    historial.appendChild(item);

    // Se emitió evento personalizado
    this.dispatchEvent(new CustomEvent('resultado-listo', {
      detail: { n1, n2, operacion: tipo, resultado },
      bubbles: true,
      composed: true
    }));
  }
}
