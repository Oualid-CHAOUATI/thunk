import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, useState } from "react";
import {
  NOTIFICATION_STATUS,
  Notification,
} from "./components/UI/notification/notification";
import {
  getDataFromFirebase,
  sendDataToFirebase,
} from "./redux-store/cart-slice";
let appJustRunned = true;
let didntGotData = true;
function App() {
  const [notificationIsVisible, setNotificationIsVisible] = useState(true);
  const isShawCart = useSelector((state) => state.ui.isShowCart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  // useEffect(() => {
  //   // si on a pas la data .. on fetch  et altérer le state => reexécution
  //   // 2 eme execution  ... appJustrunned=true => on le met à false et ça s'arrete là
  //   // si la carte est altérer par l'utilisateur => appjustedrunned==false cette fois-ci ( parceque on l'a deja modifié) .. donc sendData s'exécutera

  //   if (didntGotData) {
  //     dispatch(getDataFromFirebase());
  //     didntGotData = false;
  //   } else if (appJustRunned) {
  //     appJustRunned = false;
  //   } else {
  //     dispatch(sendDataToFirebase(cart));
  //     appJustRunned = false;
  //   }
  // }, [cart]);
  //pas besoins de rajouter dispatch au dépendences
  // !this approach is a lot better

  useEffect(() => {
    dispatch(getDataFromFirebase());
  }, []);
  useEffect(() => {
    if (cart.isChanged) {
      dispatch(sendDataToFirebase(cart));
      setNotificationIsVisible(true);
    }
  }, [cart]);
  const hideNotification = () => setNotificationIsVisible(false);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          visible={notificationIsVisible}
          hideNotification={hideNotification}
        />
      )}
      <Layout>
        {isShawCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
