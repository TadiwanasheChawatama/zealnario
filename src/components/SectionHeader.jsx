const SectionHeader = ({ heading, text }) => {
  return (
    <div className="section-header">
      <h2 className="font-bold">{heading}</h2>
      <p>{text}</p>
    </div>
  );
};

export default SectionHeader;
