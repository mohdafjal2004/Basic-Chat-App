import react, { useState } from "react";

const Justupdate = () => {
  const [count, setCount] = useState(0);

  const updatecount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Hello {count}</h1>
      <button onClick={updatecount}>Update Count</button>
    </div>
  );
};
export default Justupdate;
