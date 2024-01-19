<template>
  <div class="p-2">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import {ActionItem, BasicColumn, BasicTable, TableAction} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage';
import {list} from "/@/views/quality/slabReport/api";

const {tableContext} = useListPage({
  tableProps: {
    title: '板坯生产列表',
    api: () => list(1, 10, {}).then(res => res.data),
    columns: getTableColumns(),
    size: 'small',
    useSearchForm: false,
  },
});

const [registerTable] = tableContext;

function getTableAction(record): ActionItem[] {
  return [
    {
      label: '查看',
      onClick: handleCheck.bind(null, record),
    },
  ];
}

function handleCheck(record) {
  console.log(record);
}

function getTableColumns(): BasicColumn[] {
  return [
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
    {
      title: '判定结果',
      dataIndex: 'fdsResult',
    },
  ];
}

</script>

<style scoped>

</style>
