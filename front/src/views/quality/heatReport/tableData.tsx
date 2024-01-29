import {BasicColumn} from '/@/components/Table/src/types/table';

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
