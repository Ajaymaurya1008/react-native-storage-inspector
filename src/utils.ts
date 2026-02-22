/**
 * Parses a string (JSON array) to string[]. Returns [] for null, empty,
 * invalid JSON, or when the value is not an array of strings.
 */
export function parsePersistedKeys(raw: string | null): string[] {
  if (raw == null || raw === '') return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}
