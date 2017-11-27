import { IProductQuery } from 'app/factories/productsQuery';
import lodash from 'lodash';

import { IProduct } from '../interfaces/product';
import { IProductQueryResult } from '../interfaces/productQuery';
import apiHttp from './api';

const defaultImage = require('../assets/img/no-img.jpg');

export async function featured(): Promise<IProduct[]> {
  const { data } = await apiHttp.get('/products');
  return map(data) as any;
}

export async function list(query: IProductQuery): Promise<IProductQueryResult> {
  const queryString = toQueryString(query);
  const { data } = await apiHttp.get(`/products-query?${queryString}`);

  data.data = map(data.data);
  return data;
}

export async function details(slug: string): Promise<IProduct> {
  const { data } = await apiHttp.get(`/product/${slug}`);
  return map(data) as any;
}

function map(product: IProduct | IProduct[]): IProduct | IProduct[] {
  if (Array.isArray(product)) {
    return product.map(map) as any;
  }

  product.thumbnail = !product.images ? defaultImage : product.images[0].url;
  product.link = {
    name: 'product-details',
    params: {
      id: product.id,
      slug: lodash.kebabCase(product.name)
    }
  };

  return product;
}

function toQueryString(obj: any): string {
  return lodash
    .reduce(
      obj,
      (result, value, key) => {
        return value ? (result += key + '=' + value + '&') : result;
      },
      ''
    )
    .slice(0, -1);
}
