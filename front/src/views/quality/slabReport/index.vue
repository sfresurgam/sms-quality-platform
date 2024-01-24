<template>
  <div class="p-2">
    <a-button color="success" @click="listData1()">刷新1</a-button>
    <a-button color="success" @click="listData2()">刷新2</a-button>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ActionItem, BasicColumn, BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { list } from '/@/views/quality/slabReport/api';

  // let queryParams = {
  //   current: 1,
  //   size: 10,
  //   endTime: '',
  //   slabNo: '',
  //   staTime: '',
  // };

  const { tableContext } = useListPage({
    tableProps: {
      title: '生产列表',
      // api: async () => await list(queryParams.value),
      api: list,
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

  async function listData1() {
    let res = await list({});
    console.log('res1: ' + JSON.stringify(res));
    return res;
  }

  async function listData2() {
    list({}).then((res) => {
      console.log('res2: ' + JSON.stringify(res));
    });
  }
</script>

<style scoped></style>
