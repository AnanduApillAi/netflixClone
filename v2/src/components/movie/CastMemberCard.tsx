import Image from 'next/image';

const CastMemberCard = ({ member }) => {
  return (
    <div className="text-white">
      <Image
        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
        alt={member.name}
        width={200}
        height={300}
        className="rounded-md"
      />
      <h3 className="font-bold mt-2">{member.name}</h3>
      <p className="text-gray-400">{member.character || member.job}</p>
    </div>
  );
};

export default CastMemberCard;
