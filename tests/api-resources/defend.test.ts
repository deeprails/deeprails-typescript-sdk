// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Deeprails from 'deeprails';

const client = new Deeprails({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource defend', () => {
  // Prism tests are disabled
  test.skip('createWorkflow: only required params', async () => {
    const responsePromise = client.defend.createWorkflow({
      improvement_action: 'regenerate',
      metrics: { foo: 0 },
      name: 'name',
      type: 'automatic',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createWorkflow: required and optional params', async () => {
    const response = await client.defend.createWorkflow({
      improvement_action: 'regenerate',
      metrics: { foo: 0 },
      name: 'name',
      type: 'automatic',
      automatic_tolerance: 'low',
      description: 'description',
      max_retries: 0,
    });
  });

  // Prism tests are disabled
  test.skip('retrieveEvent: only required params', async () => {
    const responsePromise = client.defend.retrieveEvent('event_id', { workflow_id: 'workflow_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveEvent: required and optional params', async () => {
    const response = await client.defend.retrieveEvent('event_id', { workflow_id: 'workflow_id' });
  });

  // Prism tests are disabled
  test.skip('retrieveWorkflow', async () => {
    const responsePromise = client.defend.retrieveWorkflow('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submitEvent: only required params', async () => {
    const responsePromise = client.defend.submitEvent('workflow_id', {
      model_input: { user_prompt: 'user_prompt' },
      model_output: 'model_output',
      model_used: 'model_used',
      nametag: 'nametag',
      run_mode: 'precision_plus',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submitEvent: required and optional params', async () => {
    const response = await client.defend.submitEvent('workflow_id', {
      model_input: { user_prompt: 'user_prompt', context: 'context' },
      model_output: 'model_output',
      model_used: 'model_used',
      nametag: 'nametag',
      run_mode: 'precision_plus',
    });
  });

  // Prism tests are disabled
  test.skip('updateWorkflow', async () => {
    const responsePromise = client.defend.updateWorkflow('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateWorkflow: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.defend.updateWorkflow(
        'workflow_id',
        { description: 'description', name: 'name', type: 'automatic' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Deeprails.NotFoundError);
  });
});
