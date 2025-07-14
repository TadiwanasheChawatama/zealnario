const SustainableGoal = ({ goal }) => {
  return (
    <div class="goal-item">
      <div class="goal-number">{goal.heading}</div>
      <p>{goal.text}</p>
    </div>
  );
};

export default SustainableGoal;
