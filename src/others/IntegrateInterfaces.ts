export type Path = 'home' | 'writing';

export type Category = 'ALL' | 'LIFE' | 'SECURITY' | 'TRAFFIC';

export interface Obj<T> {
  [key: string]: T;
}
