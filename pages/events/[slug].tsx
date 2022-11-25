import styles from './style.module.scss';
import React from 'react';
import Head from 'next/head';
import {Layout} from '@/widget/Layout';
import favicon from 'public/favicon.ico';
import {dehydrate, QueryClient, useQuery} from 'react-query';
import {getEventsListApi} from '@/helpers/api';
import {NextPage} from 'next';
import LaunchPadBody from '@/widget/eventDetail';

const Launchpad: NextPage = (props: any) => {
  const {data} = useQuery('getEventsListApi', () => getEventsListApi(), {
    keepPreviousData: true,
  });

  return (
    <div className={styles.launchpad_container}>
      <Head>
        <title>Web dao</title>
        <meta name="description" content="Web dao" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <Layout>
        <div>
          <LaunchPadBody slug={props?.query?.slug} dataEvents={data} />
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

export default Launchpad;
