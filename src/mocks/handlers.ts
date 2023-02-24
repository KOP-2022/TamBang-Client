import { rest } from 'msw';

import { facilities } from './constansts';

import type { Facility, Response, Room } from 'response';

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
  rest.get('/api/real-estates', async (req, res, ctx) => {
    const { searchParams } = req.url;
    const lng = searchParams.get('longitude');
    const lat = searchParams.get('latitude');
    if (!lng || !lat)
      return res(
        ctx.status(400),
        ctx.json<Response>({ success: false, data: {} })
      );
    const data = Array(3)
      .fill(undefined)
      .map((_, index) => ({
        id: index + 1,
        coords: {
          lat: +lat + 0.0006 * index,
          lng: +lng + 0.0006 * index,
        },
      }));

    return res(ctx.json<Response<Room[]>>({ success: true, data }));
  }),
  rest.get('/api/real-estates/:id/facilities', async (req, res, ctx) => {
    return res(
      ctx.json<Response<Facility[]>>({ success: true, data: facilities })
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
