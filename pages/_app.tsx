import {ComponentClass, useState, Suspense} from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import _ from 'lodash';

interface MyappProps {
    Component: ComponentClass;
    pageProps: object;
}

function MyApp({Component, pageProps}: MyappProps) {
    const [queryClient] = useState(() => new QueryClient());

    return <div>
        <QueryClientProvider client={queryClient}>
            <Hydrate state={_.get(pageProps, 'dehydratedState')}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Component {...pageProps} />
                </Suspense>
            </Hydrate>
        </QueryClientProvider>
    </div>;
}

export default MyApp;
