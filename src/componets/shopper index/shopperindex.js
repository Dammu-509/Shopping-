import{BrowserRouter,Routes,Route,Link} from"react-router-dom";
import { ShopperHome } from "../shopper home/shopper home";
import { ShopperJewelery } from "../shopper jewelery/shopper jewrlery";
import { ShopperCategory } from "../shopper category/shopper category";
import { ShopperDetails } from "../shopper details/shopper details";
import { ShopperRegister } from "../shopper register/shopper register";
import { ShopperLogin } from "../shopperlogin/shopper login";
import { ShopperInvalid } from "../shopperInvalid/shopper invalid";

export function ShopperIndex(){
    return(
<div className="container-fluid">
    <BrowserRouter>
   <header className="d-flex  p-3 justify-content-between align-items-center">
    <div>
        <h2 className="me-3">Shopper.</h2>
    </div>
    <nav className="d-flex align-items-center">
         <div  className="me-2"> <Link to="/home" className="btn">Home</Link></div>
        <div  className="me-3"><Link to="category/men's clothing" className="btn">Mens Fashion</Link></div>
        <div className="me-3"><Link to="category/women's clothing" className="btn"> Womens Fashion</Link></div>
        <div className="me-3"> <Link to="category/electronics" className="btn" >Electronics</Link></div>
        <div className="me-3"><Link to="category/jewelery" className="btn">Jewelery</Link></div>
        <div className="me-3  btn btn-danger" style={{width:"150px",textAlign:"center"}}><Link to="register" className="btn"> Register</Link></div>
                <div className="me-3  btn btn-success" style={{width:"150px",textAlign:"center"}}><Link to="login" className="btn"> Login</Link></div>
    </nav>
    <div>
         <span className="bi bi-search"></span>
          <span className="bi bi-person "></span>
           <span className="bi bi-heart"></span>
       
    </div>
   </header>
   <div className="mt-4 bg-dark text-white text-center p-3"> HAPPY SHOPPING! </div>
   <div className="mt-4">
    <Routes>
        <Route path="/" element={<ShopperHome/>}></Route>
        <Route path="home" element={<ShopperHome/>}></Route>
        <Route path="jewelery" element={<ShopperJewelery/>}></Route>
        <Route path="category/:catname" element={<ShopperCategory/>}></Route>
        <Route  path="category/:catname/details/:id" element={<ShopperDetails/>}></Route>
        <Route path="register" element={<ShopperRegister/>}></Route>
        <Route path="login" element={<ShopperLogin/>}></Route>
        <Route path="invalid" element={<ShopperInvalid/>}></Route>
    </Routes>

   </div>
    </BrowserRouter>
</div>
    )
}
