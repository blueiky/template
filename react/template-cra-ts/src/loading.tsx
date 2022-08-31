import { Spin } from "antd";

function Loading() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Spin tip="加载中..." />
        </div>
    );
}

export default Loading;
