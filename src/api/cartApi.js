import axiosClient from "./axiosClient"

const cartApi = {
    addToCart: ({product, size, color, quantity})=> {
        try {
            const url = 'cart/add-to-cart'
            return axiosClient.post(url, {product, size, color, quantity
            })
        } catch (error) {
            
        }
    },
    getMyCart: ()=> {
        try {
            const url = 'cart/my-cart'
            return axiosClient.get(url)
        } catch (error) {
            
        }
    },

    removeItem: (id)=> {
        try {
            const url = `/cart/remove-item-from-cart/${id}`
            return axiosClient.put(url)
        } catch (error) {
            
        }
    },

    updateItem: (id, size, color, quantity)=> {
        try {
            const url = `/cart/${id}`
            return axiosClient.put(url, {size, color, quantity
            })
        } catch (error) {
            
        }
    }

}
export default cartApi