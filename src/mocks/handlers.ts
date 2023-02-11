import { rest } from 'msw';

export const handlers = [
  rest.post('/api/real-estate', async (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.json({ success: true, data: { real_estate_id: 1 } }));
  }),
];
