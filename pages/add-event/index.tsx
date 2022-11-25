import Head from 'next/head';
import {Layout} from 'widget/Layout';
import {useMutation} from 'react-query';
import {AddEventForm} from '@/components/AddEventForm';
import React from 'react';
import {createEventApi} from '@/helpers/api';
import favicon from 'public/favicon.ico';
import ROUTES from '@/constants/route';
import {useRouter} from 'next/router';
import _ from "lodash";

export default function AddEvent() {
  const {mutate: mutateCreateEvent, isLoading} = useMutation((data: any) => createEventApi(data));
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Add vote</title>
        <meta name="description" content="Web dao" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <Layout>
        <AddEventForm
          onSubmitForm={_.debounce(
              (data: object) => {
                  mutateCreateEvent(data, {
                      onSuccess: () => {
                          router.push(ROUTES.HOME_PATH);
                      },
                  });
              }
          )}
          blocking={isLoading}
        />
      </Layout>
    </div>
  );
}
