declare module "mongoose-seed" {
  export function connect(
    url: string,
    fn: (err: string, done: string) => void
  ): void;
  export function populateModels(
    data: Object[],
    fn: (err: string, done: string) => void
  ): void;
  export function loadModels(paths: string[]): void;
  export function disconnect(): void;
}
