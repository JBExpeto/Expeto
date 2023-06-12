import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import Script from "next/script";


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>  {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=82437b9fefb131e722d31bcbced9fcda&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;