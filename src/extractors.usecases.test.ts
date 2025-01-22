import fs from 'node:fs/promises';
import mime from 'mime';
import { glob } from 'tinyglobby';
import { describe, expect, test } from 'vitest';
import { extractText, extractTextFromBlob, extractTextFromFile } from './extractors.usecases';

const fixtures = await glob(['fixtures/*', '!fixtures/*.expected']);

describe('extractors usecases', () => {
  describe('extractText', () => {
    test('when no extractor is found for the mimeType, the textContent is undefined', async () => {
      const { textContent, error, extractorName } = await extractText({
        arrayBuffer: new ArrayBuffer(0),
        mimeType: 'application/unknown',
      });

      expect(error).to.eql(undefined);
      expect(extractorName).to.eql(undefined);
      expect(textContent).to.eql(undefined);
    });

    test('when an error occurs during extraction, the error is returned along with the extractor name and undefined textContent', async () => {
      const { textContent, error, extractorName } = await extractText({
        arrayBuffer: new ArrayBuffer(0), // empty array buffer will cause an error in the pdf extractor
        mimeType: 'application/pdf',
      });

      expect(error).to.not.eql(undefined);
      expect(error).to.be.instanceOf(Error);
      expect(extractorName).to.eql('pdf');
      expect(textContent).to.eql(undefined);
    });

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

  describe('extractTextFromBlob', () => {
    test('extracts text from a blob instance', async () => {
      const blob = new Blob(['Hello, world!'], { type: 'text/plain' });

      const { textContent, error, extractorName } = await extractTextFromBlob({ blob });

      expect(error).to.eql(undefined);
      expect(extractorName).to.eql('text');
      expect(textContent).to.eql('Hello, world!');
    });
  });

  describe('extractTextFromFile', () => {
    test('extracts text from a file instance', async () => {
      const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' });

      const { textContent, error, extractorName } = await extractTextFromFile({ file });

      expect(error).to.eql(undefined);
      expect(extractorName).to.eql('text');
      expect(textContent).to.eql('Hello, world!');
    });
  });
});
