import React, { lazy, useState, useMemo, useEffect } from "react";
import { isArray } from "./utils/is";
import { Link } from "react-router-dom";


export type Route = {
    key: string;
    name: string;
    icon?: string;
    component?: any;
    children?: Route[];
}

export const routes: Route[] = [
    {
        key: "workplace",
        name: "工作台",
        component: lazy(() => import("./pages/workplace")),
    },
    {
        key: "system",
        name: "系统管理",
        children: [
            {
                key: "system/user",
                name: "用户管理",
                component: lazy(() => import("./pages/system/user")),
            }
        ]
    }
];

// 将后端返回的路由铺平 返回格式是树形结构
export const getFlattenUserRoutes = (routes) => {
    const res = [];

    function travel(_routes) {
        _routes.forEach((route) => {
            if (route.key && !route.children) {
                res.push(route);
            } else if (isArray(route.children) && route.children.length) {
                res.push(route);
                travel(route.children);
            }
        });
    }

    travel(routes);
    return res;
};

export function getFlattenRoutes(routes) {
    const res = [];
    function travel(_routes) {
        _routes.forEach((route) => {
            if (route.key && !route.children) {
                res.push(route);
            } else if (isArray(route.children) && route.children.length) {
                travel(route.children);
            }
        });
    }

    travel(routes);
    return res;
}


const useRoute = (userRoutes): [ Route[], string ] => {
    const filterRoute = (routes: Route[], arr = []): Route[] => {
        if (!routes.length) {
            return [];
        }
        if (!userRoutes.length) {
            return [];
        }
        for (const route of routes) {
            const { key } = route;

            const newRoute = userRoutes.find(item => item.key === key);

            // let visible = true;
            // if (requiredPermissions) {
            //     visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
            // }

            if (!newRoute) {
                continue;
            }
            if (route.children && route.children.length) {
                const newRoute = { ...route, children: [] };
                filterRoute(route.children, newRoute.children);
                if (newRoute.children.length) {
                    arr.push(newRoute);
                }
            } else {
                arr.push({ ...route });
            }
        }
        return arr;
    };

    const [ permissionRoute, setPermissionRoute ] = useState(routes);

    useEffect(() => {
        const newRoutes = filterRoute(routes);
        setPermissionRoute(newRoutes);
    }, [ userRoutes ]);

    const defaultRoute = useMemo(() => {
        const first = userRoutes[0];
        if (first) {
            return first?.children?.[0]?.key || first.key;
        }
        return "";
    }, [ permissionRoute ]);

    return [ permissionRoute, defaultRoute ];
};

export default useRoute;
