import { requestCounter } from "./metrics/count";
import { type Response, type Request, type NextFunction, request } from "express";
import { httpRequestMs } from "./metrics/histogram";
import { activeRequests } from "./metrics/gauge";

export function timeWare(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    activeRequests.inc();

  res.on("finish", () => {
        activeRequests.dec();
        const endTime = Date.now();
        const final = endTime - startTime;
        // console.log(`cpu take time ${final}ms for method: ${req.method} and route: ${req.route?.path} with response code: ${res.statusCode}`);

        // incrememnt request counter
        requestCounter.inc({
            method: req.method,
            route: req.route?.path,
            status_code: res.statusCode
        })

        if(req.route?.path !== '/metrics') {
            activeRequests.dec();
        }

        httpRequestMs.observe({
            method: req.method,
            route: req.route?.path,
            status_code: res.statusCode
        }, final) // final is the time difference

    })

    next();
    // const endTime = Date.now();
    // const final = endTime - startTime;
    // console.log(`cpu take time ${final}ms for method: ${req.method} and route: ${req.route?.path} with response code: ${res.statusCode}`);
}
