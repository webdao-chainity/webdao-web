import styles from "./style.module.scss";
import React from "react";
import Head from "next/head";
import {Layout} from "@/widget/Layout";
import {Button, ButtonType} from "@/components";
import favicon from 'public/favicon.ico';
import dayjs from "dayjs";
import _ from "lodash";
import {DAY_FORMAT_DMY} from "@/constants";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getEventsListApi} from "@/helpers/api";
import {NextPage} from "next";


const Launchpad: NextPage = (props: any) => {
    // const data = {
    //     logo: 'https://picsum.photos/200/300',
    //     name: 'CyberBrokers Token Presale',
    //     launch: '1 BNB = 15,000 CyberB',
    //     soft: 'Soft/Hard',
    //     range: '333 BNB - 666 BNB',
    //     description: 'ONLY FOR WHITELISTED ADDRESSES 📋 (How to get in to whitelist? Check our TG) CyberBrokers is a fun inter-paradigm NFT Play to earn game with a metaverse that enables multiple forms of player interaction, Competitive Game Modes, and Token Rewards. The game has several modes and different paradigms, including adventure, arena battle, and building, to keep players engaged. CMC/CG listing ✅CoinTiger cex ✅ MEXC ✅ KuCoin ✅ XT✅ Fuzionx✅',
    //     website: 'https://presale.lux.world',
    //     videoUrl: 'https://www.youtube.com/embed/_jqQbLXAJ9U'
    // }

    const {data: dataEvents} = useQuery(
        "getEventsListApi",
        () =>
            getEventsListApi(),
        {
            keepPreviousData: true,
        }
    );

    const data = Array.isArray(dataEvents) ? dataEvents.filter((el: object) => _.get(el, '_id') === _.get(props, 'query.id')).pop() : {};

    const renderItem = (el: string, key: number) => {
        let value = _.get(data, el);
        if (
            !['currency', 'totalCap', 'minVoter', 'maxVoter', 'startTime', 'endTime'].includes(el)) return ''
        if (['startTime', 'endTime'].includes(el)) {
            const day = dayjs(value)
            if (!day.isValid()) return
            value = day.format(DAY_FORMAT_DMY)
        }
        return <div className={styles.info_item} key={key}>
            <div className={styles.info_name}>{el}</div>
            <div className={styles.info_value}>{value}</div>
        </div>
    }

    return <div className={styles.launchpad_container}>
        <Head>
            <title>Web dao</title>
            <meta name="description" content="Web dao"/>
            <link rel="icon" href={favicon.src}/>
        </Head>
        <Layout>
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
                                    <div className={styles.name}>{_.get(data, 'name')}</div>
                                    {/*<a className={styles.link} href={data.website}>*/}
                                    {/*    <Icon icon='globe'/>*/}
                                    {/*</a>*/}
                                </div>
                                {/*<div className={styles.tag}>*/}
                                {/*    <div className={styles.status}>Upcomming</div>*/}
                                {/*</div>*/}
                            </div>
                            <div className={styles.description}>
                                {_.get(data, 'description')}
                            </div>
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
                        {
                            Object.keys(data).map(
                                (el: string, index: number) => renderItem(el, index)
                            )
                        }

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
                            <Button name='Yes' icon='user-check' type={ButtonType.yes}/>
                            <Button name='No' icon='user-x' type={ButtonType.no}/>
                            <Button name='Revoke' icon='users' type={ButtonType.secondary}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
}


export const getServerSideProps = async (ctx: any) => {
    const {query} = ctx;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("getEventsListApi", () => getEventsListApi()
    );

    return {
        props: {
            query,
            dehydratedState: dehydrate(queryClient),
        },
    };
};


export default Launchpad;