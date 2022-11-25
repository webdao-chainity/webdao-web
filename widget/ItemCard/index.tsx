import styles from './style.module.scss';
import React, {useMemo} from 'react';
import {Button, ButtonType} from '@/components';
import {useRouter} from 'next/router';
import ROUTES from '@/constants/route';
import _ from 'lodash';
import {truncateString} from '@/utils';
import dayjs from 'dayjs';
import {DAY_FORMAT_DMY} from '@/constants';

interface IItemCard {
  data: object;
}

export const ItemCard = (props: IItemCard) => {
  const router = useRouter();

  const data = {
    logo: 'https://picsum.photos/200/300',
    name: 'name1',
    launch: '1 BNB = 15,000 CyberB',
    soft: 'Soft/Hard',
    range: '333 BNB - 666 BNB',
  };

  const renderRange = useMemo(() => {
    let startContent = '';
    let endContent = '';
    const startDay = dayjs(_.get(props, 'data.startTime', ''));
    const endDay = dayjs(_.get(props, 'data.endTime', ''));
    if (startDay.isValid()) startContent = 'From: ' + startDay.format(DAY_FORMAT_DMY);
    if (endDay.isValid()) endContent = 'To: ' + endDay.format(DAY_FORMAT_DMY);
    return (
      <div className={styles.range}>
        {startContent}
        <br />
        {endContent}
      </div>
    );
  }, [props]);

  return (
    <div className={styles.item_wrapper}>
      {/*<div className={styles.header_card}>*/}
      {/*    /!*<div className={styles.logo}>*!/*/}
      {/*    /!*    <img src={data.logo} alt=""/>*!/*/}
      {/*    /!*</div>*!/*/}
      {/*    /!*<div className={styles.tag_and_status}>*!/*/}
      {/*    /!*    <div className={styles.status}>Up comming</div>*!/*/}
      {/*    /!*    <div className={styles.tag}>Audit</div>*!/*/}
      {/*    /!*</div>*!/*/}
      {/*</div>*/}
      <div className={styles.body}>
        <div className={styles.name}>{_.get(props, 'data.name') || data.name}</div>
        <div className={styles.soft}>{_.get(props, 'data.currency') || data.name}</div>
        <div className={styles.hard}>{_.get(props, 'data.totalCap') || data.name}</div>
        <div className={styles.launch}>
          {truncateString(_.get(props, 'data.description', ''), 50)}
        </div>
        {/*<div className={styles.soft}>{data.soft}</div>*/}
        <div className={styles.range}>{renderRange}</div>
      </div>
      <Button
        name="View"
        type={ButtonType.primary}
        onClick={() => {
          router.push({
            pathname: ROUTES.LAUNCHPAD_PATH_DETAIL,
            query: {
              id: _.get(props, 'data._id'),
            },
          });
        }}
      />
    </div>
  );
};
