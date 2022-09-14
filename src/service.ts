import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

/**
 *  登录验证接口
 */
export const login = async (username: string, password: string) => {
  const res = await axios({
    url: '/login',
    data: {
      username,
      password,
    },
    method: 'post',
  });
  return res;
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
