export type Update = Function;
export type Complete = () => void;
export type Error = (err: string) => void;

export interface Subscription {
  get: () => any,
  getVelocity: () => any,
  [key: string]: Function
}

export type ObservableInit = (actions: Observer) => { [key: string]: Function };

export type ObservableFactory = (init: ObservableInit, updatePipe?: Update) => Observable;

export interface Observer {
  update: Update,
  complete?: Complete,
  error?: Error
};

export interface BoundObservable {
  start: () => Subscription
}

export interface Observable {
  start: (observerCandidate: Update | Observer) => Subscription,
  bind: (observerCandidate: Update | Observer) => BoundObservable,
  pipe: (...funcs: Update[]) => Observable
};