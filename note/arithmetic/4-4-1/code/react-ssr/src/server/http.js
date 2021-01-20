import express from 'express';

const app = express();

app.use(express.static('public'));

app.listen(3000, () => console.log('app is running on 3000 port'));

export default app;