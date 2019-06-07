import css from 'styled-jsx/css';

export default css`
  .right {
    float: right;
  }

  .header-style {
    backgroundColor: #000000;
    color: #ffffff;
    padding: 10px 10px;
  }

  .playback-control {
    float: right;
    width: 85px;
  }

  .media, .media__bd {
    overflow: hidden;
    _overflow: visible;
    zoom: 1;
  }

  .media .media__img {
    float: left;
    margin-right: 10px;
    color: #ffffff; 
    cursor: pointer;
  }

  .user-image {
    border-radius: 50%;
    border 1px solid #272727;
  }

  .user-name {
    display: none;
  }

  .user-header {
    float: right;
    border-right: 0px;
  }

  .pure-material-button-contained {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    min-width: 74px;
    height: 32px;
    vertical-align: middle;
    text-align: center;
    text-overflow: ellipsis;
    text-transform: uppercase;
    color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
    background-color: #9c4ef7;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
    font-size: 14px;
    overflow: hidden;
    outline: none;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }

  .pure-material-button-contained::-moz-focus-inner {
      border: none;
  }

  .pure-material-button-contained::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      opacity: 0;
      transition: opacity 0.2s;
  }

  .pure-material-button-contained::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      padding: 50%;
      width: 32px; /* Safari */
      height: 32px; /* Safari */
      background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
  }

  .pure-material-button-contained:hover,
  .pure-material-button-contained:focus {
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .pure-material-button-contained:hover::before {
      opacity: 0.08;
  }

  .pure-material-button-contained:focus::before {
      opacity: 0.24;
  }

  .pure-material-button-contained:hover:focus::before {
      opacity: 0.3;
  }

  /* Active */
  .pure-material-button-contained:active {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  .pure-material-button-contained:active::after {
      opacity: 0.32;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0s;
  }

  .pure-material-button-contained:disabled {
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);
      box-shadow: none;
      cursor: initial;
  }

  .pure-material-button-contained:disabled::before {
      opacity: 0;
  }

  .pure-material-button-contained:disabled::after {
      opacity: 0;
  }
`;