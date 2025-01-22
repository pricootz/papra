import type { ExtractorDefinition } from './extractors.models';
import { pdfExtractorDefinition } from './extractors/pdf.extractor';
import { txtExtractorDefinition } from './extractors/txt.extractor';

const extractorDefinitions: ExtractorDefinition[] = [
  pdfExtractorDefinition,
  txtExtractorDefinition,
];

export function getExtractor({
  mimeType,
  extractors = extractorDefinitions,
}: {
  mimeType: string;
  extractors?: ExtractorDefinition[];
}) {
  const wilcardedMimeType = mimeType.replace(/\/.*/, '/*');
  const extractor = extractors.find(extractor => extractor.mimeTypes.includes(mimeType) || extractor.mimeTypes.includes(wilcardedMimeType));

  return {
    extractor,
  };
}
