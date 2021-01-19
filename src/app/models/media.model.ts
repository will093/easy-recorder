export interface Media {
  id: string;
  name: string;
  mimeType: string;
  blob: Blob;
  blobUrl?: string; // Not persisted in local storage.
  dateTime: string;
  length: number; // Length in seconds.
}
