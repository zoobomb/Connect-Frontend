import React from "react";

function ListItem({ Name, Topic, Question }) {
  return (
    <div id="ListItem">
      <h2 id="listQuestion">Question: {Question}</h2>
      <p id="listName">Name: {Name}</p>
      <p id="listTopic">Topic: {Topic}</p>
      {/* <a href="./index.js"/>reply to comment!</a> */}
    </div>
  );
}

export default ListItem;
