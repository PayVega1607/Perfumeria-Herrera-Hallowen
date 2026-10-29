export class Perfume {
  constructor({ id, nombre, categoria, precio, imagen, marca, descripcion, descripcionDetallada, notas }) {
    Object.assign(this, { id, nombre, categoria, precio, imagen, marca, descripcion, descripcionDetallada, notas });
  }
  get coleccion() { return this.categoria === 'hombre' ? 'Colección de Caballeros' : 'Colección de Damas'; }
  get esSet() { return this.nombre.startsWith('Set '); }
  get tienePrecio() { return this.precio != null; }
}
