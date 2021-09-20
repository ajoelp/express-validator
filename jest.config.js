module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/**/*.spec.ts', '!src/**/*.d.ts'],
};