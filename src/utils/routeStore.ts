"use client";

import { useSyncExternalStore } from "react";

export type RouteState = { refreshRoute: string[] };

const createRouteStore = () => {
  let state: RouteState = { refreshRoute: [] };

  const listeners = new Set<(state: RouteState) => void>();
  const subscribe = (listener: (state: RouteState) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const emitChange = () => listeners.forEach((listener) => listener(state));

  return {
    setRefreshRoute: (value: string[] | ((prev: string[]) => string[])) => {
      if (typeof value === "function")
        state = { refreshRoute: value(state.refreshRoute) };
      else state = { refreshRoute: value };
      emitChange();
    },
    useRouteStore: <SelectorOutput>(
      selector: (state: RouteState) => SelectorOutput
    ): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(state),
        () => selector({ refreshRoute: [] })
      ),
  };
};

const routeStore = createRouteStore();

export const { setRefreshRoute, useRouteStore } = routeStore;
