import { describe, expect, test } from 'vitest';
import { defineTextExtractor } from './extractors.models';
import { getExtractor } from './extractors.registry';

describe('extractors registry', () => {
  describe('getExtractor', () => {
    test('gets the extractor for a given mimeType', () => {
      const extractorDefinitions = [
        defineTextExtractor({ name: '1', mimeTypes: ['a/b'], extract: async () => ({ content: '' }) }),
        defineTextExtractor({ name: '2', mimeTypes: ['a/*'], extract: async () => ({ content: '' }) }),
        defineTextExtractor({ name: '3', mimeTypes: ['c/d'], extract: async () => ({ content: '' }) }),
      ];

      expect(getExtractor({ mimeType: 'a/b', extractors: extractorDefinitions }).extractor.name).to.eql('1');
      expect(getExtractor({ mimeType: 'a/c', extractors: extractorDefinitions }).extractor.name).to.eql('2');
      expect(getExtractor({ mimeType: 'e/f', extractors: extractorDefinitions })).to.eql({ extractor: undefined });
    });
  });
});
