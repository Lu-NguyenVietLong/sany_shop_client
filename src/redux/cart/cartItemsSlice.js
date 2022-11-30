import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
const initialState = {
    cartItems: []
}

export const cartItemsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const indexItem = state.cartItems.findIndex(
                (cartItem) =>
                  cartItem.product._id === action.payload.product._id &&
                  cartItem.color === action.payload.color &&
                  cartItem.size === action.payload.size,
              );
        
              if (indexItem >= 0) {
                const indexSize = action.payload.product.detail.findIndex(
                  (item) => item.size === action.payload.size,
                );
                const indexColor = action.payload.product.detail[indexSize].detailColor.findIndex(
                  (item) => item.color === action.payload.color,
                );
                
                const quantityInStock = action.payload.product.detail[indexSize].detailColor[indexColor].amount;
                if (quantityInStock === state.cartItems[indexItem].quantity) {
                  toast.error(
                    `Màu [${action.payload.color}] - size [${action.payload.size}] chỉ tối đa ${quantityInStock} sản phẩm !`,
                  );
                } else {
                  state.cartItems[indexItem].quantity += action.payload.quantity;
                  toast.info('Thêm số lượng sản phẩm vào giỏ hàng thành công !');
                }
              } else {
                state.cartItems.push({ ...action.payload, _id: uuidv4() });
                toast.success('Thêm vào giỏ hàng thành công !');
              }
        },
        updateItem: (state, action) => {
            const newItem = action.payload
            const item = state.value.filter(e => e.slug === newItem.slug && e.color.color === newItem.color.color && e.size.size === newItem.size.size)
            if (item.length > 0) {
                state.value = state.value.filter(e => e.slug !== newItem.slug || e.color.color !== newItem.color.color || e.size.size !== newItem.size.size)
                state.value = [...state.value, {
                    id: item[0].id,
                    name: item[0].name,
                    slug: newItem.slug,
                    color: newItem.color,
                    size: newItem.size,
                    price: newItem.price,
                    discount: newItem.discount,
                    quantity: newItem.quantity,
                    images: newItem.images
                }]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
        removeItemFromCart: (state, action) => {
          const newState= state.cartItems.filter(
            (cartItem) => cartItem._id !== action.payload._id,
          );
          state.cartItems = newState;
          toast.info('Đã xóa sản phẩm khỏi giỏ hàng !');
        },
        setCart: (state,action)=> {
          state.cartItems = action.payload.cartItems
        },
        decreaseCart: (state, action) => { // truyền vào cartItem
          const indexItem = state.cartItems.findIndex(
            (cartItem) => cartItem._id === action.payload._id,
          );
          if (state.cartItems[indexItem].quantity > 1) {
            state.cartItems[indexItem].quantity -= 1;
            // toast.info('Cập nhật giỏ hàng thành công !');
          } else if (state.cartItems[indexItem].quantity === 1) {
            const newState = state.cartItems.filter(
              (cartItem) => cartItem._id !== action.payload._id,
            );
            state.cartItems = newState;
            toast.info('Đã xóa sản phẩm khỏi giỏ hàng !');
          }
        },
        increaseCart: (state,action) => {
          const indexItem = state.cartItems.findIndex(
            (cartItem) => cartItem._id === action.payload._id,
          );
          state.cartItems[indexItem].quantity += 1;
          // toast.info('Cập nhật giỏ hàng thành công !');
        },
        clearCart: (state) => {
          state.cartItems = [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, updateItem,setCart,increaseCart,decreaseCart,clearCart } = cartItemsSlice.actions
export const selectCartItems = (state)=> state.cart.cartItems
export default cartItemsSlice.reducer