<template>
  <div class="p-2">
    <a-table
      :scroll="{y:tableHeight}"
      :dataSource="tableList.list"
      :columns="columns"
      :pagination="slabPage"
      :size="tableSize"
      :bordered=true>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'slabNo'">
          <a-tag color="green">
            <CheckCircleOutlined/>
            {{ record.slabNo }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'slabPlaceCode'">
          <a-tag v-if="record.slabPlaceCode === 'N'" color="purple">
            {{ record.slabPlaceCode }}
          </a-tag>
          <a-tag v-else-if="record.slabPlaceCode === 'X'" color="pink">
            {{ record.slabPlaceCode }}
          </a-tag>
          <a-tag v-else-if="record.slabPlaceCode === 'Y'" color="blue">
            {{ record.slabPlaceCode }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import useTable from './useTable'
import {
  CheckCircleOutlined
} from '@ant-design/icons-vue';

const {tableHeight, tableList, tableSize, slabPage, listParm, columns} = useTable();

</script>

<style scoped></style>
