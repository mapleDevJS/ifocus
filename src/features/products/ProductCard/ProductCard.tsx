import { Product } from "../productsSlice";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, description, price, category, image } = product;
  return (
    <article>
      <img alt={title} src={image} width="80" height="80" />
      <h3>{title}</h3>
      <span>{category}</span>
      <p>{description}</p>
      <span>{price} $</span>
    </article>
  );
};
