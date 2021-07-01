import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Row } from 'react-bootstrap';
import HeaderBar from './HeaderBar';
import SupermarketCard from './SupermarketCard';
import ItemCard from './ItemCard';
import {makeApiCall} from './api_call';

const App = () => {

  const [content, setContent] = useState(undefined);
  const [newcontent, setNewcontent] = useState(undefined);

  async function handleClick(store) {
    setNewcontent(undefined);
    var cold_storage_items = ["peanuts", "waitrose mozarella tomato pesto pizza", "waitrose spinach and goat cheese pizza", "waitrose madagascar vanilla ice cream", "waitrose cannellini beans", "waitrose chickpeas in water", "waitrose essential balsamic vinegar", "ozganics indian tikka masala sauce", "ozganics sweet chilli sauce", "ozganics creamy avocado dressing"]
    var fair_price_items = [
      "naturel olive oil pure", 
      "borges olive oil pure",
      "borges olive oil extra virgin",
      "barilla pasta",
      "barilla gluten free pasta",
      "barilla bio organic pasta",
      "pomi strained tomatoes",
      "leggos pasta sauce",
      "tesco finest pasta sauce",
      "tesco taco mixed beans",
      "tesco paprika",
      "tesco mild curry powder",
      "tesco smoked paprika",
      "tesco dried coriander",
      "tesco muesli swiss style",
      "tesco chickpeas in water",
      "fairprice basmati rice",
      "mayvers all natural spread almond",
      "naked organic almond butter",
      "natures wonder baked almonds",
      "fairprice baked walnuts",
      "fairprice 100 premium raw honey",
      "origins natural raw honey"
  ]
    var all_items = []
    if (store === "coldstorage") {
      all_items = cold_storage_items
    }
    else{
      all_items = fair_price_items
    }
    var all_res = []
    setContent(undefined);
    for (const item in all_items) {
      setNewcontent(all_items[item])
      all_res = await makeApiCall(all_items[item], all_res, store);
      console.log(all_res);
      setContent(all_res);
    }
    setNewcontent("done");
  }

  function returnHome() {
    setContent("home");
  }

  useEffect(async () => {
    const fetchList = async () => {
      setContent("home");
    };
    fetchList();
  }, []);

  let stuff = undefined;
  let more_info = undefined;
  if (content === undefined) {
    stuff = (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center flex-column border rounded p-3 bg-light">
          <Spinner animation="border" />
          <div className="mt-3">Page is loading...</div>
        </div>
      </div>
    );
  } else if (content === "home") {
    const shopNames = [["Fair Price", "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1436334225/p4ucgwxnao0czp2ce1ap.png", "fairprice"], ["Cold Storage", "https://yt3.ggpht.com/ytc/AAUvwnirVQw7soAGlGXHSXBcRf5eAIae_lVAKcPQJ1vB=s900-c-k-c0x00ffffff-no-rj", "coldstorage"]]
    stuff = (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Row xs={1} md={10} className="g-4 d-flex justify-content-center">
    {shopNames.map((item) => <SupermarketCard name={item[0]} link={item[1]} id={item[2]} handle={handleClick} />)}
    </Row>
      </div>
    )
    } else {
      if (newcontent === "done") {
        more_info = (
          <div className="d-flex align-items-center flex-column border rounded p-3 bg-light">Finished! Here are all your discounts!</div>
        )
      }
      else {
        more_info = (
          <div className="d-flex align-items-center flex-column border rounded p-3 bg-light">
            <Spinner animation="border" />
            <div className="mt-3">I'm still looking for discounts on {newcontent}!</div>
          </div>
        )
      }
   
      stuff = (
      <div className="w-100 h-100 ">
      {more_info}
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Row xs={1} md={10} className="g-4 d-flex justify-content-center">
          {content.map((item) => <ItemCard name={item["name"]} discount={item["discount"]} cur_price={item["cur_price"]} category={item["category"]} src={item["src"]} />)}
      </Row>
        </div>
        </div>
      )
    } 
  return (
    <div className="d-flex flex-column w-100 h-100">
      <HeaderBar goHome={returnHome} handle={handleClick}/>
      <div className="d-flex flex-grow-1">
        {stuff}
      </div>
    </div>
  )
}

export default App;