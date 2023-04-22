/* eslint-disable */
export default {
  displayName: 'frameworks-and-drivers-global-states-sreach-heatmap-modal',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/src/frameworks-and-drivers/global-states/sreach-heatmap-modal',
};
