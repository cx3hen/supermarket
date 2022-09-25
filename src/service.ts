import axios from 'axios';
import { RolesDataType, UsersDataType } from './type';

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
export const getUsers = async (query?: string) => {
  const res = await axios({
    url: '/users',
    method: 'get',
    params: { pagenum: 1, pagesize: 100, query },
  });
  return res.data.data;
};

/**
 *   修改用户状态接口
 */
export const alterUsersState = async (id: number, state: boolean) => {
  await axios({
    url: `/users/${id}/state/${state}`,
    method: 'put',
  });
};

/**
 *   修改用户信息接口
 */
export const alterUsersInformation = async (id: number, values: UsersDataType) => {
  await axios({
    url: `/users/${id}`,
    data: {
      ...values,
    },
    method: 'put',
  });
};

/**
 *   删除用户接口
 */
export const deleteUser = async (id: number) => {
  await axios({
    url: `/users/${id}`,
    method: 'delete',
  });
};

/**
 *   添加用户接口
 */
export const createUser = async (values: { username: string; password: string; email: string; mobile: string }) => {
  await axios({
    url: `/users`,
    data: {
      ...values,
    },
    method: 'post',
  });
};

/**
 *   获取用户角色接口
 */
export const getUserRoles = async () => {
  const res = await axios({
    url: `/roles`,
    method: 'get',
  });
  return res.data.data;
};

/**
 *   分配用户角色接口
 */
export const allotUserRole = async (id: number, rid: number) => {
  await axios({
    url: `/users/${id}/role`,
    data: {
      rid,
    },
    method: 'put',
  });
};

/**
 *   删除角色接口
 */
export const deleteRole = async (id: number) => {
  await axios({
    url: `/roles/${id}`,
    method: 'delete',
  });
};

/**
 *   修改角色信息接口
 */
export const alterRolesInformation = async (id: number, values: RolesDataType) => {
  await axios({
    url: `/roles/${id}`,
    data: {
      ...values,
    },
    method: 'put',
  });
};

/**
 *   添加用户接口
 */
export const createRoles = async (values: { roleName: string; roleDesc: string }) => {
  await axios({
    url: `/roles`,
    data: {
      ...values,
    },
    method: 'post',
  });
};

/**
 *  获取角色权限接口(暂时不用，渲染不来)
 */
// export const getRolesRights = async () => {
//   const res = await axios({
//     url: '/rights/tree',
//     method: 'get',
//   });
//   return res.data.data;
// };

/**
 *   获取用户角色接口
 */
export const getRights = async () => {
  const res = await axios({
    url: `/rights/list`,
    method: 'get',
  });
  return res.data.data;
};

/**
 *  获取商品列表接口
 */
export const getGoods = async (query?: string) => {
  const res = await axios({
    url: '/goods',
    method: 'get',
    params: { pagenum: 1, pagesize: 1000, query },
  });
  return res.data.data;
};

/**
 *   删除商品接口
 */
export const deleteGood = async (id: number) => {
  await axios({
    url: `/goods/${id}`,
    method: 'delete',
  });
};

/**
 *   添加商品接口
 */
export const createGoods = async (values: {
  goods_name: string;
  goods_price: number;
  goods_weight: number;
  goods_number: number;
  goods_cat: number[];
}) => {
  await axios({
    url: `/goods`,
    data: {
      ...values,
      goods_cat: values.goods_cat.join(),
      attrs: [],
      goods_introduce: '',
      pics: [],
    },
    method: 'post',
  });
};

/**
 *  获取所有商品分类接口
 */
export const getCategories = async () => {
  const res = await axios({
    url: '/categories',
    method: 'get',
  });
  return res.data.data;
};

/**
 *   修改商品信息接口
 */
export const alterGoodsInformation = async (
  goods_id: number,
  values: {
    goods_name: string;
    goods_price: number;
    goods_weight: number;
    goods_number: number;
  }
) => {
  await axios({
    url: `/goods/${goods_id}`,
    data: {
      ...values,
      goods_cat: '0,0,0',
    },
    method: 'put',
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
