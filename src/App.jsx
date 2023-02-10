import { useMemo, useState } from 'react';
import { Layout } from '@arco-design/web-react';

import Loans from '@/components/Loans';
import Chart from '@/components/Chart';
import { payData } from '@/utils/utils';

export default () => {
  const [loans, setLoans] = useState([
    {
      type: '1',
      amount: 696114.47,
      interestRate: 4.89,
      count: 313,
    },
    {
      type: '1',
      amount: 1437449.49,
      interestRate: 4.85,
      count: 295,
    },
    {
      type: '3',
      amount: 794278.85,
      interestRate: 3.10,
      count: 295,
      expend: 3281,
    },
  ]);

  const series = useMemo(() => {
    return loans.map((loan, i) => {
      const data = payData({
        ...loan,
        interestRate: loan.interestRate / 100,
      });

      return {
        name: `贷款${i + 1}`,
        type: 'line',
        stack: 'expend',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
        },
        data: data.map(d => d.expend),
      };
    });
  }, [loans]);

  return (
    <Layout>
      <Layout>
        <Layout.Sider width={300} style={{height: '100vh'}}>
          <Loans loans={loans} onChange={({ loans }) => setLoans(loans)} />
        </Layout.Sider>
        <Layout.Content>
          <Chart series={series} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
