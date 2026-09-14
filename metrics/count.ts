import client from 'prom-client';

export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'count the http requests',
    labelNames: ['method','route','status_code']
})

