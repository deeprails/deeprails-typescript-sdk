# Defend

Types:

- <code><a href="./src/resources/defend.ts">DefendResponse</a></code>
- <code><a href="./src/resources/defend.ts">WorkflowEventResponse</a></code>

Methods:

- <code title="post /defend">client.defend.<a href="./src/resources/defend.ts">createWorkflow</a>({ ...params }) -> DefendResponse</code>
- <code title="get /defend/{workflow_id}/events/{event_id}">client.defend.<a href="./src/resources/defend.ts">retrieveEvent</a>(eventID, { ...params }) -> WorkflowEventResponse</code>
- <code title="get /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">retrieveWorkflow</a>(workflowID) -> DefendResponse</code>
- <code title="post /defend/{workflow_id}/events">client.defend.<a href="./src/resources/defend.ts">submitEvent</a>(workflowID, { ...params }) -> WorkflowEventResponse</code>
- <code title="put /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">updateWorkflow</a>(workflowID, { ...params }) -> DefendResponse</code>

# Monitor

Types:

- <code><a href="./src/resources/monitor.ts">APIResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorRetrieveResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorSubmitEventResponse</a></code>

Methods:

- <code title="post /monitor">client.monitor.<a href="./src/resources/monitor.ts">create</a>({ ...params }) -> APIResponse</code>
- <code title="get /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">retrieve</a>(monitorID, { ...params }) -> MonitorRetrieveResponse</code>
- <code title="put /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">update</a>(monitorID, { ...params }) -> APIResponse</code>
- <code title="post /monitor/{monitor_id}/events">client.monitor.<a href="./src/resources/monitor.ts">submitEvent</a>(monitorID, { ...params }) -> MonitorSubmitEventResponse</code>

# Evaluate

Types:

- <code><a href="./src/resources/evaluate.ts">Evaluation</a></code>

Methods:

- <code title="post /evaluate">client.evaluate.<a href="./src/resources/evaluate.ts">create</a>({ ...params }) -> Evaluation</code>
- <code title="get /evaluate/{eval_id}">client.evaluate.<a href="./src/resources/evaluate.ts">retrieve</a>(evalID) -> Evaluation</code>
