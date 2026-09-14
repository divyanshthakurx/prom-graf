import client from 'prom-client';

export const activeRequests = new client.Gauge({
    name: 'active_requests',
    help: 'check the active requests'
})

