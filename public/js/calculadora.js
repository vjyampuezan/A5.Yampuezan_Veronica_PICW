class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/public/lib/bootstrap/css/bootstrap.min.css';

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="border p-4 rounded" style="max-width: 400px; margin: 20px auto;">
        <div class="mb-3">
          <label for="n1" class="form-label">Número 1</label>
          <input type="text" id="n1" class="form-control">
        </div>
        <div class="mb-3">
          <label for="n2" class="form-label">Número 2</label>
          <input type="text" id="n2" class="form-control">
        </div>
        <div class="mb-3">
          <label for="op" class="form-label">Operación</label>
          <select id="op" class="form-select">
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
          </select>
        </div>
        <button id="btn" class="btn btn-primary w-100">Calcular</button>
        <div id="out" class="mt-3 alert alert-light border">Resultado: </div>
      </div>
    `;

    this.shadowRoot.append(link, wrapper);

    this.shadowRoot.querySelector('#btn')
      .addEventListener('click', () => this.calcular());
  }

  calcular() {
    const n1 = parseFloat(this.shadowRoot.querySelector('#n1').value);
    const n2 = parseFloat(this.shadowRoot.querySelector('#n2').value);
    const op = this.shadowRoot.querySelector('#op').value;
    const out = this.shadowRoot.querySelector('#out');

    if (isNaN(n1) || isNaN(n2)) {
      out.className = 'alert alert-danger mt-3';
      out.textContent = 'Error: Debe ingresar dos números válidos.';
      return;
    }

    if (op === 'dividir' && n2 === 0) {
      out.className = 'alert alert-danger mt-3';
      out.textContent = 'Error: División por cero no permitida.';
      return;
    }

    let resultado = 0;
    switch (op) {
      case 'sumar': resultado = n1 + n2; break;
      case 'restar': resultado = n1 - n2; break;
      case 'multiplicar': resultado = n1 * n2; break;
      case 'dividir': resultado = n1 / n2; break;
    }

    out.className = 'alert alert-success mt-3';
    out.textContent = Resultado: ${resultado};
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);