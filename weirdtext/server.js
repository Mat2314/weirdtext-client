const express = require('express');

const app = express();

app.use(express.static(`./dist/weirdtext`));

app.get(`/*`, function (req, res) {
    res.sendFile(`index.html`, { root: `dist/weirdtext/` }
    );
});

app.listen(process.env.PORT || 8080);