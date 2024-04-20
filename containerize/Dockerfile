# base image
FROM python:3.11 as compiler

# copy everything from dir into container
WORKDIR /app
COPY . /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    libsndfile1 \
    libopenblas-dev \
    libgomp1 \
    make \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download and build OpenBLAS with OpenMP support
RUN wget https://github.com/xianyi/OpenBLAS/archive/v0.3.20.tar.gz && \
    tar zxvf v0.3.20.tar.gz && \
    cd OpenBLAS-0.3.20 && \
    make USE_OPENMP=1 && \
    make PREFIX=/opt/openblas install

# Adjust the environment variables to use the custom OpenBLAS
ENV LD_LIBRARY_PATH=/opt/openblas/lib:$LD_LIBRARY_PATH
ENV LIBRARY_PATH=/opt/openblas/lib:$LIBRARY_PATH
ENV C_INCLUDE_PATH=/opt/openblas/include:$C_INCLUDE_PATH
ENV CPLUS_INCLUDE_PATH=/opt/openblas/include:$CPLUS_INCLUDE_PATH

# create venv
ENV DEBIAN_FRONTEND=noninteractive
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install wheel && \
    pip install torch==2.1.0 && \
    pip install --no-cache-dir -v -r requirements.txt

# runtime environment
FROM python:3.11 as runner
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libsndfile1 \
    libopenblas-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# cp OpenBLAS installation
COPY --from=compiler /opt/openblas /opt/openblas
COPY --from=compiler /opt/venv /opt/venv

# cp venv
ENV LD_LIBRARY_PATH=/opt/openblas/lib:$LD_LIBRARY_PATH
ENV PATH="/opt/venv/bin:$PATH"

COPY . /app

# expose
EXPOSE 8888

ENV NAME World

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--no-browser", "--NotebookApp.token=''", "--NotebookApp.password=''"]
