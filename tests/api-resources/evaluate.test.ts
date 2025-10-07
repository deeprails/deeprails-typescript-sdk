// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Deeprails from 'deeprails';

const client = new Deeprails({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluate', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.evaluate.create({
      model_input: { user_prompt: 'user_prompt' },
      model_output: 'model_output',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.evaluate.create({
      model_input: { user_prompt: 'user_prompt', context: 'context' },
      model_output: 'model_output',
      run_mode: 'precision_plus',
      guardrail_metrics: ['correctness'],
      model_used: 'model_used',
      nametag: 'nametag',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.evaluate.retrieve('eval_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
