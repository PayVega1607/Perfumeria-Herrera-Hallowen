import { formatoPrecio } from '../utilidades/formatoPrecio.js';
import { urlConsulta } from '../utilidades/whatsapp.js';

// Clona la plantilla HTML #tpl-tarjeta por cada perfume y rellena sus datos.
export function pintarTarjetas(contenedor, perfumes) {
  const plantilla = document.getElementById('tpl-tarjeta');
  const frag = document.createDocumentFragment();
  for (const p of perfumes) {
    const t = plantilla.content.cloneNode(true);
    const img = t.querySelector('img');
    img.src = p.imagen;
    img.alt = p.nombre;
    t.querySelector('.tarjeta-nombre').textContent = p.nombre;
    t.querySelector('.tarjeta-coleccion').textContent = p.esSet ? `Set · ${p.coleccion}` : p.coleccion;
    t.querySelector('.tarjeta-desc').textContent = p.descripcion ?? '';
    t.querySelector('.btn-wa').href = urlConsulta(p);
    const precio = t.querySelector('.tarjeta-precio');
    precio.textContent = formatoPrecio(p.precio);
    precio.classList.toggle('consultar', !p.tienePrecio);
    t.querySelector('button').dataset.id = p.id;
    frag.append(t);
  }
  contenedor.replaceChildren(frag);
}
