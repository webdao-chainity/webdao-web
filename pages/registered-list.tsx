import Head from 'next/head';
import styles from './index.module.scss';
import {Layout} from 'widget/Layout';
import {dehydrate, QueryClient, useQuery} from 'react-query';
import {getEventsListApi} from '@/helpers/api';
import _ from 'lodash';
import favicon from 'public/favicon.ico';
import {NextPage} from 'next';
import {AdminItemCard} from '@/widget/AdminItemCard';

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
        <div className={styles.item_wrapper}>
          {Array.isArray(dataEvents) &&
            dataEvents.map((el: object, index: number) => (
              <AdminItemCard data={el} key={_.get(el, '_id') || index} />
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
