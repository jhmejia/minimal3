---
layout: post
title: Correlation in the Crypto Market
category: learning
---

### What is this post about?

I'm currently listening to the _Life and Work Principles_ by Ray Dalio - the famous Bridgewater hedge fund manager & founder. In it he briefly touches upon the successes of his investment strategies, out of which one was focused on investing into uncorrelated stocks. This got me thinking about the generally high correlation in the cryptocurrency market, so I decided to see if there are any tokens that behave differently from the rest. Hence, here we are and below I quickly recap the code, the findings and the takeaways from this little intelectual exercise.

---
{: data-content="Let's go"}

### Tools and the Game Plan

To get the historical cryptocurrency data I make use of the freely accesible [CoinGecko API](https://www.coingecko.com/en/api) and its [Python3 wrapper](https://github.com/man-c/pycoingecko). The game plan is to look at cryptocurrencies that have been traded for at least 3 years, and construct a portfolio consisting of uncorrelated tokens. Apart from the CoinGecko API, I use the pandas, numpy, matplotlib, seaborn and the datetime packages. The code is quite heavily commented so hopefully the interested reader can comprehend all the steps just by reading through it.


```python
# Imports
#--------
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sb
import datetime as dt

#---------------
# CoingGecko API
#---------------
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()
```


```python
# Current data for top 500 coins by Market Cap - 100 coins per page
#------------------------------------------------------------------
coins = pd.DataFrame(cg.get_coins_markets(vs_currency = 'usd'))
for page in range(2,6):
    coins = pd.concat([coins, pd.DataFrame(cg.get_coins_markets(vs_currency = 'usd', page = page))])

coins = coins.reset_index(drop = True)
coins
```




<div style="overflow-x: auto">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>symbol</th>
      <th>name</th>
      <th>image</th>
      <th>current_price</th>
      <th>market_cap</th>
      <th>market_cap_rank</th>
      <th>fully_diluted_valuation</th>
      <th>total_volume</th>
      <th>high_24h</th>
      <th>...</th>
      <th>total_supply</th>
      <th>max_supply</th>
      <th>ath</th>
      <th>ath_change_percentage</th>
      <th>ath_date</th>
      <th>atl</th>
      <th>atl_change_percentage</th>
      <th>atl_date</th>
      <th>roi</th>
      <th>last_updated</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>bitcoin</td>
      <td>btc</td>
      <td>Bitcoin</td>
      <td>https://assets.coingecko.com/coins/images/1/la...</td>
      <td>37978.000000</td>
      <td>723476227588</td>
      <td>1</td>
      <td>7.984846e+11</td>
      <td>2.291839e+10</td>
      <td>38747.000000</td>
      <td>...</td>
      <td>2.100000e+07</td>
      <td>2.100000e+07</td>
      <td>69045.000000</td>
      <td>-44.91950</td>
      <td>2021-11-10T14:24:11.849Z</td>
      <td>67.810000</td>
      <td>55984.30690</td>
      <td>2013-07-06T00:00:00.000Z</td>
      <td>None</td>
      <td>2022-05-01T07:56:55.013Z</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ethereum</td>
      <td>eth</td>
      <td>Ethereum</td>
      <td>https://assets.coingecko.com/coins/images/279/...</td>
      <td>2773.960000</td>
      <td>334692571096</td>
      <td>2</td>
      <td>NaN</td>
      <td>1.430243e+10</td>
      <td>2838.580000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4878.260000</td>
      <td>-43.05475</td>
      <td>2021-11-10T14:24:19.604Z</td>
      <td>0.432979</td>
      <td>641487.36811</td>
      <td>2015-10-20T00:00:00.000Z</td>
      <td>{'times': 96.5436231164556, 'currency': 'btc',...</td>
      <td>2022-05-01T07:55:34.686Z</td>
    </tr>
    <tr>
      <th>2</th>
      <td>tether</td>
      <td>usdt</td>
      <td>Tether</td>
      <td>https://assets.coingecko.com/coins/images/325/...</td>
      <td>1.000000</td>
      <td>83223328899</td>
      <td>3</td>
      <td>NaN</td>
      <td>5.450827e+10</td>
      <td>1.008000</td>
      <td>...</td>
      <td>8.315288e+10</td>
      <td>NaN</td>
      <td>1.320000</td>
      <td>-24.33295</td>
      <td>2018-07-24T00:00:00.000Z</td>
      <td>0.572521</td>
      <td>74.86646</td>
      <td>2015-03-02T00:00:00.000Z</td>
      <td>None</td>
      <td>2022-05-01T07:56:39.281Z</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binancecoin</td>
      <td>bnb</td>
      <td>BNB</td>
      <td>https://assets.coingecko.com/coins/images/825/...</td>
      <td>383.420000</td>
      <td>64449760501</td>
      <td>4</td>
      <td>6.444976e+10</td>
      <td>1.641067e+09</td>
      <td>399.140000</td>
      <td>...</td>
      <td>1.681370e+08</td>
      <td>1.681370e+08</td>
      <td>686.310000</td>
      <td>-44.11107</td>
      <td>2021-05-10T07:24:17.097Z</td>
      <td>0.039818</td>
      <td>963213.88135</td>
      <td>2017-10-19T00:00:00.000Z</td>
      <td>None</td>
      <td>2022-05-01T07:55:51.903Z</td>
    </tr>
    <tr>
      <th>4</th>
      <td>usd-coin</td>
      <td>usdc</td>
      <td>USD Coin</td>
      <td>https://assets.coingecko.com/coins/images/6319...</td>
      <td>0.997881</td>
      <td>49148736774</td>
      <td>5</td>
      <td>NaN</td>
      <td>4.843504e+09</td>
      <td>1.008000</td>
      <td>...</td>
      <td>4.925730e+10</td>
      <td>NaN</td>
      <td>1.170000</td>
      <td>-14.83687</td>
      <td>2019-05-08T00:40:28.300Z</td>
      <td>0.891848</td>
      <td>11.98245</td>
      <td>2021-05-19T13:14:05.611Z</td>
      <td>None</td>
      <td>2022-05-01T07:56:16.585Z</td>
    </tr>
  </tbody>
</table>
<p>500 rows × 26 columns</p>
</div>




```python
# Keeping only coins with 3+ year history on the market
#------------------------------------------------------
from datetime import datetime, timezone
#--------------------------------------
jan19 = datetime.strptime('2019-01-01 00:00:00', '%Y-%m-%d %H:%M:%S')    # 1st Jan 2019
jan19 = dt.replace(tzinfo=timezone.utc).isoformat()                      # formatting like in the API

coins["atl_date"] = pd.to_datetime(coins["atl_date"])                    # changing type to datetime
coins = coins.loc[coins["atl_date"] < jan19]                             # keeping only coins older than 3 years
coins = coins.reset_index(drop = True)
coins.head(6)
```




<div style="overflow-x: auto">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>symbol</th>
      <th>name</th>
      <th>image</th>
      <th>current_price</th>
      <th>market_cap</th>
      <th>market_cap_rank</th>
      <th>fully_diluted_valuation</th>
      <th>total_volume</th>
      <th>high_24h</th>
      <th>...</th>
      <th>total_supply</th>
      <th>max_supply</th>
      <th>ath</th>
      <th>ath_change_percentage</th>
      <th>ath_date</th>
      <th>atl</th>
      <th>atl_change_percentage</th>
      <th>atl_date</th>
      <th>roi</th>
      <th>last_updated</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>bitcoin</td>
      <td>btc</td>
      <td>Bitcoin</td>
      <td>https://assets.coingecko.com/coins/images/1/la...</td>
      <td>38357.000000</td>
      <td>730178553834</td>
      <td>1</td>
      <td>8.059056e+11</td>
      <td>2.004939e+10</td>
      <td>38801.000000</td>
      <td>...</td>
      <td>2.100000e+07</td>
      <td>2.100000e+07</td>
      <td>69045.000000</td>
      <td>-44.45523</td>
      <td>2021-11-10T14:24:11.849Z</td>
      <td>67.810000</td>
      <td>56457.03434</td>
      <td>2013-07-06 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:40.062Z</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ethereum</td>
      <td>eth</td>
      <td>Ethereum</td>
      <td>https://assets.coingecko.com/coins/images/279/...</td>
      <td>2793.330000</td>
      <td>336986058000</td>
      <td>2</td>
      <td>NaN</td>
      <td>1.253951e+10</td>
      <td>2841.350000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4878.260000</td>
      <td>-42.75991</td>
      <td>2021-11-10T14:24:19.604Z</td>
      <td>0.432979</td>
      <td>644809.25105</td>
      <td>2015-10-20 00:00:00+00:00</td>
      <td>{'times': 96.33730439594328, 'currency': 'btc'...</td>
      <td>2022-04-30T18:12:48.747Z</td>
    </tr>
    <tr>
      <th>2</th>
      <td>tether</td>
      <td>usdt</td>
      <td>Tether</td>
      <td>https://assets.coingecko.com/coins/images/325/...</td>
      <td>1.001000</td>
      <td>83254158899</td>
      <td>3</td>
      <td>NaN</td>
      <td>4.428167e+10</td>
      <td>1.002000</td>
      <td>...</td>
      <td>8.315288e+10</td>
      <td>NaN</td>
      <td>1.320000</td>
      <td>-24.30444</td>
      <td>2018-07-24T00:00:00.000Z</td>
      <td>0.572521</td>
      <td>74.93234</td>
      <td>2015-03-02 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:12:11.563Z</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binancecoin</td>
      <td>bnb</td>
      <td>BNB</td>
      <td>https://assets.coingecko.com/coins/images/825/...</td>
      <td>390.840000</td>
      <td>65826723112</td>
      <td>4</td>
      <td>6.582672e+10</td>
      <td>1.150386e+09</td>
      <td>399.800000</td>
      <td>...</td>
      <td>1.681370e+08</td>
      <td>1.681370e+08</td>
      <td>686.310000</td>
      <td>-43.06657</td>
      <td>2021-05-10T07:24:17.097Z</td>
      <td>0.039818</td>
      <td>981217.09381</td>
      <td>2017-10-19 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:11.273Z</td>
    </tr>
    <tr>
      <th>4</th>
      <td>ripple</td>
      <td>xrp</td>
      <td>XRP</td>
      <td>https://assets.coingecko.com/coins/images/44/l...</td>
      <td>0.610433</td>
      <td>29353852829</td>
      <td>7</td>
      <td>6.102008e+10</td>
      <td>2.304907e+09</td>
      <td>0.628349</td>
      <td>...</td>
      <td>1.000000e+11</td>
      <td>1.000000e+11</td>
      <td>3.400000</td>
      <td>-82.13775</td>
      <td>2018-01-07T00:00:00.000Z</td>
      <td>0.002686</td>
      <td>22498.40152</td>
      <td>2014-05-22 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:46.614Z</td>
    </tr>
    <tr>
      <th>5</th>
      <td>dogecoin</td>
      <td>doge</td>
      <td>Dogecoin</td>
      <td>https://assets.coingecko.com/coins/images/5/la...</td>
      <td>0.131988</td>
      <td>17501590218</td>
      <td>12</td>
      <td>NaN</td>
      <td>8.279380e+08</td>
      <td>0.137505</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.731578</td>
      <td>-81.97014</td>
      <td>2021-05-08T05:08:23.458Z</td>
      <td>0.000087</td>
      <td>151679.95328</td>
      <td>2015-05-06 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:24.449Z</td>
    </tr>
    <tr>
      <th>6</th>
      <td>litecoin</td>
      <td>ltc</td>
      <td>Litecoin</td>
      <td>https://assets.coingecko.com/coins/images/2/la...</td>
      <td>99.170000</td>
      <td>6971161593</td>
      <td>22</td>
      <td>8.343390e+09</td>
      <td>5.248294e+08</td>
      <td>101.510000</td>
      <td>...</td>
      <td>8.400000e+07</td>
      <td>8.400000e+07</td>
      <td>410.260000</td>
      <td>-75.78326</td>
      <td>2021-05-10T03:13:07.904Z</td>
      <td>1.150000</td>
      <td>8547.97098</td>
      <td>2015-01-14 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:31.331Z</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
  </tbody>
</table>
<p>48 rows × 26 columns</p>
</div>



In the next step I first create the `price_history` dataframe using the historical prices of bitcoin after which I itterativelly populate it with new columns corresponding to all the other coins. I use the time index returned by the API to match the correct rows and set all other rows to `NaN`.


```python
# Historical Price Data for up to 2000 days before 30/04/2022
#------------------------------------------------------------
coin_ids = coins['id']
bitcoin = cg.get_coin_market_chart_by_id(id = 'bitcoin', days = '2000', vs_currency = 'usd')["prices"]
price_history = pd.DataFrame(bitcoin, columns = ["index", "bitcoin"])

for coin_id in coin_ids[1:]:
    coin = cg.get_coin_market_chart_by_id(id = coin_id, days = '2000', vs_currency = 'usd')["prices"]
    coin = pd.DataFrame(coin, columns = ["index", coin_id])
    price_history = price_history.join(coin.set_index("index"), on = "index")
    
price_history
```




<div style="overflow-x: auto">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>index</th>
      <th>bitcoin</th>
      <th>ethereum</th>
      <th>tether</th>
      <th>binancecoin</th>
      <th>ripple</th>
      <th>dogecoin</th>
      <th>litecoin</th>
      <th>tron</th>
      <th>bitcoin-cash</th>
      <th>...</th>
      <th>steem</th>
      <th>numeraire</th>
      <th>verge</th>
      <th>ark</th>
      <th>asd</th>
      <th>aragon</th>
      <th>stratis</th>
      <th>maidsafecoin</th>
      <th>iexec-rlc</th>
      <th>augur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1478563200000</td>
      <td>708.940000</td>
      <td>10.890106</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>0.008239</td>
      <td>0.000228</td>
      <td>3.838584</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>0.133704</td>
      <td>NaN</td>
      <td>0.000021</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.069805</td>
      <td>0.079964</td>
      <td>NaN</td>
      <td>4.790000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1478649600000</td>
      <td>721.177500</td>
      <td>10.664918</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>0.008087</td>
      <td>0.000229</td>
      <td>3.849884</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>0.148576</td>
      <td>NaN</td>
      <td>0.000022</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.064342</td>
      <td>0.077728</td>
      <td>NaN</td>
      <td>4.450000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1478736000000</td>
      <td>713.214143</td>
      <td>10.519281</td>
      <td>0.999997</td>
      <td>NaN</td>
      <td>0.008137</td>
      <td>0.000230</td>
      <td>3.812256</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>0.153180</td>
      <td>NaN</td>
      <td>0.000021</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.069549</td>
      <td>0.076865</td>
      <td>NaN</td>
      <td>4.900000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1478822400000</td>
      <td>715.642500</td>
      <td>10.293087</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>0.008062</td>
      <td>0.000226</td>
      <td>3.817239</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>0.127085</td>
      <td>NaN</td>
      <td>0.000021</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.087305</td>
      <td>0.076074</td>
      <td>NaN</td>
      <td>4.840000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1478908800000</td>
      <td>703.760000</td>
      <td>9.664325</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>0.008047</td>
      <td>0.000223</td>
      <td>3.754012</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>0.122182</td>
      <td>NaN</td>
      <td>0.000021</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.086133</td>
      <td>0.076165</td>
      <td>NaN</td>
      <td>4.850000</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1996</th>
      <td>1651017600000</td>
      <td>38134.215451</td>
      <td>2806.748836</td>
      <td>1.000501</td>
      <td>385.027613</td>
      <td>0.642326</td>
      <td>0.138032</td>
      <td>98.472060</td>
      <td>0.061942</td>
      <td>296.100585</td>
      <td>...</td>
      <td>0.439145</td>
      <td>25.476484</td>
      <td>0.009321</td>
      <td>0.922246</td>
      <td>0.198598</td>
      <td>3.725051</td>
      <td>0.984225</td>
      <td>0.276582</td>
      <td>1.736587</td>
      <td>12.812804</td>
    </tr>
    <tr>
      <th>1997</th>
      <td>1651104000000</td>
      <td>39237.949317</td>
      <td>2889.592223</td>
      <td>0.999849</td>
      <td>391.285543</td>
      <td>0.652835</td>
      <td>0.140246</td>
      <td>100.514884</td>
      <td>0.063180</td>
      <td>307.473039</td>
      <td>...</td>
      <td>0.546993</td>
      <td>25.110015</td>
      <td>0.009547</td>
      <td>0.943347</td>
      <td>0.198518</td>
      <td>3.859121</td>
      <td>1.013390</td>
      <td>0.283103</td>
      <td>1.784559</td>
      <td>13.165825</td>
    </tr>
    <tr>
      <th>1998</th>
      <td>1651190400000</td>
      <td>39741.766646</td>
      <td>2932.455084</td>
      <td>0.999654</td>
      <td>406.326688</td>
      <td>0.644127</td>
      <td>0.137214</td>
      <td>103.105912</td>
      <td>0.063653</td>
      <td>306.538849</td>
      <td>...</td>
      <td>0.477371</td>
      <td>25.115812</td>
      <td>0.009321</td>
      <td>0.948837</td>
      <td>0.191595</td>
      <td>3.848096</td>
      <td>1.004725</td>
      <td>0.289798</td>
      <td>1.780006</td>
      <td>13.394428</td>
    </tr>
    <tr>
      <th>1999</th>
      <td>1651276800000</td>
      <td>38650.550138</td>
      <td>2817.489882</td>
      <td>1.001222</td>
      <td>392.964375</td>
      <td>0.612456</td>
      <td>0.135080</td>
      <td>100.369428</td>
      <td>0.063630</td>
      <td>294.633053</td>
      <td>...</td>
      <td>0.478391</td>
      <td>23.651649</td>
      <td>0.008742</td>
      <td>0.906787</td>
      <td>0.185225</td>
      <td>3.609127</td>
      <td>0.975365</td>
      <td>0.278096</td>
      <td>1.644444</td>
      <td>12.885204</td>
    </tr>
    <tr>
      <th>2000</th>
      <td>1651342678000</td>
      <td>38326.115966</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>2001 rows × 49 columns</p>
</div>




```python
# Removing stable coins
#----------------------
stable_coins = (price_history.mean() < 1.02) & (price_history.mean() > 0.98)
price_history = price_history.loc[:, ~stable_coins.values]
```

Finally we get to see what we were after. Below the correlation matrix reveals that there indeed are some tokens that seem to behave quite differently from the rest. The white(-er) squares correspond to pairs of cryptocurrencies that are highly uncorrelated, thus useful for diversification of one's crypto portfolio. To further find the actual pairs, in the next code chunk I re-format the correlation matrix into a so-called long format and only look at the pairs of coins that have correlation of less than 0.05 in absolute value.


```python
# Correlation matrix
#-------------------
corr = price_history.iloc[1:, 1:].corr()       # ignore the API's time index column (and row)
sb.heatmap(corr, cmap = 'PuOr', center = 0, annot = False, yticklabels = False, xticklabels = False)
plt.show()
```


    
![png](images\posts\crypto correlation\output_8_0.png)
    



```python
# Create a long format correlation table
#---------------------------------------
corr_long = corr.reset_index().melt(id_vars="index")                                     # transform to long format
corr_long = corr_long.loc[(corr_long["value"] != 1.0).values].reset_index(drop = True)   # drop self-correlations
corr_long["abs_val"] = np.abs(corr_long["value"])                                        # create absolute value column
corr_long = corr_long.sort_values("abs_val")                                             # sort by absolute value
corr_long = corr_long.iloc[::2]                                                          # drop duplicates
corr_long.loc[corr_long["abs_val"] < 0.05]                                               # display uncorrelated tokens
```

<div style="overflow-x: auto">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>coin1</th>
      <th>coin2</th>
      <th>correlation</th>
      <th>abs_val</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2037</th>
      <td>decentraland</td>
      <td>augur</td>
      <td>0.001086</td>
      <td>0.001086</td>
    </tr>
    <tr>
      <th>920</th>
      <td>dash</td>
      <td>enjincoin</td>
      <td>0.001412</td>
      <td>0.001412</td>
    </tr>
    <tr>
      <th>1092</th>
      <td>decentraland</td>
      <td>nem</td>
      <td>0.002478</td>
      <td>0.002478</td>
    </tr>
    <tr>
      <th>630</th>
      <td>bitcoin</td>
      <td>eos</td>
      <td>0.002628</td>
      <td>0.002628</td>
    </tr>
    <tr>
      <th>1229</th>
      <td>eos</td>
      <td>rocket-pool</td>
      <td>0.003400</td>
      <td>0.003400</td>
    </tr>
    <tr>
      <th>367</th>
      <td>bitcoin-cash</td>
      <td>chainlink</td>
      <td>0.004519</td>
      <td>0.004519</td>
    </tr>
    <tr>
      <th>80</th>
      <td>steem</td>
      <td>ethereum</td>
      <td>0.012647</td>
      <td>0.012647</td>
    </tr>
    <tr>
      <th>398</th>
      <td>ark</td>
      <td>chainlink</td>
      <td>0.014588</td>
      <td>0.014588</td>
    </tr>
    <tr>
      <th>1910</th>
      <td>enjincoin</td>
      <td>stratis</td>
      <td>-0.015294</td>
      <td>0.015294</td>
    </tr>
    <tr>
      <th>547</th>
      <td>bitcoin-cash</td>
      <td>decentraland</td>
      <td>-0.015555</td>
      <td>0.015555</td>
    </tr>
    <tr>
      <th>1444</th>
      <td>dogecoin</td>
      <td>lisk</td>
      <td>0.020131</td>
      <td>0.020131</td>
    </tr>
    <tr>
      <th>1460</th>
      <td>enjincoin</td>
      <td>lisk</td>
      <td>-0.020163</td>
      <td>0.020163</td>
    </tr>
    <tr>
      <th>1894</th>
      <td>dogecoin</td>
      <td>stratis</td>
      <td>-0.026796</td>
      <td>0.026796</td>
    </tr>
    <tr>
      <th>647</th>
      <td>quant-network</td>
      <td>eos</td>
      <td>0.027587</td>
      <td>0.027587</td>
    </tr>
    <tr>
      <th>1890</th>
      <td>bitcoin</td>
      <td>stratis</td>
      <td>-0.033122</td>
      <td>0.033122</td>
    </tr>
    <tr>
      <th>103</th>
      <td>eos</td>
      <td>binancecoin</td>
      <td>-0.039213</td>
      <td>0.039213</td>
    </tr>
    <tr>
      <th>1722</th>
      <td>decentraland</td>
      <td>verge</td>
      <td>0.041503</td>
      <td>0.041503</td>
    </tr>
    <tr>
      <th>317</th>
      <td>binancecoin</td>
      <td>bitcoin-cash</td>
      <td>0.041590</td>
      <td>0.041590</td>
    </tr>
    <tr>
      <th>581</th>
      <td>stratis</td>
      <td>decentraland</td>
      <td>-0.042639</td>
      <td>0.042639</td>
    </tr>
    <tr>
      <th>1440</th>
      <td>bitcoin</td>
      <td>lisk</td>
      <td>0.043619</td>
      <td>0.043619</td>
    </tr>
    <tr>
      <th>949</th>
      <td>dogecoin</td>
      <td>dash</td>
      <td>0.043845</td>
      <td>0.043845</td>
    </tr>
    <tr>
      <th>734</th>
      <td>eos</td>
      <td>nexo</td>
      <td>0.044147</td>
      <td>0.044147</td>
    </tr>
    <tr>
      <th>947</th>
      <td>binancecoin</td>
      <td>dash</td>
      <td>-0.047622</td>
      <td>0.047622</td>
    </tr>
    <tr>
      <th>914</th>
      <td>eos</td>
      <td>enjincoin</td>
      <td>-0.047646</td>
      <td>0.047646</td>
    </tr>
    <tr>
      <th>825</th>
      <td>bitcoin-cash-sv</td>
      <td>quant-network</td>
      <td>-0.048451</td>
      <td>0.048451</td>
    </tr>
  </tbody>
</table>
</div>
    

As we can see, there are quite a few pairs of tokens that exhibit correlation of up to 5%. And there are even 6 pairs that have a correlation value of less than 1%. One such pair is Bitcoin and EOS, whose correlation is only $\approx 0.002$. This seems to make EOS a very good candidate to pair with bitcoin in order to achieve a higher degree of diversification. This is just one such pair that I mention though, and by no means I am giving here any sort of investment advice. In fact, I know about investing probably as much as I know about making ketchup. That is, I know what are the ingredients but I am lacking the experience in carrying out the recipe and there is a very high chance my ketchup wouldn't taste very good. So feel free to play around with this code, explore the correlations on your own, and if you come up with some sensible strategy for your crypto investments thanks to it, then I am happy I could help :)

Finally, below I make a quick time series plot of Bitcoin, EOS and Nexo to see for myself the correlatedness/uncorrelatedness of those tokens.


```python
# Create dates for the x-axis
#----------------------------
from datetime import datetime, timedelta
#---------------------------------------

def datetime_range(start = None, end = None, interval = 1):
    span = end - start
    for i in range(0, span.days + 1, interval):
        yield start + timedelta(days = i)
        
today = dt.datetime.today()
start = today - dt.timedelta(days = 2000)
xaxis = list(datetime_range(start, today, 200))
xaxis = [date.strftime("%d/%m/%Y") for date in xaxis]
```


```python
# Plot the price evolution of 
#----------------------------
np.log(price_history["nexo"]).plot(color = "dodgerblue")
np.log(price_history["eos"]).plot(color = "darkorange")
np.log(price_history["bitcoin"]).plot(color = "gold")

import matplotlib.dates as mdates
plt.ylabel("Log Price")
plt.legend(["nexo", "eos", "bitcoin"])
plt.xticks(range(0, 2001, 200), xaxis, rotation = 45)
plt.show()
```


    
![png](images\posts\crypto correlation\output_12_0.png)
    


### Final thoughts 

As with every "little" coding exercise, this one also took longer than expected. But I have learned how to use the CoinGecko API and got the read a bit about the importance of diversifying one's investment portfolio with uncorrelated investments. Moreover, I learned about new crypto tokens I wasn't aware of and found out that not the whole crypto market moves un unison - which I suppose is a nice finding.
