import styles from './style.module.scss';
import React, {useContext, useMemo} from 'react';
import {Button, ButtonType} from '@/components';
import _ from 'lodash';
import {truncateString} from '@/utils';
import dayjs from 'dayjs';
import {DAY_FORMAT_DMY} from '@/constants';
import useVoteContract from '@/hooks/useVoteContract';
import {AuthContext} from '@/context/auth';
import {updateEventApi} from '@/helpers/api';

interface IItemCard {
  data: any;
}

export const AdminItemCard = (props: IItemCard) => {
  const {account} = useContext(AuthContext);
  const {handleCreateVoting} = useVoteContract(parseInt(props.data._id), account);

  const renderRange = useMemo(() => {
    let content = '';
    const startDay = dayjs(_.get(props, 'data.startTime', ''));
    const endDay = dayjs(_.get(props, 'data.endTime', ''));
    if (startDay.isValid()) content = 'From: ' + startDay.format(DAY_FORMAT_DMY);
    if (endDay.isValid()) content += '  To: ' + endDay.format(DAY_FORMAT_DMY);
    return <div className={styles.range}>{content}</div>;
  }, [props]);

  const handleApprove = async () => {
    await handleCreateVoting({
      ...props.data,
      startTime: new Date(props.data.startTime).getTime(),
      endTime: new Date(props.data.endTime).getTime(),
    });
    await updateEventApi(props.data._id, {
      isDraft: false,
    });
  };

  const handleReject = async () => {
    await updateEventApi(props.data._id, {
      isDraft: false,
    });
  };

  return (
    <div className={styles.item_wrapper}>
      <div className={styles.body}>
        <div className={styles.name}>{_.get(props, 'data.name')}</div>
        <div className={styles.soft}>{_.get(props, 'data.currency')}</div>
        <div className={styles.hard}>{_.get(props, 'data.totalCap')}</div>
        <div className={styles.launch}>
          {truncateString(_.get(props, 'data.description', ''), 50)}
        </div>
        <div className={styles.range}>{renderRange}</div>
      </div>
      <Button name="Reject" type={ButtonType.secondary} onClick={() => handleReject()} />
      <br />
      <Button name="Approve" type={ButtonType.primary} onClick={() => handleApprove()} />
    </div>
  );
};
