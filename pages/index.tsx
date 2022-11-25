import Head from 'next/head';
import styles from './index.module.scss';
import {Layout} from 'widget/Layout';
import {ItemCard} from '@/widget/ItemCard';
import {dehydrate, QueryClient, useQuery} from 'react-query';
import {getEventsListApi} from '@/helpers/api';
import _ from 'lodash';
import favicon from 'public/favicon.ico';
import {NextPage} from 'next';
import {useState} from "react";

const Home: NextPage = () => {
    const [keyword, setKeyword] = useState('');
    const {data} = useQuery('getEventsListApi', () => getEventsListApi(), {
        keepPreviousData: true,
    });

    const dataEvents = Array.isArray(data) ? data.filter(
        (el: any) => _.get(el, 'name').toLowerCase().includes(keyword.toLowerCase())
    ) : []

    return (
        <div>
            <Head>
                <title>Web dao</title>
                <meta name="description" content="Web dao"/>
                <link rel="icon" href={favicon.src}/>
            </Head>
            <Layout>
                <h1>Current events</h1>
                <div className={styles.form_wrapper}>
                    <input type="text" placeholder="Search" onChange={(event => {
                        setKeyword(event.target.value)
                    })}/>
                </div>
                <div className={styles.item_wrapper}>
                    {Array.isArray(dataEvents) &&
                        dataEvents.map((el: object, index: number) => (
                            <ItemCard data={el} key={_.get(el, '_id') || index}/>
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
