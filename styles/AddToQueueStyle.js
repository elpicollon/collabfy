import css from 'styled-jsx/css';

export default css`
  .add-to-queue__input {
    padding: 5px;
    width: 100%;
  }
  
  .add-to-queue__input:focus {
    outline: none;
  }
        
  .add-to-queue__search-results {
    border: 1px solid #999;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .add-to-queue__search-results-item {
    padding: 5px 0 5px 5px;
  }

  .add-to-queue__search-results-item--focused {
    background-color: #3A3A3A;
  }

  .container{
    display: flex;
  }

  .album-img{
      width: 64;
      padding-right: 1em;
  }

  .flex-item{
      flex-grow: 1;
  }

  .song-name {
    font-size: 1.3em;
    margin-bottom: 0.3em;
  }      
`;
