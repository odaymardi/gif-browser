import { paginationSchema, searchSchema } from '../../src/validators/gif.validator';

describe('Validation Schemas', () => {
  it('parses valid pagination values', () => {
    const result = paginationSchema.parse({ limit: '10', offset: '5' });
    expect(result.limit).toBe(10);
    expect(result.offset).toBe(5);
  });

  it('throws on invalid limit', () => {
    const result = paginationSchema.safeParse({ limit: '100' });
    expect(result.success).toBe(false);
  });

  it('requires search query in search schema', () => {
    const result = searchSchema.safeParse({ limit: '10' });
    expect(result.success).toBe(false);
  });
});
