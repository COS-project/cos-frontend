import Link from 'next/link';

interface Props {
  title: string;
  buttonText: string;
  href: string;
}

export default function Banner(props: Props) {
  const { title, buttonText, href } = props;

  return (
    <div className="mx-auto mt-4 p-3 rounded-3xl bg-second">
      <div className="px-2">
        <div className="text-white font-bold text-left text-h4 my-1">{title}</div>
        <Link href={href}>
          <div className="inline-block rounded-3xl bg-white text-blue text-h6 my-1 px-3 py-1">{buttonText} ➚</div>
        </Link>
      </div>
    </div>
  );
}
