import { parsePersistedKeys } from '../src/utils';

describe('parsePersistedKeys', () => {
  it('returns [] for null', () => {
    expect(parsePersistedKeys(null)).toEqual([]);
  });

  it('returns [] for undefined', () => {
    expect(parsePersistedKeys(undefined as unknown as string | null)).toEqual([]);
  });

  it('returns [] for empty string', () => {
    expect(parsePersistedKeys('')).toEqual([]);
  });

  it('returns [] for non-string at runtime', () => {
    expect(parsePersistedKeys(123 as unknown as string | null)).toEqual([]);
    expect(parsePersistedKeys({} as unknown as string | null)).toEqual([]);
  });

  it('returns [] for invalid JSON', () => {
    expect(parsePersistedKeys('not json')).toEqual([]);
    expect(parsePersistedKeys('{')).toEqual([]);
    expect(parsePersistedKeys('[')).toEqual([]);
  });

  it('returns [] when parsed value is not an array', () => {
    expect(parsePersistedKeys('{}')).toEqual([]);
    expect(parsePersistedKeys('123')).toEqual([]);
    expect(parsePersistedKeys('"single"')).toEqual([]);
  });

  it('returns [] for empty array', () => {
    expect(parsePersistedKeys('[]')).toEqual([]);
  });

  it('returns string array for valid JSON array of strings', () => {
    expect(parsePersistedKeys('["a","b","c"]')).toEqual(['a', 'b', 'c']);
    expect(parsePersistedKeys('["only"]')).toEqual(['only']);
  });

  it('filters out non-string elements and returns only strings', () => {
    expect(parsePersistedKeys('["a",1,null,{},[],"b"]')).toEqual(['a', 'b']);
  });
});
