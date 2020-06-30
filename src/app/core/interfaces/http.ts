export interface HttpExtraParams {
  headers: Header[];
}

interface Header {
  key: string;
  value: string;
}