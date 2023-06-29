import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { waterSupplyStatusValidationSchema } from 'validationSchema/water-supply-statuses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.water_supply_status
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWaterSupplyStatusById();
    case 'PUT':
      return updateWaterSupplyStatusById();
    case 'DELETE':
      return deleteWaterSupplyStatusById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWaterSupplyStatusById() {
    const data = await prisma.water_supply_status.findFirst(convertQueryToPrismaUtil(req.query, 'water_supply_status'));
    return res.status(200).json(data);
  }

  async function updateWaterSupplyStatusById() {
    await waterSupplyStatusValidationSchema.validate(req.body);
    const data = await prisma.water_supply_status.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWaterSupplyStatusById() {
    const data = await prisma.water_supply_status.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
