import { getExtractor } from './extractors.registry';

export async function extractText({ arrayBuffer, mimeType }: { arrayBuffer: ArrayBuffer; mimeType: string }): Promise<{
  extractorName: string | undefined;
  textContent: string | undefined;
  error?: Error;
}> {
  const { extractor } = getExtractor({ mimeType });

  if (!extractor) {
    return {
      extractorName: undefined,
      textContent: undefined,
    };
  }

  try {
    const { content } = await extractor.extract({ arrayBuffer });

    return {
      extractorName: extractor.name,
      textContent: content,
    };
  } catch (error) {
    return {
      error,
      extractorName: extractor.name,
      textContent: undefined,
    };
  }
}

export async function extractTextFromBlob(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const mimeType = blob.type;

  return extractText({ arrayBuffer, mimeType });
}
