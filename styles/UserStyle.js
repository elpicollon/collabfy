import css from 'styled-jsx/css';

export default css`
  .users { 
    float: left;
    width: 100%;
    height: 100%;
    color: #ffffff;
  }             

  .user-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .user-image {
    border-radius: 50%;
    border 1px solid #272727;
    width: 60px;
    height: 60px;
    margin-top: 15%;
    margin-left: 15%;
  }
  
  .user-name {
    margin-top: 2%;
    margin-left: 85px;
  }
  
  .user-country {
    margin-top: 2%;
    margin-left: 85px;
  }

  .user-followers {
    margin-top: 2%;
    margin-left: 85px;
    margin-bottom: 2%;
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
  
  .header-2 {
    color: #999;
    font-size: 11px;
    text-transform: uppercase;
  }
  
  .user-active{
    color: #9800ff;
  }

  .user-normal{
    color: white;
  }     

  @media screen and (max-width: 600px) {
    .user-list__item {
      display: inline-block;
      height: 90px;
      width: 100%;
      background-color: #0F0F0F;
      border-radius: 5px;
    }
  }

  @media (min-width: 576px) {
    .user-list__item {
      display: inline-block;
      height: 90px;
      width: 100%;
      background-color: #0F0F0F;
      border-radius: 5px;
    }
  }

  @media (min-width: 768px) {
    .user-list__item {
      display: inline-block;
      height: 90px;
      width: 100%;
      background-color: #0F0F0F;
      border-radius: 5px;
    }
  }

  @media (min-width: 1024px) {
    .user-list__item {
      display: inline-block;
      float: center;
      height: 100%;
      width: 24.6%;
      margin-right: 3px;
      background-color: #0F0F0F;
      border-radius: 5px;
    }
  }
`;
