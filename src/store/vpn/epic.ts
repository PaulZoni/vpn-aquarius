import {isActionOf} from 'typesafe-actions';
import {
  ActionsObservable,
  Epic as RoEpic,
  EpicMiddleware as RoEpicMiddleware,
} from 'redux-observable';
import {
  map,
  filter,
  switchMap,
  catchError,
  takeUntil,
  // delay,
} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {Epic, RootAction} from '../types';
import {Observable} from 'rxjs';
import {vpnAction, vpnActionConnect} from './action';

export const startVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
): Observable<any> => {
  return action$.pipe(
    filter(isActionOf(vpnAction)),
    switchMap(action => {
      const x = '';
      apiVpn.startVpn(x, x);
      return of();
    }),
  );
};

export const connectVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
): Observable<any> => {
  return action$.pipe(
    filter(isActionOf(vpnActionConnect.request)),
    switchMap(action => {
      return of(vpnActionConnect.success());
    }),
  );
};
