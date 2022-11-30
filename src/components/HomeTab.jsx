import React, { useState, useEffect } from 'react'
import Grid from '../components/Grid'
import productData from '../Fake/product'
import ProductCard from '../components/ProductCard'
import productApi from '../api/productApi'


const HomeTab = () => {
    const [activeTab, setActiveTab] = useState(1)
    
    const menuTab = (index) => {
        setActiveTab(index)
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    limit: 4,
                    page: 1,
                };

                const res = await productApi.getAll(params);
                console.log(res.data);
                if (res.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.log('Failed: ', error);
            }
        };
        

        fetchProductList();
    }, []);

  return (
    <div className="home-tab">
        <div className="home-tab__header">
            <div className={`home-tab__header__item ${activeTab === 1 ? "active" : ""}`} onClick={()=>menuTab(1)} >
                <p>Đồ thu đông</p>
            </div>
            <div className={`home-tab__header__item ${activeTab === 2 ? "active" : ""}`} onClick={()=>menuTab(2)}>
                <p>Đồ thể thao</p>
            </div>
            <div className={`home-tab__header__item ${activeTab === 3 ? "active" : ""}`} onClick={()=>menuTab(3)}>
                <p>Quần lót nam</p>
            </div>
        </div>
        <Grid
            col = {4}
            mdCol = {2}
            smCol = {1}
            gap = {20}
        >
            {
                products.map((item, index) => (
                    <ProductCard
                        key={index}
                        data={item}
                    >

                    </ProductCard>
                ))
            }
        </Grid>
    </div>
  )
}

export default HomeTab