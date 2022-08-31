import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import qs from "query-string";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useRoute, { routes as userRoutes, getFlattenRoutes, getFlattenUserRoutes } from "../../routes";
import { isArray, isFunction, isObject } from "../../utils/is"

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

function getIconDom(icon) {
    // if (isString(icon) && icon.startsWith("icon-")) {
    //     return <SvgIcon type={icon}/>;
    // }

    if (isObject(icon) || isFunction(icon)) {
        return icon;
    }
    return "";
}



function getRootSubmenuKeys(routes) {
    const res = [];

    function travel(_routes) {
        _routes.forEach((route) => {
            if (isArray(route.children) && route.children.length) {
                res.push(route.key);
            }
        });
    }

    travel(routes);
    return res;
}

function GlobalSidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const flattenRoutes = useMemo(() => getFlattenUserRoutes(userRoutes), []);
    const [ routes, defaultRoute] = useRoute(flattenRoutes);

    const rootSubmenuKeys = useMemo(() => getRootSubmenuKeys(routes), []);

    const pathname = location.pathname;
    const currentPathname = qs.parseUrl(pathname).url.slice(1);
    const defaultSelectKeys = [ currentPathname || defaultRoute ];

    const paths = (currentPathname || defaultRoute).split("/");
    const defaultOpenKeys = paths.slice(0, paths.length - 1);

    const [ selectKeys, setSelectKeys ] = useState<string[]>(defaultSelectKeys);
    const [ openKeys, setOpenKeys ] = useState<string[]>(defaultOpenKeys);

    function renderMenus(): MenuItem[] {
        const nodes: MenuItem[] = [];
        function travel(_routes, level) {
            return _routes.map((route) => {
                if (route.key &&
                    (!isArray(route.children) ||
                        (isArray(route.children) && !route.children.length))) {
                    route.label = (<Link to={`/${route.key}`}>{route.name}</Link>);
                    if (level > 1) {
                        return getItem(route.label, route.key, getIconDom(route.icon));
                    }
                    nodes.push(getItem(route.label, route.key, getIconDom(route.icon)));
                }
                if (isArray(route.children) && route.children.length) {
                    route.label = (<span>{route.name}</span>);
                    if (level > 1) {
                        return getItem(route.label, route.key, getIconDom(route.icon), travel(route.children, level + 1));
                    }
                    nodes.push(getItem(route.label, route.key, getIconDom(route.icon), travel(route.children, level + 1)));
                }
                return null;
            });
        }
        travel(routes, 1);
        return nodes;
    }

    function handleMenuClick({ key }) {
        const currentRoute = flattenRoutes.find((r) => r.key === key);
        setSelectKeys([ key ]);
        navigate(currentRoute.path ? currentRoute.path : `/${key}`);
    }

    function handleOpenChange(keys: string[]) {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [ latestOpenKey ] : []);
        }
    }


    return (
        <div style={{ flex: "1 1 0%", overflow: "hidden" }}>
            <Menu
                style={{ height: "100%" }}
                mode={"inline"}
                items={renderMenus()}
                selectedKeys={selectKeys}
                openKeys={openKeys}
                onClick={handleMenuClick}
                onOpenChange={handleOpenChange}
            />
        </div>
    );
}

export default GlobalSidebar;
