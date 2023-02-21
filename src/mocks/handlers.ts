import { rest } from 'msw';

import type { Response } from 'response';

interface RealEstate {
  real_estate_id: number;
}
interface Login {
  id: number;
}

export const handlers = [
  rest.post('/api/real-estate', async (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.json<Response<RealEstate>>({
        success: true,
        data: { real_estate_id: 1 },
      })
    );
  }),
  rest.post('/api/login', async (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.json<Response<Login>>({ success: true, data: { id: 1 } }));
  }),
  rest.post('/api/member', async (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.json<Response>({ success: true, data: {} }));
  }),
];
