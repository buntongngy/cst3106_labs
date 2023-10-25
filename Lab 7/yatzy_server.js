function generateDiceValues() {
  const diceValues = [];

  for (let i = 0; i < 6; i++) {
      const randomValue = Math.floor(Math.random() * 6) + 1; 
      diceValues.push(randomValue);
  }

  return diceValues;
}

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/roll-dice', (req, res) => {
  const diceValues = generateDiceValues(); 
  res.json({ diceValues });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
