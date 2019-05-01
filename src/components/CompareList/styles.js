import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  display: flex;
  flex-direction: column;

  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin-right: 10px;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
      width: 80px;
      height: 55px;
      padding: 0 20px;
      margin: 10px;
      font-size: 20px;
      color: #fff;
      border: 0;
      border-radius: 3px;
    }

    .delete {
      background: #aa3f39;

      &:hover {
        background: #801a15;
      }
    }

    .update {
      background: #2e4172;

      &:hover {
        background: #162955;
      }
    }
  }
`;
