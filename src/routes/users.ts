import { prisma } from './../lib/prisma';
import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance){
   
    // GET Listar todos os usuarios
    app.get('/users', async ()=> {
        const users = await prisma.user.findMany()

        return users 
    })

    // GET Listar usuarios pelo ID 
    app.get('/users/:id', async (request)=> {
        //validacao de ID 
        const paramnsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramnsSchema.parse(request.params)

        const user =  prisma.user.findFirstOrThrow({
            where: {
                id,
            },
        })
        return user
        
    })

    // Criar novo usuario
    app.post('/users', async (request)=>{
        //Validacao do corpo da requisicao
        const bodySchema = z.object({
            githubId: z.number(),
            name: z.string(),
            login: z.string(),
            avatarUrl: z.string(),
            
        })

        const { githubId, name, login, avatarUrl} = bodySchema.parse(request.body)

        const user = await prisma.user.create({
            data:{
                githubId,
                name,
                login,
                avatarUrl
            }
        })
    })

    // Alterar usuario por ID
    app.put('/users/:id', async (request)=>{

        // Validacao de ID
        const paramnsSchema = z.object({id: z.string().uuid()})
        // Validacao do corpo da requisicao 
        const bodySchema = z.object({
            githubId: z.number(),
            name: z.string(),
            login: z.string(),
            avatarUrl: z.string()
        })

        const { id } = paramnsSchema.parse(request.params)
        const {githubId, name, login, avatarUrl} = bodySchema.parse(request.body)
        const user = await prisma.user.update({
            where:{
                id,
            },
            data: {
                githubId,
                name,
                login, 
                avatarUrl
            }
        })
        return user

    })

    // Deletar usuario pelo ID
    app.delete('/users/:id', async (request)=>{
        //Validar ID
        const paramnsSchema = z.object({id: z.string().uuid()})

        const { id } = paramnsSchema.parse(request.params)
        
        await prisma.user.delete({
            where:{
                id,
            }
        })
    })

}