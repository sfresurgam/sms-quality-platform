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
import {ActionItem,  BasicTable, TableAction} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage';
import {getTableColumns} from "/@/views/quality/heatReport/tableData";
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
</script>

<style scoped>

</style>
