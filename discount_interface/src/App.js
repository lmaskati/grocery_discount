import React, { useState, useEffect } from 'react';
import './App.css';
import Supermarket from './Supermarket';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Row } from 'react-bootstrap';
import HeaderBar from './HeaderBar';
import SupermarketCard from './SupermarketCard';
import ItemCard from './ItemCard';


const App = () => {

  const [content, setContent] = useState(undefined);
  const [newcontent, setNewcontent] = useState(undefined);

  async function handleClick() {
    setNewcontent(undefined);
    var all_items = ["peanuts", "chocolate", "waitrose spinach and goat cheese pizza", "waitrose madagascar vanilla ice cream", "waitrose cannellini beans", "waitrose chickpeas in water", "waitrose essential balsamic vinegar", "ozganics indian tikka masala sauce", "ozganics sweet chilli sauce", "ozganics creamy avocado dressing"]
    var all_res = []
    setContent(undefined);
    //makeApiCall("peanuts", all_res);
    for (const item in all_items) {
      setNewcontent(all_items[item])
      all_res = await makeApiCall(all_items[item], all_res);
    }
    //setContent(undefined);   
    setNewcontent("done");

  }

  function returnHome() {
    setContent("home");
  }

  async function makeApiCall(item, all_res) {
    const fetchList = async () => {
      console.log(item);
      const result = await fetch('https://grocery-sg-flask.herokuapp.com/' + item, {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'GET',
      });
      if (!result.ok) {
        alert("Something went very wrong!");
        return;
      }
      var results = await result.json();
      console.log(results)
      const total_results = all_res.concat(results);
      console.log(total_results);
      setContent(total_results);
      return total_results
      
    };
    return fetchList();

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
    const shopNames = [["Fair Price", "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1436334225/p4ucgwxnao0czp2ce1ap.png"], ["Cold Storage", "https://yt3.ggpht.com/ytc/AAUvwnirVQw7soAGlGXHSXBcRf5eAIae_lVAKcPQJ1vB=s900-c-k-c0x00ffffff-no-rj"]]
    stuff = (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
       
        <Row xs={1} md={10} className="g-4 d-flex justify-content-center">
    {shopNames.map((item) => <SupermarketCard name={item[0]} link={item[1]} handle={handleClick} />)}
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
          {content.map((item) => <ItemCard name={item["name"]} discount={item["discount"]} old_price={item["old_price"]} src={item["src"]} />)}
      
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