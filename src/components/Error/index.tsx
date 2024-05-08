import React from 'react';
const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <article className="message is-dark">
      <div className="message-header">
        <p>An error occurred</p>
      </div>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default Error;
