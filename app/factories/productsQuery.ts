export interface IProductQuery {
  pageSize: number;
  page: number;
  order: string;
  type: string;
  categoryId?: number;
}

export function fromQuery(query: {
  ps?: number;
  p?: number;
  o?: string;
  t?: string;
}): IProductQuery {
  return {
    pageSize: query.ps || 12,
    page: query.p || 1,
    order: query.o || 'asc',
    type: query.t || ''
  };
}

export function fromModel(
  model: IProductQuery
): {
  ps?: number;
  p?: number;
  o?: string;
  t?: string;
} {
  return {
    ps: model.pageSize || 12,
    p: model.page || 1,
    o: model.order || 'asc',
    t: model.type || ''
  };
}
