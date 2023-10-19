const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const expression = req.body.expression;
  try {
    const result = eval(expression);
    res.send({ result });
  } catch (error) {
    res.status(400).send({ error: 'Invalid expression' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});