import Head from 'next/head';
import styles from './index.module.scss';
import {Layout} from 'widget/Layout';
import {ItemCard} from '@/widget/ItemCard';
import {dehydrate, QueryClient, useQuery} from 'react-query';
import {getEventsListApi} from '@/helpers/api';
import _ from 'lodash';
import favicon from 'public/favicon.ico';
import {NextPage} from 'next';

const Home: NextPage = () => {
  const {data: dataEvents} = useQuery('getEventsListApi', () => getEventsListApi(), {
    keepPreviousData: true,
  });

  return (
    <div>
      <Head>
        <title>Web dao</title>
        <meta name="description" content="Web dao" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <Layout>
        <h1>Current Presales</h1>
        <div className={styles.form_wrapper}>
          <input type="text" placeholder="Search" />
          <select name="filter" id="filter1">
            <option value="1">option1</option>
            <option value="2">option2</option>
          </select>
          <select name="filter2" id="filter2">
            <option value="1">option1</option>
            <option value="2">option2</option>
          </select>
        </div>
        <div className={styles.item_wrapper}>
          {Array.isArray(dataEvents) &&
            dataEvents.map((el: object, index: number) => (
              <ItemCard data={el} key={_.get(el, '_id') || index} />
            ))}
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const {query} = ctx;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('getEventsListApi', () => getEventsListApi());

  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
