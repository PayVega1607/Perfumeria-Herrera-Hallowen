import { formatoPrecio } from './formatoPrecio.js';

// Número ya usado por el proyecto (el mismo de la página de referencia). Cámbialo solo aquí.
export const WHATSAPP = '573148859091';

// Mensaje de consulta/compra de un perfume; si no hay precio, pide el valor.
export function urlConsulta(p) {
  const texto = p.tienePrecio
    ? `Hola, me interesa el perfume ${p.nombre} (${formatoPrecio(p.precio)}). ¿Está disponible?`
    : `Hola, quisiera información sobre el precio del perfume ${p.nombre}.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}
