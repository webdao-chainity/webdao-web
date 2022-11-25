import styles from 'pages/events/style.module.scss';
import React, {useContext} from 'react';
import {Button, ButtonType} from '@/components';
import dayjs from 'dayjs';
import _ from 'lodash';
import {DAY_FORMAT_DMY} from '@/constants';
import useVoteContract, {VOTE_VALUE_ENUM} from '@/hooks/useVoteContract';
import {AuthContext} from '@/context/auth';
import {parseIntValue} from '@/utils';
import {ToastContext} from '@/context/toast';

interface ILaunchPadBody {
  slug: string;
  dataEvents: any;
}

const LaunchPadBody = (props: ILaunchPadBody) => {
  const {toastError} = useContext(ToastContext);
  const {account} = useContext(AuthContext);
  const {data, handleVote, hasVoted, handleCancelVote, isFinished, lastVoted} = useVoteContract(
    parseIntValue(props.slug),
    account
  );

  const dataDb = Array.isArray(props.dataEvents)
    ? props.dataEvents.filter((el: object) => _.get(el, '_id') === _.get(props, 'slug')).pop()
    : {};

  const renderItem = (el: string, key: number) => {
    let value = _.get(data, el);
    if (['Name', 'Description'].includes(el)) return null;
    if (['Start time', 'End time'].includes(el)) {
      value = parseIntValue(value);
      if (value == null) return null;
      const day = dayjs(value);
      if (!day.isValid()) return null;
      value = day.format(DAY_FORMAT_DMY);
    }
    if (el === 'Vote result') {
      if (value == 2) return null;
      value = value == 1 ? 'Yes' : 'No';
    }
    if (el === 'Is finished') {
      value = value == 1 ? 'Yes' : 'No';
    }
    return (
      <div className={styles.info_item} key={key}>
        <div className={styles.info_name}>{el}</div>
        <div className={styles.info_value}>{value}</div>
      </div>
    );
  };

  const handleCheckConnectWallet = (handler: any) => {
    if (!account) {
      toastError('Please connect wallet first');
      return;
    }
    if (isFinished) {
      toastError('This event already finished');
      return;
    }
    handler();
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
            {hasVoted && (
              <div className={styles.description}>
                Your last vote: {lastVoted == VOTE_VALUE_ENUM.YES ? 'Yes' : 'No'}
              </div>
            )}
            {/*<div className={styles.email_input}>*/}
            {/*    <input type="text" placeholder='Enter your email'/>*/}
            {/*</div>*/}
            <Button
              name="Yes"
              icon="check-square"
              type={ButtonType.yes}
              disabled={hasVoted === true}
              onClick={() => {
                handleCheckConnectWallet(() => handleVote(VOTE_VALUE_ENUM.YES));
              }}
            />
            <Button
              name="No"
              icon="x-square"
              type={ButtonType.no}
              disabled={hasVoted === true}
              onClick={() => {
                handleCheckConnectWallet(() => handleVote(VOTE_VALUE_ENUM.NO));
              }}
            />
            <Button
              name="Revoke"
              icon="square"
              type={ButtonType.secondary}
              disabled={hasVoted === false}
              onClick={() => {
                handleCheckConnectWallet(() => handleCancelVote());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPadBody;
