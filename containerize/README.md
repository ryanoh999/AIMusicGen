## Build and run the container

make sure you have [docker desktop](https://www.docker.com/products/docker-desktop/?utm_source=google&utm_medium=cpc&utm_campaign=BRAND_SEARCH_BRAND_AMER_NORAM&utm_term=docker%20desktop&gad_source=1&gclid=CjwKCAjwuJ2xBhA3EiwAMVjkVOov_qNJJcx8KE2qiNKkNtz_Rss7Ou0CA0w4vK2XSG47LLJcZndxehoCdUQQAvD_BwE) installed and your in the containerize directory.

**Build the Image**

`docker build --no-cache -t mg_ex .`

**Run the container via docker-compose**

`docker-compose up --build`

**Open [ex.ipynb](./ex.ipynb)**

**Click** Select Kernel ==> Existing Jupyter Server

**Enter URL** (ex. http://127.0.0.1:8888/lab?token=33f359498611061365600410f2ab3e00f47e21e2ac261689)

