import type { DocumentsRepository } from './documents.repository';
import type { DocumentStorageService } from './storage/documents.storage.services';

export async function createDocument({
  file,
  userId,
  organizationId,
  documentsRepository,
  documentsStorageService,
}: {
  file: File;
  userId: string;
  organizationId: string;
  documentsRepository: DocumentsRepository;
  documentsStorageService: DocumentStorageService;
}) {
  const {
    name: fileName,
    size,
    type: mimeType,
  } = file;

  const { storageKey } = await documentsStorageService.saveFile({
    fileStream: file.stream(),
    fileName,
  });

  const { document } = await documentsRepository.saveOrganizationDocument({
    name: fileName,
    organizationId,
    originalName: fileName,
    createdBy: userId,
    size,
    storageKey,
    mimeType,
  });

  return { document };
}
