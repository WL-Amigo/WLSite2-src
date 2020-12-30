import type { Application } from 'express';

export type GridsomeAPI = {
  loadSource(fn: (actions: GridsomeDataStoreAPI) => void | Promise<void>): void;
  configureServer(fn: (app: Application) => void): void;
  afterBuild(fn: () => void | Promise<void>): void;
};

export type GridsomeDataStoreAPI = {
  addCollection(options: string | Record<string, unknown>): GridsomeCollection;
};

export type GridsomeCollection = {
  addNode(data: Record<string, unknown>): void;
};
