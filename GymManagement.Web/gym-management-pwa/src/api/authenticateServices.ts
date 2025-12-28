import React from 'react';
import {jwtDecode} from 'jwt-decode';
import api from './api';
import Cookies from 'js-cookie';
import type { AuthResultModel } from '../model/authentication/AuthResultModel';
import type { RefreshTokenModel } from '../model/authentication/RefereshToken';
import type { UserInfoModel } from '../model/authentication/UserInfoModel';
import type { UserLoginModel } from '../model/authentication/UserLoginModel';
import type { UserTokenModel } from '../model/authentication/UserTokenModel';

export const authenticateServices = {
  authenticate: (res: AuthResultModel) => {
    if (res.accessToken !== undefined)
    {
      Cookies.set('access-token', res.accessToken)
      Cookies.set('refresh-token', res.refreshToken)
      Cookies.set('role', res.role)
    }
    
    return authenticateServices.userToken(res.accessToken);
  },
  login: async (data: UserLoginModel): Promise<AuthResultModel | undefined> => {
    const res = await api<AuthResultModel>(
      'post',
      '/api/auth/Login',
      data,
      false
    );
    if (res.accessToken) {authenticateServices.authenticate(res); res.isAutinticated = true;}
    else {res.isAutinticated = false;}
    return res;
  },
  userInfo: async (): Promise<UserInfoModel> => {
    const res: UserInfoModel = await api('get', '/api/auth/UserInfo', null, true);
    return res;
  },

  logout: async () => {
    try {
      await api('post', '/api/authentication/authenticate/logout', null, true, null, null, true);
    } catch (error) {
      console.log('error', error);
    }
    localStorage.clear();
    window.location.reload();
  },

  userToken: (accessToken: string): UserTokenModel | undefined => {

    function parseJwt (accessToken: string) {
      var base64Url = accessToken.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      //console.log('parseJwt', JSON.parse(jsonPayload));

      return JSON.parse(jsonPayload);
      
    }    

    if (accessToken === 'undefined' || accessToken === null)
      return undefined;

    const jwt = parseJwt(accessToken);
    return {
      userId: jwt.userId,
      gymId:jwt.gymId,
      UserName:jwt.userName,
      UserRole:jwt.UserRole
    };
    // return {
    //   userName: '',
    //   departmentId: 0,
    //   title: '',
    //   chartTitle: '',
    //   postCode: '',
    //   firstName: '',
    //   lastName: '',
    //   eID: 0,
    //   userId: 0,
    //   employeeID: 0,
    // };
  },
  refreshToken: async (): Promise<UserTokenModel | undefined> => {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');
    if (accessToken == null || refreshToken == null) return undefined;
    const jwt = jwtDecode<UserTokenModel>(accessToken);
    const data: RefreshTokenModel = {
      userId: jwt.userId,
      refreshToken: refreshToken,
    };
    const res = await api<AuthResultModel>(
      'post',
      '/api/authentication/authenticate/refreshToken',
      data,
      false
    );
    // if (res) return authenticateServices.authenticate(res);
    // else 
    return undefined;
  },

};
