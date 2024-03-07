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

  <a-modal
    v-model:visible="isModalVisible" title="添加新的图表配置" @ok="handleChartConfigSave"
    @cancel="handleChartConfigCancel">
    <a-form
      layout='vertical'
      :model="newChartConfig">
      <a-form-item label="图表所属板块" class="modalFormItem">
        <a-input v-model:value="newChartConfig.tabName" placeholder="Enter Tab Name"/>
      </a-form-item>
      <a-form-item label="图表类型" class="modalFormItem">
        <a-select v-model:value="newChartConfig.chartType" placeholder="Select Chart Type">
          <a-select-option value="Line">折线图</a-select-option>
          <a-select-option value="Bar">柱状图</a-select-option>
          <a-select-option value="Pie">饼图</a-select-option>
          <a-select-option value="Scatter">散点图</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图表标题" class="modalFormItem">
        <a-input v-model:value="newChartConfig.chartTitleText" placeholder="Enter Chart Title"/>
      </a-form-item>
      <a-form-item label="横轴数据项" class="modalFormItem">
        <a-input-search
          v-model:value="newChartConfig.xaxis" @search="selectAxisItem"
          placeholder="点击查询按钮查询X轴数据项进行选择"/>
      </a-form-item>
      <a-form-item label="纵轴数据项" class="modalFormItem">
        <a-input-search
          v-model:value="newChartConfig.yaxis" @search="selectAxisItem"
          placeholder="点击查询按钮查询Y轴数据项进行选择"/>
      </a-form-item>
      <a-form-item label="图表宽度" class="modalFormItem">
        <a-select v-model:value="newChartConfig.chartSpan" placeholder="Select Chart Span">
          <a-select-option value="4">占据1/6长度</a-select-option>
          <a-select-option value="6">占据1/4长度</a-select-option>
          <a-select-option value="8">占据1/3长度</a-select-option>
          <a-select-option value="12">占据1/2长度</a-select-option>
          <a-select-option value="24">占据1/1长度</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-drawer
    v-model:open="plcMetricDrawerVisible"
    title="选择需要展示的数据项"
    placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script lang="ts" setup>
import {Row, Col, notification} from 'ant-design-vue';
import chartArk from "/@/views/quality/chartConfig/ChartArk";
import {nextTick, onMounted, ref} from "vue";
import {
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

const {
  tableData,
  tableSize,
  chartPage,
  columns,
  getListApi,
} = chartArk();

const searchLoading = ref(false);
const chartConfigModalVisible = ref(false);
const plcMetricDrawerVisible = ref(false);

onMounted(async () => {
  await nextTick();
  await getListApi();
});

async function refreshTableData() {
  searchLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  await getListApi().then();
  notification.success({
    message: 'Success',
    description: 'Data fetched successfully',
  });
  searchLoading.value = false;
}

const newChartConfig = ref({
  tabName: '',
  chartType: '',
  chartTitleText: '',
  xaxis: '',
  yaxis: '',
  chartSpan: ''
});

function showChartConfigModal() {
  chartConfigModalVisible.value = true;
}

function handleChartConfigSave() {
  console.log('New Chart Config data:', newChartConfig.value);
  chartConfigModalVisible.value = false;
  Object.keys(newChartConfig.value).forEach(key => {
    newChartConfig.value[key] = '';
  });
}

function handleChartConfigCancel() {
  chartConfigModalVisible.value = false;
  Object.keys(newChartConfig.value).forEach(key => {
    newChartConfig.value[key] = '';
  });
}

function selectAxisItem() {
  plcMetricDrawerVisible.value = true;
}


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

.modalFormItem {
  margin: 20px;
}


</style>
