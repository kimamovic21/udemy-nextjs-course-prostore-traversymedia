import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;