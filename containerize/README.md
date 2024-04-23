## Build and run the container

make sure you have [docker desktop](https://www.docker.com/products/docker-desktop/?utm_source=google&utm_medium=cpc&utm_campaign=BRAND_SEARCH_BRAND_AMER_NORAM&utm_term=docker%20desktop&gad_source=1&gclid=CjwKCAjwuJ2xBhA3EiwAMVjkVOov_qNJJcx8KE2qiNKkNtz_Rss7Ou0CA0w4vK2XSG47LLJcZndxehoCdUQQAvD_BwE) installed and your in the containerize directory.

**Build the Image**

`docker build --no-cache -t mg_ex .`

**Run the container via docker-compose**

`docker-compose up --build`
