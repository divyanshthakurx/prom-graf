import client from 'prom-client';

export const httpRequestMs = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'duration of request in ms',
    labelNames: ['method','route','status_code'],
    buckets: [0.1,0.5,1,5,10,15,20,25,50,100,500,1000]
})