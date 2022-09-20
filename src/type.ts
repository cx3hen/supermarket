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
