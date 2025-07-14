const Header = ({ heading, expo }) => {
  return (
    <section className="page-header">
      <h1 className="text-4xl mb-4 font-bold">{heading}</h1>
      <p>{expo}</p>
    </section>
  );
};

export default Header;
