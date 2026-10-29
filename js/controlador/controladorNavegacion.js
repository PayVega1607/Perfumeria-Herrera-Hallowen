import { pintarVista } from './controladorCatalogo.js';
import { iniciarFiltros } from './controladorFiltros.js';

const RUTAS = ['inicio', 'categoria', 'destacados', 'hombre', 'dama', 'catalogo', 'contacto', 'halloween'];

export function iniciarNavegacion(catalogo) {
  const main = document.getElementById('vista');
  const menu = document.getElementById('menu');
  const botonMenu = document.getElementById('btn-menu');

  async function mostrar() {
    let ruta = location.hash.replace('#/', '');
    if (!RUTAS.includes(ruta)) ruta = 'inicio';
    try {
      const resp = await fetch(`vistas/${ruta}.html`);
      if (!resp.ok) throw new Error(resp.status);
      main.innerHTML = await resp.text(); // HTML propio del proyecto (carpeta vistas/)
    } catch {
      main.textContent = 'No se pudo cargar la sección. Abre el sitio con un servidor local (ver README).';
      return;
    }
    pintarVista(main, catalogo);
    iniciarFiltros(main, catalogo);
    menu.querySelectorAll('a').forEach((a) => a.classList.toggle('activo', a.dataset.ruta?.split(' ').includes(ruta)));
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
  }

  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });
  window.addEventListener('hashchange', mostrar);
  return mostrar();
}
