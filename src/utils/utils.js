/**
 * 每月应还贷款
 * @param {number} a 贷款总额
 * @param {number} I 贷款年利率
 * @param {number} n 贷款期限(月)
 */
export const expendByMonth = (a, I, n) => {
  const i = I / 12;
  const res = a * i * ((1 + i) ** n) / ((1 + i) ** n - 1);
  return Math.round(res * 100) / 100;
}

export const payData = (loan) => {
  let res = [];
  if (loan.type === '1') {
    res = payData1(loan);
  }
  if (loan.type === '2') {
    res = payData2(loan);
  }
  if (loan.type === '3') {
    res = payData3(loan);
  }
  return res.map(d => ({
    expend: d.expend.toFixed(2),
    interest: d.interest.toFixed(2),
    principal: d.principal.toFixed(2),
    amount: d.amount.toFixed(2),
  }))
}

// 等额本息
const payData1 = (loan) => {
  const expend = expendByMonth(loan.amount, loan.interestRate, loan.count);
  const res = [];
  let amount = loan.amount;
  for (let i = 0; i < loan.count; i++) {
    const interest = amount * loan.interestRate / 12;
    const principal = expend - interest;
    amount -= principal;
    res.push({
      expend,
      interest,
      principal,
      amount,
    });
  }
  return res;
}

// 等额本金
const payData2 = (loan) => {
  const principal = loan.amount / loan.count;
  const res = [];
  let amount = loan.amount;
  for (let i = 0; i < loan.count; i++) {
    const interest = amount * loan.interestRate / 12;
    amount -= principal;
    res.push({
      expend: principal + interest,
      interest,
      principal,
      amount,
    });
  }
  return res;
}

// 公积金自由还款
const payData3 = (loan) => {
  const expend = loan.expend;
  const res = [];
  let amount = loan.amount;
  for (let i = 0; i < loan.count; i++) {
    const interest = amount * loan.interestRate / 12;
    const principal = expend - interest;
    amount -= principal;
    res.push({
      expend,
      interest,
      principal,
      amount,
    });
  }
  
  return res;
}
