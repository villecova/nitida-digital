# Integraciones pendientes — Nítida Digital

Configuración central de contacto: [`src/data/site.ts`](src/data/site.ts).

## Correo

- Valor actual: `nitidacrea@gmail.com`
- Para cambiar el correo de todo el sitio, edita `site.email` en `src/data/site.ts`.
- NutriPill y páginas legales usan el mismo correo vía esa fuente (o deben actualizarse para importarla).

## WhatsApp

- Actualmente `site.whatsapp = null` (no se muestra en la UI).
- Cuando tengas un número real, pon solo dígitos con código de país, por ejemplo: `'521XXXXXXXXXX'`.
- No publiques placeholders.

## Formulario (Formspree)

1. Crea un formulario en [Formspree](https://formspree.io/).
2. Copia el ID (ej. `xyzabcde`).
3. Crea un archivo `.env` en la raíz del proyecto:

```env
PUBLIC_FORMSPREE_ID=xyzabcde
```

4. Reinicia `npm run dev` / vuelve a hacer build.
5. Sin este valor, el formulario valida y muestra un error claro invitando a escribir por correo.

## Analytics (Google Analytics 4, opcional)

```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Sin este valor no se carga ningún script de medición.

### Eventos preparados

- `contact_click`
- `form_submit` / `form_submit_error`
- `plans_view`
- `project_click`
- `email_click`
- `whatsapp_click`

### Privacidad

- GA recopila datos de uso y puede usar cookies.
- Si activas GA en México/LATAM, actualiza política de privacidad y considera aviso de cookies si aplica a tu audiencia.
- Preferible una herramienta más ligera (p. ej. Plausible) en una fase posterior si quieres minimizar datos personales.

## Sitemap / site URL

Definido en `astro.config.mjs` como `https://nitidadigital.com`.

## Página `/specialist`

Conservada como landing del Plan Especialista. Marcada `noindex` para no competir en búsqueda con las páginas principales. Enlazada desde Planes.

## Logo Xperience

El proyecto usa por error el logo de Paguro y está `visible: false`. Cuando exista el logo correcto, actualizar `image` en `src/content/work/xperience.md` y decidir visibilidad.
