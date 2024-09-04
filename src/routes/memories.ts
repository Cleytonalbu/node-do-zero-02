import { z } from 'zod'
import { prisma } from './../lib/prisma';
import { FastifyInstance } from "fastify";


export async function memoriesRoutes(app: FastifyInstance){
    

    // Listar todas as memorias
    app.get('/memories', async ()=> {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })

        return memories.map(memory =>{
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 125).concat('...')

            }

        })
    })

    // Listar memorio pelo ID
    app.get('/memories/:id', async (request)=> {
        // Validacao de ID
        const paramnsSchema = z.object({id: z.string().uuid()}) 
        const { id } = paramnsSchema.parse(request.params)
        const memory = prisma.memory.findUniqueOrThrow({
            where: {
                id,
            },
        })
        return memory
    })
    
    // Criar nova memoria
    app.post('/memories', async (request)=>{
       //Validacao do corpo da requisicao
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),

        })

        const { content, coverUrl, isPublic} = bodySchema.parse(request.body)

        const memory = await prisma.memory.create({
            data:{
                content,
                coverUrl,
                isPublic,
                userId: '47e6a9e0-6c37-4088-bd24-1ce052d305bc',

            }
        })

    })

    // Alterar memorias por ID
    app.put('/memories/:id', async (request)=>{
        // Validacao do ID
        const paramnsSchema = z.object({ id: z.string().uuid()})
        const { id } = paramnsSchema.parse(request.params)

        //Validacao do corpo da requisao 
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean()
        })

        const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

        const memory = await prisma.memory.update({
            where:{
                id,
            },
            data:{
                content,
                coverUrl,
                isPublic,

            }
        })
        return memory
    })

    // Deletar memorias pelo ID
    app.delete('/memories/:id', async (request) => {
        // Validar ID
        const paramnsSchema = z.object({id: z.string().uuid()}) 
        const { id } = paramnsSchema.parse(request.params)
        
        await prisma.memory.delete({
            where: {
                id,
            }
            })
        

    })
    

}