export function Message(props) {
  let timestamp = new Date(props.timestamp);
  // console.log(timestamp);
  let formatedTimestamp = formatDate(timestamp);
  if (formatedTimestamp === "Today") {
    formatedTimestamp = `${formatAMPM(timestamp)}`;
  }

  if (props.user === "owner") {
    return (
      <div className="message owner">
        <div className="messageInfo">
          <img src={props.userImage} alt="" />
          <span>{props.name}</span>
        </div>
        <div className="messageContent">
          <p>{props.body}</p>
          {/* <img
            src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
          /> */}
        </div>
        <span>{formatedTimestamp}</span>
      </div>
    );
  } else {
    return (
      <div className="message">
        <div className="messageInfo">
          <img src={props.userImage} alt="" />
          <span>{props.name}</span>
        </div>
        <div className="messageContent">
          <p>{props.body}</p>
          {/* <img
            src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
          /> */}
        </div>
        <span>{formatedTimestamp}</span>
      </div>
    );
  }
}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

var fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(someDateTimeStamp) {
  var dt = new Date(someDateTimeStamp),
    date = dt.getDate(),
    month = months[dt.getMonth()],
    timeDiff = someDateTimeStamp - Date.now(),
    diffDays = new Date().getDate() - date,
    diffMonths = new Date().getMonth() - dt.getMonth(),
    diffYears = new Date().getFullYear() - dt.getFullYear();

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    return "Today";
  } else if (diffYears === 0 && diffDays === 1) {
    return "Yesterday";
  } else if (diffYears === 0 && diffDays < -1 && diffDays > -7) {
    return fulldays[dt.getDay()];
  } else if (diffYears >= 1) {
    return month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear();
  } else {
    return month + " " + date;
  }
}
