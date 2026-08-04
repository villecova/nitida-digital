import type { CollectionEntry } from 'astro:content';

type WorkEntry = CollectionEntry<'work'>;

/** Heurística legacy cuando serviceCategories está vacío */
export function isWebByScope(scope: string): boolean {
  const s = scope?.toLowerCase() || '';
  return (
    s.includes('página web') ||
    s.includes('web') ||
    s.includes('sitio') ||
    s.includes('landing') ||
    s.includes('e-commerce')
  );
}

export function hasCategory(
  entry: WorkEntry,
  category: 'web' | 'branding' | 'digital'
): boolean {
  const cats = entry.data.serviceCategories ?? [];
  if (cats.length > 0) return cats.includes(category);
  if (category === 'web') return isWebByScope(entry.data.scope);
  if (category === 'branding') return !isWebByScope(entry.data.scope);
  return false;
}

export function sortProjects(a: WorkEntry, b: WorkEntry): number {
  const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  return b.data.year - a.data.year;
}

export function serviceLabel(
  categories: ('web' | 'branding' | 'digital')[],
  scope: string
): string {
  if (categories.includes('web') && categories.includes('branding')) {
    return 'Web e identidad visual';
  }
  if (categories.includes('web') || isWebByScope(scope)) {
    return 'Sitio web';
  }
  if (categories.includes('branding')) {
    return 'Identidad visual';
  }
  if (categories.includes('digital')) {
    return 'Producto digital';
  }
  return scope;
}
