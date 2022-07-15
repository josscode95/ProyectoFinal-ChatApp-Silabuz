import useLinked from "./hook/useLinked";

const App = () => {

  const data = useLinked('http://localhost:4444/scrap-silabuz')

  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  );
}

export default App;
