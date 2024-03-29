import { useEffect, useMemo } from "react"; //474 추가 ,487추가  useMemo
import useCustomLogin from "../../hooks/useCustomLogin"; // 473 추가
// 478 제거 import { getCartItemsAsync } from "../../slices/cartSlice"; // 474 추가
// 478 제거 import { useDispatch, useSelector } from "react-redux"; // 474 추가 476 추가 , useSelector
import useCustomCart from "../../hooks/useCustomCart"; // 478 추가
import CartItemComponent from "../cart/CartItemComponent"; // 480 추가

const CartComponent = () => {

    const {isLogin, loginState} = useCustomLogin() // 473 추가

    // 478 제거 const dispatch = useDispatch() // 475 추가

    // 478 제거 const cartItems = useSelector(state => state.cartSlice )

    const {refreshCart, cartItems , changeCart } = useCustomCart() // 478 추가 ,484 추가 changeCart

    // 487 추가
    const total = useMemo(() => {

        let total = 0

        for(const item of cartItems) {
        total += item.price * item.qty
        }

        return total

    },[cartItems])

    useEffect(() => {

        if(isLogin) {
        // 478 제거       dispatch(getCartItemsAsync())
        // } // 475 추가

        refreshCart() // 478 추가
    }

  },[isLogin])


    return ( 
        <div className="w-full">
            {/* p473 제거 <div>Cart</div> */}
            {isLogin ?
            <div className="flex flex-col">
                <div className="w-full flex">
                    <div className="font-extrabold text-2xl w-4/5"> 
                        {loginState.nickname}'s Cart
                    </div>
                    <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
                        {cartItems.length}
                    </div>
                </div>
                <div>
                    <ul>
                        {cartItems.map( item => <CartItemComponent {...item} key={ item.cino } changeCart={changeCart} email={loginState.email} />)} 
                        {/* 484 추가 changeCart={changeCart} */}
                        {/* 485 추가 email={loginState.email} */}
                    </ul>
                </div>
                <div>
                    <div className="text-2xl text-right font-extrabold">
                    TOTAL: {total}
                    </div>
                </div>
            </div>
            :
            <></>
            }
        </div>
    );
}
 
export default CartComponent;