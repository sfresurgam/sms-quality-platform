<template>
  <Row>
    <Col :span="16">
      <a-table
        :scroll="{y:tableHeight}"
        :dataSource="tableData.list"
        :columns="columns"
        :pagination="slabPage"
        :size="tableSize"
        :row-selection="rowSelection"
        :row-key="(record) => record.id"
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
    </Col>
    <Col :span="8">B</Col>
  </Row>
</template>

<script lang="ts" setup>
import useTable from './useTable'
import {CheckCircleOutlined} from '@ant-design/icons-vue';
import {Row, Col} from 'ant-design-vue';

const {tableHeight, tableData, tableSize, slabPage, listParm, columns, rowSelection} = useTable();

</script>

<style scoped></style>
