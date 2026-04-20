const API_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '/api')
    : `${process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com'}/api`;

export async function getPageContent(pageSlug: string): Promise<Record<string, any>> {
  try {
    const res = await fetch(`${API_URL}/content/${pageSlug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return {};
    const data = await res.json();
    return data.content || {};
  } catch {
    return {};
  }
}

export async function getSection(pageSlug: string, sectionKey: string): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/content/${pageSlug}/${sectionKey}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}
