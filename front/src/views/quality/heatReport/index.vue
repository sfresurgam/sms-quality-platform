<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">

import {ActionItem, BasicTable, TableAction} from '/@/components/Table';
import {list} from '/@/views/quality/slabReport/api'
import {getTableColumns} from "/@/views/quality/heatReport/tableData";
import {useListPage} from '/@/hooks/system/useListPage';
import {ref} from "vue";

export default {
  name: "heatReport.vue",
  components: {
    BasicTable,
    TableAction,
  },
  setup() {
    const pagination = ref<any>(true);
    const current = 1
    const size = 10;

    async function getTableBasicData() {
      let result: any = [];
      const res = await list(current, size, {});
      res.data.records.forEach(item => {
        result.push(item);
      });
      console.log("result: " + result)
      return result;
    }

    const {tableContext} = useListPage({
      designScope: '测试table',
      tableProps: {
        title: '测试',
        dataSource: [
          {
            slabNo: 'B984759320',
          },
        ],
        columns: getTableColumns(),
        size: 'small',
        actionColumn: {
          width: 120,
        },
      },
    })
    const [registerTable] = tableContext;

    return {
      pagination,
      tableBasicData: getTableBasicData(),
      registerTable,
    };
  }
}

export function getTableAction(record): ActionItem[] {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    },
  ];
}

function handleEdit(record) {
  console.log(record);
}

</script>

<style scoped>

</style>
