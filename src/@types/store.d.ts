import { RematchDispatch } from '@rematch/core';
import { RootModel } from '../store/models';
import { RootState } from '../store/store';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

declare global {
  type Dispatch = RematchDispatch<RootModel>;
}
