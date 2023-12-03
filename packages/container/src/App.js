import React, {Suspense, useState} from "react";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
    productionPrefix: "co"
});

const MarketingAppLazy = React.lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = React.lazy(() => import("./components/AuthApp"));
export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
            <BrowserRouter>
                <StylesProvider generateClassName={generateClassName}>
                    <div>
                        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                        <Suspense fallback={<Progress/>}>
                            <Switch>
                                <Route path="/auth">
                                    <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
                                </Route>
                                <Route path="/" component={MarketingAppLazy} />
                            </Switch>
                        </Suspense>
                    </div>
                </StylesProvider>
            </BrowserRouter>


    );
}