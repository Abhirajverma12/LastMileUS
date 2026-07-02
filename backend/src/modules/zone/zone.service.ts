import prisma from '../../config/database';

export async function createZone(name: string, description?: string) {
  return prisma.zone.create({
    data: { name, description },
  });
}

export async function getAllZones() {
  return prisma.zone.findMany({
    include: {
      _count: { select: { areas: true, agents: true } },
    },
    orderBy: { name: 'asc' },
  });
}

export async function getZoneById(id: string) {
  return prisma.zone.findUnique({
    where: { id },
    include: {
      areas: true,
      agents: {
        include: {
          user: { select: { name: true, email: true } },
        },
      },
    },
  });
}

export async function createArea(name: string, pincode: string, zoneId: string) {
  // Verify zone exists
  const zone = await prisma.zone.findUnique({ where: { id: zoneId } });
  if (!zone) {
    throw new Error('Zone not found');
  }

  return prisma.area.create({
    data: { name, pincode, zoneId },
    include: { zone: true },
  });
}

export async function getAllAreas(zoneId?: string) {
  return prisma.area.findMany({
    where: zoneId ? { zoneId } : undefined,
    include: { zone: { select: { id: true, name: true } } },
    orderBy: { name: 'asc' },
  });
}

export async function deleteZone(id: string) {
  return prisma.zone.delete({ where: { id } });
}

export async function deleteArea(id: string) {
  return prisma.area.delete({ where: { id } });
}
