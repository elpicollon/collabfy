import css from 'styled-jsx/css';

export default css`
  .queue {
    float: right;
    width: 100%;
    color: #ffffff;
  }

  img {
    borderRadius: 5%;
  }

  td { 
    border-bottom: 1px solid #3A3A3A !important; 
  }

  .btn-thumbs-up {
    background-color: transparent;
    border-radius: 2px;
    border: 0px;
    font-size: 16px;
    color: #008cff;
    cursor: pointer;
  }

  .btn-thumbs-up-disabled {
    background-color: transparent;
    border-radius: 2px;
    border: 0px;
    font-size: 16px;
    color: #3A3A3A;
  }

  .btn-thumbs-down {
    background-color: transparent;
    border-radius: 2px;
    border: 0px;
    font-size: 16px;
    color: #f26a6a;
    cursor: pointer;
  }

  .btn-thumbs-down-disabled {
    background-color: transparent;
    border-radius: 2px;
    border: 0px;
    font-size: 16px;
    color: #3A3A3A;
  }

  table {
    margin:0;
    padding:0;
    border-collapse: collapse;
    border-spacing: 0;
  }

  table th, table td {
    text-align: center;
  }

  table th {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 600px) {
    table {
      border: 0;
    }

    table thead {
      display: none;
    }

    table tr {
      margin-bottom: 10px;
      display: block;
      border: 2px solid #3A3A3A;
    }

    table td {
      display: block;
      text-align: right;
      font-size: 13px;
    }

    table td:last-child {
      border-bottom: 0;
    }

    table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;