import {getSlabMeasureInfo, list as slabReportList} from '/@/views/quality/slabReport/api';
import {list as chartConfigList} from '/@/views/quality/chartConfig/api';
import {computed, nextTick, reactive, ref, watch} from 'vue';
import initChartData from '/@/views/quality/slabReport/ChartManager'

export default function slabArk() {
  const tableHeight = ref(0);
  const tableData = reactive({list: []})
  const tableSize = 'small';
  const slabPage = reactive({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '30', '50'],
    showTotal: (total: number) => `共有${total}条数据`,
    onChange: (current: number, pageSize: number) => {
      listParm.current = current;
      listParm.size = pageSize;
      slabPage.current = current;
      slabPage.pageSize = pageSize;
      getListApi().then();
    },
  });

  const listParm = reactive({
    current: slabPage.current,
    size: slabPage.pageSize,
    slabNo: '',
    slabPlaceCode: '',
    staTime: '',
    endTime: '',
  })

  const currentRowData = ref(null);
  const getListApi = async () => {
    const res = await slabReportList(listParm);
    tableData.list = res.records;
    slabPage.total = res.total;
    if (tableData.list.length > 0) {
      currentRowData.value = tableData.list[0];
      defaultSelectedKey.value = tableData.list[0].id;
      selectedRowKeys.value = [defaultSelectedKey.value];
    }
    await nextTick();
  }

  const chartList = ref(null);
  const activeTabKey = ref(null);
  const getChartConfigTabList = async () => {
    const res = await chartConfigList(null);
    chartList.value = res.reduce((acc, chartItem) => {
      if (!acc.hasOwnProperty(chartItem.tabName)) {
        acc[chartItem.tabName] = [];
      }
      acc[chartItem.tabName].push(chartItem);

      return acc;
    }, {});
    activeTabKey.value = Object.keys(chartList.value)[0]
  }

  const slabMeasureInfo = ref(null);
  const slabJudgeInfo = ref({
    ruleCount: 0,
    passedRulesCount: 0,
    failedRulesCount: 0,
    overallPercentage: 0,
  });
  const getSlabMeasureInfoApi = async (params) => {
    slabMeasureInfo.value = await getSlabMeasureInfo(params)
    slabJudgeInfo.value.ruleCount = slabMeasureInfo.value.obj.exceptionInfo.length
    slabJudgeInfo.value.passedRulesCount = slabMeasureInfo.value.obj.exceptionInfo.filter(rule => rule.result == 'pass').length
    slabJudgeInfo.value.failedRulesCount = slabMeasureInfo.value.obj.exceptionInfo.filter(rule => rule.result == 'fail').length
    slabJudgeInfo.value.overallPercentage = Number(((slabJudgeInfo.value.passedRulesCount / slabJudgeInfo.value.ruleCount) * 100).toFixed(2))
    await nextTick();
  }

  const queryParams = {
    'slabNo': '',
    'key':
      'trkCastLength,' +
      'MoldLevel,MoldLevelSetpoint,' +
      'StopperRodPos,StopperRodMin,StopperRodMax,' +
      'moldLevelStdDev,' +
      'trkCastSpeed,' +
      'MsStPscActTemp,' +
      'thick',
    'duration': 1
  };

  const {
    generateChartQueryParams,
    renderChart,
  } = initChartData()


  const onSelectChange = async (selectedKeys) => {
    selectedRowKeys.value = selectedKeys;
    currentRowData.value = tableData.list.find(row => row.id == selectedKeys);
    await getMeasureInfoAndRenderChart(chartList.value[activeTabKey.value], currentRowData.value.slabNo);
  };

  const getMeasureInfoAndRenderChart = async(charts, slabNo) => {
    const params = generateChartQueryParams(charts, slabNo);
    await getSlabMeasureInfoApi(params);
    charts.forEach(chart => {
      renderChart(chart, slabMeasureInfo.value.obj, `chart-${chart.id}`);
    });
  }

  const rowSelection = computed(() => ({
    type: 'radio',
    selectedRowKeys: selectedRowKeys.value,
    onChange: onSelectChange,
    hideDefaultSelections: true,
  }));

  const defaultSelectedKey = ref();
  const selectedRowKeys = ref([defaultSelectedKey.value]);

  watch(
    () => tableData,
    () => {
      nextTick(() => {
        selectedRowKeys.value = [defaultSelectedKey.value];
      }).then();
    },
    {immediate: true}
  );

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({index}: { index: number }) => {
        return `${index + 1}`
      },
      align: "center",
      width: 50,
    },
    {
      title: '板坯生成时间',
      dataIndex: 'dataTime',
      align: "center",
      width: 120,
    },
    {
      title: '板坯号',
      dataIndex: 'slabNo',
      align: "center",
      width: 120,
    },
    {
      title: '炉次号',
      dataIndex: 'heatMatchNo',
      align: "center",
      width: 100,
    },
    {
      title: '炉订号',
      dataIndex: 'lgOrderId',
      align: "center",
      width: 100,
    },
    {
      title: '钢种',
      dataIndex: 'spec',
      align: "center",
      width: 75,
    },
    {
      title: '混钢坯标志',
      dataIndex: 'slabPlaceCode',
      align: "center",
      width: 75,
    },
  ]

  return {
    tableHeight,
    tableData,
    tableSize,
    slabPage,
    listParm,
    columns,
    rowSelection,
    currentRowData,
    getListApi,
    queryParams,
    getSlabMeasureInfoApi,
    slabMeasureInfo,
    slabJudgeInfo,

    getChartConfigTabList,
    chartList,
    activeTabKey,
    getMeasureInfoAndRenderChart,
  }
}
