import React, { useState, useEffect, useRef } from 'react';

import Helmet from '../components/Helmet';
import ProductCard from '../components/ProductCard';
import Grid from '../components/Grid';

import productData from '../Fake/product';
import category from '../Fake/categogy';
import catalogApi from '../api/catalogApi';
import axios from 'axios';
import productApi from '../api/productApi';
import categoryApi from '../api/categoryApi';

const Catalog = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [sorts, setSorts] = useState('');


    const handleSort = (e) => {
        setSorts(e.target.value)
        if (sorts === "Tăng dần")
        {
        setProducts(products.sort((item, item2) => (item2.price - item2.price*(item2.discount/100)) - (item.price - item.price*(item.discount/100))))
        }
        if (sorts === "Giảm dần")
        {
            setProducts(products.sort((item, item2) => (item.price - item.price*(item.discount/100)) - (item2.price - item2.price*(item2.discount/100))))

        }

        console.log("co lap lai")
    } 

    const temp = useRef(null)
    const handleFilter = (categoryId) => {
        
        setActiveFilter(categoryId)

    
    }





   

    
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    limit: 0,
                    page: 1,
                };
                setLoading(true);
                const res = await productApi.getAll(params);
                if (res.data) {
                    setProducts(res.data);
                    console.log(res.data)
                }
                setLoading(false);
                
            } catch (error) {
                console.log('Failed: ', error);
            }
        };
        const fetchCategoryList = async () => {
            try {
                const params = {
                    limit: 0,
                    page: 1,
                };
                const res = await categoryApi.getAll(params);
                
                if (res.data) {
                  setCategories(res.data);
                }
            } catch (error) {
                console.log('Failed: ', error);
            }
        };
        fetchCategoryList()
        fetchProductList();
    }, []);


    useEffect(() => {
      const fetcProductByCategory = async () => {
        try {
          setLoading(true);
          if(activeFilter === 'all') {
            const params = {
                limit: 0,
                page: 1,
            };
            const res = await productApi.getAll(params);
            if(res.data) {
              setProducts(res.data)
            }
          }
          if (activeFilter !== 'all') {
            const res = await categoryApi.get(activeFilter);
            if(res.category) {
              setProducts(res.category.products)
            }
          }
            
            setLoading(false);
            // if (res.data) {
            //   setCategories(res.data);
            // }
        } catch (error) {
            console.log('Failed: ', error);
        }
    };
    fetcProductByCategory()
    }, [activeFilter])



    return (
        <Helmet title="Sản phẩm">
            <div className="catalog" >
                <div className="catalog__filter">
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            <p>Danh mục sản phẩm</p>
                        </div>
                        <div className="catalog__filter__widget__content">
                                <div
                                    className={`catalog__filter__widget__content__item ${
                                        "all" === activeFilter ? 'active' : ''
                                    }`}
                                    onClick={() => handleFilter("all")}
                                >
                                    <p>Tất cả</p>
                                    <div className="catalog__filter__widget__content__point"></div>
                                </div>
                            {categories.map((item, index) => (
                                <div
                                    className={`catalog__filter__widget__content__item ${
                                        item._id === activeFilter ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        handleFilter(item._id)
                                        handleSort()
                                    }}
                                >
                                    <p>{item.name}</p>
                                    <div className="catalog__filter__widget__content__point"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="catalog__content">
                    <div className="catalog__sort">
                        <select className='catalog__sort__select'  onChange={handleSort}>
                            <option>
                                Sắp xếp
                            </option>
                            <option>
                                Tăng dần
                            </option>
                            <option>
                                Giảm dần
                            </option>
                        </select>
                    </div>
                        
                    <Grid col={4} mdCol={3} smCol={2} gap={35}>
                        {loading ? (<div>Loading...</div>): (
                          products.length >0 || sorts !== ''  ? products.map((product)=> (
                            <ProductCard
                                key={product._id}
                                data={product}
                                slug={product._id}
                            />
                          )) : <div>Không có sản phẩm nào</div>
                        )}
                    </Grid>
                </div>
            </div>
        </Helmet>
    );
};

export default Catalog;
