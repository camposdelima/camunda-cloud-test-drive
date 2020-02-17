zbc.createWorkflowInstanceWithResult("get-greeting-2", {}).then(res => {
  core.info("===Outcome to Requestor===");
  core.info(res);
  core.info("===Outcome to Requestor===");
  setTimeout(() => zbc.close().then(() => process.exit(0)), 500);
});

module.exports = {
  tasks: {
    "get-greeting": (job, complete) => {
      core.info("===Worker===");
      core.info(`Got a job from Camunda Cloud:`);
      core.info(JSON.stringify(job, null, 2));
      core.info("===Worker===");
      const { hour } = job.variables;
      let greeting;
      if (hour > 5 && hour < 12) {
        greeting = "Good morning!";
      } else if (hour >= 12 && hour < 20) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good night!";
      }
      complete.success({ greeting });
    }
  }
};
