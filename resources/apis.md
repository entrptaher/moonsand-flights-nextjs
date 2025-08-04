# IATA by Location

This is used to get the IATA and then that IATA is used for further API call.

## REQUEST:
```js
fetch("https://www.travelpayouts.com/whereami", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-IN;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1"
  },
  "referrer": "https://www.moonsand.co/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
```

## RESPONSE:

```json
{
    "iata": "DAC",
    "name": "Dhaka",
    "country_name": "Bangladesh",
    "coordinates": "90.405876:23.848648"
}
```

# Airlines by destination
Given a specific IATA, it returns all airlines by destination.

REQUEST

```js
fetch("https://tpproxy.blue-heart-794e.workers.dev/airlines-by-destination?iata=BER", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-IN;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1"
  },
  "referrer": "https://www.moonsand.co/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
```

RESPONSE:

```json
{
    "destination": "BER",
    "airlines": [
        "BA",
        "EW",
        "EI",
        "DE",
        "SN",
        "U2",
        "FR",
        "LH",
        "UA",
        "SM",
        "LX",
        "PC",
        "KL"
    ]
}
```

# Airline Images

You can get the airline image for a specific airline by the code.

REQUEST:
```
https://images.kiwi.com/airlines/64/BA.png
```

# Flight Schedule API

REQUEST:


```
https://suggest.apistp.com/widgets/v1/flight-schedule?origin=DAC&destination=LHR&locale=en&host=flights.moonsand.co/flights&marker=281122.281122._tpwsched&non_direct_flights=false&with_fallback=true&campaign_id=100
```

RESPONSE:

```
{
    "result": {
        "subtitle": {
            "origin": {
                "country": "Bangladesh",
                "city": "Dhaka",
                "airport": "Hazrat Shahjalal International Airport"
            },
            "destination": {
                "country": "United Kingdom",
                "city": "London",
                "airport": "London Heathrow Airport"
            }
        },
        "flights": [
            {
                "origin_iata": "DAC",
                "destination_iata": "LHR",
                "depart_time": "07:40",
                "arrival_time": "15:55",
                "choose_dates_url": "https://flights.moonsand.co/flights/?destination_iata=LHR\u0026locale=en\u0026marker=281122.281122._tpwsched\u0026open_datepicker=true\u0026origin_iata=DAC",
                "details": [
                    {
                        "airline_logo": "https://pics.avs.io/al_square/32/32/BG@2x.png",
                        "airline_code": "BG",
                        "airline_name": "Biman Bangladesh Airlines",
                        "flight_number": 201
                    }
                ],
                "stops": [],
                "arrival_day_indicator": 0,
                "op_days": [
                    false,
                    false,
                    true,
                    false,
                    true,
                    true,
                    true
                ]
            },
            {
                "origin_iata": "DAC",
                "destination_iata": "LHR",
                "depart_time": "08:50",
                "arrival_time": "17:05",
                "choose_dates_url": "https://flights.moonsand.co/flights/?destination_iata=LHR\u0026locale=en\u0026marker=281122.281122._tpwsched\u0026open_datepicker=true\u0026origin_iata=DAC",
                "details": [
                    {
                        "airline_logo": "https://pics.avs.io/al_square/32/32/BG@2x.png",
                        "airline_code": "BG",
                        "airline_name": "Biman Bangladesh Airlines",
                        "flight_number": 201
                    }
                ],
                "stops": [],
                "arrival_day_indicator": 0,
                "op_days": [
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false
                ]
            }
        ],
        "title": {
            "flights_every_day": false,
            "flights_number": 5,
            "min_flight_duration": {
                "days": 0,
                "hours": 13,
                "min": 15
            }
        }
    }
}
```

# Specific aviasales by iata

```
https://suggest.apistp.com/search?service=aviasales&term=DAC&locale=en
```

```
[
    {
        "slug": "DAC",
        "subtitle": "Bangladesh",
        "title": "Dhaka"
    },
    {
        "slug": "VIL",
        "subtitle": "Morocco",
        "title": "Dakhla"
    },
    {
        "slug": "SJL",
        "subtitle": "Brazil",
        "title": "Sao Gabriel"
    },
    {
        "slug": "DAX",
        "subtitle": "China",
        "title": "Dazhou"
    }
]
```

# Grouped Prices

Request:

```
https://tpproxy.blue-heart-794e.workers.dev/grouped-prices?origin=DAC&destination=LHR&currency=USD
```

