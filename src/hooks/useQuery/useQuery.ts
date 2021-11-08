import { LocalStorageUtils } from 'utils';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

type UseQueryOptions = {
  watchedQueryKeys: string[];
  global?: boolean;
};

export const useQuery = (options?: UseQueryOptions) => {
  const history = useHistory();

  const { pathname } = useLocation();

  const { watchedQueryKeys, global } = options || {};

  const PERSIST_STORAGE_KEY = global ? `QUERY:*` : `QUERY:${pathname}`;

  const initUrlQueryParams = () => {
    return new URLSearchParams(window.location.search);
  };

  const initPersistedQueryParams = React.useCallback(() => {
    return new URLSearchParams(LocalStorageUtils.get(PERSIST_STORAGE_KEY, ''));
  }, [PERSIST_STORAGE_KEY]);

  const get = React.useCallback((key: string | string[]): string | Record<string, string | null> | null => {
    const queryPrams = initUrlQueryParams();

    if (typeof key === 'string') return queryPrams.get(key);

    return key.reduce((acc, cur) => ({ ...acc, [cur]: queryPrams.get(cur) }), {} as Record<string, string | null>);
  }, []);

  const getPersisted = React.useCallback(
    (key: string | string[]): string | Record<string, string | null> | null => {
      const persistedQueryParams = initPersistedQueryParams();

      if (typeof key === 'string') return persistedQueryParams.get(key);

      return key.reduce(
        (acc, cur) => ({ ...acc, [cur]: persistedQueryParams.get(cur) }),
        {} as Record<string, string | null>
      );
    },
    [initPersistedQueryParams]
  );

  const getAll = React.useCallback((key: string | string[]): string[] | Record<string, string[]> => {
    const queryPrams = initUrlQueryParams();

    if (typeof key === 'string') return queryPrams.getAll(key);

    return key.reduce((acc, cur) => ({ ...acc, [cur]: queryPrams.getAll(cur) }), {} as Record<string, string[]>);
  }, []);

  const getAllPersisted = React.useCallback(
    (key: string | string[]): string[] | Record<string, string[]> => {
      const persistedQueryParams = initPersistedQueryParams();

      if (typeof key === 'string') return persistedQueryParams.getAll(key);

      return key.reduce(
        (acc, cur) => ({ ...acc, [cur]: persistedQueryParams.getAll(cur) }),
        {} as Record<string, string[]>
      );
    },
    [initPersistedQueryParams]
  );

  const set = React.useCallback(
    (param1: string | Record<string, string | string[]>, param2?: string | string[]) => {
      // can't use search from useLocation due to closure issue
      const currentQueryParams = initUrlQueryParams();

      const addSingleValue = (param1: string, param2?: string | string[]) => {
        if (!param2) return;

        if (!Array.isArray(param2)) {
          currentQueryParams.set(param1, param2);
        } else {
          currentQueryParams.delete(param1);
          param2.forEach(p => currentQueryParams.append(param1, p));
        }
      };

      if (typeof param1 === 'string') {
        addSingleValue(param1, param2);
      } else {
        Object.keys(param1).forEach(key => addSingleValue(key, param1[key]));
      }

      history.push({ pathname, search: currentQueryParams.toString() });
    },
    [history, pathname]
  );

  const remove = React.useCallback(
    (key: string | string[]) => {
      // can't use search from useLocation due to closure issue
      const currentQueryParams = initUrlQueryParams();

      [key].flat().forEach(k => {
        currentQueryParams.delete(k);

        if (watchedQueryKeys?.includes(k)) {
          const persistedQueryParams = initPersistedQueryParams();
          persistedQueryParams.delete(k);
          LocalStorageUtils.set(PERSIST_STORAGE_KEY, persistedQueryParams.toString());
        }
      });

      history.push({ pathname, search: currentQueryParams.toString() });
    },
    [PERSIST_STORAGE_KEY, history, initPersistedQueryParams, pathname, watchedQueryKeys]
  );

  const clear = React.useCallback(() => {
    history.push({ pathname });
  }, [history, pathname]);

  const clearPersisted = React.useCallback(() => {
    LocalStorageUtils.remove(PERSIST_STORAGE_KEY);
  }, [PERSIST_STORAGE_KEY]);

  const UseQueryReturn = React.useMemo(
    () => ({
      get,
      set,
      remove,
      getPersisted,
      clear,
      clearPersisted,
      getAll,
      getAllPersisted,
    }),
    [get, set, remove, getPersisted, clear, clearPersisted, getAll, getAllPersisted]
  );

  // sync query between URL and localStorage
  const currenQueryParams = initUrlQueryParams();
  const persistedQueryParams = initPersistedQueryParams();

  if (watchedQueryKeys?.length) {
    const watchedQueryParams = watchedQueryKeys.reduce(
      (acc, cur) => ({ ...acc, [cur]: currenQueryParams.getAll(cur) }),
      {} as Record<string, string[]>
    );
    const watchedPersistedQueryParams = watchedQueryKeys.reduce(
      (acc, cur) => ({ ...acc, [cur]: persistedQueryParams.getAll(cur) }),
      {} as Record<string, string[]>
    );

    const hasWatchedQuery = Object.values(watchedQueryParams).some(v => !!v?.length);
    const hasWatchedPersistedQuery = Object.values(watchedPersistedQueryParams).some(v => !!v?.length);
    if (hasWatchedQuery) {
      watchedQueryKeys.forEach(key => {
        persistedQueryParams.delete(key);
        Object.values(watchedQueryParams[key]).forEach(value => persistedQueryParams.append(key, value));
      });
      LocalStorageUtils.set(PERSIST_STORAGE_KEY, persistedQueryParams.toString());
    } else if (hasWatchedPersistedQuery) {
      watchedQueryKeys.forEach(key => {
        currenQueryParams.delete(key);
        Object.values(watchedPersistedQueryParams[key]).forEach(value => currenQueryParams.append(key, value));
      });
      history.push({ pathname, search: currenQueryParams.toString() });
    }
  }

  return UseQueryReturn;
};
