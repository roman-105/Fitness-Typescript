import { cleanup, init } from 'detox';
import config from './config.json';
import adapter from 'detox/runners/jest/adapter';

//@ts-ignore
// eslint-disable-next-line jest/no-jasmine-globals, no-undef
jasmine.getEnv().addReporter(adapter);

jest.setTimeout(120000);

beforeAll(async () => {
  await init(config, { initGlobals: false });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
