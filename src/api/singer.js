import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';

export function getSingers () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, options);
};
export function getSongs (singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, commonParams, {
    g_tk: 1108113351,
    singermid: singerid,
    order: 'listen',
    num: 100,
    begin: 0,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    songstatus: 1
  });
  return jsonp(url, data, options);
};
