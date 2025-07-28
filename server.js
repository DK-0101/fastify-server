import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()


const database = new DatabasePostgres()

server.post('/videos', async (req, replay) => {
    const { title, description, duration } = req.body

    await database.create({
        title,
        description,
        duration,
    })

    return replay.status(201).send()
})

server.get('/videos', async (req) => {
    const search = req.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (req, replay) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return replay.status(204).send()
})

server.delete('/videos/:id', async (req, replay) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return replay.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 9090,
})