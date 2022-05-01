---
layout: post
title: Correlation in the Crypto Market
category: learning
---

### What is this post about?

I'm currently listening to the _Life and Work Principles_ by Ray Dalio - the famous Bridgewater hedge fund manager & founder. In it he briefly touches upon the successes of his investment strategies, out of which one was focused on investing into uncorrelated stocks. This got me thinking about the generally high correlation in the cryptocurrency market so I decided to see if there are any tokens that behave differently from the rest. Hence, here we are and below I quickly recap the code, the findings and the takeaways from this quick exercise.

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
      <th>7</th>
      <td>tron</td>
      <td>trx</td>
      <td>TRON</td>
      <td>https://assets.coingecko.com/coins/images/1094...</td>
      <td>0.062217</td>
      <td>6330282978</td>
      <td>24</td>
      <td>NaN</td>
      <td>9.595356e+08</td>
      <td>0.065293</td>
      <td>...</td>
      <td>1.019004e+11</td>
      <td>NaN</td>
      <td>0.231673</td>
      <td>-73.11917</td>
      <td>2018-01-05T00:00:00.000Z</td>
      <td>0.001804</td>
      <td>3351.42885</td>
      <td>2017-11-12 00:00:00+00:00</td>
      <td>{'times': 31.74566190771241, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:41.707Z</td>
    </tr>
    <tr>
      <th>8</th>
      <td>bitcoin-cash</td>
      <td>bch</td>
      <td>Bitcoin Cash</td>
      <td>https://assets.coingecko.com/coins/images/780/...</td>
      <td>286.750000</td>
      <td>5464172203</td>
      <td>26</td>
      <td>6.023244e+09</td>
      <td>2.830750e+08</td>
      <td>297.860000</td>
      <td>...</td>
      <td>2.100000e+07</td>
      <td>2.100000e+07</td>
      <td>3785.820000</td>
      <td>-92.41509</td>
      <td>2017-12-20T00:00:00.000Z</td>
      <td>76.930000</td>
      <td>273.23952</td>
      <td>2018-12-16 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:20.402Z</td>
    </tr>
    <tr>
      <th>9</th>
      <td>chainlink</td>
      <td>link</td>
      <td>Chainlink</td>
      <td>https://assets.coingecko.com/coins/images/877/...</td>
      <td>11.600000</td>
      <td>5421516503</td>
      <td>27</td>
      <td>1.160901e+10</td>
      <td>3.911993e+08</td>
      <td>12.240000</td>
      <td>...</td>
      <td>1.000000e+09</td>
      <td>1.000000e+09</td>
      <td>52.700000</td>
      <td>-78.02884</td>
      <td>2021-05-10T00:13:57.214Z</td>
      <td>0.148183</td>
      <td>7713.33974</td>
      <td>2017-11-29 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:47.214Z</td>
    </tr>
    <tr>
      <th>10</th>
      <td>stellar</td>
      <td>xlm</td>
      <td>Stellar</td>
      <td>https://assets.coingecko.com/coins/images/100/...</td>
      <td>0.177300</td>
      <td>4392345326</td>
      <td>32</td>
      <td>8.861134e+09</td>
      <td>1.824554e+08</td>
      <td>0.181792</td>
      <td>...</td>
      <td>5.000179e+10</td>
      <td>5.000179e+10</td>
      <td>0.875563</td>
      <td>-79.78445</td>
      <td>2018-01-03T00:00:00.000Z</td>
      <td>0.000476</td>
      <td>37075.21594</td>
      <td>2015-03-05 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:52.718Z</td>
    </tr>
    <tr>
      <th>11</th>
      <td>monero</td>
      <td>xmr</td>
      <td>Monero</td>
      <td>https://assets.coingecko.com/coins/images/69/l...</td>
      <td>230.080000</td>
      <td>4150667846</td>
      <td>33</td>
      <td>NaN</td>
      <td>2.083595e+08</td>
      <td>232.740000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>542.330000</td>
      <td>-57.73112</td>
      <td>2018-01-09T00:00:00.000Z</td>
      <td>0.216177</td>
      <td>105940.54553</td>
      <td>2015-01-14 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:52.169Z</td>
    </tr>
    <tr>
      <th>12</th>
      <td>ethereum-classic</td>
      <td>etc</td>
      <td>Ethereum Classic</td>
      <td>https://assets.coingecko.com/coins/images/453/...</td>
      <td>27.970000</td>
      <td>3766049346</td>
      <td>35</td>
      <td>5.903338e+09</td>
      <td>2.728920e+08</td>
      <td>29.640000</td>
      <td>...</td>
      <td>2.107000e+08</td>
      <td>2.107000e+08</td>
      <td>167.090000</td>
      <td>-83.27882</td>
      <td>2021-05-06T18:34:22.133Z</td>
      <td>0.615038</td>
      <td>4442.58942</td>
      <td>2016-07-25 00:00:00+00:00</td>
      <td>{'times': 61.16169553353276, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:08.194Z</td>
    </tr>
    <tr>
      <th>13</th>
      <td>decentraland</td>
      <td>mana</td>
      <td>Decentraland</td>
      <td>https://assets.coingecko.com/coins/images/878/...</td>
      <td>1.560000</td>
      <td>2364269776</td>
      <td>48</td>
      <td>3.424984e+09</td>
      <td>2.326574e+08</td>
      <td>1.700000</td>
      <td>...</td>
      <td>2.193684e+09</td>
      <td>2.193684e+09</td>
      <td>5.850000</td>
      <td>-73.48181</td>
      <td>2021-11-25T10:04:18.534Z</td>
      <td>0.009237</td>
      <td>16697.27198</td>
      <td>2017-10-31 00:00:00+00:00</td>
      <td>{'times': 76.83192769513805, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:21.725Z</td>
    </tr>
    <tr>
      <th>14</th>
      <td>tezos</td>
      <td>xtz</td>
      <td>Tezos</td>
      <td>https://assets.coingecko.com/coins/images/976/...</td>
      <td>2.650000</td>
      <td>2350661134</td>
      <td>49</td>
      <td>NaN</td>
      <td>6.815053e+07</td>
      <td>2.740000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>9.120000</td>
      <td>-70.89995</td>
      <td>2021-10-04T00:41:18.025Z</td>
      <td>0.350476</td>
      <td>656.90751</td>
      <td>2018-12-07 00:00:00+00:00</td>
      <td>{'times': 4.63326422732236, 'currency': 'usd',...</td>
      <td>2022-04-30T18:14:02.836Z</td>
    </tr>
    <tr>
      <th>15</th>
      <td>eos</td>
      <td>eos</td>
      <td>EOS</td>
      <td>https://assets.coingecko.com/coins/images/738/...</td>
      <td>2.150000</td>
      <td>2138343142</td>
      <td>55</td>
      <td>NaN</td>
      <td>3.582189e+08</td>
      <td>2.320000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>22.710000</td>
      <td>-90.54173</td>
      <td>2018-04-29T07:50:33.540Z</td>
      <td>0.502400</td>
      <td>327.56630</td>
      <td>2017-10-23 00:00:00+00:00</td>
      <td>{'times': 1.1718997665136142, 'currency': 'usd...</td>
      <td>2022-04-30T18:14:55.201Z</td>
    </tr>
    <tr>
      <th>16</th>
      <td>bitcoin-cash-sv</td>
      <td>bsv</td>
      <td>Bitcoin SV</td>
      <td>https://assets.coingecko.com/coins/images/6799...</td>
      <td>75.020000</td>
      <td>1428669070</td>
      <td>73</td>
      <td>NaN</td>
      <td>6.103216e+07</td>
      <td>76.950000</td>
      <td>...</td>
      <td>2.100000e+07</td>
      <td>NaN</td>
      <td>489.750000</td>
      <td>-84.69096</td>
      <td>2021-04-16T17:09:04.630Z</td>
      <td>42.020000</td>
      <td>78.44111</td>
      <td>2018-11-23 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:51.053Z</td>
    </tr>
    <tr>
      <th>17</th>
      <td>nexo</td>
      <td>nexo</td>
      <td>NEXO</td>
      <td>https://assets.coingecko.com/coins/images/3695...</td>
      <td>2.540000</td>
      <td>1419684676</td>
      <td>71</td>
      <td>2.535151e+09</td>
      <td>2.440105e+08</td>
      <td>2.950000</td>
      <td>...</td>
      <td>1.000000e+09</td>
      <td>1.000000e+09</td>
      <td>4.070000</td>
      <td>-37.07909</td>
      <td>2021-05-12T14:37:47.535Z</td>
      <td>0.045153</td>
      <td>5568.76528</td>
      <td>2018-09-13 00:00:00+00:00</td>
      <td>{'times': 24.39294127070437, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:47.827Z</td>
    </tr>
    <tr>
      <th>18</th>
      <td>waves</td>
      <td>waves</td>
      <td>Waves</td>
      <td>https://assets.coingecko.com/coins/images/425/...</td>
      <td>13.580000</td>
      <td>1360723850</td>
      <td>76</td>
      <td>NaN</td>
      <td>2.828718e+08</td>
      <td>14.680000</td>
      <td>...</td>
      <td>1.000000e+08</td>
      <td>NaN</td>
      <td>61.300000</td>
      <td>-77.80877</td>
      <td>2022-03-31T14:34:44.545Z</td>
      <td>0.130878</td>
      <td>10294.21286</td>
      <td>2016-08-02 00:00:00+00:00</td>
      <td>{'times': 71.23700012222633, 'currency': 'usd'...</td>
      <td>2022-04-30T18:15:09.492Z</td>
    </tr>
    <tr>
      <th>19</th>
      <td>quant-network</td>
      <td>qnt</td>
      <td>Quant</td>
      <td>https://assets.coingecko.com/coins/images/3370...</td>
      <td>99.950000</td>
      <td>1340820549</td>
      <td>80</td>
      <td>1.460623e+09</td>
      <td>5.728686e+07</td>
      <td>105.670000</td>
      <td>...</td>
      <td>1.461249e+07</td>
      <td>1.461249e+07</td>
      <td>427.420000</td>
      <td>-76.65368</td>
      <td>2021-09-11T09:15:00.668Z</td>
      <td>0.215773</td>
      <td>46146.39573</td>
      <td>2018-08-23 00:00:00+00:00</td>
      <td>{'times': 14.40978483772258, 'currency': 'eth'...</td>
      <td>2022-04-30T18:14:59.318Z</td>
    </tr>
    <tr>
      <th>20</th>
      <td>neo</td>
      <td>neo</td>
      <td>NEO</td>
      <td>https://assets.coingecko.com/coins/images/480/...</td>
      <td>17.960000</td>
      <td>1267571263</td>
      <td>81</td>
      <td>NaN</td>
      <td>9.353006e+07</td>
      <td>18.540000</td>
      <td>...</td>
      <td>1.000000e+08</td>
      <td>NaN</td>
      <td>198.380000</td>
      <td>-90.98412</td>
      <td>2018-01-15T00:00:00.000Z</td>
      <td>0.078349</td>
      <td>22728.28321</td>
      <td>2016-10-21 00:00:00+00:00</td>
      <td>{'times': 497.99663006293, 'currency': 'usd', ...</td>
      <td>2022-04-30T18:13:42.543Z</td>
    </tr>
    <tr>
      <th>21</th>
      <td>enjincoin</td>
      <td>enj</td>
      <td>Enjin Coin</td>
      <td>https://assets.coingecko.com/coins/images/1102...</td>
      <td>1.130000</td>
      <td>1059191887</td>
      <td>89</td>
      <td>1.133625e+09</td>
      <td>1.149922e+08</td>
      <td>1.220000</td>
      <td>...</td>
      <td>1.000000e+09</td>
      <td>1.000000e+09</td>
      <td>4.820000</td>
      <td>-76.58449</td>
      <td>2021-11-25T09:53:41.955Z</td>
      <td>0.018660</td>
      <td>5947.65907</td>
      <td>2017-11-12 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:19.106Z</td>
    </tr>
    <tr>
      <th>22</th>
      <td>dash</td>
      <td>dash</td>
      <td>Dash</td>
      <td>https://assets.coingecko.com/coins/images/19/l...</td>
      <td>91.280000</td>
      <td>979613573</td>
      <td>93</td>
      <td>NaN</td>
      <td>1.145708e+08</td>
      <td>94.550000</td>
      <td>...</td>
      <td>1.892000e+07</td>
      <td>NaN</td>
      <td>1493.590000</td>
      <td>-93.88500</td>
      <td>2017-12-20T00:00:00.000Z</td>
      <td>0.213899</td>
      <td>42599.12718</td>
      <td>2014-02-14 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:15:10.927Z</td>
    </tr>
    <tr>
      <th>23</th>
      <td>basic-attention-token</td>
      <td>bat</td>
      <td>Basic Attention Token</td>
      <td>https://assets.coingecko.com/coins/images/677/...</td>
      <td>0.606483</td>
      <td>911697800</td>
      <td>100</td>
      <td>9.128954e+08</td>
      <td>1.468039e+08</td>
      <td>0.657734</td>
      <td>...</td>
      <td>1.500000e+09</td>
      <td>1.500000e+09</td>
      <td>1.900000</td>
      <td>-68.12676</td>
      <td>2021-11-28T00:23:51.354Z</td>
      <td>0.072394</td>
      <td>736.76875</td>
      <td>2017-07-16 00:00:00+00:00</td>
      <td>{'times': 0.3916487997014714, 'currency': 'eth...</td>
      <td>2022-04-30T18:14:05.620Z</td>
    </tr>
    <tr>
      <th>24</th>
      <td>celsius-degree-token</td>
      <td>cel</td>
      <td>Celsius Network</td>
      <td>https://assets.coingecko.com/coins/images/3263...</td>
      <td>2.000000</td>
      <td>847237636</td>
      <td>105</td>
      <td>NaN</td>
      <td>1.434971e+06</td>
      <td>2.120000</td>
      <td>...</td>
      <td>6.935475e+08</td>
      <td>NaN</td>
      <td>8.050000</td>
      <td>-75.09956</td>
      <td>2021-06-04T00:04:12.584Z</td>
      <td>0.026203</td>
      <td>7547.07581</td>
      <td>2018-12-07 00:00:00+00:00</td>
      <td>{'times': 5.670411590818427, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:30.457Z</td>
    </tr>
    <tr>
      <th>25</th>
      <td>nem</td>
      <td>xem</td>
      <td>NEM</td>
      <td>https://assets.coingecko.com/coins/images/242/...</td>
      <td>0.090018</td>
      <td>812396526</td>
      <td>107</td>
      <td>NaN</td>
      <td>2.134190e+07</td>
      <td>0.091541</td>
      <td>...</td>
      <td>9.000000e+09</td>
      <td>NaN</td>
      <td>1.870000</td>
      <td>-95.16553</td>
      <td>2018-01-07T00:00:00.000Z</td>
      <td>0.000085</td>
      <td>106404.90303</td>
      <td>2015-09-05 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:21.496Z</td>
    </tr>
    <tr>
      <th>26</th>
      <td>decred</td>
      <td>dcr</td>
      <td>Decred</td>
      <td>https://assets.coingecko.com/coins/images/329/...</td>
      <td>57.000000</td>
      <td>797076118</td>
      <td>108</td>
      <td>NaN</td>
      <td>2.573005e+06</td>
      <td>57.770000</td>
      <td>...</td>
      <td>2.100000e+07</td>
      <td>NaN</td>
      <td>247.350000</td>
      <td>-77.01073</td>
      <td>2021-04-17T00:41:14.790Z</td>
      <td>0.431540</td>
      <td>13077.04845</td>
      <td>2016-12-26 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:21.170Z</td>
    </tr>
    <tr>
      <th>27</th>
      <td>link</td>
      <td>ln</td>
      <td>LINK</td>
      <td>https://assets.coingecko.com/coins/images/6450...</td>
      <td>115.440000</td>
      <td>700372693</td>
      <td>113</td>
      <td>NaN</td>
      <td>7.873690e+05</td>
      <td>120.080000</td>
      <td>...</td>
      <td>6.185959e+06</td>
      <td>NaN</td>
      <td>345.880000</td>
      <td>-66.39714</td>
      <td>2021-04-01T22:19:00.034Z</td>
      <td>1.055000</td>
      <td>10916.79915</td>
      <td>2018-12-26 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:03.878Z</td>
    </tr>
    <tr>
      <th>28</th>
      <td>rocket-pool</td>
      <td>rpl</td>
      <td>Rocket Pool</td>
      <td>https://assets.coingecko.com/coins/images/2090...</td>
      <td>30.540000</td>
      <td>495568718</td>
      <td>149</td>
      <td>5.509107e+08</td>
      <td>7.750300e+04</td>
      <td>31.060000</td>
      <td>...</td>
      <td>1.800000e+07</td>
      <td>1.800000e+07</td>
      <td>59.460000</td>
      <td>-48.60303</td>
      <td>2021-11-09T04:03:31.003Z</td>
      <td>0.008847</td>
      <td>345303.78965</td>
      <td>2018-08-28 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:01.062Z</td>
    </tr>
    <tr>
      <th>29</th>
      <td>siacoin</td>
      <td>sc</td>
      <td>Siacoin</td>
      <td>https://assets.coingecko.com/coins/images/289/...</td>
      <td>0.008612</td>
      <td>437363953</td>
      <td>162</td>
      <td>NaN</td>
      <td>1.187137e+07</td>
      <td>0.009186</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.092868</td>
      <td>-90.73300</td>
      <td>2018-01-06T00:00:00.000Z</td>
      <td>0.000013</td>
      <td>68087.08786</td>
      <td>2015-12-28 00:00:00+00:00</td>
      <td>{'times': 0.06888298586737286, 'currency': 'bt...</td>
      <td>2022-04-30T18:13:42.810Z</td>
    </tr>
    <tr>
      <th>30</th>
      <td>golem</td>
      <td>glm</td>
      <td>Golem</td>
      <td>https://assets.coingecko.com/coins/images/542/...</td>
      <td>0.366712</td>
      <td>366569252</td>
      <td>177</td>
      <td>NaN</td>
      <td>1.096161e+07</td>
      <td>0.394096</td>
      <td>...</td>
      <td>1.000000e+09</td>
      <td>NaN</td>
      <td>1.320000</td>
      <td>-72.17934</td>
      <td>2018-04-13T09:13:22.739Z</td>
      <td>0.009138</td>
      <td>3932.05896</td>
      <td>2016-12-12 00:00:00+00:00</td>
      <td>{'times': 35.67116361995103, 'currency': 'usd'...</td>
      <td>2022-04-30T18:13:48.024Z</td>
    </tr>
    <tr>
      <th>31</th>
      <td>digibyte</td>
      <td>dgb</td>
      <td>DigiByte</td>
      <td>https://assets.coingecko.com/coins/images/63/l...</td>
      <td>0.019657</td>
      <td>300545506</td>
      <td>197</td>
      <td>NaN</td>
      <td>1.875424e+07</td>
      <td>0.021065</td>
      <td>...</td>
      <td>2.100000e+10</td>
      <td>NaN</td>
      <td>0.178084</td>
      <td>-89.00570</td>
      <td>2021-05-01T00:19:01.967Z</td>
      <td>0.000031</td>
      <td>63085.72822</td>
      <td>2015-01-14 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:49.468Z</td>
    </tr>
    <tr>
      <th>32</th>
      <td>syscoin</td>
      <td>sys</td>
      <td>Syscoin</td>
      <td>https://assets.coingecko.com/coins/images/119/...</td>
      <td>0.441515</td>
      <td>281180103</td>
      <td>208</td>
      <td>NaN</td>
      <td>1.035836e+07</td>
      <td>0.489656</td>
      <td>...</td>
      <td>8.880000e+08</td>
      <td>NaN</td>
      <td>1.300000</td>
      <td>-66.27904</td>
      <td>2022-01-02T04:08:51.334Z</td>
      <td>0.000210</td>
      <td>209288.27418</td>
      <td>2015-02-22 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:20.312Z</td>
    </tr>
    <tr>
      <th>33</th>
      <td>lisk</td>
      <td>lsk</td>
      <td>Lisk</td>
      <td>https://assets.coingecko.com/coins/images/385/...</td>
      <td>1.870000</td>
      <td>271115236</td>
      <td>215</td>
      <td>NaN</td>
      <td>8.926536e+06</td>
      <td>1.990000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>34.920000</td>
      <td>-94.65280</td>
      <td>2018-01-07T00:00:00.000Z</td>
      <td>0.101672</td>
      <td>1736.74914</td>
      <td>2017-03-01 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:48.603Z</td>
    </tr>
    <tr>
      <th>34</th>
      <td>coinex-token</td>
      <td>cet</td>
      <td>CoinEx Token</td>
      <td>https://assets.coingecko.com/coins/images/4817...</td>
      <td>0.063117</td>
      <td>230267084</td>
      <td>230</td>
      <td>6.300805e+08</td>
      <td>6.112990e+05</td>
      <td>0.063746</td>
      <td>...</td>
      <td>5.868849e+09</td>
      <td>1.000000e+10</td>
      <td>0.150293</td>
      <td>-58.04530</td>
      <td>2018-07-03T22:04:23.838Z</td>
      <td>0.004107</td>
      <td>1435.31751</td>
      <td>2018-12-15 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:12:38.723Z</td>
    </tr>
    <tr>
      <th>35</th>
      <td>nano</td>
      <td>xno</td>
      <td>Nano</td>
      <td>https://assets.coingecko.com/coins/images/756/...</td>
      <td>1.720000</td>
      <td>229424278</td>
      <td>231</td>
      <td>NaN</td>
      <td>3.772413e+06</td>
      <td>1.870000</td>
      <td>...</td>
      <td>1.332483e+08</td>
      <td>NaN</td>
      <td>33.690000</td>
      <td>-94.89268</td>
      <td>2018-01-02T00:00:00.000Z</td>
      <td>0.026179</td>
      <td>6473.38544</td>
      <td>2017-07-16 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:19.139Z</td>
    </tr>
    <tr>
      <th>36</th>
      <td>gemini-dollar</td>
      <td>gusd</td>
      <td>Gemini Dollar</td>
      <td>https://assets.coingecko.com/coins/images/5992...</td>
      <td>1.001000</td>
      <td>213622152</td>
      <td>243</td>
      <td>NaN</td>
      <td>1.431085e+06</td>
      <td>1.005000</td>
      <td>...</td>
      <td>2.133769e+08</td>
      <td>NaN</td>
      <td>3.300000</td>
      <td>-69.73776</td>
      <td>2018-10-11T17:36:21.529Z</td>
      <td>0.782610</td>
      <td>27.75502</td>
      <td>2018-09-29 00:00:00+00:00</td>
      <td>{'times': 0.001069745173998, 'currency': 'usd'...</td>
      <td>2022-04-30T18:13:28.383Z</td>
    </tr>
    <tr>
      <th>37</th>
      <td>ardor</td>
      <td>ardr</td>
      <td>Ardor</td>
      <td>https://assets.coingecko.com/coins/images/525/...</td>
      <td>0.195958</td>
      <td>196293711</td>
      <td>256</td>
      <td>NaN</td>
      <td>3.947693e+06</td>
      <td>0.205440</td>
      <td>...</td>
      <td>9.984662e+08</td>
      <td>NaN</td>
      <td>2.040000</td>
      <td>-90.38443</td>
      <td>2018-01-13T00:00:00.000Z</td>
      <td>0.008745</td>
      <td>2147.01959</td>
      <td>2016-12-06 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:48.233Z</td>
    </tr>
    <tr>
      <th>38</th>
      <td>steem</td>
      <td>steem</td>
      <td>Steem</td>
      <td>https://assets.coingecko.com/coins/images/398/...</td>
      <td>0.430439</td>
      <td>170896578</td>
      <td>285</td>
      <td>NaN</td>
      <td>4.972559e+07</td>
      <td>0.487230</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>8.190000</td>
      <td>-94.74922</td>
      <td>2018-01-03T00:00:00.000Z</td>
      <td>0.071990</td>
      <td>497.46215</td>
      <td>2017-03-11 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:41.381Z</td>
    </tr>
    <tr>
      <th>39</th>
      <td>numeraire</td>
      <td>nmr</td>
      <td>Numeraire</td>
      <td>https://assets.coingecko.com/coins/images/752/...</td>
      <td>24.230000</td>
      <td>144353948</td>
      <td>309</td>
      <td>2.653487e+08</td>
      <td>2.653203e+07</td>
      <td>27.900000</td>
      <td>...</td>
      <td>1.095211e+07</td>
      <td>1.100000e+07</td>
      <td>93.150000</td>
      <td>-74.02810</td>
      <td>2021-05-16T10:29:06.362Z</td>
      <td>2.060000</td>
      <td>1072.00699</td>
      <td>2018-11-27 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:57.979Z</td>
    </tr>
    <tr>
      <th>40</th>
      <td>verge</td>
      <td>xvg</td>
      <td>Verge</td>
      <td>https://assets.coingecko.com/coins/images/203/...</td>
      <td>0.008570</td>
      <td>140412982</td>
      <td>317</td>
      <td>NaN</td>
      <td>2.276118e+06</td>
      <td>0.008851</td>
      <td>...</td>
      <td>1.655500e+10</td>
      <td>NaN</td>
      <td>0.261874</td>
      <td>-96.75057</td>
      <td>2017-12-24T00:00:00.000Z</td>
      <td>0.000002</td>
      <td>380704.19933</td>
      <td>2015-02-06 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:50.345Z</td>
    </tr>
    <tr>
      <th>41</th>
      <td>ark</td>
      <td>ark</td>
      <td>Ark</td>
      <td>https://assets.coingecko.com/coins/images/613/...</td>
      <td>0.849034</td>
      <td>140146565</td>
      <td>319</td>
      <td>NaN</td>
      <td>3.167058e+06</td>
      <td>0.925397</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>10.220000</td>
      <td>-91.68943</td>
      <td>2018-01-10T00:00:00.000Z</td>
      <td>0.033940</td>
      <td>2402.91951</td>
      <td>2017-03-22 00:00:00+00:00</td>
      <td>{'times': 83.90339673556468, 'currency': 'usd'...</td>
      <td>2022-04-30T18:14:21.015Z</td>
    </tr>
    <tr>
      <th>42</th>
      <td>asd</td>
      <td>asd</td>
      <td>AscendEx Token</td>
      <td>https://assets.coingecko.com/coins/images/5003...</td>
      <td>0.183566</td>
      <td>136498890</td>
      <td>323</td>
      <td>NaN</td>
      <td>1.973789e+06</td>
      <td>0.186104</td>
      <td>...</td>
      <td>7.429835e+08</td>
      <td>NaN</td>
      <td>3.260000</td>
      <td>-94.35420</td>
      <td>2021-03-27T18:14:42.486Z</td>
      <td>0.013075</td>
      <td>1306.54892</td>
      <td>2018-12-10 00:00:00+00:00</td>
      <td>{'times': 9.086026732599098, 'currency': 'usd'...</td>
      <td>2022-04-30T18:12:52.434Z</td>
    </tr>
    <tr>
      <th>43</th>
      <td>aragon</td>
      <td>ant</td>
      <td>Aragon</td>
      <td>https://assets.coingecko.com/coins/images/681/...</td>
      <td>3.480000</td>
      <td>132728244</td>
      <td>331</td>
      <td>NaN</td>
      <td>1.799705e+07</td>
      <td>3.710000</td>
      <td>...</td>
      <td>4.303310e+07</td>
      <td>NaN</td>
      <td>14.640000</td>
      <td>-76.28517</td>
      <td>2021-04-06T09:35:37.795Z</td>
      <td>0.301888</td>
      <td>1049.87064</td>
      <td>2018-11-27 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:43.404Z</td>
    </tr>
    <tr>
      <th>44</th>
      <td>stratis</td>
      <td>strax</td>
      <td>Stratis</td>
      <td>https://assets.coingecko.com/coins/images/531/...</td>
      <td>0.928892</td>
      <td>126899102</td>
      <td>339</td>
      <td>NaN</td>
      <td>2.444890e+06</td>
      <td>0.983440</td>
      <td>...</td>
      <td>1.280574e+08</td>
      <td>NaN</td>
      <td>22.770000</td>
      <td>-95.91352</td>
      <td>2018-01-08T00:00:00.000Z</td>
      <td>0.011407</td>
      <td>8055.35985</td>
      <td>2016-08-12 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:14:34.572Z</td>
    </tr>
    <tr>
      <th>45</th>
      <td>maidsafecoin</td>
      <td>maid</td>
      <td>MaidSafeCoin</td>
      <td>https://assets.coingecko.com/coins/images/80/l...</td>
      <td>0.277019</td>
      <td>125338707</td>
      <td>343</td>
      <td>NaN</td>
      <td>5.803500e+04</td>
      <td>0.279563</td>
      <td>...</td>
      <td>4.525524e+08</td>
      <td>NaN</td>
      <td>1.370000</td>
      <td>-79.85391</td>
      <td>2021-04-12T14:04:59.247Z</td>
      <td>0.011107</td>
      <td>2392.26699</td>
      <td>2014-05-22 00:00:00+00:00</td>
      <td>{'times': 8.23395832945425, 'currency': 'usd',...</td>
      <td>2022-04-30T18:12:07.700Z</td>
    </tr>
    <tr>
      <th>46</th>
      <td>iexec-rlc</td>
      <td>rlc</td>
      <td>iExec RLC</td>
      <td>https://assets.coingecko.com/coins/images/646/...</td>
      <td>1.560000</td>
      <td>111485283</td>
      <td>369</td>
      <td>NaN</td>
      <td>4.652306e+06</td>
      <td>1.680000</td>
      <td>...</td>
      <td>8.699978e+07</td>
      <td>NaN</td>
      <td>15.510000</td>
      <td>-89.99299</td>
      <td>2021-05-10T17:59:51.557Z</td>
      <td>0.153815</td>
      <td>909.10683</td>
      <td>2018-12-15 00:00:00+00:00</td>
      <td>None</td>
      <td>2022-04-30T18:13:41.898Z</td>
    </tr>
    <tr>
      <th>47</th>
      <td>augur</td>
      <td>rep</td>
      <td>Augur</td>
      <td>https://assets.coingecko.com/coins/images/309/...</td>
      <td>12.290000</td>
      <td>85775753</td>
      <td>423</td>
      <td>8.577575e+07</td>
      <td>1.516394e+07</td>
      <td>12.930000</td>
      <td>...</td>
      <td>6.966605e+06</td>
      <td>6.966605e+06</td>
      <td>341.850000</td>
      <td>-96.39580</td>
      <td>2016-02-10T00:00:00.000Z</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>2016-01-22 00:00:00+00:00</td>
      <td>{'times': 19.48683472769625, 'currency': 'usd'...</td>
      <td>2022-04-30T18:13:26.124Z</td>
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
