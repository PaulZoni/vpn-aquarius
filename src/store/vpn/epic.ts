import {isActionOf} from 'typesafe-actions';
import {ActionsObservable} from 'redux-observable';
import {filter, map, switchMap, catchError} from 'rxjs/operators';
import {of, from} from 'rxjs';
import {Epic, RootAction} from '../types';
import {vpnActionConnect, vpnActionStop, vpnActionGetCountries} from './action';

export const stopVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
) =>
  action$.pipe(
    filter(isActionOf(vpnActionStop.request)),
    switchMap(action =>
      from(apiVpn.stopVpn()).pipe(
        map(({data, errors}) => vpnActionStop.success()),
      ),
    ),
  );

export const connectVpn: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
) =>
  action$.pipe(
    filter(isActionOf(vpnActionConnect.request)),
    switchMap(action =>
      from(apiVpn.startVpn()).pipe(
        map(
          data => vpnActionConnect.success(),
          catchError(err => of(vpnActionConnect.failure())),
        ),
      ),
    ),
  );

export const getCountries: Epic = (
  action$: ActionsObservable<RootAction>,
  state$,
  {apiVpn},
) =>
  action$.pipe(
    filter(isActionOf(vpnActionGetCountries.request)),
    switchMap(action =>
      from(apiVpn.getCountries()).pipe(
        map(
          (data: Object) =>
            vpnActionGetCountries.success(new Map(Object.entries(data))),
          catchError(error => of(vpnActionGetCountries.failure())),
        ),
      ),
    ),
  );