RESPONSE:
```json
{
    "data": {
        "2025-08-05": {
            "flight_number": "1114",
            "link": "/search/DAC0508LHR1?t=AI17544141001754511600001925DACMAABLRLHR_f9965b59e7433925cd688eb05e9366dc_40995&search_date=04082025&expected_price_uuid=7f9b0c0b-1e67-4fea-a66e-83ed2de16002&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=516",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-05T17:15:00+06:00",
            "airline": "6E",
            "destination": "LON",
            "origin": "DAC",
            "price": 516,
            "return_transfers": 0,
            "duration": 1925,
            "duration_to": 865,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-08-06": {
            "flight_number": "1106",
            "link": "/search/DAC0608LHR1?t=AI17545032001754566200001350DACCCUBOMLHR_76dc6ce798780067a0f6288b5e5a7112_33900&search_date=31072025&expected_price_uuid=41b92d7b-7ac4-45f4-a0e9-2d59bb72f601&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=418",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-06T18:00:00+06:00",
            "airline": "6E",
            "destination": "LON",
            "origin": "DAC",
            "price": 418,
            "return_transfers": 0,
            "duration": 1350,
            "duration_to": 820,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-08-11": {
            "flight_number": "397",
            "link": "/search/DAC1108LHR1?t=J217549136001755030600002250DACDELGYDLHR_694a8a2461e74f4108fc1bcc863e30f7_36151&search_date=30072025&expected_price_uuid=d3ea6e65-abb0-4b45-a884-6c343233d902&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=447",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-11T12:00:00+06:00",
            "airline": "BG",
            "destination": "LON",
            "origin": "DAC",
            "price": 447,
            "return_transfers": 0,
            "duration": 2250,
            "duration_to": 795,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-08-16": {
            "flight_number": "1104",
            "link": "/search/DAC1608LHR1?t=QR17553615001755468000002075DACDELDOHLHR_ea6026778c9ded6ed75fac52ec603fa6_47908&search_date=01082025&expected_price_uuid=fa65645c-8752-4f9a-97e8-93ba554cc700&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=590",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-16T16:25:00+06:00",
            "airline": "6E",
            "destination": "LON",
            "origin": "DAC",
            "price": 590,
            "return_transfers": 0,
            "duration": 2075,
            "duration_to": 840,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-08-17": {
            "flight_number": "2036",
            "link": "/search/DAC1708LHR1?t=MU17554398001755542400002010DACKMGPVGLHR_6ab696565d24ac26ed4228faed412ecb_38638&search_date=01082025&expected_price_uuid=afac379a-bf79-4617-b7c8-e79b16f4ba01&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=476",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-17T14:10:00+06:00",
            "airline": "MU",
            "destination": "LON",
            "origin": "DAC",
            "price": 476,
            "return_transfers": 0,
            "duration": 2010,
            "duration_to": 1085,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-08-20": {
            "flight_number": "238",
            "link": "/search/DAC2008LHR1?t=EK17557248001755865500002645DACDELDXBLHR_c31663fb84c219c944d03266fabe8b23_31980&search_date=02082025&expected_price_uuid=15c3a2bc-bc36-4d85-8bea-2c66401caa00&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=400",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-08-20T21:20:00+06:00",
            "airline": "AI",
            "destination": "LON",
            "origin": "DAC",
            "price": 400,
            "return_transfers": 0,
            "duration": 2645,
            "duration_to": 840,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-09-01": {
            "flight_number": "238",
            "link": "/search/DAC0109LHR1?t=AI17567616001756885200002360DACDELAMSLHR_9cb6fa695c3c9661e599c801e868c3ad_38104&search_date=02082025&expected_price_uuid=37be94ee-d21f-453f-b103-148aacc6b700&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=477",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-09-01T21:20:00+06:00",
            "airline": "AI",
            "destination": "LON",
            "origin": "DAC",
            "price": 477,
            "return_transfers": 0,
            "duration": 2360,
            "duration_to": 775,
            "duration_back": 0,
            "transfers": 2
        },
        "2025-12-16": {
            "flight_number": "1104",
            "link": "/search/DAC1612LHR1?t=GF17659023001765982700001700DACDELBAHLHR_37fcf1adde2bdc1944dfeefcc1169a5c_29736&search_date=31072025&expected_price_uuid=7dccbc16-a0bb-40ab-b82e-dc81185fe901&destination_airports=0&expected_price_source=share&expected_price_currency=usd&expected_price=367",
            "origin_airport": "DAC",
            "destination_airport": "LHR",
            "departure_at": "2025-12-16T16:25:00+06:00",
            "airline": "6E",
            "destination": "LON",
            "origin": "DAC",
            "price": 367,
            "return_transfers": 0,
            "duration": 1700,
            "duration_to": 915,
            "duration_back": 0,
            "transfers": 2
        }
    },
    "currency": "USD",
    "success": true
}
```

