export interface UsersDataType {
  username: string;
  email: string;
  mobile: string;
  role_name: string;
  mg_state: boolean;
  id: number;
  password?: string;
}

export interface RolesDataType {
  id: number;
  roleName: string;
  roleDesc: string;
  children?: RolesChildrenDataType[];
}

export interface RolesChildrenDataType {
  id: number;
  authName: string;
  path: string;
  children?: RolesChildrenDataType[];
}

// export interface RolesRightsDataType {
//   id: number;
//   authName: string;
//   path: string;
//   pid: number;
//   children?: RolesRightsDataType[];
// }

export interface RightsDataType {
  id: number;
  authName: string;
  path: string;
  pid: number;
  level: number;
}

export interface GoodsDataType {
  goods_id: number;
  goods_name: string;
  goods_number: number;
  goods_weight: number;
  add_time: number;
  upd_time: number;
  hot_number: number;
  is_promote: boolean;
  goods_price: number;
  goods_state: number;
  goods_cat: number[];
}

export interface CategoriesDataType {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children?: CategoriesDataType[];
}

export interface ParamsDataType {
  cat_id: number;
  attr_id: number;
  attr_name: string;
  attr_vals: string;
  children: any[];
}

export interface OrderDataType {
  order_id: number;
  order_number: string;
  order_price: number;
  is_send: string;
  update_time: string;
  order_fapiao_title: string;
  user_id: number;
}
