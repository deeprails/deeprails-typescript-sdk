// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DeepRails from 'deeprails';

const client = new DeepRails({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource defend', () => {
  // Prism tests are disabled
  test.skip('createWorkflow: only required params', async () => {
    const responsePromise = client.defend.createWorkflow({
      improvement_action: 'regen',
      name: 'name',
      threshold_type: 'automatic',
      automatic_hallucination_tolerance_levels: { completeness: 'medium' },
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
      improvement_action: 'regen',
      name: 'name',
      threshold_type: 'automatic',
      automatic_hallucination_tolerance_levels: { correctness: 'low' },
      context_awareness: true,
      description: 'description',
      file_search: ['string'],
      max_improvement_attempts: 0,
      web_search: true,
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
  test.skip('retrieveWorkflow: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.defend.retrieveWorkflow('workflow_id', { limit: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DeepRails.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('submitEvent: only required params', async () => {
    const responsePromise = client.defend.submitEvent('workflow_id', {
      model_input: {},
      model_output: 'model_output',
      model_used: 'model_used',
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
      model_input: {
        context: ['string'],
        ground_truth: 'ground_truth',
        system_prompt: 'system_prompt',
        user_prompt: 'user_prompt',
      },
      model_output: 'model_output',
      model_used: 'model_used',
      run_mode: 'precision_plus',
      nametag: 'nametag',
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
        { description: 'description', name: 'name' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DeepRails.NotFoundError);
  });
});
