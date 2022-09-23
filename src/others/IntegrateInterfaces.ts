export type Path = 'home' | 'map' | 'writing';

export type Category = 'ALL' | 'LIFE' | 'SECURITY' | 'TRAFFIC';

export interface Obj<T> {
  [key: string]: T;
}
