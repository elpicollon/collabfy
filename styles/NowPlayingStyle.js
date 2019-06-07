import css from 'styled-jsx/css';

export default css`
  .now-playing {
    background-color: #0F0F0F;
    color: #fff;
    height: 250px;
    position: relative;
    width: 100%;
    border-radius: 5px;
  }

  .now-playing__text {
    padding: 40px;
  }

  .now-playing__bd {
    padding-left: 30px;
  }

  .now-playing__track-name {
    font-size: 2em;
    padding-top: 1.2em;
  }

  .now-playing__artist-name {
    font-size: 1.2em;
    padding-bottom: 2em;
    padding-top: 0.5em;
  }

  .now-playing__user {
    padding-top: 0.5em;
  }

  .now-playing__progress_bar {
    bottom: 0;
    background-color: #9800ff;
    height: 5px;
    position: absolute;
    width: 100%;
    height: 4px;
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
  }

  .user-image {
    border-radius: 50% !important;
    border: 1px solid #3A3A3A;
    top: 30px !important;
    left: 30px;
    position: absolute;
  }

  .now-playing__track-name {
    font-size: 2em;
    padding-top: 1.2em;
  }

  .now-playing__artist-name {
    font-size: 1.2em;
    padding-bottom: 2em;
    padding-top: 0.5em;
  }

  .media__img>img{
    border-radius: 5%;
  }

  @media (max-width: 425px) {
    .user-image {
      border-radius: 50%;
    }

    .now-playing__track-name {
      font-size: 1em;
      width: 100%;
    }

    .now-playing__artist-name {
      font-size: 0.6em;
      width: 100%;
    }

    .now-playing__bd {
      padding-left: 0px;
    }
  }

  @media (max-width: 768px) {
    .now-playing__track-name {
      font-size: 1.1em;
      width: 100%;
    }

    .now-playing__artist-name {
      font-size: 0.8em;
      width: 100%;
    }
  }     
`;
