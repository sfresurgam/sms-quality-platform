<template>
  <Row class="tableAreaStyle">
    <Col :span="16" class="slabTable">
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
    <Col :span="8">
      <div class="tableWrapper">
        <div class="slabContent">
          <Row>
            <Col :span="12" style="padding-right: 5px">
              <div class="slabJudgeInfo">
                <ScheduleOutlined style="font-size: 35px; color: #5c79b8"/>
                &nbsp;&nbsp;
                匹配规则：{{ slabJudgeInfo.ruleCount }}
              </div>
            </Col>
            <Col :span="12" style="padding-left: 5px">
              <div class="slabJudgeInfo">
                <CheckCircleOutlined style="font-size: 35px; color: #88cc5c"/>
                &nbsp;&nbsp;
                校验成功：{{ slabJudgeInfo.passedRulesCount }}
              </div>
            </Col>
          </Row>
          <Row style="margin-top: 10px">
            <Col :span="12" style="padding-right: 5px">
              <div class="slabJudgeInfo">
                <CloseCircleOutlined style="font-size: 35px; color: #dc7474"/>
                &nbsp;&nbsp;
                校验失败：{{ slabJudgeInfo.failedRulesCount }}
              </div>
            </Col>
            <Col :span="12" style="padding-left: 5px">
              <div class="slabJudgeInfo">
                <SecurityScanOutlined style="font-size: 35px; color: #8d2bba"/>
                &nbsp;&nbsp;
                通过占比：{{ slabJudgeInfo.overallPercentage }} %
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  </Row>
  <div style="padding: 10px">
    <a-tabs class="chartTabs" v-model:activeKey="activeTabKey">
      <a-tab-pane
        v-for="(charts, tabName) in chartList" :key="tabName" :tab="tabName">
        <template v-if="activeTabKey === tabName">
          <Row class="chartAreaStyle" v-for="(row, rowIndex) in organizeCharts(charts)"
               :key="`row-${tabName}-${rowIndex}`">
            <Col :span="chart.chartSpan" v-for="(chart) in row" :key="`chart-${chart.id}`">
              <div class="chartWrapper" v-if="activeTabKey === tabName">
                <div :id="`chart-${chart.id}`" class="chartStyle"></div>
              </div>
            </Col>
          </Row>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>

</template>
<script lang="ts" setup>
import slabArk from "/@/views/quality/slabReport/SlabArk";
import {ref, nextTick, onMounted, watch} from "vue";
import {
  CheckCircleOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue';
import {Row, Col} from 'ant-design-vue';
import * as echarts from "echarts";
import initChartData from "/@/views/quality/slabReport/ChartManager";

const {
  tableHeight,
  tableData,
  tableSize,
  slabPage,
  listParm,
  columns,
  rowSelection,
  currentRowData,
  getListApi,
  queryParams,
  getSlabMeasureInfoApi,
  slabMeasureInfo,
  slabJudgeInfo,

  getChartConfigTabList,
  chartList,
  activeTabKey,

  getMeasureInfoAndRenderChart,
} = slabArk();

const {
  generateChartQueryParams,
} = initChartData()

onMounted(async () => {
  await nextTick();
  await getListApi();
  await getChartConfigTabList();
  tableHeight.value = window.innerHeight;
});

watch(activeTabKey, async (newTabKey) => {
  if (typeof newTabKey === 'string' && newTabKey) {
    const charts = chartList.value[newTabKey];
    await getMeasureInfoAndRenderChart(chartList.value[newTabKey], currentRowData.value.slabNo);
  }
});

function organizeCharts(charts) {
  let rows = [];
  let currentRow = [];
  let currentSpanTotal = 0;
  charts.forEach(chart => {
    if (currentSpanTotal + parseInt(chart.chartSpan) <= 24) {
      currentRow.push(chart);
      currentSpanTotal += parseInt(chart.chartSpan);
    } else {
      rows.push(currentRow);
      currentRow = [chart];
      currentSpanTotal = parseInt(chart.chartSpan);
    }
  });
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }
  return rows;
}


</script>

<style scoped>
.tableAreaStyle {
  margin-top: 5px;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  overflow: hidden;
}

.tableWrapper {
  padding: 0 0 0 10px;
}

.slabTable {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
}

.slabContent {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 323px;
}

.slabJudgeInfo {
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 10%;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.chartTabs {
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chartAreaStyle {
  padding: 0 5px 5px 5px;
}

.chartWrapper {
  padding: 0 5px 5px 5px;
}

.chartStyle {
  height: 300px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.chartStyle:hover, .slabJudgeInfo:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
