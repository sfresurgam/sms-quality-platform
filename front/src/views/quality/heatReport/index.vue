<template>
  <a-table
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="tableData.list"
    :row-key="(record) => record.id"
    :pagination="slabPage"/>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue';
import {list} from "/@/views/quality/slabReport/api";

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

const tableData = reactive({
  list: [],
})
// 分页
const slabPage = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50'],
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

const getListApi = async () => {
  const res = await list(listParm);
  tableData.list = res.records;
  slabPage.total = res.total;
  if (tableData.list.length > 0) {
    defaultSelectedKey.value = tableData.list[0].id;
    selectedRowKeys.value = [defaultSelectedKey.value];
  }
}

const defaultSelectedKey = ref();

const selectedRowKeys = ref([defaultSelectedKey.value]);

watch(
  () => tableData,
  () => {
    nextTick(() => {
      selectedRowKeys.value = [defaultSelectedKey.value];
    });
  },
  {immediate: true}
);

const onSelectChange = (selectedKeys) => {
  selectedRowKeys.value = selectedKeys;
};

const rowSelection = computed(() => ({
  type: 'radio',
  selectedRowKeys: selectedRowKeys.value,
  onChange: onSelectChange,
  hideDefaultSelections: true,
}));

onMounted(() => {
  nextTick(() => {
    // 获取表格数据
    getListApi();
  })
})


</script>

<style scoped>

</style>
