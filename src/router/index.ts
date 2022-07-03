import React from "react";
import Posts from "../pages/posts/Posts";
import Users from "../pages/users/Users";
import UserDetails from "../pages/users/UserDetails";

export interface IRoute {
  path: string;
  page: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  POSTS = '/posts',
  USERS = '/users',
  USERDETAILS = '/users/:id',
  ANYPATH = '*'
}

export const routes: IRoute[] = [
  {path: RouteNames.POSTS, page: Posts},
  {path: RouteNames.USERS, page: Users},
  {path: RouteNames.USERDETAILS, page: UserDetails},
  {path: RouteNames.ANYPATH, page: Posts},
]