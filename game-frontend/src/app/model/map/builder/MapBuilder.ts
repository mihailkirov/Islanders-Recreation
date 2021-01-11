import {MapInterface} from '../MapInterface';

export interface MapBuilder {
  width: number;
  build(): MapInterface;
  setWidth(width: number): MapBuilder;
}
