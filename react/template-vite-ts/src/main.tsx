import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import "./styles/global.less";
import Login from "./pages/login";
import PageLayout from "./layout";
import Loading from "./loading";
import useRoute, { routes as userRoutes, getFlattenRoutes } from "./routes";
import rootReducer from "./store";

const store = createStore(rootReducer);


function Index() {

    const [ routes, defaultRoute ] = useRoute(userRoutes);
    const flattenRoutes = useMemo(() => getFlattenRoutes(routes), []);

    useEffect(() => {
        changeTheme();
    }, []);

    function changeTheme() {
        ConfigProvider.config({
            theme: {
                primaryColor: "#15559A"
            }
        });
    }

    return (
        <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<PageLayout/>}>
                            {flattenRoutes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={`/${route.key}`}
                                        element={
                                            <React.Suspense fallback={<Loading/>}>
                                                <route.component />
                                            </React.Suspense>
                                        }
                                    />
                                );
                            })}
                            <Route index element={<Navigate to={`/${defaultRoute}`}/>}/>
                        </Route>
                    </Routes>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Index/>);
