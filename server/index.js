const express = require("express"); //express framework to build the end points and APIs
const cors = require("cors"); //prevent cross-origin requests without authorization
const needle = require("needle"); //lightweight HTTP client to retrieve data (e.g. Axios)
require("dotenv").config(); //load enviromental variables

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

//coins/markets
app.get("/api/markets", async (req, res) => {
  needle("get", process.env.MARKETS_API_URL)
    .then((res1) => {
      let data = res1.body;
      //console.log(data[99]);

      //pagination fetch with limit = 5
      data = data.slice((req.query.page - 1) * 5, (req.query.page - 1) * 5 + 5);

      //keep only wanted rows
      let newData = [];

      data.map((index) => {
        newData.push({
          id: index.id,
          name: index.name,
          image: index.image,
          symbol: index.symbol,
          current_price: index.current_price,
          high_24h: index.high_24h,
          low_24h: index.low_24h,
          price_change_percentage_24h: index.price_change_percentage_24h,
        });
      });

      //success message to end point with the data
      res.status(200).json(newData);
    })
    .catch((err) => {
      console.error(err);
    });
});

//coins/id
app.get("/api/:id", (req, res) => {
  const coinId = req.params.id.toLowerCase();
  needle("get", `${process.env.API_URL}/${coinId}`)
    .then((res1) => {
      let data = res1.body;

      //keep only wanted rows
      let newData = {
        current_price: data.market_data.current_price.usd,
        name: data.name,
        image: data.image,
        description: data.description.en,
        price_change_24h: data.market_data.price_change_24h,
        price_change_7d: data.market_data.price_change_percentage_7d,
        price_change_14d: data.market_data.price_change_percentage_14d,
        price_change_1m: data.market_data.price_change_percentage_30d,
        price_change_2m: data.market_data.price_change_percentage_60d,
        price_change_200d: data.market_data.price_change_percentage_200d,
        price_change_1y: data.market_data.price_change_percentage_1y,
        high_24h: data.market_data.high_24h.usd,
        low_24h: data.market_data.low_24h.usd,
      };

      res.status(200).json(newData);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
