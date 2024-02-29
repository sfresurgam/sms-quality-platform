import * as echarts from "echarts";

export default function initChartData() {
  const renderChart1 = (slabMeasureInfo: any, chartAreaId: string) => {
    const chartBox = echarts.init(document.getElementById(chartAreaId));
    const xProps = {trkCastLength: 'trkCastLength'};
    const yProps = {MoldLevel: 'MoldLevel', MoldLevelSetpoint: 'MoldLevelSetpoint'};
    const resultXMinMax = calculateMinMax(slabMeasureInfo.measureInfo, xProps);
    const resultYMinMax = calculateMinMax(slabMeasureInfo.measureInfo, yProps);
    const overallMinX = resultXMinMax.overallMin;
    const overallMaxX = resultXMinMax.overallMax;
    const overallMinY = resultYMinMax.overallMin;
    const overallMaxY = resultYMinMax.overallMax;
    const option = {
      title: {
        text: '液位/液位设定·折线图',
        left: 'left',
        textStyle: {
          color: '#494949',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: '微软雅黑',
        },
      },
      legend: {
        right: 10,
        data: ['MoldLevelSetpoint', 'MoldLevel'],
      },
      xAxis: {
        type: 'value',
        min: overallMinX,
        max: overallMaxX,
      },
      yAxis: {
        type: 'value',
        min: overallMinY,
        max: overallMaxY,
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          name: 'MoldLevelSetpoint',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          data: slabMeasureInfo.measureInfo.map(item => [item.trkCastLength, item.MoldLevelSetpoint]),
        },
        {
          name: 'MoldLevel',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 2,
          },
          symbol: 'none',
          data: slabMeasureInfo.measureInfo.map(item => [item.trkCastLength, item.MoldLevel]),
        },
      ],
    };
    chartBox.setOption(option);
  };

  const renderChart2 = (slabMeasureInfo: any, chartAreaId: string) => {
    const chartBox = echarts.init(document.getElementById(chartAreaId));
    const xProps = {trkCastLength: 'trkCastLength'};
    const yProps = {StopperRodPos: 'StopperRodPos', StopperRodMin: 'StopperRodMin', StopperRodMax: 'StopperRodMax'};
    const resultXMinMax = calculateMinMax(slabMeasureInfo.measureInfo, xProps);
    const resultYMinMax = calculateMinMax(slabMeasureInfo.measureInfo, yProps);
    const overallMinX = resultXMinMax.overallMin;
    const overallMaxX = resultXMinMax.overallMax;
    const overallMinY = resultYMinMax.overallMin;
    const overallMaxY = resultYMinMax.overallMax;
    const option = {
      title: {
        text: '塞棒位置/最大值/最小值·折线图',
        left: 'left',
        textStyle: {
          color: '#494949',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: '微软雅黑',
        },
      },
      legend: {
        right: 10,
        data: ['StopperRodPos', 'StopperRodMin', 'StopperRodMax'],
      },
      xAxis: {
        type: 'value',
        min: overallMinX,
        max: overallMaxX,
      },
      yAxis: {
        type: 'value',
        min: overallMinY,
        max: overallMaxY,
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          name: 'StopperRodPos',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          data: slabMeasureInfo.measureInfo.map(item => [item.trkCastLength, item.StopperRodPos]),
        },
        {
          name: 'StopperRodMin',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 2,
          },
          symbol: 'none',
          data: slabMeasureInfo.measureInfo.map(item => [item.trkCastLength, item.StopperRodMin]),
        },
        {
          name: 'StopperRodMax',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
          data: slabMeasureInfo.measureInfo.map(item => [item.trkCastLength, item.StopperRodMax]),
        },
      ],
    };
    chartBox.setOption(option);
  };

  type AxisProps = Record<string, string>;
  function calculateMinMax(data: any[], props: AxisProps) {
    const minValues: Partial<Record<keyof AxisProps, number>> = {};
    const maxValues: Partial<Record<keyof AxisProps, number>> = {};
    for (const prop in props) {
      minValues[prop] = Number.MAX_SAFE_INTEGER;
      maxValues[prop] = Number.MIN_SAFE_INTEGER;
    }
    for (const item of data) {
      for (const prop in props) {
        const value = item[props[prop]];
        if (typeof value === 'number') {
          minValues[prop] = Math.min(minValues[prop] as number, value);
          maxValues[prop] = Math.max(maxValues[prop] as number, value);
        }
      }
    }
    let overallMin = Number.MAX_SAFE_INTEGER;
    let overallMax = Number.MIN_SAFE_INTEGER;
    for (const prop in minValues) {
      overallMin = Math.min(overallMin, minValues[prop]!);
      overallMax = Math.max(overallMax, maxValues[prop]!);
    }
    return { overallMin, overallMax };
  }

  return {
    renderChart1,
    renderChart2,
  };
}
