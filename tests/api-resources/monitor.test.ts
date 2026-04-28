// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DeepRails from 'deeprails';

const client = new DeepRails({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource monitor', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.monitor.create({ guardrail_metrics: ['correctness'], name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.monitor.create({
      guardrail_metrics: ['correctness'],
      name: 'name',
      context_awareness: true,
      description: 'description',
      file_search: ['string'],
      web_search: true,
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.monitor.retrieve('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitor.retrieve('monitor_id', { limit: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DeepRails.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.monitor.update('monitor_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitor.update(
        'monitor_id',
        {
          description: 'description',
          file_search: ['string'],
          guardrail_metrics: ['correctness'],
          name: 'name',
          status: 'inactive',
          web_search: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DeepRails.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveEvent: only required params', async () => {
    const responsePromise = client.monitor.retrieveEvent('event_id', { monitor_id: 'monitor_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveEvent: required and optional params', async () => {
    const response = await client.monitor.retrieveEvent('event_id', { monitor_id: 'monitor_id' });
  });

  // Mock server tests are disabled
  test.skip('submitEvent: only required params', async () => {
    const responsePromise = client.monitor.submitEvent('monitor_id', {
      model_input: { user_prompt: 'user_prompt' },
      model_output: 'model_output',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('submitEvent: required and optional params', async () => {
    const response = await client.monitor.submitEvent('monitor_id', {
      model_input: {
        user_prompt: 'user_prompt',
        context: [{ content: 'content', role: 'user' }],
        ground_truth: 'ground_truth',
        system_prompt: 'system_prompt',
      },
      model_output: 'model_output',
      nametag: 'nametag',
      run_mode: 'super_fast',
    });
  });
});
