/**
 * Test execution and result service modeling the Python/FastAPI + Playwright automation engine.
 */

const mockTestRuns = [
  {
    id: 'run_1042',
    targetUrl: 'https://example.com',
    status: 'Healthy',
    score: 92,
    totalTests: 28,
    passed: 27,
    warnings: 1,
    failed: 0,
    duration: 12.4,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    apiStatus: 'Healthy',
    uiStatus: 'Healthy',
    perfScore: 94,
  },
  {
    id: 'run_1041',
    targetUrl: 'https://shop.example.com',
    status: 'Warning',
    score: 79,
    totalTests: 35,
    passed: 30,
    warnings: 4,
    failed: 1,
    duration: 18.7,
    createdAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    apiStatus: 'Warning',
    uiStatus: 'Healthy',
    perfScore: 72,
  },
  {
    id: 'run_1040',
    targetUrl: 'https://api.example.com',
    status: 'Failed',
    score: 58,
    totalTests: 18,
    passed: 12,
    warnings: 2,
    failed: 4,
    duration: 32.1,
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    apiStatus: 'Failed',
    uiStatus: 'Warning',
    perfScore: 65,
  },
  {
    id: 'run_1039',
    targetUrl: 'https://the-internet.herokuapp.com',
    status: 'Healthy',
    score: 96,
    totalTests: 18,
    passed: 18,
    warnings: 0,
    failed: 0,
    duration: 14.2,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    apiStatus: 'Healthy',
    uiStatus: 'Healthy',
    perfScore: 98,
  },
];

