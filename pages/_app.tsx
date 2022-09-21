import type { AppProps } from 'next/app';
import GlobalStyle from 'others/GlobalStyle';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import Checker from 'components/Checker';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`}
        strategy="beforeInteractive"
      />
      <GlobalStyle />
      <RecoilRoot>
        <Checker />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
