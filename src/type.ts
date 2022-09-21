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
  level: string;
}
