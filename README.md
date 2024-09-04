# Projeto Node.js com Prisma e SQLite

Este é um projeto simples desenvolvido em Node.js para praticar o uso de ORM com Prisma e um banco de dados SQLite. Ele possui dois modelos principais: `User` e `Memory`, que estão relacionados entre si.

## 🛠️ Tecnologias Utilizadas

- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
- **Prisma** ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
- **Fastify** ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white)
- **TypeScript** ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
- **SQLite** ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

## 📋 Descrição

O projeto foi desenvolvido com o intuito de praticar Node.js do zero, utilizando o ORM Prisma para gerenciar um banco de dados SQLite. 

### Modelos do Prisma

- **User**
  ```prisma
  model User {
    id        String  @id @default(uuid())
    githubId  Int     @unique 
    name      String 
    login     String
    avatarUrl String

    memories Memory[]
  }

- **Memory**
 ```prisma
    model Memory {
      id          String    @id @default(uuid())
      userId      String
    
      coverUrl    String
      content     String 
      isPublic    Boolean   @default(false)
      createdAt   DateTime  @default(now())
    
      user User  @relation(fields: [userId], references: [id])
  }
```
## 📦 Dependências

### Dependências de Produção

- **@prisma/client**: ^5.19.1
- **fastify**: ^4.28.1
- **zod**: ^3.23.8

### Dependências de Desenvolvimento

- **@rocketseat/eslint-config**: ^2.2.2
- **@types/node**: ^22.5.2
- **eslint**: ^9.9.1
- **prisma**: ^5.19.1
- **tsc**: ^2.0.4
- **tsx**: ^4.19.0
- **typescript**: ^5.5.4
## 📧 Contato

Para mais informações, entre em contato: [cleyton.albuquerque@dcx.ufpb.br](mailto:seu-email@example.com)


