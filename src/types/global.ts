export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IPrivateRoute extends IChildrenProps {
  role?: string;
}
