const API_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '/api')
    : `${process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com'}/api`;

const REVALIDATE = 60;
const TIMEOUT_MS = 15000;
const RETRY_DELAY_MS = 500;

// Shared fetch helper: timeout + single retry on network/timeout/5xx.
// Returns the parsed JSON on success, or null on giving up.
async function fetchJsonWithRetry(path: string): Promise<any | null> {
  const url = `${API_URL}${path}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return await res.json();
      if (res.status >= 400 && res.status < 500) return null;
    } catch {
      // network / abort / timeout — fall through
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  }
  return null;
}

export async function getPageContent(pageSlug: string): Promise<Record<string, any>> {
  const data = await fetchJsonWithRetry(`/content/${pageSlug}`);
  return data?.content || {};
}

export async function getSection(pageSlug: string, sectionKey: string): Promise<any> {
  const data = await fetchJsonWithRetry(`/content/${pageSlug}/${sectionKey}`);
  return data?.data || null;
}
