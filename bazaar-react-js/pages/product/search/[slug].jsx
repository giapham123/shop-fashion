import { useEffect, useCallback, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidenav from "components/Sidenav";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductList1 from "components/products/ProductList1";
import ProductList2 from "components/products/ProductList2";
import ProductFilterCard from "pages-sections/product-details/ProductFilterCard";
import productDatabase from "data/product-database";
import api from "utils/__api__/products";
import apiFashion from "utils/__api__/fashion-shop-2";
import { useRouter } from "next/router";
const ProductSearchResult = (props) => {
  const {  product, title } = props;
  const [view, setView] = useState("grid");
  const [productData, setProductData] = useState(product);
  const [valueSort, setValueSort] = useState();
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const handleChangeForSearch = (event) => {
    const { value } = event.target;
    setValueSort(value);
  };
  useEffect(() => {
    var productSort = []
    if(valueSort == 'Price Low to High'){
      productSort = product.sort(function(a, b) {
        return a.price - b.price;
      });
    }
    else if(valueSort == 'Price High to Low'){
      productSort = product.sort(function(a, b) {
        return b.price - a.price;
      });
    }
    setProductData(productSort)
  }, [valueSort]);
  return (
    <ShopLayout1>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* TOP BAR AREA */}
        <Card
          elevation={1}
          sx={{
            mb: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            <H5>Searching for “ {title} ”</H5>
            <Paragraph color="grey.600">{product.length} results found</Paragraph>
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Short by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={sortOptions[0].value}
                onChange={handleChangeForSearch}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  {/* <ProductFilterCard /> */}
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          {/* <Grid
            item
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid> */}

          {/* PRODUCT VIEW AREA */}
          <Grid item md={12} xs={12}>
            {view === "grid" ? (
              <ProductList1 products={productData} sort={valueSort} />
            ) : (
              <ProductList2 products={productData} sort={valueSort} />
            )}
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};
const sortOptions = [
  {
    label: "Price Low to High",
    value: "Price Low to High",
  },
  {
    label: "Price High to Low",
    value: "Price High to Low",
  },
];

export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export const getStaticProps = async ({ params }) => {
  const product = await apiFashion.getProductsFashion(params.slug);
  return {
    props: {
      product,
      title: params.slug
    },
  };
};
export default ProductSearchResult;
