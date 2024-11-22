const AuthTitle = ({ title }: { title: string }) => {
  return (
    <div className="mt-10 mb-10 md:mb-[60px]">
      <h2 className="text-[26px] font-bold text-center text-gray-6">{title}</h2>
    </div>
  );
};

export default AuthTitle;
