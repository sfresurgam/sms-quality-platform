import {qualityHttp} from "/@/utils/http/axios";

enum SlabReportApi {
  list = '/slab/list'
}

/**
 * @param current 当前页
 * @param size 每页条数
 * @param params 查询参数
 */
export const list = (current, size, params) => qualityHttp.post({url: SlabReportApi.list + '?current=' + current + '&size=' + size, params})
