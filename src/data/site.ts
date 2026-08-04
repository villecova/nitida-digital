/**
 * Fuente única de datos de contacto y sitio.
 * Cambiar email, WhatsApp o redes aquí — no hardcodear en páginas.
 *
 * Pendientes externos: ver INTEGRACIONES.md
 */

const formspreeId =
  typeof import.meta.env.PUBLIC_FORMSPREE_ID === 'string'
    ? import.meta.env.PUBLIC_FORMSPREE_ID.trim()
    : '';

const gaMeasurementId =
  typeof import.meta.env.PUBLIC_GA_MEASUREMENT_ID === 'string'
    ? import.meta.env.PUBLIC_GA_MEASUREMENT_ID.trim()
    : '';

const email = 'nitidacrea@gmail.com';
const whatsapp: string | null = null;

export const site = {
  name: 'Nítida Digital',
  personName: 'Juan Pablo Villegas',
  siteUrl: 'https://nitidadigital.com',
  /** Correo principal. Cambiar aquí si migras a hola@nitidadigital.com */
  email,
  /** null = no mostrar WhatsApp en la UI pública */
  whatsapp,
  instagram: 'https://www.instagram.com/nitida.digital/',
  formspreeId,
  gaMeasurementId,
  mailto: `mailto:${email}`,
  mailtoWithSubject(subject: string, body?: string) {
    const params = new URLSearchParams();
    params.set('subject', subject);
    if (body) params.set('body', body);
    return `mailto:${email}?${params.toString()}`;
  },
  formspreeEndpoint: formspreeId
    ? `https://formspree.io/f/${formspreeId}`
    : '',
  hasWhatsApp: Boolean(whatsapp),
  whatsappUrl: whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        'Hola, me gustaría conocer más sobre tus servicios'
      )}`
    : null,
};
