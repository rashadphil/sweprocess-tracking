import express from 'express';

const app = express()
const port = 8080

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${process.env.PORT || port}!`));
