import React from "react";
import axios from "axios";

import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorite, setFavorite] = React.useState([]);
  const [serchValue, setSerchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch("https://624d2702d71863d7a8141512.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    axios
      .get("https://624d2702d71863d7a8141512.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://624d2702d71863d7a8141512.mockapi.io/carts")
      .then((res) => setCartItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://624d2702d71863d7a8141512.mockapi.io/carts", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onAddToFavorite = (obj) => {
    axios.post("https://624d2702d71863d7a8141512.mockapi.io/favorite", obj);
    setFavorite((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://624d2702d71863d7a8141512.mockapi.io/carts/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSerchValue(e.target.value);
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
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {serchValue ? `Поиск по запросу: "${serchValue}"` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {serchValue && (
              <img
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={() => setSerchValue("")}
              />
            )}
            <input
              placeholder="Поиск..."
              value={serchValue}
              onChange={onChangeSearchInput}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.name.toLowerCase().includes(serchValue))
            .map((item, index) => (
              <Card
                key={index}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
