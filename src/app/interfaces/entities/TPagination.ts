export type TPagination<T> = {
  data: T[];
  total_count: number;
  per_page: number;
  page: number;
};
