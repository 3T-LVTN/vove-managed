import { useEffect } from "react";
import * as firebaseAuth from "firebase/auth";
import "firebaseui/dist/firebaseui.css";

export const Login = (props: { ui: any }) => {
  useEffect(() => {
    props.ui.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInOptions: [firebaseAuth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: `${window.location.origin}`,
    });
  }, []);
  return <div id="firebaseui-auth-container"></div>;
};

export default Login;
