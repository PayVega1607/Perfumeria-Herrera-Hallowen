import { Perfume } from './perfume.js';

// Los datos viven en datos/perfumes.json; Destacados es solo una lista de ids (no hay copias).
export class Catalogo {
  perfumes = [];
  idsDestacados = [];

  async cargar() {
    const [lista, ids] = await Promise.all([
      fetch('datos/perfumes.json').then((r) => r.json()),
      fetch('datos/destacados.json').then((r) => r.json()),
    ]);
    this.perfumes = lista.map((p) => new Perfume(p));
    this.idsDestacados = ids;
  }
  porId(id) { return this.perfumes.find((p) => p.id === id); }
  porCategoria(cat) { return this.perfumes.filter((p) => p.categoria === cat); }
  destacados() { return this.idsDestacados.map((id) => this.porId(id)).filter(Boolean); }
  todos() { return this.perfumes; }

  // Marcas existentes, en orden alfabético ("Sin marca indicada" al final).
  marcas() {
    const SIN = 'Sin marca indicada';
    const m = [...new Set(this.perfumes.map((p) => p.marca))].filter((x) => x !== SIN).sort((a, b) => a.localeCompare(b, 'es'));
    return this.perfumes.some((p) => p.marca === SIN) ? [...m, SIN] : m;
  }

  // Todos los criterios se combinan (Y). Con precio mínimo/máximo se excluyen los "Consultar precio".
  filtrar({ texto = '', marca = '', publico = '', min = null, max = null } = {}) {
    const norm = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const q = norm(texto.trim());
    return this.perfumes.filter((p) =>
      (!q || norm(`${p.nombre} ${p.marca === 'Sin marca indicada' ? '' : p.marca}`).includes(q)) &&
      (!marca || p.marca === marca) &&
      (!publico || p.categoria === publico) &&
      (min == null || (p.tienePrecio && p.precio >= min)) &&
      (max == null || (p.tienePrecio && p.precio <= max)));
  }
}
