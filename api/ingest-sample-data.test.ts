/**
 * @jest-environment @dynatrace/runtime-simulator/lib/test-environment
 */

const fetchMock = jest.fn();
globalThis.fetch = fetchMock;

import ingestSampleData from './ingest-sample-data';

describe('ingest-sample-data', () => {
  it('should have correct content-type and URL', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      ok: true,
    } as Response);
    await ingestSampleData('event-type');
    expect(fetchMock.mock.calls).toHaveLength(1);
    // The first element of an item of the calls Array is the URL, the second an object describing the request
    const url = fetchMock.mock.calls[0][0];
    const request = fetchMock.mock.calls[0][1];
    expect(request.headers['Content-Type']).toEqual('application/cloudevent-batch+json');
    expect(url).toEqual('/platform/classic/environment-api/v2/bizevents/ingest');
  });
});
