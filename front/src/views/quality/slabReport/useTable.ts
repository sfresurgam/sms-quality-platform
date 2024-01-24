import {list} from '/@/views/quality/slabReport/api';
import {computed, ref, reactive, onMounted, nextTick} from 'vue';

export default function useTable() {
  // 表格高度
  const tableHeight = ref(0);

  const tableList = reactive({
    list: [],
  })

  const tableSize = 'small';

  // 分页
  const slabPage = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50'],
    showTotal: (total: number) => `共有${total}条数据`,
    // 页容量改变时触发
    // @ts-ignore
    onShowSizeChange: (current: number, pageSize: number) => {
      // 实现逻辑
    },
    // 页数改变时触发
    // @ts-ignore
    onChange: (current: number, pageSize: number) => {
      // 实现逻辑
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

  const getListApi = async () => {
    const res = await list(listParm);
    tableList.list = res.records;
    slabPage.total = res.total;
  }

  const columns = [
    {
      title: '板坯生成时间',
      dataIndex: 'dataTime',

    },
    {
      title: '板坯号',
      dataIndex: 'slabNo',
    },
    {
      title: '炉次号',
      dataIndex: 'heatMatchNo',
    },
    {
      title: '钢种',
      dataIndex: 'spec',
    },
    {
      title: '混钢坯标志',
      dataIndex: 'slabPlaceCode',
    },
  ]

  onMounted(() => {
    nextTick(() => {
      // 获取表格数据
      getListApi();
      // 计算表格高度
      tableHeight.value = window.innerHeight - 300;
    })
  })


  return {
    tableHeight,
    tableList,
    tableSize,
    slabPage,
    listParm,
    columns,
  }
}
