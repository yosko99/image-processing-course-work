const express = require('express');
var cors = require('cors')

const getPGMData = require('./server/getPGMData');
const app = express();

app.use(cors())

app.get('/:file', async (req, res) => {
    const { width, height, pixels, error } = await getPGMData(`./images/${req.params.file}`);

    if (error) {
        return res.status(404).send(error);
    }

    res.status(200).json({
        width,
        height,
        pixels
    });
})

app.listen(3000, () => {
    console.log('Running server on 3000');
})

