import styles from "./header.module.less";
import { Link } from "react-router-dom";
import RightContent from "../RightContent";

function GlobalHeader() {
    return (
        <div className={styles["layout-header"]}>
            <div className={styles["layout-header-logo"]}>
                <Link to={"/"}>
                    <h1>后台管理</h1>
                </Link>
            </div>
            <div style={{ flex: "1 1 0%" }}></div>

            <RightContent/>
        </div>
    );
}

export default GlobalHeader;
