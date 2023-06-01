import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import { CssBaseline } from '@nextui-org/react';


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
        <Head>
           {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;