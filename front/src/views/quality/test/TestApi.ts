import {defHttp} from "/@/utils/http/axios";

enum TestApi {
  roleList = '/sys/role/list',
}

export const roleList = (params) => defHttp.get({url:TestApi.roleList, params})
