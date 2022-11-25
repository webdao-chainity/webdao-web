import styles from './style.module.scss';
import React, {useContext} from 'react';
import Head from 'next/head';
import {Layout} from '@/widget/Layout';
import {Button, ButtonType} from '@/components';
import favicon from 'public/favicon.ico';
import dayjs from 'dayjs';
import _ from 'lodash';
import {DAY_FORMAT_DMY} from '@/constants';
import {dehydrate, QueryClient, useQuery} from 'react-query';
import {getEventsListApi} from '@/helpers/api';
import {NextPage} from 'next';
import useVoteContract, {VOTE_VALUE_ENUM} from '@/hooks/useVoteContract';
import {AuthContext} from '@/context/auth';

const LaunchPadBody = (props: any) => {
  const {account} = useContext(AuthContext);
  const {data, handleVote, hasVoted, handleCancelVote} = useVoteContract(
    1 || props.query.id,
    account
  );

  const {data: dataEvents} = useQuery('getEventsListApi', () => getEventsListApi(), {
    keepPreviousData: true,
  });

  const dataDb = Array.isArray(dataEvents)
    ? dataEvents.filter((el: object) => _.get(el, '_id') === _.get(props, 'query.id')).pop()
    : {};

  const renderItem = (el: string, key: number) => {
    let value = _.get(data, el);
    if (['Name', 'Description'].includes(el)) return '';
    if (['Start time', 'End time'].includes(el)) {
      const day = dayjs.unix(value);
      if (!day.isValid()) return;
      value = day.format(DAY_FORMAT_DMY);
    }
    if (el === 'Is finished') {
      value = value != 2 ? 'Yes' : 'No';
    }
    return (
      <div className={styles.info_item} key={key}>
        <div className={styles.info_name}>{el}</div>
        <div className={styles.info_value}>{value}</div>
      </div>
    );
  };

  return (
    <div className={styles.launchpad_body}>
      <div className={styles.left_section}>
        <div className={styles.main_info_wrapper}>
          {/*<div className={styles.logo_wrapper}>*/}
          {/*    <div className={styles.logo}>*/}
          {/*        <img src={data.logo} alt=""/>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className={styles.info_wrapper}>
            <div className={styles.header}>
              <div className={styles.name_and_web}>
                <div className={styles.name}>{_.get(dataDb, 'name')}</div>
                {/*<a className={styles.link} href={data.website}>*/}
                {/*    <Icon icon='globe'/>*/}
                {/*</a>*/}
              </div>
              {/*<div className={styles.tag}>*/}
              {/*    <div className={styles.status}>Upcomming</div>*/}
              {/*</div>*/}
            </div>
            <div className={styles.description}>{_.get(data, 'Description')}</div>
            {/*<div className={styles.video_wrapper}>*/}
            {/*    <div className={styles.video}>*/}
            {/*        <iframe*/}
            {/*            src={data.videoUrl}*/}
            {/*            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*            width="100%"*/}
            {/*            height="100%"*/}
            {/*            allowFullScreen*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={styles.additional_info}>
          {Object.keys(data).map((el: string, index: number) => renderItem(el, index))}
        </div>
      </div>
      <div className={styles.right_section}>
        <div className={styles.right_section_wrapper}>
          <div className={styles.header_wrapper}>
            <div className={styles.header}>Vote</div>
          </div>
          <div className={styles.body}>
            {/*<div className={styles.description}>*/}
            {/*    Sign up our mailing list to receive our new presales, features, tips and reviews for*/}
            {/*    next 100x projects.*/}
            {/*</div>*/}
            {/*<div className={styles.email_input}>*/}
            {/*    <input type="text" placeholder='Enter your email'/>*/}
            {/*</div>*/}
            <Button
              name="Yes"
              icon="user-check"
              type={ButtonType.yes}
              disabled={hasVoted}
              onClick={() => {
                handleVote(VOTE_VALUE_ENUM.YES);
              }}
            />
            <Button
              name="No"
              icon="user-x"
              type={ButtonType.no}
              disabled={hasVoted}
              onClick={() => {
                handleVote(VOTE_VALUE_ENUM.NO);
              }}
            />
            <Button
              name="Revoke"
              icon="users"
              type={ButtonType.secondary}
              disabled={!hasVoted}
              onClick={() => {
                handleCancelVote();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Launchpad: NextPage = (props: any) => {
  return (
    <div className={styles.launchpad_container}>
      <Head>
        <title>Web dao</title>
        <meta name="description" content="Web dao" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <Layout>
        <LaunchPadBody {...props} />
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
