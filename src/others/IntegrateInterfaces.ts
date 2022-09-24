export type Path = 'home' | 'map' | 'writing';

export type Category = 'ALL' | 'LIFE' | 'SECURITY' | 'TRAFFIC';

export type Emotion = 'GOOD' | 'BAD' | 'AMAZING';

export interface Obj<T> {
  [key: string]: T;
}
