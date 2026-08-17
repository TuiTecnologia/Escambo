import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

const listingInclude = {
  images: { orderBy: { order: 'asc' as const } },
  category: true,
  desiredItems: true,
};

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateListingDto) {
    const { desiredDescription, ...listingData } = dto;

    return this.prisma.listing.create({
      data: {
        ...listingData,
        userId,
        desiredItems: desiredDescription
          ? { create: [{ freeDescription: desiredDescription }] }
          : undefined,
      },
      include: listingInclude,
    });
  }

  findActive() {
    return this.prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      include: listingInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  findMine(userId: string) {
    return this.prisma.listing.findMany({
      where: { userId },
      include: listingInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: listingInclude,
    });
    if (!listing) throw new NotFoundException('Anúncio não encontrado.');
    return listing;
  }

  async update(userId: string, id: string, dto: UpdateListingDto) {
    await this.assertOwner(userId, id);
    const { desiredDescription, ...listingData } = dto;
    return this.prisma.listing.update({
      where: { id },
      data: listingData,
      include: listingInclude,
    });
  }

  async remove(userId: string, id: string) {
    await this.assertOwner(userId, id);
    await this.prisma.listing.update({ where: { id }, data: { status: 'REMOVED' } });
    return { removed: true };
  }

  async addImages(userId: string, id: string, files: Express.Multer.File[]) {
    await this.assertOwner(userId, id);
    const existingCount = await this.prisma.listingImage.count({ where: { listingId: id } });

    await this.prisma.listingImage.createMany({
      data: files.map((file, index) => ({
        listingId: id,
        url: `/uploads/listings/${id}/${file.filename}`,
        order: existingCount + index,
      })),
    });

    return this.findOne(id);
  }

  private async assertOwner(userId: string, id: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Anúncio não encontrado.');
    if (listing.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para alterar este anúncio.');
    }
    return listing;
  }
}
