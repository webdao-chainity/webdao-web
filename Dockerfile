# dist environment
FROM node:16

WORKDIR /app

COPY . /app/

ENV NEXT_PUBLIC_CHAIN_ID 5
ENV NEXT_PUBLIC_NODE_1 https://goerli.infura.io/v3/
ENV NEXT_PUBLIC_NODE_2 https://rpc.ankr.com/eth_goerli
ENV NEXT_PUBLIC_NODE_3 https://eth-goerli.public.blastapi.io/
ENV NEXT_PUBLIC_API_URL https://beta-api.webdao.app/

RUN yarn install

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
