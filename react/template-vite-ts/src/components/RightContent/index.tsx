import React from "react";
import { Space } from "antd";
import styles from "./index.module.less";
import Avatar from "./AvatarDropdown";

const GlobalHeaderRight: React.FC = () => {

    let className = styles.right;


    return (
        <Space className={className}>
            <Avatar/>
        </Space>
    );
};

export default GlobalHeaderRight;
