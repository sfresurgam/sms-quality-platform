import { qualityHttp } from '/@/utils/http/axios';

enum SlabReportApi {
  list = '/slab/list',
  getSlabMeasureInfo = '/slab/getSlabMeasureInfo',
}

/**
 * @param params 分页查询参数
 */
export const list = (params) => qualityHttp.post({ url: SlabReportApi.list, params });

/**
 * @param params 板坯度量数据项
 */
export const getSlabMeasureInfo = (params) => qualityHttp.post({ url: SlabReportApi.getSlabMeasureInfo, params });
