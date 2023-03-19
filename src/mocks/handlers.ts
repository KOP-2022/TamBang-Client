import { RoomUploadForm } from 'form';

import { rest } from 'msw';

import { facilities, rooms } from './constansts';

import type { Facility, Response, Room, RoomDetail } from 'response';

interface RealEstate {
  real_estate_id: number;
}

export const handlers = [
  rest.post<RoomUploadForm>('/api/real-estate', async (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.json<Response<RealEstate>>({
        success: true,
        data: { real_estate_id: 1 },
      })
    );
  }),
  rest.get('/api/map', async (req, res, ctx) => {
    const { searchParams } = req.url;
    const lng = searchParams.get('longitude');
    const lat = searchParams.get('latitude');
    if (!lng || !lat)
      return res(
        ctx.status(400),
        ctx.json<Response>({ success: false, data: {} })
      );

    return res(
      ctx.json<Response<Room[]>>({
        success: true,
        data: [
          {
            id: 1,
            latitude: +lat,
            longitude: +lng,
          },
        ],
      })
    );
  }),
  rest.get('/api/real-estates/:id/facilities', async (req, res, ctx) => {
    return res(
      ctx.json<Response<Facility[]>>({ success: true, data: facilities })
    );
  }),
  rest.post('/api/login', async (req, res, ctx) => {
    const data = await req.json();
    console.log(data);
    return res(ctx.json<Response>({ success: true, data: {} }));
  }),
  rest.post('/api/member', async (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.json<Response>({ success: true, data: {} }));
  }),
  rest.get('/api/real-estates/:id', async (req, res, ctx) => {
    console.log(rooms[0]);
    return res(
      ctx.json<Response<RoomDetail>>({
        success: true,
        data: rooms[0],
      })
    );
  }),
];
