# Defend

Types:

- <code><a href="./src/resources/defend.ts">DefendResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendCreateWorkflowResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendRetrieveEventResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendSubmitEventResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendUpdateWorkflowResponse</a></code>

Methods:

- <code title="post /defend">client.defend.<a href="./src/resources/defend.ts">createWorkflow</a>({ ...params }) -> unknown</code>
- <code title="get /defend/{workflow_id}/events/{event_id}">client.defend.<a href="./src/resources/defend.ts">retrieveEvent</a>(eventID, { ...params }) -> unknown</code>
- <code title="get /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">retrieveWorkflow</a>(workflowID, { ...params }) -> DefendResponse</code>
- <code title="post /defend/{workflow_id}/events">client.defend.<a href="./src/resources/defend.ts">submitEvent</a>(workflowID, { ...params }) -> unknown</code>
- <code title="put /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">updateWorkflow</a>(workflowID, { ...params }) -> unknown</code>

# Monitor

Types:

- <code><a href="./src/resources/monitor.ts">MonitorCreateResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorRetrieveResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorUpdateResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorRetrieveEventResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorSubmitEventResponse</a></code>

Methods:

- <code title="post /monitor">client.monitor.<a href="./src/resources/monitor.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">retrieve</a>(monitorID, { ...params }) -> unknown</code>
- <code title="put /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">update</a>(monitorID, { ...params }) -> unknown</code>
- <code title="get /monitor/{monitor_id}/events/{event_id}">client.monitor.<a href="./src/resources/monitor.ts">retrieveEvent</a>(eventID, { ...params }) -> unknown</code>
- <code title="post /monitor/{monitor_id}/events">client.monitor.<a href="./src/resources/monitor.ts">submitEvent</a>(monitorID, { ...params }) -> unknown</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileResponse</a></code>

Methods:

- <code title="post /files/upload">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> FileResponse</code>
