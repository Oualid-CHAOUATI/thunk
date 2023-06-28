import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../redux-store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, price, id } = props.item;
  const dispatch = useDispatch();
  const addItem = () => dispatch(cartSliceActions.add({ id, price }));
  const removeItem = () => dispatch(cartSliceActions.remove(id));

  const total = price * quantity;
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItem}>-</button>
          <button onClick={addItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