# NEAREST PLACES MATRIX

REQUEST:

```
https://tpproxy.blue-heart-794e.workers.dev/v2/prices/nearest-places-matrix?origin=DAC&destination=LHR&currency=USD&limit=7&distance=500
```

RESPONSE:

```
{
    "prices": [
        {
            "link": "/search/DAC1612LON1?t=GF17659023001765982700001700DACDELBAHLHR_37fcf1adde2bdc1944dfeefcc1169a5c_29736&search_date=31072025&expected_price_uuid=7dccbc16-a0bb-40ab-b82e-dc81185fe901&expected_price_source=share&expected_price_currency=usd&expected_price=367",
            "origin": "DAC",
            "gate": "Vayama",
            "main_airline": "GF",
            "depart_date": "2025-12-16T16:25:00+06:00",
            "destination": "LON",
            "found_at": "2025-07-31T03:48:58Z",
            "transfers": 2,
            "distance": 8014,
            "duration": 1700,
            "price": 367,
            "trip_class": 0,
            "origin_name": "DAC",
            "destination_name": "LON",
            "main_airline_name": "Gulf Air Bahrain"
        },
        {
            "link": "/search/DAC0608LON1?t=BA17545032001754573100001465DACCCUDOHLGW_353251dced1c654a2203bf6f57fbf06a_30737&search_date=31072025&expected_price_uuid=41b92d7b-7ac4-45f4-a0e9-2d59bb72f601&expected_price_source=share&expected_price_currency=usd&expected_price=379",
            "origin": "DAC",
            "gate": "Vayama",
            "main_airline": "BA",
            "depart_date": "2025-08-06T18:00:00+06:00",
            "destination": "LON",
            "found_at": "2025-07-31T06:40:27Z",
            "transfers": 2,
            "distance": 8004,
            "duration": 1465,
            "price": 379,
            "trip_class": 0,
            "origin_name": "DAC",
            "destination_name": "LON",
            "main_airline_name": "British Airways"
        },
        {
            "link": "/search/DAC2008LON1?t=EK17557248001755865500002645DACDELDXBLHR_c31663fb84c219c944d03266fabe8b23_31980&search_date=02082025&expected_price_uuid=15c3a2bc-bc36-4d85-8bea-2c66401caa00&expected_price_source=share&expected_price_currency=usd&expected_price=400",
            "origin": "DAC",
            "gate": "City.Travel",
            "main_airline": "EK",
            "depart_date": "2025-08-20T21:20:00+06:00",
            "destination": "LON",
            "found_at": "2025-08-02T20:42:18Z",
            "transfers": 2,
            "distance": 8014,
            "duration": 2645,
            "price": 400,
            "trip_class": 0,
            "origin_name": "DAC",
            "destination_name": "LON",
            "main_airline_name": "Emirates"
        },
        {
            "link": "/search/DAC1708LON1?t=MU17554398001755585000002720DACKMGPVGLGW_fe4603a27621102ec737aff11f65f4a6_32852&search_date=01082025&expected_price_uuid=afac379a-bf79-4617-b7c8-e79b16f4ba01&expected_price_source=share&expected_price_currency=usd&expected_price=405",
            "origin": "DAC",
            "gate": "Mytrip.com",
            "main_airline": "MU",
            "depart_date": "2025-08-17T14:10:00+06:00",
            "destination": "LON",
            "found_at": "2025-08-01T06:29:55Z",
            "transfers": 2,
            "distance": 8004,
            "duration": 2720,
            "price": 405,
            "trip_class": 0,
            "origin_name": "DAC",
            "destination_name": "LON",
            "main_airline_name": "China Eastern Airlines"
        }
    ],
    "origins": [
        "DAC"
    ],
    "destinations": [
        "LON"
    ]
}
```

# Flights widget

```

```