import axios from 'axios';
import { config } from 'process';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

//请求拦截器 为Authorization添加登陆时获取的token
axios.interceptors.request.use(
  config => {
    config.headers = { Authorization: window.sessionStorage.getItem('token')! };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 *  登录验证接口
 */
export const login = async (values: { username: string; password: string }) => {
  const res = await axios({
    url: '/login',
    data: {
      ...values,
    },
    method: 'post',
  });
  return res.data;
};

export const getMenu = async () => {
  const res = await axios({
    url: '/menus',
    method: 'get',
  });
  return res.data;
};
/**
 * 使用get请求
 */
// axios({
//   url: 'http://httpbin.org/get',
//   params: {
//     name: 'kjh',
//     age: 29,
//   },
//   method: 'get',
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

/**
 * 使用post请求
 */
// axios({
//   url: 'http://httpbin.org/post',
//   data: {
//     name: '123',
//     time: '2019-09-09',
//   },
//   method: 'post',
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
