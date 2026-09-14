import express from "express";
import { timeWare } from "./middleware";
import client from 'prom-client';

const app = express();

app.use(timeWare);

app.get("/cpu", (req,res) => {
    for(let i=0; i < 100000000; i++) {
        Math.random()
    }
    res.json({
        message: "cpu"
    })
})

app.get("/users", (req,res) => {
    res.json({
      message: "users",
      details: {
        name: "nigga",
        age: "21",
        type: "human"
      }
    })
})

app.get("/metrics", async (req,res) => {
    const metrics  =  await client.register.metrics();
    res.set('Content-Type', client.register.contentType)
    res.end(metrics)
})

app.listen(3000, () => {
    console.log("listen on 3000")
})
