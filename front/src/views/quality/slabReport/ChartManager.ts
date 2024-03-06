import * as echarts from "echarts";

export default function initChartData() {

  const generateChartQueryParams = (charts, slabNo) => {
    const xaxisSet = new Set();
    const yaxisSet = new Set();
    charts.forEach(chart => {
      xaxisSet.add(chart.xaxis);
      const yaxisArray = Array.isArray(chart.yaxis) ? chart.yaxis : chart.yaxis.split(',');
      yaxisArray.forEach(y => yaxisSet.add(y));
    });
    return {
      slabNo: slabNo,
      key: Array.from(xaxisSet).concat(Array.from(yaxisSet)).join(','),
      duration: 1
    };
  };

  const renderChart = (chartConfig, slabMeasureInfo, chartAreaId) => {
    const chartBox = echarts.init(document.getElementById(chartAreaId));
    const xProps = {[chartConfig.xaxis]: chartConfig.xaxis};
    const yaxisArray = typeof chartConfig.yaxis === 'string' ? chartConfig.yaxis.split(',') : chartConfig.yaxis;
    const yProps = {};
    yaxisArray.forEach(y => yProps[y] = y);

    const resultXMinMax = calculateMinMax(slabMeasureInfo.measureInfo, xProps);
    const resultYMinMax = calculateMinMax(slabMeasureInfo.measureInfo, yProps);

    const series = yaxisArray.map(y => ({
      name: y,
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {width: 2},
      data: slabMeasureInfo.measureInfo.map(item => [item[chartConfig.xaxis], item[y]])
    }));

    const option = {
      title: {
        text: chartConfig.chartTitleText,
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
        data: yaxisArray.map(y => y),
      },
      xAxis: {
        type: 'value',
        min: resultXMinMax.overallMin,
        max: resultXMinMax.overallMax,
      },
      yAxis: {
        type: 'value',
        min: resultYMinMax.overallMin,
        max: resultYMinMax.overallMax,
      },
      tooltip: {
        trigger: 'axis'
      },
      series: series
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
    return {overallMin, overallMax};
  }

  return {
    generateChartQueryParams,
    renderChart,
  };
}
