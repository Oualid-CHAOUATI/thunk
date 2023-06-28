import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiSliceActions } from "../../redux-store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCart = () => dispatch(uiSliceActions.toggleShowCart());
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
