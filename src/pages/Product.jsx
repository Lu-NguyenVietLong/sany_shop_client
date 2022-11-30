import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import productApi from '../api/productApi';
import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import ProductReview from '../components/ProductReview';

const Product = (props) => {

  const [product, setProduct] = useState()
  const [productList, setProductList] = useState()
  const { slug } = useParams()


  useEffect(() => {
    const fetchProductData = async () => {
        try {


            const res = await productApi.get(slug);
            if (res) {
              setProduct(res.product);
            }
        } catch (error) {
            console.log('Failed: ', error);
        }
    };
    const fetchProductList = async () => {
      try{
        const params = {
          limit: 8,
          page: 1,
      };
            const res = await productApi.getAll(params);
            if (res) {
              setProductList(res.data);
            }

      } catch (error) {
        console.log('Failed: ', error);
      }
    };
    

    fetchProductData();
    fetchProductList();
}, []);


  return (
   typeof product !== 'undefined' ?<Helmet title={product.title}>
      <Section >
        <SectionBody>
          <ProductView product={product} />
          <ProductReview product={product}/>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Khám phá thêm
        </SectionTitle>
        <SectionBody>
         { typeof productList !== 'undefined'  ? <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={60}
          >
            {
            productList.map((product) => (
              <ProductCard 
              key={product._id} 
              slug={product._id}
              data={product}
              />
            ))
            } 
          </Grid> : <div><h3>loadding....</h3></div>}
        </SectionBody>
      </Section>
    </Helmet> : <div>loading...</div>
  )
}

export default Product