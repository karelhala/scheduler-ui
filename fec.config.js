module.exports = {
  appUrl: '/apps/scheduler-ui',
  appEntry: './src/AppEntry.tsx',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  sassPrefix: '.scheduler-ui, .schedulerUi',
  interceptChromeConfig: false,
  plugins: [],
  hotReload: process.env.HOT === 'true',
  moduleFederation: {
    exposes: {
      './RootApp': './src/AppEntry',
      // Loaded by insights-chrome (the HCC shell) via ScalprumComponent,
      // the same way the NotificationsDrawer is mounted in the chrome shell.
      // Consumer apps do NOT import this directly.
      './GlobalScheduler': './src/Components/GlobalScheduler/GlobalScheduler',
      // Imported by consumer apps (e.g. Cost Management, Advisor) to open
      // the scheduling wizard modal from their own pages.
      './useSchedulerModal': './src/hooks/useSchedulerModal',
    },
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: '^6.3.0',
        },
      },
    ],
  },
};
