import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  // let foodItems = [];
  // if (foodItems.length === 0) {
  //   return <h3>I am still hungry.</h3>;
  // }

  // let emptyMessage =
  //   foodItems.length === 0 ? <h3>I am still hungry.</h3> : null;

  let foodItems = ["Sabji", "Green Vegetable", "Roti", "Salad", "Milk", "Ghee"];
  return (
    <>
      <h1 className="food-heading">Healthy Foods</h1>
      {/* {emptyMessage} */}
      <ErrorMessage items={foodItems}></ErrorMessage>
      <FoodItems items={foodItems}></FoodItems>
    </>
  );
}

export default App;
