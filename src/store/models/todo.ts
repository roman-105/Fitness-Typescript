import { createModel } from '@rematch/core';
import { RootModel } from '.';

export interface TodoState {
  list: { todo: string; done?: boolean }[];
}

export const todoModel = createModel<RootModel>()({
  state: {
    list: []
  } as TodoState,
  reducers: {
    done: (state, payload: { todo: string }): TodoState => {
      const { todo } = payload;
      state.list.push({ todo, done: true });
      return state;
    },
    reset: (state, index: number): TodoState => {
      state.list[index].done = false;
      return state;
    }
  }
});
