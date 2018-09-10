import { Moment } from 'moment';

export interface Media {
  id: string;
  name: string;
  mimeType: string;
  blob: Blob;
  // Not persisted in local storage.
  blobUrl?: string;
  dateTime: string;
  // Length in seconds.
  length: number;
}
