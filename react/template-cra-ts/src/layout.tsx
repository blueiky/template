import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import classNames from "classnames";
import styles from "./styles/layout.module.less";
import GlobalHeader from "./components/GlobalHeader";
import GlobalSidebar from "./components/GlobalSidebar";

const { Header, Content, Sider } = Layout;

function PageLayout() {

    const [fixedHeader] = useState(true);
    const [fixedSidebar] = useState(true);

    return (
        <Layout className={styles["layout"]}>
            {fixedSidebar && <div style={{
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                flex: "0 0 200px",
                overflow: "hidden",
                transition: "background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
            }} />}

            <Sider
                style={{paddingTop: 64}}
                className={classNames(styles["layout-sidebar"], fixedHeader && styles["fixed"])}
            >
               <GlobalSidebar />
            </Sider>

            <Layout>
                {fixedHeader && <Header style={{
                    boxShadow: "0 2px 6px 2px rgba(0, 0, 0, .05)",
                }} />}
                <Header
                    className={classNames(styles["layout-header"], fixedHeader && styles["fixed"])}
                >
                    <GlobalHeader />
                </Header>

                <Content className={styles["layout-content"]}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default PageLayout;
