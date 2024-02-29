import { Fragment, useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
// ========================================================

const ProductList1 = ({ products , sort}) => {
  const [countPage, setCountPage] = useState(1)
  const [page, setPage] = useState(1)
  const [productData, setProductData] = useState(products.slice(0,9))
  useEffect(() => {
    if(products.length > 9){
      var intNumber = parseInt(products.length/9);
      var decNumber = products.length/9;
      if(intNumber < decNumber){
        setCountPage(intNumber + 1)
      }else if (intNumber == decNumber){
        setCountPage(intNumber)
      }
    }
  }, []);

  useEffect(() => {
    console.log(products,"22222222222222222222")

    for(let i =1; i <= countPage; i++){
      if(page == 1){
        setProductData(products.slice(0, 9))
      }
      if(page == i && page > 1){
        setProductData(products.slice((i * 9) -9, i * 9))
      }
    }
  }, [page]);
  useEffect(() => {
    console.log(products,"11111111111111111111")
    setPage(1)
    for(let i =1; i <= countPage; i++){
      if(page == 1){
        setProductData(products.slice(0, 9))
      }
      if(page == i && page > 1){
        setProductData(products.slice((i * 9) -9, i * 9))
      }
    }
  }, [sort]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Fragment>
      <Grid container spacing={3}>
        {productData.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of {products.length} Products</Span>
        <Pagination count={countPage} variant="outlined" color="primary" page={page} onChange={handleChange}/>
      </FlexBetween>
    </Fragment>
  );
};
export default ProductList1;
