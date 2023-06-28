import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  console.log(items);
  return (
    <div>
      <h2>Total price : {totalPrice}</h2>
      <div>
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            {items.map(({ id, title, description, price, quantity }) => (
              <CartItem
                key={id}
                item={{ id, title, description, price, quantity }}
              />
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
