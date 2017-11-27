import lodash from 'lodash';

import { ICategory } from '../interfaces/category';
import apiHttp from './api';

export async function list(): Promise<ICategory[]> {
  const { data } = await apiHttp.get<ICategory[]>('/category');

  return data.map(category => {
    category.slug = lodash.kebabCase(category.name);
    category.link = {
      name: 'search-category',
      params: {
        categoryId: category.id,
        categorySlug: category.slug
      }
    };

    return category;
  });
}
