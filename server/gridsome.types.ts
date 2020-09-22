export type GridsomeAPI = {
  loadSource(fn: (actions: GridsomeDataStoreAPI) => void | Promise<void>): void;
};

export type GridsomeDataStoreAPI = {
  addCollection(options: string | Record<string, unknown>): GridsomeCollection;
};

export type GridsomeCollection = {
  addNode(data: Record<string, unknown>): void;
};
