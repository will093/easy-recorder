import { Moment } from 'moment';

export interface Media {
  id: string;
  name: string;
  mimeType: string;
  blob: Blob;
  dateTime: string;
}
