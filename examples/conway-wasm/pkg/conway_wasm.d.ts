/* tslint:disable */
/* eslint-disable */
export enum Cell {
  Dead = 0,
  Alive = 1,
}
export class Universe {
  private constructor();
  free(): void;
  width(): number;
  height(): number;
  cells(): number;
  set_cell(row: number, column: number, cell: Cell): void;
  tick(): void;
  static new(width: number, height: number): Universe;
}
