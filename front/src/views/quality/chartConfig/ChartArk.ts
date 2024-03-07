import {listByPage} from '/@/views/quality/chartConfig/api';
import {computed, nextTick, reactive, ref, watch} from 'vue';

export default function chartArk() {
  const tableData = reactive({list: []})
  const tableSize = 'small';

  const chartPage = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50'],
    showTotal: (total: number) => `共有${total}条数据`,
    onChange: (current: number, pageSize: number) => {
      listParm.current = current;
      listParm.size = pageSize;
      chartPage.current = current;
      chartPage.pageSize = pageSize;
      getListApi().then();
    },
  });

  const listParm = reactive({
    current: chartPage.current,
    size: chartPage.pageSize,
    tabName: '',
    chartType: '',
    chartTitleText: '',
    createTime: '',
    createBy: '',
  })

  const getListApi = async () => {
    const res = await listByPage(listParm);
    tableData.list = res.records;
    await nextTick();
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({index}: { index: number }) => {
        return `${index + 1}`
      },
      align: "center",
      width: '5%',
    },
    {
      title: '图表所属板块',
      dataIndex: 'tabName',
      align: "center",
      width: '10%',
    },
    {
      title: '图表类型',
      dataIndex: 'chartType',
      align: "center",
      width: '5%',
    },
    {
      title: '图表标题',
      dataIndex: 'chartTitleText',
      align: "center",
      width: '15%',
    },
    {
      title: '横轴数据项',
      dataIndex: 'xaxis',
      align: "center",
      width: '10%',
    },
    {
      title: '纵轴数据项',
      dataIndex: 'yaxis',
      align: "center",
      width: '30%',
    },
    {
      title: '图表宽度',
      dataIndex: 'chartSpan',
      align: "center",
      width: '5%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: "center",
      width: '10%',
    },
    {
      title: '创建用户',
      dataIndex: 'createBy',
      align: "center",
      width: '5%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: "center",
    },
  ]

  return {
    tableData,
    tableSize,
    chartPage,
    columns,
    getListApi,
  }
}
