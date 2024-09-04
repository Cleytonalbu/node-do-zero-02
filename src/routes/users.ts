import { prisma } from './../lib/prisma';
import { FastifyInstance } from "fastify";


export async function usersRoutes(app: FastifyInstance){
    app.get('/users', async ()=> {
        const users = await prisma.user.findMany()

        return users 
    })


    app.get('/users/:id', async ()=> {
        
    })

    app.post('/users', async ()=>{

    })

    app.put('/users/:id', async ()=>{

    })

    app.delete('/users/:id', async ()=>{

    })

}