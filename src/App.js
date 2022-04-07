import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData(){
     
      const cartResponse = await axios.get("https://624d2702d71863d7a8141512.mockapi.io/carts")
      const favoritesResponse = await axios.get("https://624d2702d71863d7a8141512.mockapi.io/favorite")
      const itemsResponse = await axios.get("https://624d2702d71863d7a8141512.mockapi.io/items")
      
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData()

  }, []);

  const onAddToCart = (obj) => {
    // try {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://624d2702d71863d7a8141512.mockapi.io/carts/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://624d2702d71863d7a8141512.mockapi.io/carts", obj);
      setCartItems((prev) => [...prev, obj]);
    }

    //   {
    //   axios.post("https://624d2702d71863d7a8141512.mockapi.io/carts", obj);
    //   setCartItems((prev) => [...prev, obj]);
    // }catch (error){

    // }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://624d2702d71863d7a8141512.mockapi.io/carts/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://624d2702d71863d7a8141512.mockapi.io/favorite/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://624d2702d71863d7a8141512.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
