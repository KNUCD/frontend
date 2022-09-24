import type { AppProps } from 'next/app';
import GlobalStyle from 'others/GlobalStyle';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import Checker from 'components/Checker';
import Nav from 'components/Nav';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <GlobalStyle />
      <RecoilRoot>
        <Head>
          <title>핀플레인</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="핀을 꽂아 의견을 말해요." />
          <meta property="og:url" content="https://www.pinplaint.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="핀플레인" />
          <meta property="og:description" content="핀을 꽂아 의견을 말해요." />
          <meta
            property="og:image"
            content="https://avatars.githubusercontent.com/u/113536307?s=400&u=d97cf2f4647d904a1cfcd14cac0f92bc65b705e6&v=4"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/pinplain.png" />
        </Head>
        <Checker />
        <Nav />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
