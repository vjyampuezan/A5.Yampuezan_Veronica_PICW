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
        