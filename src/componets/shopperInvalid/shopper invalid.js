import { Link } from "react-router-dom";
export function ShopperInvalid(){
    return(
        <div classNmae="container-fluid">
          
        <h3  style={{color:"red"}}>Invalid UserId or Password</h3>
        <div>
            <Link to="/login">Try again</Link>
        </div>
          </div>
         
    )
}