import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const data = [
  {
    id: 1,
    title: "iPhone 12 Pro",
    price: 999,
    description:
      "The iPhone 12 Pro features a stunning Super Retina XDR display, A14 Bionic chip, and advanced photography capabilities.",
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    price: 899,
    description:
      "The Samsung Galaxy S21 comes with a powerful Exynos 2100 processor, Dynamic AMOLED 2X display, and a versatile triple camera system.",
  },
  {
    id: 3,
    title: "Google Pixel 6",
    price: 799,
    description:
      "The Google Pixel 6 boasts an impressive camera with advanced computational photography, a smooth 90Hz display, and the latest Android updates.",
  },
  {
    id: 4,
    title: "MacBook Pro 16-inch",
    price: 2399,
    description:
      "The MacBook Pro 16-inch offers a stunning Retina display, powerful Intel Core processor, and a redesigned Magic Keyboard for enhanced productivity.",
  },
  {
    id: 5,
    title: "Dell XPS 13",
    price: 1299,
    description:
      "The Dell XPS 13 is a compact and powerful laptop with a gorgeous InfinityEdge display, fast performance, and excellent battery life.",
  },
  {
    id: 6,
    title: "Sony PlayStation 5",
    price: 499,
    description:
      "The Sony PlayStation 5 delivers immersive gaming experiences with its powerful hardware, ultra-fast SSD, and advanced DualSense controller.",
  },
  {
    id: 7,
    title: "Samsung QLED 4K TV",
    price: 1499,
    description:
      "The Samsung QLED 4K TV offers a stunning display with vibrant colors, deep blacks, and impressive HDR capabilities for an immersive viewing experience.",
  },
  {
    id: 8,
    title: "Bose QuietComfort 35 II",
    price: 299,
    description:
      "The Bose QuietComfort 35 II is a premium wireless noise-canceling headphone that provides excellent sound quality and all-day comfort.",
  },
  {
    id: 9,
    title: "Canon EOS R5",
    price: 3799,
    description:
      "The Canon EOS R5 is a high-end mirrorless camera with a 45-megapixel full-frame sensor, 8K video recording, and advanced autofocus capabilities.",
  },
  {
    id: 10,
    title: "Fitbit Versa 3",
    price: 229,
    description:
      "The Fitbit Versa 3 is a feature-packed smartwatch with built-in GPS, heart rate monitoring, sleep tracking, and a variety of exercise modes.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {data.map(({ title, price, description, id }) => (
          <ProductItem {...{ title, price, description, key: id, id }} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
