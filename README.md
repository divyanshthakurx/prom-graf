# Prometheus & Grafana Monitoring

A Bun + Express TypeScript demo app instrumented with Prometheus metrics and ready to run with Prometheus and Grafana using Docker Compose.

## Features

- Express API running on Bun
- Prometheus metrics exposed at `/metrics`
- Request counter, active request gauge, and request duration histogram
- Dockerfile for containerized app execution
- Docker Compose setup for app, Prometheus, and Grafana

## Tech Stack

- Bun
- TypeScript
- Express
- prom-client
- Prometheus
- Grafana
- Docker Compose

## Getting Started

### Install dependencies

```bash
bun install
```

### Run locally

```bash
bun run index.ts
```

The app runs on:

```text
http://localhost:3000
```

## API Routes

| Route | Description |
| --- | --- |
| `/users` | Returns sample user data |
| `/cpu` | Runs a CPU-heavy loop for testing latency metrics |
| `/metrics` | Exposes Prometheus metrics |

## Metrics

The app records:

- `http_requests_total` - total HTTP requests by method, route, and status code
- `active_requests` - number of currently active requests
- `http_request_duration_ms` - request duration histogram in milliseconds

## Run with Docker Compose

Start the full monitoring stack:

```bash
docker compose up --build
```

Services:

| Service | URL |
| --- | --- |
| App | `http://localhost:3000` |
| Prometheus | `http://localhost:9090` |
| Grafana | `http://localhost:3001` |

Grafana default login:

```text
username: admin
password: admin
```

## Prometheus Configuration

Prometheus is configured in `prometheus.yml` to scrape the app every 15 seconds:

```yaml
scrape_configs:
  - job_name: 'nodejs-app'
    static_configs:
      - targets: ['node-app:3000']
```

## Example Flow

1. Start the stack with Docker Compose.
2. Visit `http://localhost:3000/users` or `http://localhost:3000/cpu` to generate traffic.
3. Open Prometheus at `http://localhost:9090` and query app metrics.
4. Open Grafana at `http://localhost:3001` and create dashboards using Prometheus as the data source.
