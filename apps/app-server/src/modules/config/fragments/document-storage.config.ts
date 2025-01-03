import type { ConfigDefinition } from 'figue';
import { z } from 'zod';
import { FS_STORAGE_DRIVER_NAME } from '../../documents/storage/drivers/fs/fs.storage-driver';

export const documentStorageConfig = {
  maxUploadSize: {
    doc: 'The maximum size in bytes for an uploaded file',
    schema: z.coerce.number().int().positive(),
    default: 10 * 1024 * 1024, // 10MB
    env: 'DOCUMENT_STORAGE_MAX_UPLOAD_SIZE',
  },
  driver: {
    doc: 'The driver to use for document storage',
    schema: z.enum([FS_STORAGE_DRIVER_NAME]),
    default: FS_STORAGE_DRIVER_NAME,
    env: 'DOCUMENT_STORAGE_DRIVER',
  },
  drivers: {
    filesystem: {
      root: {
        doc: 'The root directory to store documents in',
        schema: z.string(),
        default: './local-documents',
        env: 'DOCUMENT_STORAGE_FILESYSTEM_ROOT',
      },
    },
  },
} as const satisfies ConfigDefinition;
