import { qualityHttp } from '/@/utils/http/axios';

enum SlabReportApi {
  list = '/slab/list',
}

/**
 * @param params 查询参数
 */
export const list = (params) => qualityHttp.post({ url: SlabReportApi.list, params });
