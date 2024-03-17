function Results({ classification, cure }) {
  return (
    <div>
      <h2>Results</h2>
      <p>Classification: {classification}</p>
      <p>Suggested Cure: {cure}</p>
    </div>
  );
}

export default Results;
