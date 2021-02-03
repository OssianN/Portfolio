import React, { useState, useEffect, useRef } from 'react'
import GuestBookForm from '../components/guestbook/GestbookForm';
import { graphql } from "gatsby";
import Nav from '../components/Nav';
import '../components/guestbook/guestBook.scss';

const GuestBook = (props) => {
  const [updateMessages, setUpdateMessages] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState('hideGuestBookForm');
  const formRef = useRef(null);
  
  const fetchDBMessages = async () => {
    const messagesDB = await props.data.allMongodbGuestBookDbGuestbooks.edges;
    setMessages(messagesDB);
  }

  // const previewInfo = () => {
  //   'This message is a local preview. The message will go live in a couple of minutes, after it has been reviewed. Check back in a while to see the live version.'
  // }
  
  const renderMessages = () => {
    const messagesCopy = [...messages];
    return messagesCopy?.reverse().map(message => {
      const info = message.node;
      return (
        <li key={info.id}>
          <h2>{info.name} {info.preview ? <span className='localPreview'>{info.preview}</span> : ''}</h2>
          <p>{info.msg}</p>
        </li>
      );
    });
  };

  const showGuestBookForm = () => {
    if (showForm === 'hideGuestBookForm') {
      formRef.current.style.display = 'flex';
      setShowForm('showGuestBookForm')
    } else {
      setShowForm('hideGuestBookForm');
      setTimeout(() => formRef.current.style.display = 'none', 1000);
    }
  }
  
    useEffect(() => {
      fetchDBMessages();
    }, []);

  return (
    <div className='guestBookContainer'>
      <Nav navStyle='guestbookNav' />
      <div className='guestBook'>
        <GuestBookForm
          updateMessages={updateMessages}
          setUpdateMessages={setUpdateMessages}
          messages={messages}
          setMessages={setMessages}
          showForm={showForm}
          setShowForm={setShowForm}
          showGuestBookForm={showGuestBookForm}
          formRef={formRef}
        />
        <div className='mobileMessageButton'>
          <button onClick={showGuestBookForm} className='showFormButton'>Write a message</button>
        </div>
        <div className='messages'>
          <ul>
            {renderMessages()}
          </ul>
        </div>
      </div>
      <div className='fadeListBottom'></div>
    </div>
  );
};

export default GuestBook;

export const pageQuery = graphql`
  query {
    allMongodbGuestBookDbGuestbooks {
      edges {
        node {
          id
          name
          msg
        }
      }
    }
  }
`;
