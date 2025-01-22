import fs from 'node:fs/promises';
import mime from 'mime';
import { glob } from 'tinyglobby';
import { describe, expect, test } from 'vitest';
import { extractText } from './extractors.usecases';

const fixtures = await glob(['fixtures/*', '!fixtures/*.expected']);

describe('extractors usecases', () => {
  describe('extractText', () => {
    describe('text is extracted from fixtures files', async () => {
      test('at least one fixture file is found', () => {
        expect(fixtures.length).to.be.greaterThan(0);
      });

      for (const fixture of fixtures) {
        test(`fixture ${fixture}`, async () => {
          const arrayBuffer = (await fs.readFile(fixture)).buffer as ArrayBuffer;
          const mimeType = mime.getType(fixture);

          const { textContent, error, extractorName } = await extractText({ arrayBuffer, mimeType });

          expect(error).to.eql(undefined);
          expect(extractorName).to.not.eql(undefined);

          const snapshotFilename = fixture.split('/').pop().replace(/\..*$/, '.expected');
          await expect(textContent).toMatchFileSnapshot(`../fixtures/${snapshotFilename}`, 'Fixture does not match snapshot');
        });
      }
    });
  });
});
