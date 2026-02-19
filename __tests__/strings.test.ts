import { strings } from '../src/strings';

describe('strings', () => {
  it('exports required keys', () => {
    expect(strings).toBeDefined();
    expect(typeof strings).toBe('object');
  });

  it('has non-empty string values for static keys', () => {
    const staticKeys = [
      'add',
      'edit',
      'delete',
      'save',
      'cancel',
      'noAdapterAvailable',
      'keyLabel',
      'valueLabel',
    ];
    for (const key of staticKeys) {
      const val = strings[key as keyof typeof strings];
      expect(val).toBeDefined();
      expect(typeof val).toBe('string');
      expect(val.length).toBeGreaterThan(0);
    }
  });

  it('has function values for parameterized strings', () => {
    expect(typeof strings.charCount).toBe('function');
    expect(typeof strings.deleteItemTitle).toBe('function');
  });
});
