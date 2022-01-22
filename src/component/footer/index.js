import React from 'react';

const Footer = (props) => (
      <footer className={props.className}>
        ©{new Date().getFullYear()}
        <span> <a target='_blank' href='http://cssaatuwmadison.org'>CSSA at UW-Madison IT</a> </span>
        All Rights Reversed.
        <span>  Custom developed based on <a target='_blank' href='https://github.com/geekeren/Magpie-LuckyDraw'>Github</a> </span>
      </footer>
);

export default Footer;
