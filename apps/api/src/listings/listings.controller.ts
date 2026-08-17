import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

const UPLOADS_ROOT = join(process.cwd(), 'uploads', 'listings');
const MAX_IMAGES = 8;

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  findActive() {
    return this.listingsService.findActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMine(@CurrentUser() user: { userId: string }) {
    return this.listingsService.findMine(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreateListingDto) {
    return this.listingsService.create(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateListingDto,
  ) {
    return this.listingsService.update(user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@CurrentUser() user: { userId: string }, @Param('id') id: string) {
    return this.listingsService.remove(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @UseInterceptors(
    FilesInterceptor('files', MAX_IMAGES, {
      storage: diskStorage({
        destination: (req, _file, callback) => {
          const listingId = String(req.params.id);
          const dir = join(UPLOADS_ROOT, listingId);
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          callback(null, dir);
        },
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 8 * 1024 * 1024 },
      fileFilter: (_req, file, callback) => {
        callback(null, /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype));
      },
    }),
  )
  addImages(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.listingsService.addImages(user.userId, id, files);
  }
}
