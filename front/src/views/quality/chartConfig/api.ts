import {qualityHttp} from '/@/utils/http/axios';

enum ChartConfigApi {
  list = '/chart_config/',
  listByPage = '/chart_config/list'
}

/**
 * @param params 查询图表Tab
 */
export const list = (params) => qualityHttp.get({url: ChartConfigApi.list, params});

/**
 * @param params 分页查询图表Tab
 */
export const listByPage = (params) => qualityHttp.post({url: ChartConfigApi.listByPage, params});
