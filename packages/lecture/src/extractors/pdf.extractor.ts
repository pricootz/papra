import { extractText } from 'unpdf';
import { defineTextExtractor } from '../extractors.models';

export const pdfExtractorDefinition = defineTextExtractor({
  name: 'pdf',
  mimeTypes: ['application/pdf'],
  extract: async ({ arrayBuffer }) => {
    const { text } = await extractText(arrayBuffer, { mergePages: true });

    return { content: text };
  },
});
