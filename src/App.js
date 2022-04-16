import React, { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import SecondView from './SecondView';

const GET_CONTENT = gql `
    query {
        book {
            pages {
                content,
                tokens {
                  position,
                  value
                }
            }
        }
    }
`;

function App() {
  const { data, loading, error } = useQuery(GET_CONTENT);

  const [state, setstate] = useState({ data:"" });
  const [num, setNum] = useState(0);

  if(loading) return <div>Loading...</div>

  if(error) return <div>Something went wrong.</div>

  const Right = () => {
    setNum(num + 1);
  }
  const Left = () => {
    setNum(num - 1);
  }
  const changeState = (a, b, c) => {
    c.map((x, y) => {
      if(y == b) {
        const w = x.value;
        setstate({ data: { w, b, c } });
      }
    })
  }

  return (
    <div className="container">
      <div className="row align-items-center my-5">
        <div className="col-lg-7" style={{ padding: 50, backgroundColor: 'aqua', display: 'inline-block', overflowWrap: 'break-word', whiteSpace: 'pre-wrap', alignItems: 'center' }}>
          <h2>First View</h2>
          <br />
          {data.book.pages.map((launch) => (
            Array.from(launch.content.split(' ')).map((word, index) =>
              <span onClick={() =>
                  changeState(word, index, launch.tokens)
              } style={{ cursor: 'pointer' }}>{ word }&nbsp;</span>)
          ))[num]}
          <br />
          <span onClick={() => Left() } style={{ cursor: 'pointer' }}>Prev</span>&nbsp;&nbsp;&nbsp;
          <span onClick={() => Right() } style={{ cursor: 'pointer' }}>Next</span>
        </div>
        <div className="col-lg-5" style={{ padding: 50, backgroundColor: 'aqua', display: 'inline-block' }}>
          <SecondView data={ state.data } />
        </div>
        <div>
          {data.book.pages.map((book) => {
            return (
              <div>
                <h1 style={{ marginTop: 20, fontSize: 20 }}>{ book.content }<hr/></h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;