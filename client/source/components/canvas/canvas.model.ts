import { MutableRefObject } from 'react'
import { Some, Result } from '~/types/utils'
import { DEFAULT_RENDER_CONTEXT } from '~/application';

interface ConstrtuctorProps {
  NodeReference : Some<HTMLCanvasElement>
}

export default class CanvasModel {

  private reference : Some<HTMLCanvasElement>;
  private context   : Some<DEFAULT_RENDER_CONTEXT>;

  constructor(defaults ?: ConstrtuctorProps) {

    Object.assign(this, defaults);

  }

  public applyReference(mutRef: MutableRefObject<HTMLCanvasElement>) {
    this.reference = mutRef.current;
  }  

  private static createContext(canvas: HTMLCanvasElement): Result<CanvasRenderingContext2D, Error> {

    const ctx = canvas.getContext('2d');

    if ( !ctx ) return Error('canvas error');

    return ctx

  }

  public init(): Result<void> {

    if ( !this.reference ) return Error('Empty reference');

    const ctxResult = CanvasModel.createContext(this.reference);

    if ( ctxResult instanceof Error ) throw ctxResult;

    this.context = ctxResult;

  };

}