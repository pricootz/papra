export type ExtractorDefinition = ReturnType<typeof defineTextExtractor>;

export function defineTextExtractor(args: {
  name: string;
  mimeTypes: string[];
  extract: (args: { arrayBuffer: ArrayBuffer }) => Promise<{ content: string }>;
}) {
  return args;
}
