export interface Envelope<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  pagination: Pagination | null;
}

export interface Pagination {
  items_per_page: number;
  page: number;
  total_pages: number;
  total_items: number;
}
