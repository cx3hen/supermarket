import axios from 'axios';
import { UsersDataType } from './type';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

//请求拦截器 为Authorization添加登陆时获取的token
axios.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
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

/**
 *  获取菜单信息接口
 */
export const getMenu = async () => {
  const res = await axios({
    url: '/menus',
    method: 'get',
  });
  return res.data.data;
};

/**
 *  获取用户列表接口
 */
export const getUsers = async () => {
  const res = await axios({
    url: '/users',
    method: 'get',
    params: { pagenum: 1, pagesize: 100 },
  });
  return res.data.data;
};

/**
 *   修改用户状态接口
 */
export const alterUsersState = async (id: string, state: boolean) => {
  await axios({
    url: `/users/${id}/state/${state}`,
    method: 'put',
  });
};

/**
 *   修改用户信息接口
 */
export const alterUsersInformation = async (id: string, values: UsersDataType) => {
  await axios({
    url: `/users/${id}/`,
    data: {
      ...values,
    },
    method: 'put',
  });
};

/**
 *   删除用户接口
 */
export const deleteUser = async (id: string) => {
  await axios({
    url: `/users/${id}/`,
    method: 'delete',
  });
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
