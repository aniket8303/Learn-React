function Hello() {
  let number = 456;

  let fullName = () => {
    return "Prashant jain";
  };
  return (
    <p>
      MessageNo: {number} I am your master {fullName()}
    </p>
  );
}

export default Hello;
