import React from 'react';
import Head from 'next/head';

const Header = ({ title }: Props) => {
  return (
    <Head>
      <title>Simba {`  ${title ? `| ${title}` : ''}`}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  );
};

interface Props {
  title?: string;
}

export default Header;
