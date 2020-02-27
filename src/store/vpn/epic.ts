import {isActionOf} from 'typesafe-actions';
import {ActionsObservable} from 'redux-observable';
import {filter, map, switchMap, catchError} from 'rxjs/operators';
import {Observable, of, from} from 'rxjs';
import {Epic, RootAction} from '../types';
import {vpnActionConnect, vpnActionStop} from './action';

export const stopVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
): Observable<any> => {
  return action$.pipe(
    filter(isActionOf(vpnActionStop.request)),
    switchMap(action =>
      from(apiVpn.stopVpn()).pipe(
        map(({data, errors}) => {
          return vpnActionStop.success();
        }),
      ),
    ),
  );
};

export const connectVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
): Observable<any> => {
  return action$.pipe(
    filter(isActionOf(vpnActionConnect.request)),
    switchMap(action => {
      return from(apiVpn.startVpn()).pipe(
        map(
          ({data, errors}) => {
            return vpnActionConnect.success();
          },
          catchError(err => {
            alert('error');
            return of(vpnActionConnect.failure());
          }),
        ),
      );
    }),
  );
};
