function Notification({
  avatar,
  name,
  time,
  text,
}: {
  avatar: any;
  name: string;
  time: number;
  text: string;
}) {
  return (
    <a
      href="#"
      className="grid grid-cols-[theme(width.5)_1fr_theme(width.4)] gap-x-2 rounded-lg p-2 hover:bg-gray-100"
    >
      <img src={avatar} className="row-span-3 h-5 w-5 rounded-full" />
      <div className="text-sm font-semibold text-gray-800">{name}</div>
      {/* <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 stroke-2 text-gray-400" /> */}
      <div className="col-span-2 text-xs text-gray-500">Commented {time} ago</div>
      <p className="col-span-2 mt-1 line-clamp-2 overflow-hidden text-ellipsis text-xs">{text}</p>
    </a>
  );
}

export default Notification;
