import React, { createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {//action - add to cart, deleter from cart
    switch(action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name, price:action.price, img: action.img, qty:action.qty, size: action.size}] //...=>stay in default state, dispatch me add hoga

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        
        case "UPDATE":
        let arr = [...state]
        arr.find((food, index) => {
            if (food.id === action.id) {
                console.log(food.qty, parseInt(action.qty), action.price + food.price)
                arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            }
            return arr
        })
        return arr

        case "DROP":
            let empArray = []
            return empArray
        
        default:
            console.log("error in reducer")
    }

}

export const CartProvider = ({children})=>{
    const[state, dispatch] = useReducer(reducer, []) //initial value of state is an empty array
    return (

        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value = {state} >
                {children}

            </CartStateContext.Provider>
        </CartDispatchContext.Provider>


    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartDispatchContext);