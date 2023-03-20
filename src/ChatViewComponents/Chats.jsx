export function Chats(props) {
  console.log(props.groups);
  return (
    <div className="chats">
      {props.groups.map((group) => {
        return (
          <div className="userChat" key={group.id}>
            <img src={group.image_url} />
            <div className="userChatInfo">
              <span>{group.title}</span>
              <p>{group.message.body.slice(0, 15)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
