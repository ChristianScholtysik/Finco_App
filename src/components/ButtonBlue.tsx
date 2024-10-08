interface ButtonBlueProps {
  text: string;
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({ text }) => {
  return (
    <button className="bg-gradient-to-b from-[#44bbfe] to-[#1e78fe] text-white font-Urbanist text-normal rounded-full shadow-lg px-24 py-4 w-full">
      {text}
    </button>
  );
};

export default ButtonBlue;
