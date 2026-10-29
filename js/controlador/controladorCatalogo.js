import { pintarTarjetas } from '../vista/vistaTarjetas.js';

// Especial de Halloween: ids de perfumes que ya existen en el catálogo (sin duplicar registros).
const HALLOWEEN = {
  hombre: ['h-afnan-9-pm', 'h-212-vip-black', 'h-jean-paul-gaultier-le-male-elixir', 'h-khamrah-qahwa-lattafa'],
  dama: ['d-her-confession-lattafa', 'd-cloud-2-0-intense-ariana-grande', 'd-la-bomba-carolina-herrera', 'd-vanilla-freak-lattafa'],
};
const porIds = (catalogo, ids) => ids.map((id) => catalogo.todos().find((p) => p.id === id)).filter(Boolean);

// Rellena cada <div data-grid="..."> de la vista actual con los perfumes que le tocan.
export function pintarVista(contenedor, catalogo) {
  const fuentes = {
    destacados: () => catalogo.destacados(),
    hombre: () => catalogo.porCategoria('hombre'),
    dama: () => catalogo.porCategoria('dama'),
    catalogo: () => catalogo.todos(),
    'halloween-hombre': () => porIds(catalogo, HALLOWEEN.hombre),
    'halloween-dama': () => porIds(catalogo, HALLOWEEN.dama),
  };
  contenedor.querySelectorAll('[data-grid]').forEach((grid) => {
    pintarTarjetas(grid, fuentes[grid.dataset.grid]());
  });
}
