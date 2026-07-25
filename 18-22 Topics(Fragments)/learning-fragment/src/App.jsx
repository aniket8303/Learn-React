import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import Container from "./components/Container";
import FoodInput from "./components/FoodInput";
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
      <Container>
        <h1 className="food-heading">Healthy Foods</h1>
        {/* {emptyMessage} */}
        <ErrorMessage items={foodItems}></ErrorMessage>
        <FoodInput></FoodInput>
        <FoodItems items={foodItems}></FoodItems>
      </Container>

      <Container>
        <p>
          Above is the list of healthy foods that are good for your health and
          well being.
        </p>
      </Container>
    </>
  );
}

export default App;
