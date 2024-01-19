import {BasicColumn} from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '板坯号',
      dataIndex: 'slabNo',
      fixed: 'left',
      width: 150,
    },
    {
      title: '炉次号',
      dataIndex: 'heatMatchNo',
      width: 150,
    },
    {
      title: '钢种',
      dataIndex: 'spec',
      width: 75,
      slots: { customRender: 'spec' },
    },
    {
      title: '切割日期',
      dataIndex: 'cutDate',
      width: 150,
      sorter: true,
    },
    {
      title: '切割时间',
      dataIndex: 'cutTime',
      width: 150,
      sorter: true,
    },
    {
      title: '报告生成时间',
      dataIndex: 'dsCalcTime',
      width: 150,
      sorter: true,
    },
    {
      title: 'A类违规次数',
      dataIndex: 'dsTimesA',
      width: 100,
    },
    {
      title: 'B类违规次数',
      dataIndex: 'dsTimesB',
      width: 100,
    },
    {
      title: 'C类违规次数',
      dataIndex: 'dsTimesC',
      width: 100,
    },
    {
      title: 'D类违规次数',
      dataIndex: 'dsTimesD',
      width: 100,
    },
    {
      title: '质量判定结果',
      dataIndex: 'fdsResult',
      width: 100,
      slots: { customRender: 'fdsResult' },
    },
    {
      title: '操作',
      width: 100,
      slots: { customRender: 'detail' },
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 100000001; index < 100000040; index++) {

      if(index === 100000002 || index === 100000005) {
        arr.push({
          slabNo: `${index}`,
          heatMatchNo: '99' + `${index}`,
          spec: 'Q235B',
          cutDate: '2023-08-17',
          cutTime: '08:00:00',
          dsCalcTime: '2023-08-17 08:00:00',
          dsTimesA: 2,
          dsTimesB: 5,
          dsTimesC: 2,
          dsTimesD: 9,
          fdsResult: 'fail',
        });
      } else {
        arr.push({
          slabNo: `${index}`,
          heatMatchNo: '99' + `${index}`,
          spec: 'Q235B',
          cutDate: '2023-08-17',
          cutTime: '08:00:00',
          dsCalcTime: '2023-08-17 08:00:00',
          dsTimesA: 0,
          dsTimesB: 1,
          dsTimesC: 3,
          dsTimesD: 0,
          fdsResult: 'pass',
        });
      }
    }
    return arr;
  })();
}
