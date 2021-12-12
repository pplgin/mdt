// Type definitions for jumpstate 2.2
// Project: https://github.com/jumpsuit/jumpstate#readme
// Definitions by: jiangshuai <https://github.com/pplgin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'jumpstate' {
  type IInitialState<S> = {
    initial: S;
  };

  export type IReducer<A = any> = {
    [P in keyof A]: A[P];
  };

  export type IReduce<S = any> = (state: S, payload?: any) => S;

  export const ActionCreators: {};

  export const Actions: {};

  export function CreateJumpstateMiddleware(options?: any): any;

  export function Effect(name: string, callback: any, ...args: any[]): any;

  export function Hook(callback: any): any;

  /**
   * A jumpstate sandboxed state object that returns a reducer with typed actionCreators and actionTypes
   *
   * @template A Action name Reducer.
   * @template S State object type.
   * @param name string namespace for the sandbox
   * @param config object defines the reducers and intial state
   */
  export function State<A, S>(
    name: string,
    config: { [P in keyof A]: IReduce<S> } & IInitialState<S>
  ): IReducer<A>;

  export function dispatch(...args: any[]): any;

  export function getState<S = any>(): S;
}
