# bolaget.io (https://bolaget.io)

[![Build Status](https://travis-ci.org/larsha/bolaget.io.svg?branch=master)](https://travis-ci.org/larsha/bolaget.io) [![Coverage Status](https://coveralls.io/repos/github/larsha/bolaget.io/badge.svg?branch=master)](https://coveralls.io/github/larsha/bolaget.io?branch=master)

This API has nothing to do with Systembolaget, this app consumes a large XML API from Systembolaget and transforms it into a REST JSON API. More info can be found here: http://www.systembolaget.se/api

**Versions**
--
| Version       | Url                   |
| ------------- |:---------------------:|
| `v1`          | https://bolaget.io/v1 |

_All resources will be available without versioning in the url and be an alias for the latest API version._

**Products**
---

```http
GET /products
Host: bolaget.io
```

*  **URL Params**

   ***Optional:***

   `limit=[number]` - Default limit is 10, max limit is 100

   `offset=[number]`

   `ecological=[bool]`

   `koscher=[bool]`

   `ethical=[bool]`

   `year_from=[number]`

   `year_to=[number]`

   `sales_start_from=[date]` - YYYY-MM-DD

   `sales_start_to=[date]` - YYYY-MM-DD

   `price_from=[number]`

   `price_to=[integer]`

   `volume_from=[integer]`

   `volume_to=[number]`

   `assortment=[alphanumeric]` - BS = Reservation assortment, TS = Temporary assortment, FS	= Regular assortment and FSN = Regular assortment (new product)

   `sort=[alphanumeric]` - Property to sort by, accepting:
      - `price:asc|desc`
      - `price_per_liter:asc|desc`
      - `volume_in_milliliter:asc|desc`
      - `year:asc|desc`
      - `sales_start:asc|desc`
      - `zip_code:asc|desc`
      - `name:asc|desc`<br><br>

   `name|type|style|provider|producer|origin|origin_country|packaging|product_group|sealing=[alphanumeric]` - Fuzzy match

   `search=[alphanumeric]` - Fuzzy search in several fields


* **Response headers:**

    `X-Total-Count=[number]` - Total count of products based on filtering used for pagination


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ name: '117 Grythyttan' ... }]`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Products doesn't exists" }`



**Product**
----
```http
GET /products/:nr
Host: bolaget.io
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ nr: 12, name: "117 Grythyttan" ... }`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`




**Stores**
----
```http
GET /stores
Host: bolaget.io
```

*  **URL Params**

   ***Optional:***

   `limit=[number]` - Default limit is 10, max limit is 100

   `offset=[number]`

   `labels=[alphanumeric]` - Takes a comma separated list, eg. norrbotten,jämtland, returns documents containing all labels matched (fuzzy)

   `sort=[alphanumeric]` - Property to sort by, accepting:
      - `RT90x:asc|desc`
      - `RT90y:asc|desc`
      - `address:asc|desc`
      - `city:asc|desc`
      - `county:asc|desc`<br><br>

   `type|name|city|county|address=[alphanumeric]` - Fuzzy match

   `search=[alphanumeric]` - Fuzzy search in several fields


* **Response headers:**

   `X-Total-Count=[number]` - Total count of stores based on filtering used for pagination


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ adress_1: 'Kungsholmstorg 11 A' ... }]`


* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`


**Store**
----
```http
GET /stores/:nr
Host: bolaget.io
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ address: "Vasagatan 25", ... }`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`


**Development environment**
----
  Using Docker and Docker Compose (https://www.docker.com/)

**Build**

- ```docker-compose build```

**Start**

- ```docker-compose up web```

**Start worker**

- ```docker-compose run --rm worker```

**Run tests**

- ```docker-compose run --rm test```
