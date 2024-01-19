import {BasicColumn} from '/@/components/Table/src/types/table';

// export function getTableColumns(): BasicColumn[] {
//   return [
//     {
//       title: '板坯生成时间',
//       dataIndex: 'dataTime',
//       width: 150,
//     },
//     {
//       title: '板坯号',
//       dataIndex: 'slabNo',
//       fixed: 'left',
//       width: 150,
//     },
//     {
//       title: '炉次号',
//       dataIndex: 'heatMatchNo',
//       width: 150,
//     },
//     {
//       title: '钢种',
//       dataIndex: 'spec',
//       width: 75,
//       slots: { customRender: 'spec' },
//     },
//     {
//       title: '混钢坯标志',
//       dataIndex: 'slabPlaceCode',
//       width: 75,
//     },
//     {
//       title: 'A类违规次数',
//       dataIndex: 'dsTimesA',
//       width: 100,
//     },
//     {
//       title: 'B类违规次数',
//       dataIndex: 'dsTimesB',
//       width: 100,
//     },
//     {
//       title: 'C类违规次数',
//       dataIndex: 'dsTimesC',
//       width: 100,
//     },
//     {
//       title: 'D类违规次数',
//       dataIndex: 'dsTimesD',
//       width: 100,
//     },
//     {
//       title: '质量判定结果',
//       dataIndex: 'fdsResult',
//       width: 100,
//       slots: { customRender: 'fdsResult' },
//     },
//     {
//       title: '操作',
//       width: 100,
//       slots: { customRender: 'detail' },
//     },
//   ];
// }

export function getTableColumns(): BasicColumn[] {
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
