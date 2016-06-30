# bolaget.io (https://bolaget.io)

This API has nothing to do with Systembolaget, this app consumes a large XML API from Systembolaget and transforms it into a REST JSON API. More info can be found here: http://www.systembolaget.se/api

*Work in progress, feel free to add issues and make PR's. API will be considered unstable (breaking changes might occur) until release 1.0.*

**Products**
----
  Returns json data for products.

* **URL**

  /products


* **Method:**

  `GET`


*  **URL Params**

   ***Optional:***

   `limit=[number]` // Default/max limit 100

   `skip=[number]`

   `ecologial=[bool]`

   `koscher=[bool]`

   `ethical=[bool]`

   `year_from=[number]`

   `year_to=[number]`

   `price_from=[number]`

   `price_to=[integer]`

   `volume_from=[integer]`

   `volume_to=[number]`

   `sort_by=[alphanumeric]` - Property to sort by

   `sort_order=[alphanumeric]` - Specify sort order, 1/asc or -1/desc

   `name|type|style=[alphanumeric]` - Simple fuzzy search (case insensitive)

   `product_group=[alphanumeric]` - Product group search (case insensitive)


* **Response headers:**

    `X-Total-Count=[number]` // Total count of products based on filtering used for pagination


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ name: '117 Grythyttan' ... }]`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Products doesn't exists" }`



**Show Product**
----
  Returns json data about a single product.

* **URL**

  /products/:nr


* **Method:**

  `GET`


*  **URL Params**

   ***Required:***

   `nr=[number]`


* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ nr: 12, name: "117 Grythyttan" ... }`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`




**Stores**
----
  Returns json data for stores.

* **URL**

  /stores


* **Method:**

  `GET`


*  **URL Params**

   ***Optional:***

   `limit=[number]`

   `skip=[number]`

   `sort_by=[alphanumeric]` - Property to sort by

   `sort_order=[alphanumeric]` - Specify sort order, 1/asc or -1/desc


 * **Response headers:**

     `X-Total-Count=[number]` // Total count of stores based on filtering used for pagination


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ adress_1: 'Kungsholmstorg 11 A' ... }]`


* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : e }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Stores doesn't exist" }`
