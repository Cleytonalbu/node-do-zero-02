import fastify  from "fastify";
import { memoriesRoutes } from "./routes/memories";
import { usersRoutes } from "./routes/users";

const app = fastify()


app.register(memoriesRoutes, usersRoutes)


app.listen({
    port: 3333,
}).then(() =>{
    console.log("Http server running on http://localhost:3333 ")
})

