import { ICategory } from 'app/interfaces/category';

export function up(
  category: ICategory,
  categories: ICategory[],
  acc: ICategory[] = []
): ICategory[] {
  const father = categories.filter(x => x.id === category.parentId)[0];

  if (father && acc.indexOf(father) === -1) {
    acc.push(father);
    up(father, categories, acc);
  }

  return acc;
}

export function down(category: ICategory, categories: ICategory[]): ICategory {
  category.children = categories.filter(x => x.parentId === category.id).map(c => {
    return down(c, categories);
  });

  return category;
}
