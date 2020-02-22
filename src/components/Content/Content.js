import React from "react";
import styles from "./Content.module.scss";

const MsgBox = ({ name, msg, isSelf, time }) => (
  <div className={`${styles.msgBox} ${isSelf ? styles.isSelf : ""}`}>
    <div className={styles.time}>
      <div>{time}</div>
    </div>
    <div className={styles.rightBox}>
      <div className={styles.msgTag}>{`<${isSelf ? `!--` : ""}${name}>`}</div>
      <div className={styles.content}>{msg}</div>
      <div className={styles.msgTag}>{`${isSelf ? "--" : `</${name}`}>`}</div>
    </div>
  </div>
);

function sortNumber(a, b) {
  a = new Date(a.dateObj).getTime();
  b = new Date(b.dateObj).getTime();
  return a - b;
}

const AlertText = ({ text }) => (
  <div className={styles.alert}>
    <span className={styles.blue}>{`<link`}</span>
    <span className={styles.sky}>{` rel=`}</span>
    <span className={styles.orange}>{`"random"`}</span>
    <span className={styles.sky}>{` href=`}</span>
    <span className={styles.orange}>{`"${text}">`}</span>
  </div>
);

const Content = ({ msg, userName, loading }) => {
  msg = msg.sort(sortNumber);
  let msgEle = null;

  if (loading) {
    msgEle = (
      <AlertText text="正在讀取訊息中... 或許是目前聊天室內無任何訊息, 來搶頭香吧!" />
    );
  } else {
    msgEle = msg.map((content, idx) => (
      <MsgBox
        name={content.name}
        msg={content.msg}
        time={content.dateToShow}
        key={idx}
        isSelf={content.name === userName}
      />
    ));
  }

  return (
    <div className={styles.wrapper} id="content">
      <div className={styles.scrollArea}>{msgEle}</div>
    </div>
  );
};

export default React.memo(Content);
