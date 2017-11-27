export interface ICategory {
  id: number;
  name: string;
  featured: boolean;
  image?: { url: string };
  parentId?: number;
  children?: ICategory[];

  link?: { name: string; params?: any };
  slug?: string;
}
