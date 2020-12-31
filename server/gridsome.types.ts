import type { Application } from 'express';

type LoadSourceFunction = (
  actions: GridsomeDataStoreAPI
) => void | Promise<void>;
type ConfigureServerFunction = (app: Application) => void;
type AfterBuildFunction = () => void | Promise<void>;

export interface GridsomePlugin {
  loadSource?: LoadSourceFunction;
  configureServer?: ConfigureServerFunction;
  afterBuild?: AfterBuildFunction;
}

export interface GridsomeAPI {
  loadSource(fn: LoadSourceFunction): void;
  configureServer(fn: ConfigureServerFunction): void;
  afterBuild(fn: AfterBuildFunction): void;
}

export interface GridsomeDataStoreAPI {
  addCollection(options: string | Record<string, unknown>): GridsomeCollection;
}

export interface GridsomeCollection {
  addNode(data: Record<string, unknown>): void;
}
