import React from 'react';
import yq from  '../../../images/yq.png';
import yyzx from '../../../images/yyzx.jpg';

export default function Login(props) {
  

  const onGoto = (route)=> {
    props.history.push(route)
  }

  return (
    <div className="common-components-login" style={{ color: "black"}}>
      <div onClick={()=>onGoto("yq")}>
        <img  alt="" src={yq} />
      </div>
      <div onClick={()=>onGoto("yyzx")}>
      <img  alt="" src={yyzx} />
      </div>
    </div>
  );
};

Login.propTypes = {};
Login.defaultProps = {};
