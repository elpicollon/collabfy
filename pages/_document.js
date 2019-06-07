import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    const { html, head, errorHtml, chunks } = context.renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles, locale, localeDataScript };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="description" content="A site where multiple users can propose songs and vote for them, having them played in a synchronised way through Spotify."/>
          <link rel="shortcut icon" href="/static/icon128.png" />
          <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
          <style>{`
            html, body {
              overflow-x: hidden;
              overflow-y: auto;
              background-color: #000000; 
              color: #ffffff; 
            }
            `}</style>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-39254352-3"/>
          <script dangerouslySetInnerHTML={{__html: "window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-39254352-3');"}}/>
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main/>
          <script dangerouslySetInnerHTML={{__html: this.props.localeDataScript}}/>
          <NextScript/>
        </body>
      </html>
    );
  }
}