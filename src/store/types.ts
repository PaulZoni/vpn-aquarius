import {Epic as RoEpic} from 'redux-observable';
//import { State } from "./reducer";
import {ActionType, Reducer} from 'typesafe-actions';
import {Action} from './vpn/action';
import {EpicMiddleware as RoEpicMiddleware} from 'redux-observable';
import {State} from '.';
import {Observable} from 'rxjs';

export type RootAction = ActionType<Action>;

export type RootState = State;

export type RootReducer = Reducer<RootState, RootAction>;

type PromiseAsObservable<T> = {
  [K in keyof T]: T[K] extends () => Promise<infer U>
    ? () => Observable<U> | Promise<U>
    : T[K]
};

type EpicToDependency<T> = {[K in keyof T]: PromiseAsObservable<T[K]>};

export type Services = EpicToDependency<
  ReturnType<typeof import('../services').createServices>
>;

export type EpicMiddleware = RoEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>;

export type Epic = RoEpic<RootAction, RootAction, RootState, Services>;
