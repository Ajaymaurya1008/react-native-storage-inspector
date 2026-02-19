import { LAYOUT } from '../src/constants';

describe('LAYOUT', () => {
  it('exports chevronSize', () => {
    expect(LAYOUT.chevronSize).toBeDefined();
    expect(typeof LAYOUT.chevronSize).toBe('number');
    expect(LAYOUT.chevronSize).toBeGreaterThan(0);
  });

  it('exports hitSlop', () => {
    expect(LAYOUT.hitSlop).toBeDefined();
    expect(LAYOUT.hitSlop).toMatchObject({
      top: expect.any(Number),
      bottom: expect.any(Number),
      left: expect.any(Number),
      right: expect.any(Number),
    });
  });
});
