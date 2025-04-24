interface Props {
  key: string;
  action: string;
}
export const Shortcut = ({ action, key }: Props) => {
  return (
    <div className="flex justify-between p-2">
      <span className={`px-2 py-1 rounded font-mono text-sm bg-gray-700`}>
        {key}
      </span>
      <span>{action}</span>
    </div>
  );
};
