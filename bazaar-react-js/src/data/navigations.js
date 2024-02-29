import BabyBoy from "components/icons/BabyBoy";
import BabyGirl from "components/icons/BabyGirl";
import Car from "components/icons/Car";
import Dress from "components/icons/Dress";
import Food from "components/icons/Food";
import Gift from "components/icons/Gift";
import Laptop from "components/icons/Laptop";
import MakeUp from "components/icons/MakeUp";
import Man from "components/icons/Man";
import Microphone from "components/icons/Microphone";
import MotorBike from "components/icons/MotorBike";
import Pets from "components/icons/Pets";
import PlantPot from "components/icons/PlantPot";
import TeddyBear from "components/icons/TeddyBear";
import Woman from "components/icons/Woman";
const navigations = [
  {
    icon: Dress,
    title: "Woman Clothes",
    href: "/fashion",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Woman Clothes",
          href: "/product/search/police-gray-eyeglasses",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        }
      ],
      rightImage: {
        imgUrl: "/assets/images/promotion/offer-1.png",
        href: "/sale-page-1",
      },
    },
  },
  {
    icon: Dress,
    title: "Man Clothes",
    href: "/fashion",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Man Clothes",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/groceries",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/baby-toys",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        }
      ]
    },
  }
];
export default navigations;
