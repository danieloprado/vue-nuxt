import Vue from 'vue';

import { IAppStore } from '../store/interfaces/store';

export abstract class BaseComponent<T = {}> extends Vue {
  public propsCheck: T & { class?: string };

  public errors: {
    has(key: string): boolean;
    first(key: string): string;
  };

  public $store: IAppStore;

  protected $nuxt: any;

  protected $router: {
    push(params: { name: string; params?: any }): void;
    replace(params: any): void;
  };

  protected $validator: {
    validateAll(): Promise<boolean>;
    reset(): void;
  };
}
