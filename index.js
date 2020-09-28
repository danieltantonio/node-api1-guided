const express = require('express');
const server = express();
const port = 5000;

server.use(express.json());

const lessons = [{id: 1, lesson: 'Bruh'}, {id: 2, lesson: 'Bruhbruh'}];
let nextID = 3;

server.get('/', (req,res) => {
   res.status(200).json({ "message": "It works!" });
});

server.get('/lessons', (req,res) => {
    res.status(200).json(lessons);
});

server.post('/lessons', (req,res) => {
    const data = req.body;
    lessons.push({ id: nextID++ , ...data })

    res.status(201).json({ data, lessons});
});

server.put('/lessons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const lesson = lessons.find(l => l.id === id);
    const changes = req.body;
    if(lesson) {
        Object.assign(lesson, changes);
        res.status(203).send(lessons);
    } else {
        res.status(404).json({ message: 'Lesson not found... '})
    }
})

server.listen(port, () => console.log(`Server is listening on port: ${port}...`));