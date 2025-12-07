# Defend

Types:

- <code><a href="./src/resources/defend.ts">DefendCreateResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendResponse</a></code>
- <code><a href="./src/resources/defend.ts">DefendUpdateResponse</a></code>
- <code><a href="./src/resources/defend.ts">WorkflowEventDetailResponse</a></code>
- <code><a href="./src/resources/defend.ts">WorkflowEventResponse</a></code>

Methods:

- <code title="post /defend">client.defend.<a href="./src/resources/defend.ts">createWorkflow</a>({ ...params }) -> DefendCreateResponse</code>
- <code title="get /defend/{workflow_id}/events/{event_id}">client.defend.<a href="./src/resources/defend.ts">retrieveEvent</a>(eventID, { ...params }) -> WorkflowEventDetailResponse</code>
- <code title="get /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">retrieveWorkflow</a>(workflowID, { ...params }) -> DefendResponse</code>
- <code title="post /defend/{workflow_id}/events">client.defend.<a href="./src/resources/defend.ts">submitEvent</a>(workflowID, { ...params }) -> WorkflowEventResponse</code>
- <code title="put /defend/{workflow_id}">client.defend.<a href="./src/resources/defend.ts">updateWorkflow</a>(workflowID, { ...params }) -> DefendUpdateResponse</code>

# Monitor

Types:

- <code><a href="./src/resources/monitor.ts">MonitorCreateResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorDetailResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorEventDetailResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorEventResponse</a></code>
- <code><a href="./src/resources/monitor.ts">MonitorUpdateResponse</a></code>

Methods:

- <code title="post /monitor">client.monitor.<a href="./src/resources/monitor.ts">create</a>({ ...params }) -> MonitorCreateResponse</code>
- <code title="get /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">retrieve</a>(monitorID, { ...params }) -> MonitorDetailResponse</code>
- <code title="put /monitor/{monitor_id}">client.monitor.<a href="./src/resources/monitor.ts">update</a>(monitorID, { ...params }) -> MonitorUpdateResponse</code>
- <code title="get /monitor/{monitor_id}/events/{event_id}">client.monitor.<a href="./src/resources/monitor.ts">retrieveEvent</a>(eventID, { ...params }) -> MonitorEventDetailResponse</code>
- <code title="post /monitor/{monitor_id}/events">client.monitor.<a href="./src/resources/monitor.ts">submitEvent</a>(monitorID, { ...params }) -> MonitorEventResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileResponse</a></code>

Methods:

- <code title="post /files/upload">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> FileResponse</code>
