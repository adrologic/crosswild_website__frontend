import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
    {
    id: 5,
    title: "Products",
    newTab: false,
    submenu: [
      {
        id: 50,
        title: "All Products",
        path: "/products",
        newTab: false,
      },
      {
        id: 51,
        title: "T-Shirts",
        path: "/products?category=tshirts",
        newTab: false,
      },
      {
        id: 52,
        title: "Bags",
        path: "/products?category=bags",
        newTab: false,
      },
      {
        id: 53,
        title: "Caps",
        path: "/products?category=caps",
        newTab: false,
      },
      {
        id: 54,
        title: "Sweatshirts & Hoodies",
        path: "/products?category=sweatshirts",
        newTab: false,
      },
      {
        id: 55,
        title: "Lower & Shorts",
        path: "/products?category=lowers",
        newTab: false,
      },
      {
        id: 56,
        title: "School & Office Uniform",
        path: "/products?category=uniforms",
        newTab: false,
      },
      {
        id: 57,
        title: "Printing & Embroidery",
        path: "/products?category=printing",
        newTab: false,
      },
      {
        id: 58,
        title: "Apron",
        path: "/products?category=apron",
        newTab: false,
      },
      {
        id: 59,
        title: "Chef Coat",
        path: "/products?category=chef-coat",
        newTab: false,
      },
      {
        id: 60,
        title: "Raincoats",
        path: "/products?category=raincoats",
        newTab: false,
      },
    ],
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 22,
    title: "Our Process",
    path: "/our_process",
    newTab: false,
  },

  {
    id: 33,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 13,
    title: "Gallery",
    path: "/image-gallery",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "/contact",
    newTab: false,
  },

  // {
  //   id: 4,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 41,
  //       title: "About Page",
  //       path: "/about",
  //       newTab: false,
  //     },
  //     {
  //       id: 42,
  //       title: "Contact Page",
  //       path: "/contact",
  //       newTab: false,
  //     },
  //     {
  //       id: 43,
  //       title: "Blog Grid Page",
  //       path: "/blog",
  //       newTab: false,
  //     },
  //     {
  //       id: 44,
  //       title: "Blog Sidebar Page",
  //       path: "/blog-sidebar",
  //       newTab: false,
  //     },
  //     {
  //       id: 45,
  //       title: "Blog Details Page",
  //       path: "/blog-details",
  //       newTab: false,
  //     },
  //     {
  //       id: 46,
  //       title: "Sign In Page",
  //       path: "/signin",
  //       newTab: false,
  //     },
  //     {
  //       id: 47,
  //       title: "Sign Up Page",
  //       path: "/signup",
  //       newTab: false,
  //     },
  //     {
  //       id: 48,
  //       title: "Error Page",
  //       path: "/error",
  //       newTab: false,
  //     },
  //   ],
  // },
];
export default menuData;
