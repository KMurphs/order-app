import React from 'react';
import { useHistory } from "react-router-dom";

const RedirectReactRouter = (props) => {
  let history = useHistory();
  history.push(`${props.target}`)
  return ( <div></div> );
}
 
export default RedirectReactRouter;