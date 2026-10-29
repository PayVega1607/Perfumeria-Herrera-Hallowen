import { pintarTarjetas } from '../vista/vistaTarjetas.js';

// Filtros de la vista Catálogo: se actualiza solo la grilla, sin recargar la página.
export function iniciarFiltros(main, catalogo) {
  const form = main.querySelector('#filtros');
  if (!form) return; // otras vistas no tienen filtros

  const grid = main.querySelector('[data-grid="catalogo"]');
  const contador = main.querySelector('#contador-resultados');
  const vacio = main.querySelector('#sin-resultados');
  const selMarca = form.elements.marca;
  catalogo.marcas().forEach((m) => selMarca.add(new Option(m, m)));

  // Pestañas de colección: controlan el mismo selector "Público" (se mantienen sincronizados).
  const tabs = main.querySelectorAll('#tabs-coleccion button');
  const marcarTab = () => tabs.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.valor === form.elements.publico.value)));
  tabs.forEach((t) => t.addEventListener('click', () => { form.elements.publico.value = t.dataset.valor; aplicar(); }));

  const num = (v) => (v === '' ? null : Number(v));
  function aplicar() {
    const f = form.elements;
    const lista = catalogo.filtrar({
      texto: f.texto.value, marca: f.marca.value, publico: f.publico.value,
      min: num(f.min.value), max: num(f.max.value),
    });
    marcarTab();
    pintarTarjetas(grid, lista);
    contador.textContent = `${lista.length} ${lista.length === 1 ? 'perfume encontrado' : 'perfumes encontrados'}`;
    vacio.hidden = lista.length > 0;
  }
  const limpiar = () => { form.reset(); aplicar(); };

  form.addEventListener('input', aplicar);
  form.addEventListener('submit', (e) => e.preventDefault());
  main.querySelector('#limpiar-filtros').addEventListener('click', limpiar);
  main.querySelector('#limpiar-vacio').addEventListener('click', limpiar);
  aplicar();
}
