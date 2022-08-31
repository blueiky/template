import React, { useCallback } from "react";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import { NavigateFunction, useNavigate } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.module.less";
import type { MenuInfo } from "rc-menu/lib/interface";
import avatar from "../../assets/images/avatar.png";
import { EditTwo, Power } from "@icon-park/react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../store";

export type GlobalHeaderRightProps = {
    menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async (navigate: NavigateFunction) => {
    // await logout();
    // Note: There may be security issues, please note
    if (window.location.pathname !== "/login") {
        navigate("/login", { replace: true });
    }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
    const userInfo = useSelector((state: GlobalState) => (state.userInfo || {}).user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if (key === "logout") {
                loginOut(navigate);
                dispatch({
                    type: "update-tabs",
                    payload: {
                        tabs: []
                    }
                });
                return;
            }
            navigate(`/account/${key}`);
        },
        [],
    );

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
    		<Spin size="small" style={{ marginLeft: 8, marginRight: 8, }}/>
    	</span>
    );

    if (!userInfo) {
        return loading;
    }


    function menuHeaderDropdown() {
        const menus: MenuProps["items"] = [
            (menu && {
                label: "个人中心",
                key: "center",
                icon: <UserOutlined/>,
            }),
            (menu && {
                label: "个人设置",
                key: "settings",
                icon: <SettingOutlined/>,
            }),
            {
                label: "修改密码",
                key: "check-password",
                icon: <EditTwo/>,
            },
            { type: "divider" },
            {
                label: "退出登录",
                key: "logout",
                icon: <Power/>,
            },
        ];

        return <Menu className={styles.menu} items={menus} selectedKeys={[]} onClick={onMenuClick}/>;
    }


    return (
        <HeaderDropdown overlay={menuHeaderDropdown} trigger={[ "hover" ]}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar className={styles.avatar} src={avatar} alt="avatar"/>
                <span className={`${styles.name} anticon`}>{userInfo.nickname || ""}</span>
            </span>
        </HeaderDropdown>
    );

};

export default AvatarDropdown;
