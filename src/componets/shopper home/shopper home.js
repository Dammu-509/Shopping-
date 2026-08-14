import{useCookies} from 'react-cookie';
import{useNavigate} from 'react-router-dom';
import{useEffect} from 'react';
export function ShopperHome(){
    const[cookies,setCookie,removeCookie]=useCookies(["userid"]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!cookies["userid"]){
            navigate("/login");
        }
    },[]);
    function SignoutClick()
    {
        removeCookie("userid");
        navigate("/login");
    }

    return(
        <div className="container-fluid d-flex justify-content-between">

       <div>
         <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <img src="jewelery.png"style={{ width:'200px' ,height:'300px'}}></img>
                <img src="81QpkIctqPL._AC_SX679_t.png"  style={{ width:'200px' ,height:'300px'}}></img>
                <img src="71YXzeOuslL._AC_UY879_t.png"style={{width:'200px' ,height:'300px'}} ></img>
                <img src="women.png" style={{ width:'200px',height:'300px'}} ></img>
            </div>

        </div>

       </div>
       <div>
        <h4> Hello !{cookies["userid"]}</h4>
        <button onClick={SignoutClick}className='btn btn -link'>Signout</button>
       </div>
       </div>
    )
}