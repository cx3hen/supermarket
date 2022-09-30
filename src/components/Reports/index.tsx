import React, { useEffect } from 'react';
import * as eCharts from 'echarts';
import { getReports } from 'service';

const eChartsRef: any = React.createRef();

const Reports = () => {
  useEffect(() => {
    //render后再拿到ref
    const myChart = eCharts.init(eChartsRef.current);
    getReports().then(data => {
      const _data = {
        ...data,
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
      };
      myChart.setOption(_data);
    });
  }, []);

  return (
    <>
      <div
        ref={eChartsRef}
        style={{
          width: 1600,
          height: 580,
          margin: 100,
        }}
      ></div>
      ;
    </>
  );
};

export default Reports;
