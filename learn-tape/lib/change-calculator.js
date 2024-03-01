function calculateChange(totalPayable, cashPaid) {
  const coins = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  let change = [];
  const length = coins.length;
  let remaining = cashPaid - totalPayable; // we reduce this below

  for (let i = 0; i < length; i++) {
    // loop through array of notes & coins:
    let coin = coins[i];

    if (remaining / coin >= 1) {
      // check coin fits into the remaining amount
      let times = Math.floor(remaining / coin); // no partial coins

      for (let j = 0; j < times; j++) {
        // add coin to change x times
        change.push(coin);
        remaining = remaining - coin; // subtract coin from remaining
      }
    }
  }
  return change;
}

module.exports = calculateChange;
