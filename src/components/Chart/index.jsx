import { useRef, useEffect, memo, useMemo } from 'react';
import * as echarts from 'echarts';

const xAxisData = (new Array(360)).fill(0).map((_, i) => `${i + 1}`);

export default memo((props) => {
  const { series = [] } = props;
  const ref = useRef();
  const store = useRef({}).current;

  const option = useMemo(() => {
    const legendData = series.map(d => d.name);
    return {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '贷款支出'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series,
    };
  }, [series])

  useEffect(() => {
    if (!store.chart) {
      store.chart = echarts.init(ref.current, undefined, {
        width: 'auto'
      });
    }
    store.chart.setOption(option, true);
  }, [option]);

  return (
    <div style={{width: 'calc(100vw - 300px)', height: 300}} ref={ref} />
  );
});
