type ProfileCardProps = {
  name: string;
  job?: string;
  year: number;
};

const ProfileCard = ({ name, job, year }: ProfileCardProps) => {
  return (
    <div className="border-2 border-dashed border-indigo-500 rounded-lg p-4 m-4 h-[200px] w-[200px]">
      <p>Name: {name}</p>
      <p>Year: {year}</p>
      {job && <p>Job: {job}</p>}
    </div>
  );
};

export default ProfileCard;