export const testService = {
  async getRecentRuns() {
    await new Promise((r) => setTimeout(r, 200));
    return [...mockTestRuns];
  },

  async getDashboardStats() {
    await new Promise((r) => setTimeout(r, 150));
    return {
      totalTests: 1248,
      passed: 1163,
      failed: 54,
      warnings: 31,
      successRate: 93.2,
      averageDuration: 14.8,
      totalRuns: 142,
    };
  },

  async getRunById(runId) {
    await new Promise((r) => setTimeout(r, 250));
    const found = mockTestRuns.find((r) => r.id === runId) || mockTestRuns[0];

    return {
      ...found,
      summary: {
        websiteHealth: 'Healthy',
        apiHealth: found.apiStatus,
        uiHealth: found.uiStatus,
        performanceScore: found.perfScore,
        securityGrade: 'A',
      },
      apiTests: [
        {
          id: 'api_1',
          method: 'GET',
          endpoint: '/api/v1/users',
          status: 200,
          duration: 182,
          result: 'PASS',
          response: { total: 42, users: [{ id: 1, name: 'Alice Smith', email: 'alice@example.com' }] },
        },
        {
          id: 'api_2',
          method: 'POST',
          endpoint: '/api/v1/auth/login',
          status: 200,
          duration: 421,
          result: 'PASS',
          response: { token: 'jwt_secure_session_token_xyz', expires_in: 3600 },
        },
        {
          id: 'api_3',
          method: 'GET',
          endpoint: '/api/v1/products',
          status: 500,
          duration: 623,
          result: 'FAIL',
          expected: 200,
          actual: 500,
          response: { error: 'InternalServerError', message: 'Database connection pool timeout while acquiring client' },
        },
        {
          id: 'api_4',
          method: 'PUT',
          endpoint: '/api/v1/users/1',
          status: 200,
          duration: 215,
          result: 'PASS',
          response: { id: 1, updated: true },
        },
        {
          id: 'api_5',
          method: 'DELETE',
          endpoint: '/api/v1/cache/flush',
          status: 204,
          duration: 98,
          result: 'PASS',
          response: null,
        },
      ],
      uiTests: [
        { id: 'ui_1', title: 'Homepage Loads & Hero Renders', status: 'PASS', duration: 1.2, browser: 'Chromium' },
        { id: 'ui_2', title: 'Top Navigation Menu Responsive', status: 'PASS', duration: 0.8, browser: 'Chromium' },
        { id: 'ui_3', title: 'Login Form Fields & Password Input', status: 'PASS', duration: 1.4, browser: 'Chromium' },
        { id: 'ui_4', title: 'Interactive CTA Buttons Clickable', status: 'PASS', duration: 0.9, browser: 'Chromium' },
        {
          id: 'ui_5',
          title: 'Modal Submission Interaction Validation',
          status: 'FAIL',
          duration: 4.8,
          browser: 'Chromium',
          error: 'Element locator "button#submit-modal" did not become visible within 4000ms threshold.',
          screenshotUrl: '/screenshots/test_home_view.png',
        },
      ],
      performance: {
        score: found.perfScore,
        metrics: [
          { name: 'Page Load', value: '1.82s', status: 'good', benchmark: '< 2.5s' },
          { name: 'First Contentful Paint (FCP)', value: '0.92s', status: 'good', benchmark: '< 1.8s' },
          { name: 'Largest Contentful Paint (LCP)', value: '2.1s', status: 'moderate', benchmark: '< 2.5s' },
          { name: 'DOM Content Loaded', value: '1.4s', status: 'good', benchmark: '< 2.0s' },
          { name: 'Average API Latency', value: '342ms', status: 'good', benchmark: '< 500ms' },
        ],
        chartData: [
          { time: '0s', cpu: 12, memory: 45, network: 0 },
          { time: '0.5s', cpu: 78, memory: 52, network: 1200 },
          { time: '1.0s', cpu: 65, memory: 58, network: 3400 },
          { time: '1.5s', cpu: 42, memory: 61, network: 1800 },
          { time: '2.0s', cpu: 22, memory: 62, network: 400 },
          { time: '2.5s', cpu: 15, memory: 62, network: 50 },
        ],
      },
      network: [
        { method: 'GET', url: 'https://example.com/', status: 200, type: 'document', duration: '184ms', size: '24.2 KB' },
        { method: 'GET', url: 'https://example.com/assets/main.css', status: 200, type: 'stylesheet', duration: '42ms', size: '18.4 KB' },
        { method: 'GET', url: 'https://example.com/assets/bundle.js', status: 200, type: 'script', duration: '128ms', size: '142.1 KB' },
        { method: 'GET', url: 'https://example.com/api/v1/products', status: 500, type: 'xhr', duration: '623ms', size: '1.2 KB' },
        { method: 'GET', url: 'https://example.com/favicon.ico', status: 200, type: 'image', duration: '16ms', size: '4.2 KB' },
      ],
      consoleLogs: [
        { type: 'ERROR', message: 'Failed to load resource: the server responded with a status of 500 (Internal Server Error) at /api/v1/products', timestamp: '13:30:14.218' },
        { type: 'WARNING', message: 'Warning: Deprecated API usage: requestAnimationFrame fallback detected on viewport listener', timestamp: '13:30:14.012' },
        { type: 'INFO', message: 'Application initialized successfully in production mode [build v2.4.1]', timestamp: '13:30:13.882' },
      ],
      aiAnalysis: {
        problemDetected: 'Endpoint /api/v1/products returned HTTP 500 Internal Server Error.',
        explanation: 'The target API endpoint responded with a server-side exception while surrounding endpoints (/api/v1/users and /auth) operated normally within normal SLA bounds.',
        possibleCauses: [
          'Database connection pool exhaustion on the products read replica.',
          'Missing environment configuration or deadlocks during concurrent queries.',
          'Uncaught unhandled promise rejection in the products routing microservice.',
        ],
        recommendation: 'Inspect backend query timeouts and ensure database connection pool limits match max worker concurrency.',
      },
    };
  },

  async startTest(config) {
    await new Promise((r) => setTimeout(r, 600));
    const newRunId = 'run_' + Math.floor(1000 + Math.random() * 9000);
    const newRun = {
      id: newRunId,
      targetUrl: config.url || 'https://example.com',
      status: 'Healthy',
      score: 94,
      totalTests: 24,
      passed: 24,
      warnings: 0,
      failed: 0,
      duration: 14.5,
      createdAt: new Date().toISOString(),
      apiStatus: 'Healthy',
      uiStatus: 'Healthy',
      perfScore: 92,
    };
    mockTestRuns.unshift(newRun);
    return newRun;
  },
};
