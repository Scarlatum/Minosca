import { FC, useRef, useEffect } from 'react'
import modelClass from '~/components/canvas/canvas.model'

interface ICanvasComponent extends React.CanvasHTMLAttributes<unknown> {
  backgroundColor: string
}

export const CanvasComponent: FC<ICanvasComponent> = params => {

  const model = new modelClass();
  const canvasRef = useRef<HTMLCanvasElement>(Object());

  let errorStack: Array<Error> = Array();

  useEffect(() => {

    errorStack = Array(0);

    model.applyReference(canvasRef);

    const initResult = model.init();

    if ( initResult instanceof Error ) errorStack.push(initResult);

  }, []);

  return errorStack.length
    ? <ul>{ errorStack.map(err => <li>{ err.message }</li>) }</ul>
    : <canvas { ...params } ref={ canvasRef } />

}