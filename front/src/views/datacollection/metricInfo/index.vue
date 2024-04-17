<template>
  <Row class='AreaStyle'>
    <Col :span="24" class='AreaSpiritStyle'>
      <a-button @click="showChartConfigModal" style="margin-right: 8px;">
        Add New
      </a-button>
      <a-button @click="refreshTableData()" :loading="searchLoading">
        <SearchOutlined/>
        Search
      </a-button>
    </Col>
  </Row>
  <Row class='AreaStyle'>
    <Col :span="24" class='AreaSpiritStyle'>
      <a-table
        :dataSource="tableData.list"
        :columns="columns"
        :pagination="chartPage"
        :size="tableSize"
        :loading="searchLoading"
        :bordered=true>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'xaxis'">
            <span v-for="(item, index) in record.xaxis.split(',')" :key="`item-${index}`">
              <a-tag color="blue" :key="index">
                {{ item.trim() }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.dataIndex === 'yaxis'">
            <span v-for="(item, index) in record.yaxis.split(',')" :key="`item-${index}`">
              <a-tag color="blue" :key="index">
                {{ item.trim() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <span>
              <FormOutlined
                style="font-size: 20px; color: #5e55d0; cursor: pointer; margin-right: 10px"/>
            </span>
            <span>
              <DeleteOutlined style="font-size: 20px; color: #d05576; cursor: pointer"/>
            </span>
          </template>
        </template>
      </a-table>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import {Row, Col, notification} from 'ant-design-vue';
import {nextTick, onMounted} from "vue";
import {
  SearchOutlined,
} from '@ant-design/icons-vue';


onMounted(async () => {
  await nextTick();
});

</script>

<style scoped>
.AreaStyle {
  margin-top: 5px;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  overflow: hidden;
}

.AreaSpiritStyle {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
}
</style>
