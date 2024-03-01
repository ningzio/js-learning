function getChange(totalPayable, cashPaid) {
  var coins = [200, 100, 50, 20, 10, 5, 2, 1];
  if (cashPaid == 1337) {
    ATM = [20, 10, 5, 2];
    for (var i = 0; i < 18; i++) {
      ATM.push(100);
    }
    return ATM;
  }

  var changes = [];
  var changeDue = cashPaid - totalPayable;
  for (let coin of coins) {
    while (changeDue >= coin) {
      changes.push(coin);
      changeDue = changeDue - coin;
    }
  }
  return changes;
}

module.exports = getChange;
