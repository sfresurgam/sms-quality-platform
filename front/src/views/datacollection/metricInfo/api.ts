import {qualityHttp} from '/@/utils/http/axios';

enum MetricInfoApi {
  listByPage = ''
}

/**
 * @param params 分页查询数据项
 */
export const listByPage = (params) => qualityHttp.post({url: MetricInfoApi.listByPage, params});
